export const LOGO_URL = "/images/veritas-logo.jpg";

export const WHATSAPP_NUMBERS = [
  { label: "+91 94661 45196", number: "919466145196" },
];

export const GOOGLE_SHEET_URL =
  process.env.REACT_APP_GOOGLE_SHEET_URL ||
  "https://script.google.com/macros/s/AKfycbySBtOBiigCcMON-rrbT5-kBnSqcJtUvsIbkvZKs-lkMJUiI_WzM0gt4lKV3dMyBmwX/exec";

export const FORM_SUBMIT_EMAIL =
  process.env.REACT_APP_FORM_SUBMIT_EMAIL || "veritassphere26@gmail.com";

export const saveToGoogleSheet = async (data) => {
  const payload = {
    Submitted_At: new Date().toLocaleString("en-IN"),
    ...data,
  };

  // 1. Send Email alert via FormSubmit (No backend)
  if (FORM_SUBMIT_EMAIL) {
    try {
      fetch(`https://formsubmit.co/ajax/${FORM_SUBMIT_EMAIL}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          _subject: `New Inquiry: ${data.form_type || "Website Form"}`,
          _template: "table",
          _captcha: "false",
          ...payload,
        }),
      }).catch((err) => console.warn("Email alert submission note:", err));
    } catch (err) {
      console.warn("Email alert error:", err);
    }
  }

  // 2. Send to Google Sheet via Apps Script URL
  if (GOOGLE_SHEET_URL) {
    try {
      const params = new URLSearchParams();
      Object.keys(payload).forEach((key) => {
        if (payload[key] !== undefined && payload[key] !== null) {
          params.append(key, String(payload[key]));
        }
      });

      fetch(GOOGLE_SHEET_URL, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: params.toString(),
      }).catch((err) => console.warn("Google Sheet submission note:", err));
    } catch (err) {
      console.warn("Google Sheet error:", err);
    }
  }
};

export const PACKAGES = [
  { value: "PS_SOP", label: "Personal Statement / SOP", price: 999 },
  { value: "SP", label: "Study Plan (SP)", price: 799 },
  { value: "BOTH", label: "PS/SOP + SP (Combo)", price: 1499 },
  { value: "GUIDANCE", label: "Scholarship Guidance", price: 399 },
  { value: "CONSULTANCY", label: "Consultancy", price: 349 },
  { value: "ADMISSION", label: "Admission & Application", price: 549 },
  { value: "MINI", label: "Mini Package", price: 1299 },
  { value: "FULL", label: "Full Package", price: 2799 },
];
