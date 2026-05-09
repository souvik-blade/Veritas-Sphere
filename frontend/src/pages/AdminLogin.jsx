import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { ArrowRight, Lock, Shield } from "lucide-react";
import { api, LOGO_URL } from "@/lib/config";

export default function AdminLogin() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await api.post("/auth/login", form);
      localStorage.setItem("vs_token", data.token);
      localStorage.setItem("vs_admin", JSON.stringify({ email: data.email, name: data.name }));
      toast.success("Welcome back");
      navigate("/admin");
    } catch (err) {
      toast.error(err?.response?.data?.detail || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      <div className="bg-brand text-white relative overflow-hidden hidden lg:block">
        <div className="absolute inset-0 grain opacity-25" />
        <div className="relative h-full flex flex-col justify-between p-12">
          <div className="flex items-center gap-3">
            <img src={LOGO_URL} alt="Veritas" className="w-14 h-14 rounded-xl object-contain bg-white p-1.5 ring-2 ring-white/40" />
            <div className="font-display font-extrabold text-xl">Veritas Sphere</div>
          </div>
          <div>
            <div className="font-display text-5xl font-black leading-[1.05] tracking-tight">
              Admin Console
            </div>
            <p className="text-white/80 mt-5 max-w-md">
              Manage all bookings, scholarship applications, apostille orders and contact messages in one place.
            </p>
            <ul className="mt-8 space-y-2 text-white/85 text-sm">
              <li className="flex items-center gap-2"><Shield size={16} /> JWT-secured · Tokens expire in 24h</li>
              <li className="flex items-center gap-2"><Shield size={16} /> Update statuses & export CSV instantly</li>
            </ul>
          </div>
          <div className="text-white/60 text-xs">© Veritas Sphere</div>
        </div>
      </div>

      <div className="grid place-items-center p-8 bg-brand-cream">
        <form onSubmit={onSubmit} className="w-full max-w-md bg-white rounded-3xl p-8 lg:p-10 border border-brand-line shadow-lg" data-testid="admin-login-form">
          <div className="w-12 h-12 rounded-xl bg-brand/10 text-brand grid place-items-center"><Lock size={22} strokeWidth={1.6} /></div>
          <div className="font-display text-3xl font-extrabold mt-6 text-brand-ink">Sign in</div>
          <p className="text-brand-muted text-sm mt-1">Use your admin credentials.</p>

          <div className="mt-7 space-y-4">
            <div>
              <label className="block text-[12px] uppercase tracking-[0.16em] text-brand-muted font-semibold mb-1.5">Email</label>
              <input data-testid="admin-email" type="email" required className="input-soft" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="admin@…" />
            </div>
            <div>
              <label className="block text-[12px] uppercase tracking-[0.16em] text-brand-muted font-semibold mb-1.5">Password</label>
              <input data-testid="admin-password" type="password" required className="input-soft" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} placeholder="••••••••" />
            </div>
          </div>

          <button type="submit" disabled={loading} className="btn-brand mt-7 w-full inline-flex items-center justify-center gap-2 disabled:opacity-60" data-testid="admin-login-submit">
            {loading ? "Signing in…" : (<>Sign in <ArrowRight size={18} strokeWidth={1.7} /></>)}
          </button>
        </form>
      </div>
    </div>
  );
}
