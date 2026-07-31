export const LOGO_URL = "/images/veritas-logo.jpg";

export const WHATSAPP_NUMBERS = [
  { label: "+91 94661 45196", number: "919466145196" },
];

export const FORM_SUBMIT_EMAIL =
  process.env.REACT_APP_FORM_SUBMIT_EMAIL || "veritassphere26@gmail.com";

export const saveToGoogleSheet = async (data) => {
  if (!FORM_SUBMIT_EMAIL) return;
  try {
    const payload = {
      _subject: `New Inquiry: ${data.form_type || "Website Form"}`,
      _template: "table",
      _captcha: "false",
      Submitted_At: new Date().toLocaleString("en-IN"),
      ...data,
    };

    await fetch(`https://formsubmit.co/ajax/${FORM_SUBMIT_EMAIL}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(payload),
    });
  } catch (err) {
    console.warn("Form submission note:", err);
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
