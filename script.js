const messages = {
  vi: {
    fullName: "Vui lòng nhập họ và tên.",
    businessName: "Vui lòng nhập tên spa / salon.",
    phone: "Vui lòng nhập số điện thoại hoặc Zalo hợp lệ.",
    email: "Vui lòng nhập email hợp lệ.",
    location: "Vui lòng nhập thành phố hoặc khu vực.",
    businessType: "Vui lòng chọn loại hình kinh doanh.",
    currentPageRequired: "Vui lòng nhập website hoặc Facebook hiện tại.",
    currentPageUrl: "Vui lòng nhập liên kết bắt đầu bằng https:// hoặc http://.",
    goal: "Vui lòng chọn mục tiêu hiện tại.",
    budget: "Vui lòng nhập ngân sách dự kiến.",
    sending: "Đang gửi...",
    success: "Cảm ơn bạn! VBeauty Agency đã nhận được thông tin và sẽ liên hệ lại trong thời gian sớm nhất.",
    error: "Xin lỗi, biểu mẫu chưa gửi được. Vui lòng thử lại hoặc liên hệ trực tiếp qua điện thoại/Zalo."
  },
  en: {
    fullName: "Please enter your full name.",
    businessName: "Please enter your spa or salon name.",
    phone: "Please enter a valid phone or Zalo number.",
    email: "Please enter a valid email address.",
    location: "Please enter your city or area.",
    businessType: "Please choose a business type.",
    currentPageRequired: "Please enter your current website or Facebook page.",
    currentPageUrl: "Please enter a link starting with https:// or http://.",
    goal: "Please choose your current goal.",
    budget: "Please enter your estimated budget.",
    sending: "Sending...",
    success: "Thank you! VBeauty Agency has received your details and will contact you soon.",
    error: "Sorry, the form could not be sent. Please try again or contact us directly by phone/Zalo."
  }
};

const getLang = () => document.documentElement.dataset.lang || "vi";

const syncLanguageFields = (lang) => {
  const title = document.querySelector("title[data-vi][data-en]");
  if (title) document.title = title.dataset[lang] || title.textContent;

  document.querySelectorAll("option[data-vi][data-en]").forEach((option) => {
    option.textContent = option.dataset[lang] || option.textContent;
  });

  document.querySelectorAll("[data-placeholder-vi][data-placeholder-en]").forEach((field) => {
    const value = lang === "en" ? field.dataset.placeholderEn : field.dataset.placeholderVi;
    if (value) field.placeholder = value;
  });
};

const setLanguage = (lang) => {
  const nextLang = lang === "en" ? "en" : "vi";
  document.documentElement.dataset.lang = nextLang;
  document.documentElement.lang = nextLang;
  localStorage.setItem("vbeauty-lang", nextLang);
  syncLanguageFields(nextLang);
  document.querySelectorAll("[data-set-lang]").forEach((button) => {
    button.setAttribute("aria-pressed", String(button.dataset.setLang === nextLang));
  });
};

const setupLanguage = () => {
  const saved = localStorage.getItem("vbeauty-lang");
  setLanguage(saved || document.documentElement.dataset.lang || "vi");
  document.querySelectorAll("[data-set-lang]").forEach((button) => {
    button.addEventListener("click", () => setLanguage(button.dataset.setLang));
  });
};

const setupNavigation = () => {
  const toggle = document.querySelector(".menu-toggle");
  const nav = document.querySelector("#main-nav");
  if (!toggle || !nav) return;

  toggle.addEventListener("click", () => {
    const isOpen = document.body.classList.toggle("nav-open");
    toggle.setAttribute("aria-expanded", String(isOpen));
  });

  nav.addEventListener("click", (event) => {
    if (event.target.closest("a")) {
      document.body.classList.remove("nav-open");
      toggle.setAttribute("aria-expanded", "false");
    }
  });
};

const validators = {
  fullName: (value, lang) => value.trim().length >= 2 || messages[lang].fullName,
  businessName: (value, lang) => value.trim().length >= 2 || messages[lang].businessName,
  phone: (value, lang) => /^[0-9+\s().-]{8,}$/.test(value.trim()) || messages[lang].phone,
  email: (value, lang) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim()) || messages[lang].email,
  location: (value, lang) => value.trim().length >= 2 || messages[lang].location,
  businessType: (value, lang) => value !== "" || messages[lang].businessType,
  currentPage: (value, lang) => {
    if (!value.trim()) return messages[lang].currentPageRequired;
    try {
      new URL(value.trim());
      return true;
    } catch {
      return messages[lang].currentPageUrl;
    }
  },
  goal: (value, lang) => value !== "" || messages[lang].goal,
  budget: (value, lang) => value.trim().length >= 2 || messages[lang].budget
};

const setFieldError = (field, message) => {
  const wrapper = field.closest("label");
  const error = wrapper?.querySelector(".field-error");
  if (!wrapper || !error) return;
  wrapper.classList.toggle("has-error", Boolean(message));
  error.textContent = message || "";
};

const setupForm = () => {
  const form = document.querySelector("#booking-form");
  if (!form) return;

  const success = document.querySelector("#form-success");
  const submit = form.querySelector(".form-submit");
  if (!success || !submit) return;

  const submitDefault = submit.innerHTML;

  const validateField = (field) => {
    const validator = validators[field.name];
    if (!validator) return true;
    const result = validator(field.value, getLang());
    setFieldError(field, result === true ? "" : result);
    return result === true;
  };

  form.querySelectorAll("input, select, textarea").forEach((field) => {
    field.addEventListener("blur", () => validateField(field));
    field.addEventListener("input", () => {
      if (field.closest("label")?.classList.contains("has-error")) validateField(field);
    });
  });

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    success.classList.remove("is-visible", "is-error");

    const fields = Array.from(form.querySelectorAll("input, select, textarea"));
    const isValid = fields.map(validateField).every(Boolean);

    if (!isValid) {
      form.querySelector(".has-error input, .has-error select, .has-error textarea")?.focus();
      return;
    }

    const lang = getLang();
    const payload = Object.fromEntries(new FormData(form).entries());
    form.querySelectorAll("select").forEach((select) => {
      const selected = select.options[select.selectedIndex];
      payload[select.name] = selected?.textContent.trim() || select.value;
    });
    payload.language = lang;

    submit.disabled = true;
    submit.textContent = messages[lang].sending;

    try {
      const response = await fetch(form.dataset.endpoint || "/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      const result = await response.json().catch(() => ({}));

      if (!response.ok || !result.ok) {
        throw new Error(result.message || "SUBMIT_FAILED");
      }

      form.reset();
      fields.forEach((field) => setFieldError(field, ""));
      success.textContent = result.message || messages[lang].success;
      success.classList.add("is-visible");
    } catch (error) {
      success.textContent = messages[lang].error;
      success.classList.add("is-visible", "is-error");
    } finally {
      submit.disabled = false;
      submit.innerHTML = submitDefault;
    }
  });
};

const setupReveal = () => {
  const elements = document.querySelectorAll(".reveal");
  if (!elements.length) return;

  if (!("IntersectionObserver" in window)) {
    elements.forEach((element) => element.classList.add("in"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -50px 0px" }
  );

  elements.forEach((element) => observer.observe(element));
};

document.addEventListener("DOMContentLoaded", () => {
  setupLanguage();
  setupNavigation();
  setupForm();
  setupReveal();
});
