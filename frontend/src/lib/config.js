import axios from "axios";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
export const API = `${BACKEND_URL}/api`;

export const api = axios.create({ baseURL: API });

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("vs_token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export const LOGO_URL =
  "https://customer-assets.emergentagent.com/job_1e2fbffe-2a58-4393-95e1-1619caba1104/artifacts/n4whf5t2_veritas%20logo.jpeg";

export const WHATSAPP_NUMBERS = [
  { label: "+91 80074 86195", number: "918007486195" },
  { label: "+91 87001 61753", number: "918700161753" },
];

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
