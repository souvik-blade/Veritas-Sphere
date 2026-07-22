export const LOGO_URL = "/images/veritas-logo.jpg";

export const WHATSAPP_NUMBERS = [
  { label: "+91 94661 45196", number: "919466145196" },
];

export const GOOGLE_SHEET_URL =
  process.env.REACT_APP_GOOGLE_SHEET_URL ||
  "https://script.google.com/macros/s/AKfycbySBtOBiigCcMON-rrbT5-kBnSqcJtUvsIbkvZKs-lkMJUiI_WzM0gt4lKV3dMyBmwX/exec";

export const saveToGoogleSheet = async (data) => {
  if (!GOOGLE_SHEET_URL) return;
  try {
    const params = new URLSearchParams();
    params.append("timestamp", new Date().toLocaleString("en-IN"));
    Object.keys(data).forEach((key) => {
      if (data[key] !== undefined && data[key] !== null) {
        params.append(key, String(data[key]));
      }
    });

    await fetch(GOOGLE_SHEET_URL, {
      method: "POST",
      mode: "no-cors",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: params.toString(),
    });
  } catch (err) {
    console.warn("Google Sheet submission note:", err);
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
