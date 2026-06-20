const problems = [
  "Có nhiều người hỏi giá nhưng không đặt lịch",
  "Fanpage có tương tác nhưng không ra khách đều",
  "Website hoặc trang đặt lịch chưa chuyên nghiệp",
  "Không biết lead nào đã gọi, đã đặt lịch, đã đến thật",
  "Chạy quảng cáo nhưng không đo được hiệu quả",
  "Nhân viên phản hồi chậm làm mất khách tiềm năng"
];

const solutionSteps = [
  {
    title: "Phân tích dịch vụ & khách hàng mục tiêu của spa",
    text: "Xác định dịch vụ chủ lực, khu vực, nhóm khách phù hợp và ưu đãi nên dùng để kéo lead chất lượng."
  },
  {
    title: "Tạo landing page/website đặt lịch chuyên nghiệp",
    text: "Xây dựng trang giới thiệu dịch vụ, bằng chứng tin cậy, form đặt lịch và nội dung phù hợp với ngành beauty."
  },
  {
    title: "Chạy Facebook & Instagram Ads để kéo lead",
    text: "Thiết lập chiến dịch quảng cáo tập trung vào nhu cầu thật, khu vực phù hợp và hành động đặt lịch."
  },
  {
    title: "Theo dõi lead, booking và tối ưu hàng tuần",
    text: "Ghi nhận trạng thái từng lead để biết quảng cáo, trang đích và quy trình tư vấn đang hiệu quả đến đâu."
  }
];

const services = [
  {
    title: "Facebook & Instagram Ads cho Spa",
    text: "Chiến dịch quảng cáo hướng đến khách có nhu cầu chăm sóc da, nail, tóc và dịch vụ beauty không xâm lấn."
  },
  {
    title: "Landing Page / Website Đặt Lịch",
    text: "Trang đích sạch, đẹp, rõ ưu đãi, có form thu lead và trải nghiệm phù hợp trên điện thoại."
  },
  {
    title: "Form Thu Lead & Lọc Khách Hàng",
    text: "Biểu mẫu hỏi đúng thông tin để đội ngũ tư vấn ưu tiên khách có khả năng đặt lịch cao hơn."
  },
  {
    title: "Google Sheet / CRM Theo Dõi Lead",
    text: "Theo dõi nguồn lead, trạng thái liên hệ, lịch hẹn, khách đến thật và ghi chú chăm sóc."
  },
  {
    title: "Kịch Bản Tư Vấn & Follow-up",
    text: "Gợi ý cách nhắn tin, gọi điện và chăm sóc lại để giảm thất thoát khách tiềm năng."
  },
  {
    title: "Báo Cáo Hiệu Quả Hàng Tuần",
    text: "Báo cáo dễ hiểu về số lead, chi phí, trạng thái xử lý và đề xuất tối ưu trong tuần tiếp theo."
  }
];

const businessTypes = [
  "Spa chăm sóc da / facial spa",
  "Gội dưỡng sinh",
  "Nail salon",
  "Hair salon",
  "Beauty salon",
  "Massage thư giãn",
  "Dịch vụ chăm sóc sắc đẹp không xâm lấn"
];

const processSteps = [
  "Tư vấn miễn phí",
  "Phân tích spa và dịch vụ chính",
  "Tạo landing page/booking form",
  "Thiết lập quảng cáo Facebook/Instagram",
  "Theo dõi lead và booking",
  "Báo cáo & tối ưu hàng tuần"
];

const metrics = [
  "Số lượng lead",
  "Chi phí mỗi lead",
  "Số người đã liên hệ",
  "Số lịch hẹn được đặt",
  "Số khách đến thật",
  "Doanh thu ghi nhận từ lead",
  "Dịch vụ chốt tốt nhất"
];

const pilotItems = [
  "Thiết lập landing page/booking form",
  "Thiết lập Facebook/Instagram Ads",
  "Tạo form lọc lead",
  "Tạo Google Sheet theo dõi lead",
  "Kịch bản follow-up cho nhân viên",
  "Báo cáo hàng tuần"
];

const faqs = [
  {
    question: "Viet Beauty Agency có phù hợp với spa nhỏ không?",
    answer: "Có. Nếu spa có dịch vụ rõ ràng, khu vực phục vụ cụ thể và có người phản hồi khách đều đặn, chúng tôi có thể bắt đầu bằng gói test nhỏ để kiểm tra hệ thống trước."
  },
  {
    question: "Tôi chưa có website thì có chạy quảng cáo được không?",
    answer: "Có. Chúng tôi có thể tạo landing page hoặc website đặt lịch trước, sau đó dùng trang này làm điểm đến cho quảng cáo và form thu lead."
  },
  {
    question: "Bao lâu thì có thể bắt đầu thấy lead?",
    answer: "Thông thường sau khi hoàn tất landing page, form và quảng cáo, chiến dịch có thể bắt đầu ghi nhận lead trong vài ngày đầu. Việc tối ưu chất lượng lead cần theo dõi liên tục trong 14–30 ngày."
  },
  {
    question: "Ngân sách quảng cáo tối thiểu là bao nhiêu?",
    answer: "Ngân sách phù hợp phụ thuộc vào thành phố, dịch vụ, mức cạnh tranh và mục tiêu số lead. Trong buổi tư vấn, chúng tôi sẽ đề xuất mức test hợp lý theo tình hình của spa."
  },
  {
    question: "Tôi có cần tự trả lời khách không?",
    answer: "Spa vẫn cần có người phản hồi khách vì tốc độ tư vấn ảnh hưởng lớn đến tỷ lệ đặt lịch. Chúng tôi hỗ trợ form, tracking và kịch bản follow-up để quy trình dễ quản lý hơn."
  },
  {
    question: "Agency có cam kết doanh thu không?",
    answer: "Chúng tôi không cam kết doanh thu vì kết quả còn phụ thuộc vào dịch vụ, giá, quy trình tư vấn và khả năng chốt lịch của spa. Tuy nhiên, chúng tôi cam kết xây dựng hệ thống đo lường rõ ràng và tối ưu để tạo ra lead đủ điều kiện."
  }
];

const createElement = (tag, className, text) => {
  const element = document.createElement(tag);
  if (className) element.className = className;
  if (text) element.textContent = text;
  return element;
};

const renderProblems = () => {
  const container = document.querySelector("#problem-list");
  problems.forEach((problem, index) => {
    const card = createElement("article", "info-card");
    const icon = createElement("span", "card-icon", String(index + 1).padStart(2, "0"));
    icon.setAttribute("aria-hidden", "true");
    const text = createElement("p", "", problem);
    card.append(icon, text);
    container.appendChild(card);
  });
};

const renderSolutionSteps = () => {
  const container = document.querySelector("#solution-steps");
  solutionSteps.forEach((step, index) => {
    const item = createElement("article", "step-item");
    const number = createElement("span", "step-number", String(index + 1));
    number.setAttribute("aria-hidden", "true");
    const content = createElement("div");
    content.append(createElement("h3", "", step.title), createElement("p", "", step.text));
    item.append(number, content);
    container.appendChild(item);
  });
};

const renderServices = () => {
  const container = document.querySelector("#service-list");
  services.forEach((service) => {
    const card = createElement("article", "service-card");
    card.append(createElement("strong", "", service.title), createElement("p", "", service.text));
    container.appendChild(card);
  });
};

const renderBusinessTypes = () => {
  const container = document.querySelector("#business-list");
  businessTypes.forEach((item) => {
    container.appendChild(createElement("div", "check-item", item));
  });
};

const renderProcess = () => {
  const container = document.querySelector("#process-list");
  processSteps.forEach((step, index) => {
    const item = createElement("article", "process-item");
    const number = createElement("span", "process-number", String(index + 1));
    number.setAttribute("aria-hidden", "true");
    item.append(number, createElement("h3", "", step));
    container.appendChild(item);
  });
};

const renderMetrics = () => {
  const container = document.querySelector("#metric-list");
  metrics.forEach((metric) => {
    const card = createElement("article", "metric-card");
    card.append(createElement("strong", "", metric), createElement("p", "", "Được ghi nhận để biết chiến dịch đang tạo ra kết quả ở bước nào."));
    container.appendChild(card);
  });
};

const renderPilot = () => {
  const container = document.querySelector("#pilot-list");
  pilotItems.forEach((item) => {
    container.appendChild(createElement("li", "", item));
  });
};

const renderFaq = () => {
  const container = document.querySelector("#faq-list");
  faqs.forEach((faq, index) => {
    const item = createElement("article", "faq-item");
    if (index === 0) item.classList.add("is-open");

    const button = createElement("button", "faq-question");
    button.type = "button";
    button.setAttribute("aria-expanded", index === 0 ? "true" : "false");
    button.innerHTML = `<strong>${faq.question}</strong><span aria-hidden="true">${index === 0 ? "-" : "+"}</span>`;

    const answer = createElement("div", "faq-answer", faq.answer);
    button.addEventListener("click", () => {
      const isOpen = item.classList.toggle("is-open");
      button.setAttribute("aria-expanded", String(isOpen));
      button.querySelector("span").textContent = isOpen ? "-" : "+";
    });

    item.append(button, answer);
    container.appendChild(item);
  });
};

const setupNavigation = () => {
  const toggle = document.querySelector(".nav-toggle");
  const nav = document.querySelector("#main-nav");

  toggle.addEventListener("click", () => {
    const isOpen = document.body.classList.toggle("nav-open");
    toggle.setAttribute("aria-expanded", String(isOpen));
    toggle.setAttribute("aria-label", isOpen ? "Đóng menu" : "Mở menu");
  });

  nav.addEventListener("click", (event) => {
    if (event.target.matches("a")) {
      document.body.classList.remove("nav-open");
      toggle.setAttribute("aria-expanded", "false");
      toggle.setAttribute("aria-label", "Mở menu");
    }
  });
};

const validators = {
  fullName: (value) => value.trim().length >= 2 || "Vui lòng nhập họ và tên.",
  businessName: (value) => value.trim().length >= 2 || "Vui lòng nhập tên spa / salon.",
  phone: (value) => /^[0-9+\s().-]{8,}$/.test(value.trim()) || "Vui lòng nhập số điện thoại hoặc Zalo hợp lệ.",
  email: (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim()) || "Vui lòng nhập email hợp lệ.",
  location: (value) => value.trim().length >= 2 || "Vui lòng nhập thành phố hoặc khu vực.",
  businessType: (value) => value !== "" || "Vui lòng chọn loại hình kinh doanh.",
  currentPage: (value) => {
    if (!value.trim()) return "Vui lòng nhập website hoặc Facebook hiện tại.";
    try {
      new URL(value.trim());
      return true;
    } catch {
      return "Vui lòng nhập liên kết bắt đầu bằng https:// hoặc http://.";
    }
  },
  goal: (value) => value !== "" || "Vui lòng chọn mục tiêu hiện tại.",
  budget: (value) => value.trim().length >= 2 || "Vui lòng nhập ngân sách dự kiến."
};

const setFieldError = (field, message) => {
  const wrapper = field.closest("label");
  const error = wrapper.querySelector(".field-error");
  wrapper.classList.toggle("has-error", Boolean(message));
  error.textContent = message || "";
};

const setupForm = () => {
  const form = document.querySelector("#booking-form");
  const success = document.querySelector("#form-success");

  const validateField = (field) => {
    const validator = validators[field.name];
    if (!validator) return true;
    const result = validator(field.value);
    setFieldError(field, result === true ? "" : result);
    return result === true;
  };

  form.querySelectorAll("input, select, textarea").forEach((field) => {
    field.addEventListener("blur", () => validateField(field));
    field.addEventListener("input", () => {
      if (field.closest("label").classList.contains("has-error")) validateField(field);
    });
  });

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    success.classList.remove("is-visible");

    const fields = Array.from(form.querySelectorAll("input, select, textarea"));
    const validationResults = fields.map(validateField);
    const isValid = validationResults.every(Boolean);

    if (!isValid) {
      const firstError = form.querySelector(".has-error input, .has-error select, .has-error textarea");
      firstError?.focus();
      return;
    }

    const payload = Object.fromEntries(new FormData(form).entries());
    form.dataset.latestSubmission = JSON.stringify(payload);
    form.reset();
    fields.forEach((field) => setFieldError(field, ""));
    success.textContent = "Cảm ơn bạn! Viet Beauty Agency đã nhận được thông tin và sẽ liên hệ lại trong thời gian sớm nhất.";
    success.classList.add("is-visible");
  });
};

document.addEventListener("DOMContentLoaded", () => {
  renderProblems();
  renderSolutionSteps();
  renderServices();
  renderBusinessTypes();
  renderProcess();
  renderMetrics();
  renderPilot();
  renderFaq();
  setupNavigation();
  setupForm();
});
