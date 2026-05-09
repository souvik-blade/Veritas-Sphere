import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { LogOut, RefreshCw, Download, Inbox, Briefcase, GraduationCap, Stamp, MessageSquare, Search } from "lucide-react";
import { api, API, LOGO_URL } from "@/lib/config";

const TABS = [
  { key: "bookings", label: "Bookings", icon: Briefcase, idField: "id" },
  { key: "applications", label: "Applications", icon: GraduationCap, idField: "id" },
  { key: "apostille", label: "Apostille Orders", icon: Stamp, idField: "id" },
  { key: "messages", label: "Messages", icon: MessageSquare, idField: "id" },
];

const STATUSES = ["pending", "in_progress", "completed", "cancelled"];

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [admin, setAdmin] = useState(null);
  const [stats, setStats] = useState({ bookings: 0, applications: 0, apostille: 0, messages: 0 });
  const [tab, setTab] = useState("bookings");
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  const [q, setQ] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("vs_token");
    if (!token) {
      navigate("/admin/login");
      return;
    }
    setAdmin(JSON.parse(localStorage.getItem("vs_admin") || "{}"));
    fetchStats();
  }, []); // eslint-disable-line

  useEffect(() => {
    fetchList();
  }, [tab, filter]); // eslint-disable-line

  const fetchStats = async () => {
    try {
      const { data } = await api.get("/admin/stats");
      setStats(data);
    } catch (e) {
      if (e?.response?.status === 401) doLogout();
    }
  };

  const fetchList = async () => {
    setLoading(true);
    try {
      const params = filter !== "all" ? { status_filter: filter } : {};
      const { data } = await api.get(`/admin/${tab}`, { params });
      setItems(data.items || []);
    } catch (e) {
      if (e?.response?.status === 401) {
        doLogout();
      } else {
        toast.error("Failed to load");
      }
    } finally {
      setLoading(false);
    }
  };

  const doLogout = () => {
    localStorage.removeItem("vs_token");
    localStorage.removeItem("vs_admin");
    navigate("/admin/login");
  };

  const updateStatus = async (id, status) => {
    try {
      await api.patch(`/admin/${tab}/${id}/status`, { status });
      toast.success(`Status updated → ${status}`);
      fetchList();
      fetchStats();
    } catch {
      toast.error("Could not update status");
    }
  };

  const exportCsv = async () => {
    try {
      const token = localStorage.getItem("vs_token");
      const res = await fetch(`${API}/admin/${tab}/export.csv`, { headers: { Authorization: `Bearer ${token}` } });
      if (!res.ok) throw new Error("err");
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `veritas_${tab}.csv`;
      a.click();
      URL.revokeObjectURL(url);
    } catch {
      toast.error("Export failed");
    }
  };

  const filtered = useMemo(() => {
    if (!q) return items;
    const ql = q.toLowerCase();
    return items.filter((it) => Object.values(it).some((v) => String(v).toLowerCase().includes(ql)));
  }, [items, q]);

  return (
    <div className="min-h-screen bg-brand-cream">
      {/* Header */}
      <header className="bg-white border-b border-brand-line sticky top-0 z-30" data-testid="admin-header">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 h-[70px] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src={LOGO_URL} alt="Veritas" className="w-10 h-10 rounded-lg object-cover ring-2 ring-brand/30" />
            <div>
              <div className="font-display font-extrabold text-brand-ink">Admin Console</div>
              <div className="text-[11px] uppercase tracking-[0.18em] text-brand-muted">Veritas Sphere</div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="hidden sm:block text-right">
              <div className="text-sm font-semibold text-brand-ink">{admin?.name || "Admin"}</div>
              <div className="text-xs text-brand-muted">{admin?.email}</div>
            </div>
            <button onClick={doLogout} className="px-4 py-2 rounded-full text-sm border border-brand-line hover:border-brand inline-flex items-center gap-2 text-brand-ink" data-testid="admin-logout">
              <LogOut size={15} /> Sign out
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-10">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {TABS.map((t) => (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              className={`text-left p-5 rounded-2xl border transition-all ${
                tab === t.key ? "bg-brand text-white border-transparent shadow-[0_18px_40px_-18px_rgba(236,92,83,0.55)]" : "bg-white border-brand-line text-brand-ink hover:border-brand"
              }`}
              data-testid={`stat-${t.key}`}
            >
              <div className="flex items-center justify-between">
                <div className={`w-10 h-10 rounded-xl grid place-items-center ${tab === t.key ? "bg-white/20 text-white" : "bg-brand/10 text-brand"}`}>
                  <t.icon size={18} strokeWidth={1.7} />
                </div>
                <div className={`text-[11px] uppercase tracking-[0.16em] ${tab === t.key ? "text-white/80" : "text-brand-muted"}`}>{t.label}</div>
              </div>
              <div className="font-display text-4xl font-black mt-3">{stats[t.key] ?? 0}</div>
            </button>
          ))}
        </div>

        {/* Toolbar */}
        <div className="mt-8 flex flex-col lg:flex-row gap-3 lg:items-center lg:justify-between">
          <div className="flex flex-wrap gap-2">
            {["all", ...STATUSES].map((s) => (
              <button
                key={s}
                onClick={() => setFilter(s)}
                className={`text-xs px-3 py-1.5 rounded-full border transition ${
                  filter === s ? "bg-brand-ink text-white border-brand-ink" : "bg-white text-brand-ink/80 border-brand-line hover:border-brand"
                }`}
                data-testid={`filter-${s}`}
              >
                {s.replace("_", " ")}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search size={15} className="absolute left-3 top-3 text-brand-muted" />
              <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search…" className="input-soft !py-2 !pl-9 !text-sm w-64" data-testid="admin-search" />
            </div>
            <button onClick={fetchList} className="px-4 py-2 rounded-full text-sm border border-brand-line hover:border-brand inline-flex items-center gap-2 text-brand-ink" data-testid="admin-refresh">
              <RefreshCw size={14} /> Refresh
            </button>
            <button onClick={exportCsv} className="btn-brand text-sm py-2 px-4 inline-flex items-center gap-2" data-testid="admin-export">
              <Download size={14} /> Export CSV
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="mt-6 rounded-3xl bg-white border border-brand-line overflow-hidden" data-testid="admin-table-wrap">
          {loading ? (
            <div className="p-10 text-center text-brand-muted">Loading…</div>
          ) : filtered.length === 0 ? (
            <div className="p-12 text-center text-brand-muted">
              <Inbox size={28} className="mx-auto opacity-50" />
              <div className="mt-3">No records yet.</div>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-brand-cream text-brand-muted text-[11px] uppercase tracking-[0.16em]">
                  <tr>
                    {tableColumns(tab).map((c) => (
                      <th key={c} className="text-left px-5 py-3 font-semibold">{c}</th>
                    ))}
                    <th className="text-right px-5 py-3 font-semibold">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((it) => (
                    <tr key={it.id} className="border-t border-brand-line hover:bg-brand-cream/60" data-testid={`row-${it.id}`}>
                      {tableColumns(tab).map((c) => (
                        <td key={c} className="px-5 py-4 text-brand-ink/90 align-top">
                          {renderCell(tab, c, it)}
                        </td>
                      ))}
                      <td className="px-5 py-4 text-right">
                        <select
                          className="input-soft !py-1.5 !text-xs !w-auto"
                          value={it.status}
                          onChange={(e) => updateStatus(it.id, e.target.value)}
                          data-testid={`status-${it.id}`}
                        >
                          {tabStatuses(tab).map((s) => (
                            <option key={s} value={s}>{s.replace("_", " ")}</option>
                          ))}
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function tableColumns(tab) {
  switch (tab) {
    case "bookings":
      return ["id", "candidate_name", "package", "email", "mobile", "created_at"];
    case "applications":
      return ["id", "candidate_name", "degree_plan", "major", "target_country", "email", "created_at"];
    case "apostille":
      return ["id", "candidate_name", "document_type", "num_documents", "estimated_price", "email", "created_at"];
    case "messages":
      return ["id", "full_name", "subject", "email", "phone", "created_at"];
    default:
      return ["id"];
  }
}

function tabStatuses(tab) {
  if (tab === "messages") return ["new", "in_progress", "completed", "cancelled"];
  return STATUSES;
}

function renderCell(tab, col, item) {
  if (col === "created_at" && item[col]) {
    try {
      return new Date(item[col]).toLocaleString();
    } catch { return item[col]; }
  }
  if (col === "estimated_price" && item[col] != null) return `₹${item[col]}`;
  if (col === "id") return <span className="font-mono text-xs">{item.id}</span>;
  return item[col] || "—";
}
