const crypto = require("crypto");

const SHEET_ID = process.env.GOOGLE_SHEET_ID || "1YjdaEGDuUs2Sqo7823bs2RGrE4_geJkGfRmNcFmDG5o";
const SHEET_NAME = process.env.GOOGLE_SHEET_NAME || "Sheet1";
const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID || "-1003925890396";

const requiredFields = [
  "fullName",
  "businessName",
  "phone",
  "email",
  "location",
  "businessType",
  "currentPage",
  "goal",
  "budget"
];

function json(res, status, body) {
  res.statusCode = status;
  res.setHeader("Content-Type", "application/json; charset=utf-8");
  res.end(JSON.stringify(body));
}

function clean(value, maxLength = 800) {
  return String(value || "").replace(/\s+/g, " ").trim().slice(0, maxLength);
}

function parseBody(req) {
  if (req.body && typeof req.body === "object") return req.body;
  if (typeof req.body === "string") return JSON.parse(req.body || "{}");
  return {};
}

function base64Url(input) {
  return Buffer.from(input)
    .toString("base64")
    .replace(/=/g, "")
    .replace(/\+/g, "-")
    .replace(/\//g, "_");
}

function normalizePrivateKey(privateKey) {
  return privateKey.replace(/\\n/g, "\n");
}

async function getGoogleAccessToken() {
  const email = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
  const privateKey = process.env.GOOGLE_PRIVATE_KEY;

  if (!email || !privateKey) {
    throw new Error("Missing Google service account environment variables.");
  }

  const now = Math.floor(Date.now() / 1000);
  const header = { alg: "RS256", typ: "JWT" };
  const claimSet = {
    iss: email,
    scope: "https://www.googleapis.com/auth/spreadsheets",
    aud: "https://oauth2.googleapis.com/token",
    exp: now + 3600,
    iat: now
  };

  const unsignedJwt = `${base64Url(JSON.stringify(header))}.${base64Url(JSON.stringify(claimSet))}`;
  const signature = crypto
    .createSign("RSA-SHA256")
    .update(unsignedJwt)
    .sign(normalizePrivateKey(privateKey));
  const assertion = `${unsignedJwt}.${base64Url(signature)}`;

  const response = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
      assertion
    })
  });

  const result = await response.json();
  if (!response.ok) {
    throw new Error(result.error_description || result.error || "Google auth failed.");
  }

  return result.access_token;
}

async function appendToSheet(lead, req) {
  const token = await getGoogleAccessToken();
  const timestamp = new Date().toLocaleString("vi-VN", {
    timeZone: "Asia/Ho_Chi_Minh",
    hour12: false
  });
  const range = encodeURIComponent(`${SHEET_NAME}!A:M`);
  const url = `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${range}:append?valueInputOption=USER_ENTERED&insertDataOption=INSERT_ROWS`;

  const values = [[
    timestamp,
    lead.fullName,
    lead.businessName,
    lead.phone,
    lead.email,
    lead.location,
    lead.businessType,
    lead.currentPage,
    lead.goal,
    lead.budget,
    lead.message,
    req.headers.referer || "",
    req.headers["user-agent"] || ""
  ]];

  const response = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ values })
  });

  const result = await response.json();
  if (!response.ok) {
    throw new Error(result.error?.message || "Google Sheets append failed.");
  }

  return result;
}

async function sendTelegram(lead) {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  if (!token) {
    throw new Error("Missing Telegram bot token.");
  }

  const text = [
    "Lead mới từ website VBeauty Agency",
    "",
    `Họ tên: ${lead.fullName}`,
    `Spa/Salon: ${lead.businessName}`,
    `SĐT/Zalo: ${lead.phone}`,
    `Email: ${lead.email}`,
    `Khu vực: ${lead.location}`,
    `Loại hình: ${lead.businessType}`,
    `Website/Facebook: ${lead.currentPage}`,
    `Mục tiêu: ${lead.goal}`,
    `Ngân sách: ${lead.budget}`,
    `Ghi chú: ${lead.message || "-"}`
  ].join("\n");

  const response = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      chat_id: TELEGRAM_CHAT_ID,
      text,
      disable_web_page_preview: true
    })
  });

  const result = await response.json();
  if (!response.ok || !result.ok) {
    throw new Error(result.description || "Telegram send failed.");
  }

  return result;
}

module.exports = async function handler(req, res) {
  if (req.method === "OPTIONS") {
    res.setHeader("Allow", "POST, OPTIONS");
    return json(res, 204, {});
  }

  if (req.method !== "POST") {
    res.setHeader("Allow", "POST, OPTIONS");
    return json(res, 405, { ok: false, message: "Method not allowed." });
  }

  try {
    const rawBody = parseBody(req);
    const lead = {
      fullName: clean(rawBody.fullName, 120),
      businessName: clean(rawBody.businessName, 160),
      phone: clean(rawBody.phone, 60),
      email: clean(rawBody.email, 160),
      location: clean(rawBody.location, 160),
      businessType: clean(rawBody.businessType, 120),
      currentPage: clean(rawBody.currentPage, 500),
      goal: clean(rawBody.goal, 200),
      budget: clean(rawBody.budget, 120),
      message: clean(rawBody.message, 1200)
    };

    const missing = requiredFields.filter((field) => !lead[field]);
    if (missing.length) {
      return json(res, 400, {
        ok: false,
        message: "Vui lòng điền đầy đủ thông tin bắt buộc.",
        missing
      });
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(lead.email)) {
      return json(res, 400, { ok: false, message: "Email không hợp lệ." });
    }

    if (!process.env.TELEGRAM_BOT_TOKEN) {
      throw new Error("Missing Telegram bot token.");
    }

    await appendToSheet(lead, req);

    let telegramSent = true;
    try {
      await sendTelegram(lead);
    } catch (error) {
      telegramSent = false;
      console.error("Telegram notification failed:", error.message);
    }

    return json(res, 200, {
      ok: true,
      telegramSent,
      message: "Cảm ơn bạn! VBeauty Agency đã nhận được thông tin và sẽ liên hệ lại trong thời gian sớm nhất."
    });
  } catch (error) {
    console.error("Lead submission failed:", error.message);
    return json(res, 500, {
      ok: false,
      message: "Biểu mẫu chưa gửi được. Vui lòng thử lại sau."
    });
  }
};
