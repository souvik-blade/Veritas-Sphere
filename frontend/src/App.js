import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "sonner";
import Layout from "@/components/Layout";
import Home from "@/pages/Home";
import Services from "@/pages/Services";
import Apostille from "@/pages/Apostille";
import Scholarships from "@/pages/Scholarships";
import Notice from "@/pages/Notice";
import Alumni from "@/pages/Alumni";
import About from "@/pages/About";
import Contact from "@/pages/Contact";
import Consultation from "@/pages/Consultation";
import AdditionalServices from "@/pages/AdditionalServices";
import Terms from "@/pages/Terms";
import Flipbook from "@/pages/Flipbook";

export default function App() {
  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <Toaster position="top-right" richColors />
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<Services />} />
          <Route path="/apostille" element={<Apostille />} />
          <Route path="/scholarships" element={<Scholarships />} />
          <Route path="/notice" element={<Notice />} />
          <Route path="/alumni" element={<Alumni />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/consultation" element={<Consultation />} />
          <Route path="/additional-services" element={<AdditionalServices />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/flipbook" element={<Flipbook />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
