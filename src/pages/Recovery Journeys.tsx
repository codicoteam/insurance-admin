"use client";

import React, { useState, useMemo, useRef, useCallback } from "react";
import {
  FileText, TrendingUp, DollarSign, Plus, Search, Filter,
  X, ChevronDown, BarChart3, ArrowUpRight, ArrowDownRight,
  Eye, Edit2, Trash2, Phone, Mail, Globe, UserCheck,
  Building2, ShoppingBag, CheckCircle, Clock, AlertCircle,
  XCircle, Shield, Zap, Target, RefreshCw, Award, GripVertical,
  Calendar, Activity, Info, Home, Car, Heart,
  Package, PieChart, Download, Upload
} from "lucide-react";
import InsuranceSidebar from '../Components/sidebar'; // Adjust the import path as needed

// ─────────────────────────────────────────────────────────────────────────────
// TYPES
// ─────────────────────────────────────────────────────────────────────────────

type RecoveryLeadSource =
  | "Customer Call"
  | "Email Reminder"
  | "Website"
  | "Field Agent Visit"
  | "Partner / Broker"
  | "Aggregator Platform";

type RecoveryStatus = "Draft" | "Pending" | "In Review" | "Approved" | "Recovered" | "Closed" | "Rejected";

type PipelineStage =
  | "Lead Created"
  | "Quote Generated"
  | "Sent"
  | "Negotiation"
  | "Approved"
  | "Recovered"
  | "Closed";

interface RecoveryQuote {
  id: string;
  customerId: string;
  customerName: string;
  claimId: string;
  recoveryAmount: number;
  status: RecoveryStatus;
  leadSource: RecoveryLeadSource;
  createdAt: string;
  agent: string;
  policyType: string;
}

interface PipelineCard {
  id: string;
  quoteId: string;
  customerName: string;
  claimId: string;
  recoveryAmount: number;
  stage: PipelineStage;
  leadSource: RecoveryLeadSource;
  agent: string;
  expectedDate: string;
  probability: number;
  daysInStage: number;
}

interface LeadSourceStat {
  source: RecoveryLeadSource;
  totalCases: number;
  converted: number;
  recoveredAmount: number;
}

interface QuoteFormData {
  customerName: string;
  claimId: string;
  recoveryAmount: string;
  leadSource: RecoveryLeadSource | "";
  agent: string;
  policyType: string;
}

// ─────────────────────────────────────────────────────────────────────────────
// CONSTANTS
// ─────────────────────────────────────────────────────────────────────────────

const LEAD_SOURCES: RecoveryLeadSource[] = [
  "Customer Call", "Email Reminder", "Website",
  "Field Agent Visit", "Partner / Broker", "Aggregator Platform",
];

const PIPELINE_STAGES: PipelineStage[] = [
  "Lead Created", "Quote Generated", "Sent",
  "Negotiation", "Approved", "Recovered", "Closed",
];

const LEAD_SOURCE_ICONS: Record<RecoveryLeadSource, React.ElementType> = {
  "Customer Call": Phone,
  "Email Reminder": Mail,
  "Website": Globe,
  "Field Agent Visit": UserCheck,
  "Partner / Broker": Building2,
  "Aggregator Platform": ShoppingBag,
};

const LEAD_SOURCE_COLORS: Record<RecoveryLeadSource, { bg: string; text: string; badge: string }> = {
  "Customer Call":       { bg: "bg-sky-50",     text: "text-sky-600",    badge: "bg-sky-100 text-sky-700" },
  "Email Reminder":      { bg: "bg-violet-50",  text: "text-violet-600", badge: "bg-violet-100 text-violet-700" },
  "Website":             { bg: "bg-teal-50",    text: "text-teal-600",   badge: "bg-teal-100 text-teal-700" },
  "Field Agent Visit":   { bg: "bg-amber-50",   text: "text-amber-600",  badge: "bg-amber-100 text-amber-700" },
  "Partner / Broker":    { bg: "bg-emerald-50", text: "text-emerald-600",badge: "bg-emerald-100 text-emerald-700" },
  "Aggregator Platform": { bg: "bg-rose-50",    text: "text-rose-600",   badge: "bg-rose-100 text-rose-700" },
};

const STATUS_CONFIG: Record<RecoveryStatus, { icon: React.ElementType; color: string; bg: string }> = {
  Draft:      { icon: Edit2,        color: "text-gray-600", bg: "bg-gray-100" },
  Pending:    { icon: Clock,        color: "text-blue-600", bg: "bg-blue-100" },
  "In Review":{ icon: Activity,     color: "text-purple-600", bg: "bg-purple-100" },
  Approved:   { icon: CheckCircle,  color: "text-green-600", bg: "bg-green-100" },
  Recovered:  { icon: Award,        color: "text-teal-600", bg: "bg-teal-100" },
  Closed:     { icon: XCircle,      color: "text-gray-500", bg: "bg-gray-100" },
  Rejected:   { icon: AlertCircle,  color: "text-red-600", bg: "bg-red-100" },
};

const STAGE_CONFIG: Record<PipelineStage, { header: string; accent: string }> = {
  "Lead Created":    { header: "bg-gray-500",   accent: "text-gray-200" },
  "Quote Generated": { header: "bg-blue-500",   accent: "text-blue-200" },
  "Sent":            { header: "bg-purple-500", accent: "text-purple-200" },
  "Negotiation":     { header: "bg-amber-500",  accent: "text-amber-200" },
  "Approved":        { header: "bg-green-500",  accent: "text-green-200" },
  "Recovered":       { header: "bg-teal-500",   accent: "text-teal-200" },
  "Closed":          { header: "bg-gray-500",   accent: "text-gray-200" },
};

// ─────────────────────────────────────────────────────────────────────────────
// MOCK DATA
// ─────────────────────────────────────────────────────────────────────────────

const MOCK_QUOTES: RecoveryQuote[] = [
  { id:"RQ-001", customerId:"C001", customerName:"Alexandra Mitchell",  claimId:"CLM-8821", recoveryAmount:14200, status:"Recovered",  leadSource:"Customer Call",       createdAt:"2025-01-08", agent:"James Harper",   policyType:"Life Insurance"     },
  { id:"RQ-002", customerId:"C002", customerName:"Robert Chen",         claimId:"CLM-7743", recoveryAmount:32600, status:"Approved",   leadSource:"Email Reminder",      createdAt:"2025-01-10", agent:"Sarah Williams", policyType:"Health Insurance"   },
  { id:"RQ-003", customerId:"C003", customerName:"Diana Foster",        claimId:"CLM-9921", recoveryAmount: 8900, status:"In Review",  leadSource:"Website",             createdAt:"2025-01-12", agent:"Mark Davis",     policyType:"Auto Insurance"     },
  { id:"RQ-004", customerId:"C004", customerName:"Michael Torres",      claimId:"CLM-3312", recoveryAmount:21500, status:"Approved", leadSource:"Field Agent Visit",    createdAt:"2025-01-13", agent:"Lisa Johnson",  policyType:"Property Insurance" },
  { id:"RQ-005", customerId:"C005", customerName:"Sophia Kim",          claimId:"CLM-5567", recoveryAmount:47800, status:"Recovered",  leadSource:"Partner / Broker",    createdAt:"2025-01-14", agent:"James Harper",   policyType:"Life Insurance"     },
  { id:"RQ-006", customerId:"C006", customerName:"David Park",          claimId:"CLM-6634", recoveryAmount:16300, status:"Pending",    leadSource:"Aggregator Platform", createdAt:"2025-01-15", agent:"Sarah Williams", policyType:"Health Insurance"   },
  { id:"RQ-007", customerId:"C007", customerName:"Emma Wilson",         claimId:"CLM-2298", recoveryAmount: 5400, status:"Rejected",   leadSource:"Customer Call",       createdAt:"2025-01-16", agent:"Mark Davis",     policyType:"Auto Insurance"     },
  { id:"RQ-008", customerId:"C008", customerName:"James Rodriguez",     claimId:"CLM-8874", recoveryAmount:28900, status:"Approved",   leadSource:"Email Reminder",      createdAt:"2025-01-17", agent:"Lisa Johnson",   policyType:"Property Insurance" },
  { id:"RQ-009", customerId:"C009", customerName:"Priya Patel",         claimId:"CLM-1145", recoveryAmount:19700, status:"In Review",  leadSource:"Website",             createdAt:"2025-01-18", agent:"James Harper",   policyType:"Life Insurance"     },
  { id:"RQ-010", customerId:"C010", customerName:"Carlos Mendez",       claimId:"CLM-4456", recoveryAmount:11200, status:"Draft",      leadSource:"Field Agent Visit",   createdAt:"2025-01-19", agent:"Sarah Williams", policyType:"Health Insurance"   },
  { id:"RQ-011", customerId:"C011", customerName:"Nina Okafor",         claimId:"CLM-7789", recoveryAmount:38400, status:"Recovered",  leadSource:"Partner / Broker",    createdAt:"2025-01-20", agent:"Mark Davis",     policyType:"Property Insurance" },
  { id:"RQ-012", customerId:"C012", customerName:"Yuki Tanaka",         claimId:"CLM-3321", recoveryAmount: 7600, status:"Closed",     leadSource:"Aggregator Platform", createdAt:"2025-01-21", agent:"Lisa Johnson",   policyType:"Auto Insurance"     },
];

const MOCK_PIPELINE: PipelineCard[] = [
  { id:"P-001", quoteId:"RQ-013", customerName:"Olivia Bennett",   claimId:"CLM-9901", recoveryAmount:22400, stage:"Lead Created",    leadSource:"Customer Call",       agent:"James Harper",   expectedDate:"2025-03-15", probability:20, daysInStage:1 },
  { id:"P-002", quoteId:"RQ-014", customerName:"Ethan Clarke",     claimId:"CLM-8812", recoveryAmount:41200, stage:"Quote Generated", leadSource:"Email Reminder",      agent:"Sarah Williams", expectedDate:"2025-03-20", probability:35, daysInStage:3 },
  { id:"P-003", quoteId:"RQ-015", customerName:"Fatima Hassan",    claimId:"CLM-7723", recoveryAmount:18600, stage:"Sent",            leadSource:"Website",             agent:"Mark Davis",     expectedDate:"2025-03-10", probability:50, daysInStage:5 },
  { id:"P-004", quoteId:"RQ-016", customerName:"Liam Thompson",    claimId:"CLM-6634", recoveryAmount:55000, stage:"Negotiation",     leadSource:"Field Agent Visit",   agent:"Lisa Johnson",   expectedDate:"2025-03-05", probability:72, daysInStage:4 },
  { id:"P-005", quoteId:"RQ-017", customerName:"Amara Diallo",     claimId:"CLM-5545", recoveryAmount:33100, stage:"Approved",        leadSource:"Partner / Broker",    agent:"James Harper",   expectedDate:"2025-02-28", probability:88, daysInStage:2 },
  { id:"P-006", quoteId:"RQ-018", customerName:"Noah Garcia",      claimId:"CLM-4456", recoveryAmount: 9800, stage:"Recovered",       leadSource:"Aggregator Platform", agent:"Sarah Williams", expectedDate:"2025-02-20", probability:100,daysInStage:0 },
  { id:"P-007", quoteId:"RQ-019", customerName:"Isla MacDonald",   claimId:"CLM-3367", recoveryAmount:27300, stage:"Closed",          leadSource:"Customer Call",       agent:"Mark Davis",     expectedDate:"2025-02-15", probability:0,  daysInStage:0 },
  { id:"P-008", quoteId:"RQ-020", customerName:"Jin-Ho Lee",       claimId:"CLM-2278", recoveryAmount:61500, stage:"Negotiation",     leadSource:"Email Reminder",      agent:"Lisa Johnson",   expectedDate:"2025-03-12", probability:68, daysInStage:6 },
  { id:"P-009", quoteId:"RQ-021", customerName:"Zara Ahmed",       claimId:"CLM-1189", recoveryAmount:14400, stage:"Quote Generated", leadSource:"Website",             agent:"James Harper",   expectedDate:"2025-03-25", probability:30, daysInStage:2 },
  { id:"P-010", quoteId:"RQ-022", customerName:"Marcus Webb",      claimId:"CLM-9912", recoveryAmount:43200, stage:"Sent",            leadSource:"Field Agent Visit",   agent:"Sarah Williams", expectedDate:"2025-03-18", probability:48, daysInStage:3 },
  { id:"P-011", quoteId:"RQ-023", customerName:"Kenji Nakamura",   claimId:"CLM-8823", recoveryAmount:19900, stage:"Lead Created",    leadSource:"Partner / Broker",    agent:"Mark Davis",     expectedDate:"2025-04-01", probability:15, daysInStage:1 },
  { id:"P-012", quoteId:"RQ-024", customerName:"Valentina Cruz",   claimId:"CLM-7734", recoveryAmount:36700, stage:"Approved",        leadSource:"Aggregator Platform", agent:"Lisa Johnson",   expectedDate:"2025-03-02", probability:85, daysInStage:2 },
];

const MOCK_STATS: LeadSourceStat[] = [
  { source:"Customer Call",       totalCases:118, converted:72,  recoveredAmount:548200 },
  { source:"Email Reminder",      totalCases:94,  converted:51,  recoveredAmount:412600 },
  { source:"Website",             totalCases:136, converted:63,  recoveredAmount:319800 },
  { source:"Field Agent Visit",   totalCases:77,  converted:58,  recoveredAmount:724500 },
  { source:"Partner / Broker",    totalCases:52,  converted:44,  recoveredAmount:982300 },
  { source:"Aggregator Platform", totalCases:89,  converted:37,  recoveredAmount:218900 },
];

// ─────────────────────────────────────────────────────────────────────────────
// HELPERS
// ─────────────────────────────────────────────────────────────────────────────

const fmt = (n: number) =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(n);

const fmtK = (n: number) =>
  n >= 1_000_000 ? `$${(n / 1_000_000).toFixed(1)}M` : n >= 1_000 ? `$${(n / 1_000).toFixed(0)}K` : `$${n}`;

// ─────────────────────────────────────────────────────────────────────────────
// SUB-COMPONENTS
// ─────────────────────────────────────────────────────────────────────────────

const LeadBadge: React.FC<{ source: RecoveryLeadSource; size?: "xs" | "sm" }> = ({ source, size = "xs" }) => {
  const colors = LEAD_SOURCE_COLORS[source];
  const Icon = LEAD_SOURCE_ICONS[source];
  return (
    <span className={`inline-flex items-center gap-1 rounded-full font-semibold ${colors.badge} ${
      size === "xs" ? "px-2 py-0.5 text-[10px]" : "px-2.5 py-1 text-xs"
    }`}>
      <Icon size={size === "xs" ? 9 : 11} />
      {source}
    </span>
  );
};

const StatusPill: React.FC<{ status: RecoveryStatus }> = ({ status }) => {
  const cfg = STATUS_CONFIG[status];
  const Icon = cfg.icon;
  return (
    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold ${cfg.bg} ${cfg.color}`}>
      <Icon size={9} />
      {status}
    </span>
  );
};

const PolicyTypeIcon: React.FC<{ type: string }> = ({ type }) => {
  const icons: Record<string, React.ElementType> = {
    "Life Insurance": Heart,
    "Health Insurance": Activity,
    "Auto Insurance": Car,
    "Property Insurance": Home,
  };
  const Icon = icons[type] || Package;
  return <Icon className="w-3.5 h-3.5 text-gray-400" />;
};

// ── Bar Chart ────────────────────────────────────────────────────────────────

const BarChart: React.FC<{
  data: LeadSourceStat[];
  metric: "totalCases" | "conversionRate" | "recoveredAmount";
}> = ({ data, metric }) => {
  const get = (s: LeadSourceStat) => {
    if (metric === "conversionRate") return Math.round((s.converted / s.totalCases) * 100);
    if (metric === "recoveredAmount") return s.recoveredAmount;
    return s.totalCases;
  };
  const max = Math.max(...data.map(get));
  const BAR_COLORS = ["bg-blue-500","bg-purple-500","bg-teal-500","bg-amber-500","bg-green-500","bg-rose-500"];

  return (
    <div className="space-y-3">
      {data.map((s, i) => {
        const val = get(s);
        const pct = Math.round((val / max) * 100);
        const label = metric === "conversionRate" ? `${val}%` : metric === "recoveredAmount" ? fmtK(val) : String(val);
        return (
          <div key={s.source} className="flex items-center gap-3 group">
            <span className="text-xs text-gray-500 w-36 shrink-0 truncate group-hover:text-gray-700 transition-colors">{s.source}</span>
            <div className="flex-1 bg-gray-100 rounded-full h-6 overflow-hidden relative">
              <div
                className={`h-full rounded-full transition-all duration-700 ease-out flex items-center justify-end pr-2 ${BAR_COLORS[i]}`}
                style={{ width: `${Math.max(pct, 6)}%` }}
              >
                <span className="text-[10px] font-bold text-white whitespace-nowrap">{label}</span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

// ── Quote Modal ───────────────────────────────────────────────────────────────

const QuoteModal: React.FC<{
  onClose: () => void;
  onSave: (q: Omit<RecoveryQuote, "id" | "createdAt" | "customerId" | "status">) => void;
}> = ({ onClose, onSave }) => {
  const [form, setForm] = useState<QuoteFormData>({
    customerName: "", claimId: "", recoveryAmount: "",
    leadSource: "", agent: "James Harper", policyType: "Life Insurance",
  });

  const set = (k: keyof QuoteFormData, v: string) => setForm(p => ({ ...p, [k]: v }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.leadSource) return;
    onSave({
      customerName: form.customerName,
      claimId: form.claimId,
      recoveryAmount: parseFloat(form.recoveryAmount) || 0,
      leadSource: form.leadSource as RecoveryLeadSource,
      agent: form.agent,
      policyType: form.policyType,
    });
    onClose();
  };

  const Field: React.FC<{ label: string; required?: boolean; children: React.ReactNode }> = ({ label, required, children }) => (
    <div>
      <label className="block text-xs font-semibold text-gray-600 mb-1.5 uppercase tracking-wide">{label}{required && <span className="text-red-500 ml-0.5">*</span>}</label>
      {children}
    </div>
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
      <div className="bg-white border border-gray-200 rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 rounded-lg border border-blue-200">
              <Plus size={16} className="text-blue-600" />
            </div>
            <h2 className="text-base font-bold text-gray-900 tracking-tight">New Recovery Quote</h2>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors">
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {([
              { label: "Customer Name", key: "customerName", type: "text",   req: true, colSpan: false },
              { label: "Claim ID",      key: "claimId",      type: "text",   req: true, colSpan: false },
              { label: "Recovery Amount ($)", key: "recoveryAmount", type: "number", req: true, colSpan: true },
            ] as { label: string; key: keyof QuoteFormData; type: string; req: boolean; colSpan: boolean }[]).map(({ label, key, type, req, colSpan }) => (
              <div key={key} className={colSpan ? "sm:col-span-2" : ""}>
                <Field label={label} required={req}>
                  <input
                    type={type}
                    required={req}
                    value={form[key]}
                    onChange={e => set(key, e.target.value)}
                    className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </Field>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <Field label="Lead Source" required>
                <div className="relative">
                  <select
                    required
                    value={form.leadSource}
                    onChange={e => set("leadSource", e.target.value)}
                    className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none"
                  >
                    <option value="">Select source…</option>
                    {LEAD_SOURCES.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={14} />
                </div>
              </Field>
            </div>

            <div>
              <Field label="Policy Type">
                <div className="relative">
                  <select
                    value={form.policyType}
                    onChange={e => set("policyType", e.target.value)}
                    className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none"
                  >
                    {["Life Insurance","Health Insurance","Auto Insurance","Property Insurance"].map(t => <option key={t}>{t}</option>)}
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={14} />
                </div>
              </Field>
            </div>

            <div className="sm:col-span-2">
              <Field label="Assigned Agent">
                <div className="relative">
                  <select
                    value={form.agent}
                    onChange={e => set("agent", e.target.value)}
                    className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none"
                  >
                    {["James Harper","Sarah Williams","Mark Davis","Lisa Johnson"].map(a => <option key={a}>{a}</option>)}
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={14} />
                </div>
              </Field>
            </div>
          </div>

          <div className="flex gap-3 pt-2">
            <button type="button" onClick={onClose} className="flex-1 py-2.5 border border-gray-200 rounded-xl text-sm font-semibold text-gray-600 hover:bg-gray-50 transition-colors">
              Cancel
            </button>
            <button type="submit" className="flex-1 py-2.5 bg-blue-600 hover:bg-blue-700 rounded-xl text-sm font-semibold text-white transition-colors shadow-sm">
              Create Quote
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// MAIN COMPONENT
// ─────────────────────────────────────────────────────────────────────────────

type Tab = "quotes" | "pipeline" | "analytics";
type AnalyticMetric = "totalCases" | "conversionRate" | "recoveredAmount";

export default function InsuranceRecoveryDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [tab, setTab] = useState<Tab>("quotes");
  const [quotes, setQuotes] = useState<RecoveryQuote[]>(MOCK_QUOTES);
  const [pipeline, setPipeline] = useState<PipelineCard[]>(MOCK_PIPELINE);
  const [showModal, setShowModal] = useState(false);

  // Quote filters
  const [qSearch, setQSearch] = useState("");
  const [qSource, setQSource] = useState<RecoveryLeadSource | "">("");
  const [qStatus, setQStatus] = useState<RecoveryStatus | "">("");
  const [qDateFrom, setQDateFrom] = useState("");
  const [qDateTo, setQDateTo] = useState("");

  // Pipeline filters
  const [pSource, setPSource] = useState<RecoveryLeadSource | "">("");
  const [pStage, setPStage] = useState<PipelineStage | "">("");

  // Analytics
  const [metric, setMetric] = useState<AnalyticMetric>("totalCases");

  // Drag state
  const dragCardId = useRef<string | null>(null);
  const dragOverStage = useRef<PipelineStage | null>(null);

  // ── KPIs ──────────────────────────────────────────────────────────────────

  const totalRecovered = useMemo(
    () => quotes.filter(q => q.status === "Recovered").reduce((s, q) => s + q.recoveryAmount, 0),
    [quotes]
  );
  const conversionRate = useMemo(() => {
    const rec = quotes.filter(q => q.status === "Recovered").length;
    return quotes.length ? Math.round((rec / quotes.length) * 100) : 0;
  }, [quotes]);
  const activePipelineValue = useMemo(
    () => pipeline.filter(p => p.stage !== "Closed").reduce((s, p) => s + p.recoveryAmount, 0),
    [pipeline]
  );
   

  // Stats for header
  const stats = [
    { label: "Total Cases", value: quotes.length, sub: `${quotes.filter(q=>q.status==="Recovered").length} recovered`, icon: FileText, color: "blue", trend: "+14%", up: true },
    { label: "Amount Recovered", value: fmtK(totalRecovered), sub: "Year to date", icon: DollarSign, color: "green", trend: "+22%", up: true },
    { label: "Pipeline Value", value: fmtK(activePipelineValue), sub: `${pipeline.filter(p=>p.stage!=="Closed").length} active cases`, icon: TrendingUp, color: "purple", trend: "+9%", up: true },
    { label: "Conversion Rate", value: `${conversionRate}%`, sub: "Avg recovery", icon: Target, color: "orange", trend: "-2%", up: false }
  ];

  // Quick action buttons
  const actionButtons: { icon: React.ElementType; label: string; onClick: () => void; color: "blue" | "green" | "purple" | "orange" }[] = [
    { icon: Plus, label: "New Quote", onClick: () => setShowModal(true), color: "blue" },
    { icon: Download, label: "Export", onClick: () => {}, color: "green" },
    { icon: Upload, label: "Import", onClick: () => {}, color: "purple" },
    { icon: PieChart, label: "Analytics", onClick: () => setTab("analytics"), color: "orange" }
  ];

  // ── Filtered quotes ───────────────────────────────────────────────────────

  const filteredQuotes = useMemo(() =>
    quotes.filter(q => {
      const ms = q.customerName.toLowerCase().includes(qSearch.toLowerCase()) ||
                 q.claimId.toLowerCase().includes(qSearch.toLowerCase()) ||
                 q.id.toLowerCase().includes(qSearch.toLowerCase());
      const mSrc = !qSource || q.leadSource === qSource;
      const mSt  = !qStatus || q.status === qStatus;
      const mDf  = !qDateFrom || q.createdAt >= qDateFrom;
      const mDt  = !qDateTo   || q.createdAt <= qDateTo;
      return ms && mSrc && mSt && mDf && mDt;
    }),
    [quotes, qSearch, qSource, qStatus, qDateFrom, qDateTo]
  );

  // ── Filtered pipeline ─────────────────────────────────────────────────────

  const filteredPipeline = useMemo(() =>
    pipeline.filter(p => {
      const mSrc = !pSource || p.leadSource === pSource;
      const mSt  = !pStage  || p.stage === pStage;
      return mSrc && mSt;
    }),
    [pipeline, pSource, pStage]
  );

  const byStage = useMemo(() =>
    PIPELINE_STAGES.reduce<Record<PipelineStage, PipelineCard[]>>((acc, s) => {
      acc[s] = filteredPipeline.filter(p => p.stage === s);
      return acc;
    }, {} as Record<PipelineStage, PipelineCard[]>),
    [filteredPipeline]
  );

  // ── Add quote ─────────────────────────────────────────────────────────────

  const handleAdd = useCallback((data: Omit<RecoveryQuote, "id" | "createdAt" | "customerId" | "status">) => {
    const next: RecoveryQuote = {
      ...data,
      id: `RQ-${String(quotes.length + 13).padStart(3, "0")}`,
      customerId: `C${String(quotes.length + 13).padStart(3, "0")}`,
      status: "Draft",
      createdAt: new Date().toISOString().split("T")[0],
    };
    setQuotes(p => [next, ...p]);
  }, [quotes.length]);

  // ── Drag & drop ───────────────────────────────────────────────────────────

  const onDragStart = (id: string) => { dragCardId.current = id; };
  const onDragOver = (e: React.DragEvent, stage: PipelineStage) => {
    e.preventDefault();
    dragOverStage.current = stage;
  };
  const onDrop = (e: React.DragEvent, stage: PipelineStage) => {
    e.preventDefault();
    if (!dragCardId.current) return;
    setPipeline(prev => prev.map(c => c.id === dragCardId.current ? { ...c, stage } : c));
    dragCardId.current = null;
    dragOverStage.current = null;
  };

  // ── Render ─────────────────────────────────────────────────────────────────

  return (
    <div className="flex min-h-screen bg-white">
      {/* Sidebar */}
      <InsuranceSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="flex-1">
        {/* Mobile Header */}
        <div className="lg:hidden bg-white border-b border-gray-200 p-4">
          <button onClick={() => setSidebarOpen(true)} className="p-2 rounded-lg hover:bg-gray-100">
            <Filter className="w-6 h-6 text-gray-600" />
          </button>
        </div>

        <div className="min-h-screen bg-gradient-to-br from-white via-blue-50 to-white">
          {/* Header */}
          <div className="bg-white border-b border-blue-100 shadow-sm">
            <div className="max-w-7xl mx-auto px-6 py-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-600 rounded-lg">
                  <Shield className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">Recovery Operations</h1>
                  <p className="text-sm text-gray-600">Insurance Recovery Management Dashboard</p>
                </div>
              </div>
            </div>
          </div>

          <div className="max-w-7xl mx-auto px-6 py-6 space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {stats.map((stat, idx) => {
                const Icon = stat.icon;
                const colorClasses = {
                  blue: 'bg-blue-50 text-blue-600',
                  green: 'bg-green-50 text-green-600',
                  purple: 'bg-purple-50 text-purple-600',
                  orange: 'bg-orange-50 text-orange-600'
                };
                return (
                  <div key={idx} className="bg-white rounded-xl p-5 shadow-sm border border-blue-100">
                    <div className="flex items-start justify-between mb-3">
                      <div className={`p-2.5 rounded-xl ${colorClasses[stat.color as keyof typeof colorClasses]}`}>
                        <Icon size={20} />
                      </div>
                      <span className={`flex items-center gap-0.5 text-xs font-semibold ${stat.up ? "text-green-600" : "text-red-500"}`}>
                        {stat.up ? <ArrowUpRight size={13} /> : <ArrowDownRight size={13} />}
                        {stat.trend}
                      </span>
                    </div>
                    <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                    <p className="text-xs text-gray-400 mt-0.5">{stat.sub}</p>
                    <p className="text-xs font-medium text-gray-500 mt-1">{stat.label}</p>
                  </div>
                );
              })}
            </div>

            {/* Quick Actions */}
            <div className="mb-8">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Quick Actions</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {actionButtons.map((action, idx) => {
                  const Icon = action.icon;
                  const colorClasses = {
                    blue: 'from-blue-500 to-blue-600',
                    green: 'from-green-500 to-green-600',
                    purple: 'from-purple-500 to-purple-600',
                    orange: 'from-orange-500 to-orange-600'
                  };
                  return (
                    <button
                      key={idx}
                      onClick={action.onClick}
                      className={`flex flex-col items-center justify-center gap-2 p-4 bg-gradient-to-br ${colorClasses[action.color]} text-white rounded-xl shadow hover:shadow-lg transition-all transform hover:-translate-y-0.5`}
                    >
                      <Icon className="w-5 h-5" />
                      <span className="text-xs font-semibold text-center">{action.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Tab Navigation */}
            <div className="flex gap-1 bg-white border border-gray-100 rounded-xl p-1 w-fit shadow-sm">
              {([
                { key:"quotes",    label:"Recovery Quotes",   icon:FileText },
                { key:"pipeline",  label:"Recovery Pipeline", icon:TrendingUp },
                { key:"analytics", label:"Lead Analytics",    icon:BarChart3 },
              ] as { key: Tab; label: string; icon: React.ElementType }[]).map(({ key, label, icon: Icon }) => (
                <button
                  key={key}
                  onClick={() => setTab(key)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                    tab === key
                      ? "bg-blue-600 text-white shadow-sm"
                      : "text-gray-500 hover:text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  <Icon size={14} />{label}
                </button>
              ))}
            </div>

            {/* ══════════════════════════════════════════════════════════════════
                QUOTES TAB
            ══════════════════════════════════════════════════════════════════ */}
            {tab === "quotes" && (
              <div className="space-y-4">
                {/* Toolbar */}
                <div className="flex flex-col lg:flex-row gap-3">
                  <div className="relative flex-1 max-w-md">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={15} />
                    <input
                      type="text"
                      placeholder="Search customer, claim ID, quote ID…"
                      value={qSearch}
                      onChange={e => setQSearch(e.target.value)}
                      className="w-full pl-9 pr-4 py-2.5 text-sm border border-gray-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {/* Source filter */}
                    <div className="relative">
                      <Filter className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400" size={13} />
                      <select
                        value={qSource}
                        onChange={e => setQSource(e.target.value as RecoveryLeadSource | "")}
                        className="pl-8 pr-7 py-2.5 text-sm border border-gray-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none"
                      >
                        <option value="">All Sources</option>
                        {LEAD_SOURCES.map(s => <option key={s}>{s}</option>)}
                      </select>
                      <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={13} />
                    </div>
                    {/* Status filter */}
                    <div className="relative">
                      <select
                        value={qStatus}
                        onChange={e => setQStatus(e.target.value as RecoveryStatus | "")}
                        className="pl-3 pr-7 py-2.5 text-sm border border-gray-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none"
                      >
                        <option value="">All Statuses</option>
                        {(["Draft","Pending","In Review","Approved","Recovered","Closed","Rejected"] as RecoveryStatus[]).map(s =>
                          <option key={s}>{s}</option>
                        )}
                      </select>
                      <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={13} />
                    </div>
                    {/* Date range */}
                    <input type="date" value={qDateFrom} onChange={e => setQDateFrom(e.target.value)}
                      className="px-3 py-2.5 text-sm border border-gray-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500" />
                    <input type="date" value={qDateTo} onChange={e => setQDateTo(e.target.value)}
                      className="px-3 py-2.5 text-sm border border-gray-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500" />
                  </div>
                </div>

                {/* Quotes Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {filteredQuotes.length === 0 ? (
                    <div className="col-span-full text-center py-12">
                      <div className="flex flex-col items-center gap-3">
                        <div className="p-4 bg-gray-100 rounded-full">
                          <RefreshCw className="w-8 h-8 text-gray-400" />
                        </div>
                        <p className="text-gray-500 font-medium">No recovery quotes found</p>
                        <p className="text-sm text-gray-400">Try adjusting your search or filters</p>
                      </div>
                    </div>
                  ) : filteredQuotes.map(quote => {
                    const SourceIcon = LEAD_SOURCE_ICONS[quote.leadSource];
                    const sourceColors = LEAD_SOURCE_COLORS[quote.leadSource];
                    
                    return (
                      <div
                        key={quote.id}
                        className="bg-white rounded-xl border border-gray-200 hover:border-blue-300 shadow-sm hover:shadow-md transition-all p-5"
                      >
                        {/* Header */}
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex items-center gap-2">
                            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white shadow-md">
                              <FileText className="w-5 h-5" />
                            </div>
                            <div>
                              <span className="text-xs font-mono font-semibold text-blue-600">{quote.id}</span>
                              <h3 className="font-bold text-gray-900">{quote.customerName}</h3>
                            </div>
                          </div>
                          <div className="flex gap-1">
                            <button className="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                              <Eye size={14} />
                            </button>
                            <button className="p-1.5 text-gray-400 hover:text-yellow-600 hover:bg-yellow-50 rounded-lg transition-colors">
                              <Edit2 size={14} />
                            </button>
                            <button
                              onClick={() => setQuotes(p => p.filter(x => x.id !== quote.id))}
                              className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                            >
                              <Trash2 size={14} />
                            </button>
                          </div>
                        </div>

                        {/* Policy type and claim ID */}
                        <div className="flex items-center gap-2 mb-2">
                          <div className={`p-1.5 rounded-lg ${sourceColors.bg}`}>
                            <SourceIcon className={sourceColors.text} size={14} />
                          </div>
                          <span className="text-xs font-mono text-gray-500">{quote.claimId}</span>
                        </div>

                        {/* Status and lead source badges */}
                        <div className="flex flex-wrap gap-2 mb-3">
                          <StatusPill status={quote.status} />
                          <LeadBadge source={quote.leadSource} size="sm" />
                        </div>

                        {/* Details */}
                        <div className="space-y-2 text-sm border-t border-gray-100 pt-3 mt-2">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <PolicyTypeIcon type={quote.policyType} />
                              <span className="text-xs text-gray-600">{quote.policyType}</span>
                            </div>
                            <span className="font-bold text-gray-900">{fmt(quote.recoveryAmount)}</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <Calendar className="w-3.5 h-3.5 text-gray-400" />
                              <span className="text-xs text-gray-500">{quote.createdAt}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <UserCheck className="w-3.5 h-3.5 text-gray-400" />
                              <span className="text-xs text-gray-500">{quote.agent}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between text-xs text-gray-400 py-2">
                  <span>
                    Showing {filteredQuotes.length} of {quotes.length} quotes
                    {" · "}<span className="text-blue-600 font-semibold">{fmt(filteredQuotes.reduce((s,q)=>s+q.recoveryAmount,0))}</span> total
                  </span>
                  <span>Page 1 of 1</span>
                </div>
              </div>
            )}

            {/* ══════════════════════════════════════════════════════════════════
                PIPELINE TAB
            ══════════════════════════════════════════════════════════════════ */}
            {tab === "pipeline" && (
              <div className="space-y-4">
                {/* Pipeline filters */}
                <div className="flex gap-2 flex-wrap items-center">
                  <div className="relative">
                    <Filter className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400" size={13} />
                    <select
                      value={pSource}
                      onChange={e => setPSource(e.target.value as RecoveryLeadSource | "")}
                      className="pl-8 pr-7 py-2.5 text-sm border border-gray-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none"
                    >
                      <option value="">All Sources</option>
                      {LEAD_SOURCES.map(s => <option key={s}>{s}</option>)}
                    </select>
                    <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={13} />
                  </div>
                  <div className="relative">
                    <select
                      value={pStage}
                      onChange={e => setPStage(e.target.value as PipelineStage | "")}
                      className="pl-3 pr-7 py-2.5 text-sm border border-gray-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none"
                    >
                      <option value="">All Stages</option>
                      {PIPELINE_STAGES.map(s => <option key={s}>{s}</option>)}
                    </select>
                    <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={13} />
                  </div>
                  <span className="text-xs text-gray-500 ml-1">
                    <span className="text-gray-700 font-semibold">{filteredPipeline.length}</span> deals ·{" "}
                    <span className="text-blue-600 font-semibold">{fmtK(filteredPipeline.reduce((a,p)=>a+p.recoveryAmount,0))}</span>
                  </span>
                  <span className="ml-auto text-xs text-gray-400 hidden sm:block">Drag cards between columns to update stage</span>
                </div>

                {/* Kanban */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-7 gap-4">
                  {PIPELINE_STAGES.map(stage => {
                    const cards = byStage[stage];
                    const stageVal = cards.reduce((s, c) => s + c.recoveryAmount, 0);
                    const StageIcon = stage === 'Recovered' ? Award :
                                     stage === 'Closed' ? XCircle :
                                     stage === 'Lead Created' ? UserCheck :
                                     stage === 'Quote Generated' ? FileText :
                                     stage === 'Sent' ? Mail :
                                     stage === 'Negotiation' ? TrendingUp : CheckCircle;

                    return (
                      <div
                        key={stage}
                        className="flex flex-col gap-2"
                        onDragOver={e => onDragOver(e, stage)}
                        onDrop={e => onDrop(e, stage)}
                      >
                        {/* Column header */}
                        <div className={`rounded-xl p-4 text-white ${STAGE_CONFIG[stage].header} shadow-sm`}>
                          <div className="flex items-center gap-2 mb-2">
                            <StageIcon size={16} />
                            <span className="text-xs font-bold uppercase tracking-wide flex-1">{stage}</span>
                            <span className="bg-white/20 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                              {cards.length}
                            </span>
                          </div>
                          <p className="text-sm font-bold">{fmtK(stageVal)}</p>
                        </div>

                        {/* Cards */}
                        <div className="space-y-2 min-h-[150px]">
                          {cards.map(card => {
                            const SourceIcon = LEAD_SOURCE_ICONS[card.leadSource];
                            const sourceColors = LEAD_SOURCE_COLORS[card.leadSource];
                            
                            return (
                              <div
                                key={card.id}
                                draggable
                                onDragStart={() => onDragStart(card.id)}
                                className="bg-white rounded-xl p-4 border-2 border-gray-200 shadow-sm hover:shadow-md transition-all cursor-grab active:cursor-grabbing hover:border-blue-300"
                              >
                                <div className="flex items-start justify-between mb-2 gap-1">
                                  <p className="font-bold text-gray-900 text-sm leading-snug">{card.customerName}</p>
                                  <GripVertical size={12} className="text-gray-400 shrink-0 mt-0.5" />
                                </div>

                                <div className="flex items-center gap-2 mb-2">
                                  <div className={`p-1 rounded-lg ${sourceColors.bg}`}>
                                    <SourceIcon className={sourceColors.text} size={10} />
                                  </div>
                                  <span className="text-xs font-mono text-gray-500">{card.claimId}</span>
                                </div>

                                <div className="mt-2 space-y-2">
                                  <div className="flex justify-between items-center">
                                    <span className="text-xs text-gray-400 font-mono">{card.quoteId}</span>
                                    <span className="text-sm font-bold text-gray-900">{fmtK(card.recoveryAmount)}</span>
                                  </div>

                                  {/* Probability bar */}
                                  <div className="flex items-center gap-1.5">
                                    <div className="flex-1 bg-gray-100 rounded-full h-1.5">
                                      <div
                                        className="h-full rounded-full bg-blue-500 transition-all"
                                        style={{ width: `${card.probability}%` }}
                                      />
                                    </div>
                                    <span className="text-xs text-gray-500 font-semibold w-7 text-right">{card.probability}%</span>
                                  </div>
                                </div>

                                <div className="mt-3 pt-2 border-t border-gray-100 space-y-1">
                                  <div className="flex items-center gap-1 text-xs text-gray-500">
                                    <Calendar size={10} className="shrink-0" />
                                    <span className="truncate">Expected: {card.expectedDate}</span>
                                  </div>
                                  <div className="flex items-center gap-1 text-xs text-gray-500">
                                    <UserCheck size={10} className="shrink-0" />
                                    <span className="truncate">{card.agent}</span>
                                  </div>
                                  {card.daysInStage > 0 && (
                                    <div className="flex items-center gap-1 text-xs text-amber-600">
                                      <Clock size={10} />
                                      <span>{card.daysInStage}d in stage</span>
                                    </div>
                                  )}
                                </div>
                              </div>
                            );
                          })}

                          {cards.length === 0 && (
                            <div className="rounded-xl border-2 border-dashed border-gray-200 p-5 text-center">
                              <p className="text-xs text-gray-300">Drop here</p>
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* ══════════════════════════════════════════════════════════════════
                ANALYTICS TAB
            ══════════════════════════════════════════════════════════════════ */}
            {tab === "analytics" && (
              <div className="space-y-6">
                {/* Metric toggle */}
                <div className="flex gap-1 bg-white border border-gray-100 rounded-xl p-1 w-fit shadow-sm">
                  {([
                    { key:"totalCases",       label:"Total Cases"       },
                    { key:"conversionRate",   label:"Conversion Rate"   },
                    { key:"recoveredAmount",  label:"Recovered Amount"  },
                  ] as { key: AnalyticMetric; label: string }[]).map(({ key, label }) => (
                    <button
                      key={key}
                      onClick={() => setMetric(key)}
                      className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                        metric === key
                          ? "bg-blue-600 text-white shadow-sm"
                          : "text-gray-500 hover:text-gray-700 hover:bg-gray-50"
                      }`}
                    >
                      {label}
                    </button>
                  ))}
                </div>

                <div className="grid grid-cols-1 xl:grid-cols-3 gap-5">
                  {/* Bar chart */}
                  <div className="xl:col-span-2 bg-white border border-gray-200 rounded-2xl p-6">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="p-2 bg-blue-50 rounded-xl">
                        <BarChart3 size={18} className="text-blue-600" />
                      </div>
                      <div>
                        <h2 className="text-base font-bold text-gray-900">
                          {metric === "totalCases" ? "Total Recovery Cases" : metric === "conversionRate" ? "Conversion Rate" : "Recovered Amount"} by Source
                        </h2>
                        <p className="text-xs text-gray-500 mt-0.5">All time performance</p>
                      </div>
                    </div>
                    <BarChart data={MOCK_STATS} metric={metric} />
                  </div>

                  {/* Leaderboard */}
                  <div className="bg-white border border-gray-200 rounded-2xl p-6">
                    <h2 className="text-base font-bold text-gray-900 mb-4 flex items-center gap-2">
                      <Zap size={16} className="text-amber-500" /> Top Performers
                    </h2>
                    <div className="space-y-3">
                      {[...MOCK_STATS]
                        .sort((a, b) => {
                          if (metric === "totalCases") return b.totalCases - a.totalCases;
                          if (metric === "conversionRate") return (b.converted/b.totalCases) - (a.converted/a.totalCases);
                          return b.recoveredAmount - a.recoveredAmount;
                        })
                        .map((s, i) => {
                          const Icon = LEAD_SOURCE_ICONS[s.source];
                          const colors = LEAD_SOURCE_COLORS[s.source];
                          const val = metric === "totalCases"
                            ? s.totalCases
                            : metric === "conversionRate"
                            ? `${Math.round((s.converted/s.totalCases)*100)}%`
                            : fmtK(s.recoveredAmount);
                          const medals = ["🥇","🥈","🥉","","",""];
                          return (
                            <div key={s.source} className="flex items-center gap-3 p-2 rounded-xl hover:bg-gray-50 transition-colors">
                              <span className="w-5 text-sm text-center">{medals[i] || <span className="text-xs text-gray-400 font-bold">{i+1}</span>}</span>
                              <div className={`p-1.5 rounded-lg ${colors.bg}`}>
                                <Icon className={colors.text} size={13} />
                              </div>
                              <span className="flex-1 text-sm text-gray-700 font-semibold truncate">{s.source}</span>
                              <span className="text-sm font-bold text-gray-900">{val}</span>
                            </div>
                          );
                        })}
                    </div>
                  </div>
                </div>

                {/* Full breakdown table */}
                <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden">
                  <div className="px-6 py-4 border-b border-gray-200">
                    <h2 className="text-base font-bold text-gray-900">Full Lead Source Breakdown</h2>
                    <p className="text-xs text-gray-500 mt-0.5">Comprehensive performance metrics across all acquisition channels</p>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="bg-gray-50 border-b border-gray-200">
                          {["Source","Total Cases","Converted","Conv. Rate","Recovered Amount","Avg. Recovery"].map(h => (
                            <th key={h} className="px-5 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider whitespace-nowrap">{h}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-100">
                        {MOCK_STATS.map(s => {
                          const rate = Math.round((s.converted / s.totalCases) * 100);
                          const avg  = s.converted > 0 ? Math.round(s.recoveredAmount / s.converted) : 0;
                          const Icon = LEAD_SOURCE_ICONS[s.source];
                          const colors = LEAD_SOURCE_COLORS[s.source];
                          return (
                            <tr key={s.source} className="hover:bg-blue-50/30 transition-colors">
                              <td className="px-5 py-3">
                                <div className="flex items-center gap-2.5">
                                  <div className={`p-1.5 rounded-lg ${colors.bg}`}>
                                    <Icon className={colors.text} size={13} />
                                  </div>
                                  <span className="font-bold text-gray-800">{s.source}</span>
                                </div>
                              </td>
                              <td className="px-5 py-3 text-gray-700 font-semibold">{s.totalCases}</td>
                              <td className="px-5 py-3 text-gray-700 font-semibold">{s.converted}</td>
                              <td className="px-5 py-3">
                                <div className="flex items-center gap-2">
                                  <div className="w-20 bg-gray-100 rounded-full h-1.5 overflow-hidden">
                                    <div className="bg-blue-500 h-full rounded-full" style={{ width:`${rate}%` }} />
                                  </div>
                                  <span className="font-bold text-gray-900 text-xs">{rate}%</span>
                                </div>
                              </td>
                              <td className="px-5 py-3 font-bold text-gray-900">{fmt(s.recoveredAmount)}</td>
                              <td className="px-5 py-3 text-gray-700 font-semibold">{fmt(avg)}</td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Quick-stat cards row */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                  {[
                    { label:"Best Conv. Source",  value:"Partner / Broker",    sub:"84.6% conversion",       icon:Award,        color:"text-green-600", bg:"bg-green-50" },
                    { label:"Highest Volume",     value:"Website",             sub:"136 total cases",         icon:TrendingUp,   color:"text-blue-600",  bg:"bg-blue-50"  },
                    { label:"Most Revenue",       value:"Partner / Broker",    sub:"$982K recovered",         icon:DollarSign,   color:"text-purple-600",bg:"bg-purple-50"},
                    { label:"Avg. Recovery Time", value:"12.4 days",           sub:"Across all sources",      icon:Clock,        color:"text-amber-600", bg:"bg-amber-50" },
                  ].map(card => {
                    const Icon = card.icon;
                    return (
                      <div key={card.label} className="bg-white border border-gray-200 rounded-2xl p-4">
                        <div className={`inline-flex p-2 rounded-xl mb-3 ${card.bg}`}>
                          <Icon size={16} className={card.color} />
                        </div>
                        <p className="text-base font-bold text-gray-900 leading-tight">{card.value}</p>
                        <p className="text-xs text-gray-400 mt-0.5">{card.sub}</p>
                        <p className={`text-xs font-semibold mt-1.5 ${card.color}`}>{card.label}</p>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Info Note */}
            <div className="flex items-start gap-3 p-4 bg-blue-50 rounded-lg border border-blue-200">
              <Info className="w-5 h-5 text-blue-600 mt-1 flex-shrink-0" />
              <p className="text-blue-900 text-sm">
                Recovery Operations Dashboard provides end-to-end visibility of insurance recovery cases. 
                Track quotes through the pipeline, monitor recovery amounts, and analyze lead source performance. 
                Drag and drop cards between stages to update deal progression.
              </p>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between py-2 border-t border-gray-200">
              <p className="text-xs text-gray-400">Recovery Ops CRM · Admin Panel</p>
              <p className="text-xs text-gray-400">
                {new Date().toLocaleDateString("en-US", { weekday:"short", month:"short", day:"numeric", year:"numeric" })}
              </p>
            </div>
          </div>
        </div>
      </div>

      {showModal && <QuoteModal onClose={() => setShowModal(false)} onSave={handleAdd} />}
    </div>
  );
}