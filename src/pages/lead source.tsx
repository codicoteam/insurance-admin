"use client";

import React, { useState, useMemo } from "react";
import {
  FileText,
  TrendingUp,
  Users,
  DollarSign,
  Plus,
  Search,
  Filter,
  X,
  ChevronDown,
  BarChart2,
  ArrowUpRight,
  ArrowDownRight,
  Eye,
  Edit2,
  Trash2,
  Phone,
  Mail,
  Globe,
  UserCheck,
  Building2,
  MessageSquare,
  MapPin,
  ShoppingBag,
  Share2,
  CheckCircle,
  Clock,
  AlertCircle,
  XCircle,
  Shield,
  Info,
  User,
  Download,
  Upload,
  PieChart
} from "lucide-react";
import InsuranceSidebar from '../Components/sidebar'; // Adjust the import path as needed

// ─── Types ────────────────────────────────────────────────────────────────────

type LeadSource =
  | "Website"
  | "Google Ads"
  | "Facebook Ads"
  | "Agent Referral"
  | "Customer Referral"
  | "Call Center"
  | "Email Campaign"
  | "Social Media"
  | "Partner / Corporate"
  | "Aggregator"
  | "Walk-in";

type QuoteStatus = "Draft" | "Sent" | "Approved" | "Rejected" | "Expired";
type PipelineStage =
  | "New Lead"
  | "Contacted"
  | "Qualified"
  | "Proposal Sent"
  | "Negotiation"
  | "Closed Won"
  | "Closed Lost";

interface Quote {
  id: string;
  client: string;
  email: string;
  phone: string;
  policyType: string;
  premium: number;
  status: QuoteStatus;
  leadSource: LeadSource;
  createdAt: string;
  expiresAt: string;
  agent: string;
}

interface PipelineCard {
  id: string;
  client: string;
  value: number;
  stage: PipelineStage;
  leadSource: LeadSource;
  probability: number;
  agent: string;
  nextAction: string;
  daysInStage: number;
  policyType: string;
}

interface LeadSourceStat {
  source: LeadSource;
  totalLeads: number;
  converted: number;
  revenue: number;
}

interface FormData {
  client: string;
  email: string;
  phone: string;
  policyType: string;
  premium: string;
  leadSource: LeadSource | "";
  agent: string;
  expiresAt: string;
}

// ─── Constants ────────────────────────────────────────────────────────────────

const LEAD_SOURCES: LeadSource[] = [
  "Website",
  "Google Ads",
  "Facebook Ads",
  "Agent Referral",
  "Customer Referral",
  "Call Center",
  "Email Campaign",
  "Social Media",
  "Partner / Corporate",
  "Aggregator",
  "Walk-in",
];

const PIPELINE_STAGES: PipelineStage[] = [
  "New Lead",
  "Contacted",
  "Qualified",
  "Proposal Sent",
  "Negotiation",
  "Closed Won",
  "Closed Lost",
];

const LEAD_SOURCE_ICONS: Record<LeadSource, React.ElementType> = {
  Website: Globe,
  "Google Ads": Search,
  "Facebook Ads": Share2,
  "Agent Referral": UserCheck,
  "Customer Referral": Users,
  "Call Center": Phone,
  "Email Campaign": Mail,
  "Social Media": MessageSquare,
  "Partner / Corporate": Building2,
  Aggregator: ShoppingBag,
  "Walk-in": MapPin,
};

const LEAD_SOURCE_COLORS: Record<
  LeadSource,
  { bg: string; text: string; border: string; badge: string }
> = {
  Website: {
    bg: "bg-blue-50",
    text: "text-blue-700",
    border: "border-blue-200",
    badge: "bg-blue-100 text-blue-700",
  },
  "Google Ads": {
    bg: "bg-red-50",
    text: "text-red-700",
    border: "border-red-200",
    badge: "bg-red-100 text-red-700",
  },
  "Facebook Ads": {
    bg: "bg-indigo-50",
    text: "text-indigo-700",
    border: "border-indigo-200",
    badge: "bg-indigo-100 text-indigo-700",
  },
  "Agent Referral": {
    bg: "bg-purple-50",
    text: "text-purple-700",
    border: "border-purple-200",
    badge: "bg-purple-100 text-purple-700",
  },
  "Customer Referral": {
    bg: "bg-pink-50",
    text: "text-pink-700",
    border: "border-pink-200",
    badge: "bg-pink-100 text-pink-700",
  },
  "Call Center": {
    bg: "bg-yellow-50",
    text: "text-yellow-700",
    border: "border-yellow-200",
    badge: "bg-yellow-100 text-yellow-700",
  },
  "Email Campaign": {
    bg: "bg-teal-50",
    text: "text-teal-700",
    border: "border-teal-200",
    badge: "bg-teal-100 text-teal-700",
  },
  "Social Media": {
    bg: "bg-cyan-50",
    text: "text-cyan-700",
    border: "border-cyan-200",
    badge: "bg-cyan-100 text-cyan-700",
  },
  "Partner / Corporate": {
    bg: "bg-slate-50",
    text: "text-slate-700",
    border: "border-slate-200",
    badge: "bg-slate-100 text-slate-700",
  },
  Aggregator: {
    bg: "bg-orange-50",
    text: "text-orange-700",
    border: "border-orange-200",
    badge: "bg-orange-100 text-orange-700",
  },
  "Walk-in": {
    bg: "bg-green-50",
    text: "text-green-700",
    border: "border-green-200",
    badge: "bg-green-100 text-green-700",
  },
};

const STATUS_CONFIG: Record<
  QuoteStatus,
  { icon: React.ElementType; color: string; bg: string }
> = {
  Draft: { icon: Edit2, color: "text-gray-600", bg: "bg-gray-100" },
  Sent: { icon: Clock, color: "text-blue-600", bg: "bg-blue-100" },
  Approved: { icon: CheckCircle, color: "text-green-600", bg: "bg-green-100" },
  Rejected: { icon: XCircle, color: "text-red-600", bg: "bg-red-100" },
  Expired: { icon: AlertCircle, color: "text-orange-600", bg: "bg-orange-100" },
};

// ─── Mock Data ────────────────────────────────────────────────────────────────

const MOCK_QUOTES: Quote[] = [
  {
    id: "Q-001",
    client: "Alexandra Mitchell",
    email: "alex.mitchell@email.com",
    phone: "+1 (555) 234-5678",
    policyType: "Life Insurance",
    premium: 2400,
    status: "Sent",
    leadSource: "Website",
    createdAt: "2025-01-10",
    expiresAt: "2025-02-10",
    agent: "James Harper",
  },
  {
    id: "Q-002",
    client: "Robert Chen",
    email: "r.chen@company.com",
    phone: "+1 (555) 345-6789",
    policyType: "Health Insurance",
    premium: 4800,
    status: "Approved",
    leadSource: "Google Ads",
    createdAt: "2025-01-12",
    expiresAt: "2025-02-12",
    agent: "Sarah Williams",
  },
  {
    id: "Q-003",
    client: "Diana Foster",
    email: "d.foster@email.com",
    phone: "+1 (555) 456-7890",
    policyType: "Auto Insurance",
    premium: 1200,
    status: "Draft",
    leadSource: "Agent Referral",
    createdAt: "2025-01-14",
    expiresAt: "2025-02-14",
    agent: "Mark Davis",
  },
  {
    id: "Q-004",
    client: "Michael Torres",
    email: "m.torres@email.com",
    phone: "+1 (555) 567-8901",
    policyType: "Property Insurance",
    premium: 3600,
    status: "Rejected",
    leadSource: "Facebook Ads",
    createdAt: "2025-01-15",
    expiresAt: "2025-02-15",
    agent: "Lisa Johnson",
  },
  {
    id: "Q-005",
    client: "Sophia Kim",
    email: "s.kim@email.com",
    phone: "+1 (555) 678-9012",
    policyType: "Life Insurance",
    premium: 5200,
    status: "Approved",
    leadSource: "Customer Referral",
    createdAt: "2025-01-16",
    expiresAt: "2025-02-16",
    agent: "James Harper",
  },
  {
    id: "Q-006",
    client: "David Park",
    email: "d.park@company.com",
    phone: "+1 (555) 789-0123",
    policyType: "Health Insurance",
    premium: 6000,
    status: "Sent",
    leadSource: "Call Center",
    createdAt: "2025-01-17",
    expiresAt: "2025-02-17",
    agent: "Sarah Williams",
  },
  {
    id: "Q-007",
    client: "Emma Wilson",
    email: "e.wilson@email.com",
    phone: "+1 (555) 890-1234",
    policyType: "Auto Insurance",
    premium: 1800,
    status: "Expired",
    leadSource: "Email Campaign",
    createdAt: "2024-12-10",
    expiresAt: "2025-01-10",
    agent: "Mark Davis",
  },
  {
    id: "Q-008",
    client: "James Rodriguez",
    email: "j.rodriguez@email.com",
    phone: "+1 (555) 901-2345",
    policyType: "Property Insurance",
    premium: 2900,
    status: "Approved",
    leadSource: "Partner / Corporate",
    createdAt: "2025-01-18",
    expiresAt: "2025-02-18",
    agent: "Lisa Johnson",
  },
  {
    id: "Q-009",
    client: "Priya Patel",
    email: "p.patel@email.com",
    phone: "+1 (555) 012-3456",
    policyType: "Life Insurance",
    premium: 3100,
    status: "Sent",
    leadSource: "Social Media",
    createdAt: "2025-01-19",
    expiresAt: "2025-02-19",
    agent: "James Harper",
  },
  {
    id: "Q-010",
    client: "Carlos Mendez",
    email: "c.mendez@email.com",
    phone: "+1 (555) 123-4567",
    policyType: "Health Insurance",
    premium: 4200,
    status: "Draft",
    leadSource: "Aggregator",
    createdAt: "2025-01-20",
    expiresAt: "2025-02-20",
    agent: "Sarah Williams",
  },
  {
    id: "Q-011",
    client: "Nina Okafor",
    email: "n.okafor@email.com",
    phone: "+1 (555) 234-5679",
    policyType: "Auto Insurance",
    premium: 1500,
    status: "Approved",
    leadSource: "Walk-in",
    createdAt: "2025-01-21",
    expiresAt: "2025-02-21",
    agent: "Mark Davis",
  },
];

const MOCK_PIPELINE: PipelineCard[] = [
  {
    id: "P-001",
    client: "Olivia Bennett",
    value: 12000,
    stage: "Qualified",
    leadSource: "Website",
    probability: 65,
    agent: "James Harper",
    nextAction: "Send proposal",
    daysInStage: 3,
    policyType: "Life Insurance",
  },
  {
    id: "P-002",
    client: "Ethan Clarke",
    value: 8500,
    stage: "Proposal Sent",
    leadSource: "Google Ads",
    probability: 75,
    agent: "Sarah Williams",
    nextAction: "Follow-up call",
    daysInStage: 5,
    policyType: "Health Insurance",
  },
  {
    id: "P-003",
    client: "Fatima Hassan",
    value: 22000,
    stage: "Negotiation",
    leadSource: "Agent Referral",
    probability: 85,
    agent: "Mark Davis",
    nextAction: "Finalise terms",
    daysInStage: 2,
    policyType: "Property Insurance",
  },
  {
    id: "P-004",
    client: "Liam Thompson",
    value: 4200,
    stage: "New Lead",
    leadSource: "Facebook Ads",
    probability: 20,
    agent: "Lisa Johnson",
    nextAction: "Initial contact",
    daysInStage: 1,
    policyType: "Auto Insurance",
  },
  {
    id: "P-005",
    client: "Amara Diallo",
    value: 18500,
    stage: "Closed Won",
    leadSource: "Customer Referral",
    probability: 100,
    agent: "James Harper",
    nextAction: "Policy issuance",
    daysInStage: 0,
    policyType: "Life Insurance",
  },
  {
    id: "P-006",
    client: "Noah Garcia",
    value: 7300,
    stage: "Contacted",
    leadSource: "Call Center",
    probability: 40,
    agent: "Sarah Williams",
    nextAction: "Qualification call",
    daysInStage: 4,
    policyType: "Health Insurance",
  },
  {
    id: "P-007",
    client: "Isla MacDonald",
    value: 9800,
    stage: "Qualified",
    leadSource: "Email Campaign",
    probability: 60,
    agent: "Mark Davis",
    nextAction: "Product demo",
    daysInStage: 6,
    policyType: "Property Insurance",
  },
  {
    id: "P-008",
    client: "Jin-Ho Lee",
    value: 31000,
    stage: "Proposal Sent",
    leadSource: "Partner / Corporate",
    probability: 78,
    agent: "Lisa Johnson",
    nextAction: "C-suite meeting",
    daysInStage: 3,
    policyType: "Life Insurance",
  },
  {
    id: "P-009",
    client: "Zara Ahmed",
    value: 5600,
    stage: "Closed Lost",
    leadSource: "Social Media",
    probability: 0,
    agent: "James Harper",
    nextAction: "Post-mortem review",
    daysInStage: 0,
    policyType: "Auto Insurance",
  },
  {
    id: "P-010",
    client: "Marcus Webb",
    value: 14200,
    stage: "Negotiation",
    leadSource: "Aggregator",
    probability: 88,
    agent: "Sarah Williams",
    nextAction: "Final quote revision",
    daysInStage: 2,
    policyType: "Health Insurance",
  },
  {
    id: "P-011",
    client: "Yuki Tanaka",
    value: 6700,
    stage: "New Lead",
    leadSource: "Walk-in",
    probability: 25,
    agent: "Mark Davis",
    nextAction: "Needs assessment",
    daysInStage: 1,
    policyType: "Auto Insurance",
  },
  {
    id: "P-012",
    client: "Kenji Nakamura",
    value: 19400,
    stage: "Closed Won",
    leadSource: "Website",
    probability: 100,
    agent: "Lisa Johnson",
    nextAction: "Onboarding",
    daysInStage: 0,
    policyType: "Property Insurance",
  },
];

const MOCK_STATS: LeadSourceStat[] = [
  { source: "Website", totalLeads: 142, converted: 68, revenue: 218400 },
  { source: "Google Ads", totalLeads: 98, converted: 41, revenue: 163800 },
  { source: "Facebook Ads", totalLeads: 87, converted: 29, revenue: 98600 },
  { source: "Agent Referral", totalLeads: 76, converted: 54, revenue: 312000 },
  {
    source: "Customer Referral",
    totalLeads: 63,
    converted: 49,
    revenue: 287400,
  },
  { source: "Call Center", totalLeads: 112, converted: 38, revenue: 142800 },
  { source: "Email Campaign", totalLeads: 94, converted: 31, revenue: 118600 },
  { source: "Social Media", totalLeads: 71, converted: 22, revenue: 84200 },
  {
    source: "Partner / Corporate",
    totalLeads: 44,
    converted: 36,
    revenue: 428000,
  },
  { source: "Aggregator", totalLeads: 89, converted: 27, revenue: 108900 },
  { source: "Walk-in", totalLeads: 38, converted: 28, revenue: 172600 },
];

// ─── Sub-components ───────────────────────────────────────────────────────────

const LeadSourceBadge: React.FC<{ source: LeadSource; size?: "sm" | "md" }> = ({
  source,
  size = "sm",
}) => {
  const colors = LEAD_SOURCE_COLORS[source];
  const Icon = LEAD_SOURCE_ICONS[source];
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full font-medium ${colors.badge} ${
        size === "sm" ? "px-2 py-0.5 text-xs" : "px-3 py-1 text-sm"
      }`}
    >
      <Icon size={size === "sm" ? 10 : 12} />
      {source}
    </span>
  );
};

const StatusBadge: React.FC<{ status: QuoteStatus }> = ({ status }) => {
  const cfg = STATUS_CONFIG[status];
  const Icon = cfg.icon;
  return (
    <span
      className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${cfg.bg} ${cfg.color}`}
    >
      <Icon size={10} />
      {status}
    </span>
  );
};

const formatCurrency = (n: number) =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(n);

// ─── Analytics Bar Chart ──────────────────────────────────────────────────────

const MiniBarChart: React.FC<{
  data: LeadSourceStat[];
  metric: "totalLeads" | "conversionRate" | "revenue";
}> = ({ data, metric }) => {
  const getValue = (s: LeadSourceStat) => {
    if (metric === "conversionRate")
      return Math.round((s.converted / s.totalLeads) * 100);
    if (metric === "revenue") return s.revenue;
    return s.totalLeads;
  };

  const maxVal = Math.max(...data.map(getValue));
  const barColors = [
    "bg-blue-500","bg-red-500","bg-indigo-500","bg-purple-500","bg-pink-500",
    "bg-yellow-500","bg-teal-500","bg-cyan-500","bg-slate-500","bg-orange-500","bg-green-500",
  ];

  return (
    <div className="space-y-2">
      {data.map((s, i) => {
        const val = getValue(s);
        const pct = Math.round((val / maxVal) * 100);
        const label =
          metric === "conversionRate"
            ? `${val}%`
            : metric === "revenue"
            ? formatCurrency(val)
            : val.toString();
        return (
          <div key={s.source} className="flex items-center gap-2">
            <span className="text-xs text-gray-500 w-32 shrink-0 truncate">{s.source}</span>
            <div className="flex-1 bg-gray-100 rounded-full h-5 overflow-hidden">
              <div
                className={`h-full rounded-full transition-all duration-500 ${barColors[i]}`}
                style={{ width: `${pct}%` }}
              />
            </div>
            <span className="text-xs font-semibold text-gray-700 w-20 text-right shrink-0">{label}</span>
          </div>
        );
      })}
    </div>
  );
};

// ─── Modal ────────────────────────────────────────────────────────────────────

const QuoteModal: React.FC<{
  onClose: () => void;
  onSave: (q: Omit<Quote, "id" | "createdAt">) => void;
}> = ({ onClose, onSave }) => {
  const [form, setForm] = useState<FormData>({
    client: "", email: "", phone: "", policyType: "Life Insurance",
    premium: "", leadSource: "", agent: "James Harper", expiresAt: "",
  });

  const set = (key: keyof FormData, val: string) =>
    setForm((p) => ({ ...p, [key]: val }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.leadSource) return;
    onSave({
      client: form.client,
      email: form.email,
      phone: form.phone,
      policyType: form.policyType,
      premium: parseFloat(form.premium) || 0,
      status: "Draft",
      leadSource: form.leadSource as LeadSource,
      expiresAt: form.expiresAt,
      agent: form.agent,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <h2 className="text-xl font-bold text-gray-900">New Quote</h2>
          <button onClick={onClose} className="p-2 rounded-lg hover:bg-gray-100 text-gray-500">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { label: "Client Name", key: "client", type: "text", required: true },
              { label: "Email", key: "email", type: "email", required: true },
              { label: "Phone", key: "phone", type: "tel", required: false },
              { label: "Annual Premium ($)", key: "premium", type: "number", required: true },
            ].map(({ label, key, type, required }) => (
              <div key={key}>
                <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
                <input
                  type={type}
                  required={required}
                  value={form[key as keyof FormData]}
                  onChange={(e) => set(key as keyof FormData, e.target.value)}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Policy Type</label>
              <select
                value={form.policyType}
                onChange={(e) => set("policyType", e.target.value)}
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {["Life Insurance","Health Insurance","Auto Insurance","Property Insurance"].map((t) => (
                  <option key={t}>{t}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Lead Source <span className="text-red-500">*</span>
              </label>
              <select
                required
                value={form.leadSource}
                onChange={(e) => set("leadSource", e.target.value)}
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select source...</option>
                {LEAD_SOURCES.map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Expiry Date</label>
              <input
                type="date"
                required
                value={form.expiresAt}
                onChange={(e) => set("expiresAt", e.target.value)}
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Assigned Agent</label>
              <select
                value={form.agent}
                onChange={(e) => set("agent", e.target.value)}
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {["James Harper","Sarah Williams","Mark Davis","Lisa Johnson"].map((a) => (
                  <option key={a}>{a}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-2.5 border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 py-2.5 bg-blue-600 rounded-lg text-sm font-medium text-white hover:bg-blue-700"
            >
              Create Quote
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// ─── Main Component ───────────────────────────────────────────────────────────

type Tab = "quotes" | "pipeline" | "analytics";

export default function InsuranceCRMDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<Tab>("quotes");
  const [quotes, setQuotes] = useState<Quote[]>(MOCK_QUOTES);
  const [pipeline] = useState<PipelineCard[]>(MOCK_PIPELINE);
  const [showModal, setShowModal] = useState(false);
  const [quoteSearch, setQuoteSearch] = useState("");
  const [quoteSourceFilter, setQuoteSourceFilter] = useState<LeadSource | "">("");
  const [quoteStatusFilter, setQuoteStatusFilter] = useState<QuoteStatus | "">("");
  const [pipelineSourceFilter, setPipelineSourceFilter] = useState<LeadSource | "">("");
  const [pipelineStageFilter, setPipelineStageFilter] = useState<PipelineStage | "">("");
  const [analyticsMetric, setAnalyticsMetric] = useState<
    "totalLeads" | "conversionRate" | "revenue"
  >("totalLeads");

  // Computed totals
  const totalPremium = useMemo(
    () => quotes.filter((q) => q.status === "Approved").reduce((s, q) => s + q.premium, 0),
    [quotes]
  );
  const totalPipelineValue = useMemo(
    () => pipeline.filter((p) => p.stage !== "Closed Lost").reduce((s, p) => s + p.value, 0),
    [pipeline]
  );
  const conversionRate = useMemo(() => {
    const approved = quotes.filter((q) => q.status === "Approved").length;
    return quotes.length ? Math.round((approved / quotes.length) * 100) : 0;
  }, [quotes]);

  // Stats for the header
  const stats = [
    { 
      label: 'Total Quotes', 
      value: quotes.length, 
      sub: `${quotes.filter((q) => q.status === "Approved").length} approved`, 
      icon: FileText, 
      color: 'blue',
      trend: '+12%',
      trendUp: true
    },
    { 
      label: 'Approved Revenue', 
      value: formatCurrency(totalPremium), 
      sub: 'Annual premium', 
      icon: DollarSign, 
      color: 'green',
      trend: '+8%',
      trendUp: true
    },
    { 
      label: 'Pipeline Value', 
      value: formatCurrency(totalPipelineValue), 
      sub: `${pipeline.filter((p) => p.stage !== "Closed Lost" && p.stage !== "Closed Won").length} active deals`, 
      icon: TrendingUp, 
      color: 'purple',
      trend: '+21%',
      trendUp: true
    },
    { 
      label: 'Conversion Rate', 
      value: `${conversionRate}%`, 
      sub: 'Quotes → Approved', 
      icon: Users, 
      color: 'orange',
      trend: '-3%',
      trendUp: false
    }
  ];

  // Quick action buttons
  const actionButtons = [
    { icon: Plus, label: 'New Quote', onClick: () => setShowModal(true), color: 'blue' },
    { icon: Download, label: 'Export', onClick: () => {}, color: 'green' },
    { icon: Upload, label: 'Import', onClick: () => {}, color: 'purple' },
    { icon: PieChart, label: 'Reports', onClick: () => setActiveTab('analytics'), color: 'orange' }
  ];

  // Filtered quotes
  const filteredQuotes = useMemo(
    () =>
      quotes.filter((q) => {
        const matchSearch =
          q.client.toLowerCase().includes(quoteSearch.toLowerCase()) ||
          q.email.toLowerCase().includes(quoteSearch.toLowerCase()) ||
          q.id.toLowerCase().includes(quoteSearch.toLowerCase());
        const matchSource = !quoteSourceFilter || q.leadSource === quoteSourceFilter;
        const matchStatus = !quoteStatusFilter || q.status === quoteStatusFilter;
        return matchSearch && matchSource && matchStatus;
      }),
    [quotes, quoteSearch, quoteSourceFilter, quoteStatusFilter]
  );

  // Filtered pipeline grouped by stage
  const filteredPipeline = useMemo(
    () =>
      pipeline.filter((p) => {
        const matchSource = !pipelineSourceFilter || p.leadSource === pipelineSourceFilter;
        const matchStage = !pipelineStageFilter || p.stage === pipelineStageFilter;
        return matchSource && matchStage;
      }),
    [pipeline, pipelineSourceFilter, pipelineStageFilter]
  );

  const pipelineByStage = useMemo(
    () =>
      PIPELINE_STAGES.reduce<Record<PipelineStage, PipelineCard[]>>((acc, stage) => {
        acc[stage] = filteredPipeline.filter((p) => p.stage === stage);
        return acc;
      }, {} as Record<PipelineStage, PipelineCard[]>),
    [filteredPipeline]
  );

  const handleAddQuote = (data: Omit<Quote, "id" | "createdAt">) => {
    const newQuote: Quote = {
      ...data,
      id: `Q-${String(quotes.length + 1).padStart(3, "0")}`,
      createdAt: new Date().toISOString().split("T")[0],
    };
    setQuotes((p) => [newQuote, ...p]);
  };

  const STAGE_COLORS: Record<PipelineStage, string> = {
    "New Lead": "border-gray-300 bg-gray-50",
    Contacted: "border-blue-300 bg-blue-50",
    Qualified: "border-purple-300 bg-purple-50",
    "Proposal Sent": "border-yellow-300 bg-yellow-50",
    Negotiation: "border-orange-300 bg-orange-50",
    "Closed Won": "border-green-300 bg-green-50",
    "Closed Lost": "border-red-300 bg-red-50",
  };

  const STAGE_HEADER_COLORS: Record<PipelineStage, string> = {
    "New Lead": "bg-gray-500",
    Contacted: "bg-blue-500",
    Qualified: "bg-purple-500",
    "Proposal Sent": "bg-yellow-500",
    Negotiation: "bg-orange-500",
    "Closed Won": "bg-green-500",
    "Closed Lost": "bg-red-500",
  };

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
                  <h1 className="text-2xl font-bold text-gray-900">Insurance CRM Dashboard</h1>
                  <p className="text-sm text-gray-600">Manage quotes, track pipeline, and analyze lead performance</p>
                </div>
              </div>
            </div>
          </div>

          <div className="max-w-7xl mx-auto px-6 py-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              {stats.map((stat, idx) => {
                const Icon = stat.icon;
                const colorClasses = {
                  blue: 'bg-blue-50 text-blue-600',
                  green: 'bg-green-50 text-green-600',
                  purple: 'bg-purple-50 text-purple-600',
                  orange: 'bg-orange-50 text-orange-600',
                  red: 'bg-red-50 text-red-600'
                };
                return (
                  <div key={idx} className="bg-white rounded-xl p-5 shadow-sm border border-blue-100">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="text-sm text-gray-600 mb-1">{stat.label}</p>
                        <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                        <p className="text-xs text-gray-400 mt-1">{stat.sub}</p>
                      </div>
                      <div className="flex flex-col items-end gap-1">
                        <div className={`p-3 rounded-lg ${colorClasses[stat.color as keyof typeof colorClasses]}`}>
                          <Icon size={20} />
                        </div>
                        <span
                          className={`flex items-center gap-0.5 text-xs font-semibold ${
                            stat.trendUp ? "text-green-600" : "text-red-500"
                          }`}
                        >
                          {stat.trendUp ? <ArrowUpRight size={13} /> : <ArrowDownRight size={13} />}
                          {stat.trend}
                        </span>
                      </div>
                    </div>
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
                  const colorClasses: Record<string, string> = {
                    blue: 'from-blue-500 to-blue-600',
                    green: 'from-green-500 to-green-600',
                    purple: 'from-purple-500 to-purple-600',
                    orange: 'from-orange-500 to-orange-600'
                  };
                  return (
                    <button
                      key={idx}
                      onClick={action.onClick}
                      className={`flex flex-col items-center justify-center gap-2 p-4 bg-gradient-to-br ${colorClasses[action.color as keyof typeof colorClasses]} text-white rounded-xl shadow hover:shadow-lg transition-all transform hover:-translate-y-0.5`}
                    >
                      <Icon className="w-5 h-5" />
                      <span className="text-xs font-semibold text-center">{action.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Tab Navigation */}
            <div className="flex gap-1 bg-white border border-gray-100 rounded-xl p-1 w-fit shadow-sm mb-6">
              {(["quotes", "pipeline", "analytics"] as Tab[]).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-5 py-2 rounded-lg text-sm font-semibold capitalize transition-all ${
                    activeTab === tab
                      ? "bg-blue-600 text-white shadow-sm"
                      : "text-gray-500 hover:text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  {tab === "analytics" ? "Lead Analytics" : tab === "pipeline" ? "Sales Pipeline" : "Quotes"}
                </button>
              ))}
            </div>

            {/* ══════════════════ QUOTES TAB ══════════════════ */}
            {activeTab === "quotes" && (
              <div className="space-y-4">
                {/* Search and filters */}
                <div className="flex flex-col sm:flex-row gap-3">
                  <div className="relative flex-1 max-w-md">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search client, email, quote ID…"
                      value={quoteSearch}
                      onChange={(e) => setQuoteSearch(e.target.value)}
                      className="w-full pl-9 pr-4 py-2.5 text-sm border border-gray-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div className="relative">
                    <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                    <select
                      value={quoteSourceFilter}
                      onChange={(e) => setQuoteSourceFilter(e.target.value as LeadSource | "")}
                      className="pl-9 pr-8 py-2.5 text-sm border border-gray-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none cursor-pointer"
                    >
                      <option value="">All Sources</option>
                      {LEAD_SOURCES.map((s) => <option key={s}>{s}</option>)}
                    </select>
                    <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                  </div>
                  <div className="relative">
                    <select
                      value={quoteStatusFilter}
                      onChange={(e) => setQuoteStatusFilter(e.target.value as QuoteStatus | "")}
                      className="pl-3 pr-8 py-2.5 text-sm border border-gray-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none cursor-pointer"
                    >
                      <option value="">All Statuses</option>
                      {(["Draft","Sent","Approved","Rejected","Expired"] as QuoteStatus[]).map((s) => (
                        <option key={s}>{s}</option>
                      ))}
                    </select>
                    <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                  </div>
                </div>

                {/* Quotes Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {filteredQuotes.length === 0 ? (
                    <div className="col-span-full text-center py-12">
                      <div className="flex flex-col items-center gap-3">
                        <div className="p-4 bg-gray-100 rounded-full">
                          <Search className="w-8 h-8 text-gray-400" />
                        </div>
                        <p className="text-gray-500 font-medium">No quotes found</p>
                        <p className="text-sm text-gray-400">Try adjusting your search or filters</p>
                      </div>
                    </div>
                  ) : (
                    filteredQuotes.map((quote) => {
                      const SourceIcon = LEAD_SOURCE_ICONS[quote.leadSource];
                      const sourceColors = LEAD_SOURCE_COLORS[quote.leadSource];
                      
                      return (
                        <div
                          key={quote.id}
                          className="bg-white rounded-xl border border-gray-200 hover:border-blue-300 shadow-sm hover:shadow-md transition-all p-5"
                        >
                          {/* Header with quote ID and actions */}
                          <div className="flex items-start justify-between mb-3">
                            <div className="flex items-center gap-2">
                              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white shadow-md">
                                <FileText className="w-5 h-5" />
                              </div>
                              <div>
                                <span className="text-xs font-mono font-semibold text-blue-600">{quote.id}</span>
                                <h3 className="font-bold text-gray-900">{quote.client}</h3>
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
                                onClick={() => setQuotes((p) => p.filter((x) => x.id !== quote.id))}
                                className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                              >
                                <Trash2 size={14} />
                              </button>
                            </div>
                          </div>

                          {/* Policy type and status */}
                          <div className="flex items-center gap-2 mb-3">
                            <div className={`p-1.5 rounded-lg ${sourceColors.bg}`}>
                              <SourceIcon className={sourceColors.text} size={14} />
                            </div>
                            <span className="text-sm text-gray-600 flex-1">{quote.policyType}</span>
                            <StatusBadge status={quote.status} />
                          </div>

                          {/* Details */}
                          <div className="space-y-2 text-sm border-t border-gray-100 pt-3 mt-2">
                            <div className="flex items-center gap-2">
                              <Mail className="w-4 h-4 text-gray-400 flex-shrink-0" />
                              <span className="text-gray-600 text-xs truncate">{quote.email}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Phone className="w-4 h-4 text-gray-400 flex-shrink-0" />
                              <span className="text-gray-600 text-xs">{quote.phone}</span>
                            </div>
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <DollarSign className="w-4 h-4 text-gray-400 flex-shrink-0" />
                                <span className="font-bold text-gray-900">{formatCurrency(quote.premium)}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <User className="w-4 h-4 text-gray-400 flex-shrink-0" />
                                <span className="text-xs text-gray-500">{quote.agent}</span>
                              </div>
                            </div>
                            <div className="flex items-center justify-between text-xs">
                              <span className="text-gray-400">Expires: {quote.expiresAt}</span>
                              <span className="text-gray-400">Created: {quote.createdAt}</span>
                            </div>
                          </div>
                        </div>
                      );
                    })
                  )}
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between text-xs text-gray-400 py-2">
                  <span>Showing {filteredQuotes.length} of {quotes.length} quotes</span>
                  <span>Page 1 of 1</span>
                </div>
              </div>
            )}

            {/* ══════════════════ PIPELINE TAB ══════════════════ */}
            {activeTab === "pipeline" && (
              <div className="space-y-4">
                {/* Pipeline filters */}
                <div className="flex flex-wrap gap-2">
                  <div className="relative">
                    <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                    <select
                      value={pipelineSourceFilter}
                      onChange={(e) => setPipelineSourceFilter(e.target.value as LeadSource | "")}
                      className="pl-9 pr-8 py-2.5 text-sm border border-gray-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none cursor-pointer"
                    >
                      <option value="">All Sources</option>
                      {LEAD_SOURCES.map((s) => <option key={s}>{s}</option>)}
                    </select>
                    <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                  </div>
                  <div className="relative">
                    <select
                      value={pipelineStageFilter}
                      onChange={(e) => setPipelineStageFilter(e.target.value as PipelineStage | "")}
                      className="pl-3 pr-8 py-2.5 text-sm border border-gray-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none cursor-pointer"
                    >
                      <option value="">All Stages</option>
                      {PIPELINE_STAGES.map((s) => <option key={s}>{s}</option>)}
                    </select>
                    <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                  </div>
                  <span className="self-center text-xs text-gray-400 ml-2">
                    {filteredPipeline.length} deals · {formatCurrency(filteredPipeline.reduce((a, p) => a + p.value, 0))} total value
                  </span>
                </div>

                {/* Kanban board */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-7 gap-4">
                  {PIPELINE_STAGES.map((stage) => {
                    const cards = pipelineByStage[stage];
                    const stageValue = cards.reduce((s, c) => s + c.value, 0);
                    const StageIcon = stage === 'Closed Won' ? CheckCircle :
                                     stage === 'Closed Lost' ? XCircle :
                                     stage === 'New Lead' ? User :
                                     stage === 'Contacted' ? Phone :
                                     stage === 'Qualified' ? UserCheck :
                                     stage === 'Proposal Sent' ? FileText : TrendingUp;
                    
                    return (
                      <div key={stage} className="flex flex-col gap-2">
                        {/* Column header */}
                        <div className={`rounded-xl p-4 text-white ${STAGE_HEADER_COLORS[stage]} shadow-sm`}>
                          <div className="flex items-center gap-2 mb-2">
                            <StageIcon size={16} />
                            <span className="text-xs font-bold uppercase tracking-wide flex-1">{stage}</span>
                            <span className="bg-white/20 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                              {cards.length}
                            </span>
                          </div>
                          <p className="text-sm font-bold">{formatCurrency(stageValue)}</p>
                        </div>

                        {/* Cards */}
                        <div className="space-y-2 min-h-[200px]">
                          {cards.map((card) => (
                            <div
                              key={card.id}
                              className={`rounded-xl p-4 border-2 shadow-sm hover:shadow-md transition-all cursor-default ${STAGE_COLORS[stage]}`}
                            >
                              <div className="flex items-start justify-between mb-2">
                                <p className="font-bold text-gray-900 text-sm leading-tight">{card.client}</p>
                                <div className="flex items-center gap-1">
                                  <span className="text-xs font-bold text-gray-600">{card.probability}%</span>
                                </div>
                              </div>

                              <div className="mb-2">
                                <LeadSourceBadge source={card.leadSource} size="sm" />
                              </div>

                              <p className="text-xs text-gray-500 mb-2">{card.policyType}</p>

                              <div className="flex items-center justify-between mb-2">
                                <span className="text-sm font-bold text-gray-800">{formatCurrency(card.value)}</span>
                                <span className="text-xs px-2 py-0.5 bg-white/60 rounded-full">{card.daysInStage}d</span>
                              </div>

                              <div className="pt-2 border-t border-white/60">
                                <p className="text-xs text-gray-600 truncate">
                                  <span className="font-medium">Next:</span> {card.nextAction}
                                </p>
                                <div className="flex items-center gap-1 mt-1">
                                  <User className="w-3 h-3 text-gray-400" />
                                  <p className="text-xs text-gray-500">{card.agent}</p>
                                </div>
                              </div>
                            </div>
                          ))}

                          {cards.length === 0 && (
                            <div className="rounded-xl border-2 border-dashed border-gray-200 p-6 text-center text-xs text-gray-300">
                              No deals
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* ══════════════════ ANALYTICS TAB ══════════════════ */}
            {activeTab === "analytics" && (
              <div className="space-y-6">
                {/* Metric selector */}
                <div className="flex gap-1 bg-white border border-gray-100 rounded-xl p-1 w-fit shadow-sm">
                  {(["totalLeads","conversionRate","revenue"] as const).map((m) => (
                    <button
                      key={m}
                      onClick={() => setAnalyticsMetric(m)}
                      className={`px-4 py-2 rounded-lg text-sm font-semibold capitalize transition-all ${
                        analyticsMetric === m
                          ? "bg-blue-600 text-white shadow-sm"
                          : "text-gray-500 hover:text-gray-700 hover:bg-gray-50"
                      }`}
                    >
                      {m === "totalLeads" ? "Total Leads" : m === "conversionRate" ? "Conversion Rate" : "Revenue"}
                    </button>
                  ))}
                </div>

                {/* Chart + top stats */}
                <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
                  {/* Bar chart */}
                  <div className="xl:col-span-2 bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
                    <div className="flex items-center gap-2 mb-5">
                      <BarChart2 className="text-blue-600" size={20} />
                      <h2 className="text-lg font-bold text-gray-900">
                        {analyticsMetric === "totalLeads"
                          ? "Total Leads by Source"
                          : analyticsMetric === "conversionRate"
                          ? "Conversion Rate by Source"
                          : "Revenue by Source"}
                      </h2>
                    </div>
                    <MiniBarChart data={MOCK_STATS} metric={analyticsMetric} />
                  </div>

                  {/* Top sources */}
                  <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
                    <h2 className="text-lg font-bold text-gray-900 mb-4">Top Performers</h2>
                    <div className="space-y-3">
                      {[...MOCK_STATS]
                        .sort((a, b) => {
                          if (analyticsMetric === "totalLeads") return b.totalLeads - a.totalLeads;
                          if (analyticsMetric === "conversionRate")
                            return b.converted / b.totalLeads - a.converted / a.totalLeads;
                          return b.revenue - a.revenue;
                        })
                        .slice(0, 5)
                        .map((s, i) => {
                          const Icon = LEAD_SOURCE_ICONS[s.source];
                          const colors = LEAD_SOURCE_COLORS[s.source];
                          const val =
                            analyticsMetric === "totalLeads"
                              ? s.totalLeads
                              : analyticsMetric === "conversionRate"
                              ? `${Math.round((s.converted / s.totalLeads) * 100)}%`
                              : formatCurrency(s.revenue);
                          return (
                            <div key={s.source} className="flex items-center gap-3">
                              <span className="text-xs font-bold text-gray-400 w-4">{i + 1}</span>
                              <div className={`p-1.5 rounded-lg ${colors.bg}`}>
                                <Icon className={`${colors.text}`} size={14} />
                              </div>
                              <span className="flex-1 text-sm text-gray-700 font-medium">{s.source}</span>
                              <span className="text-sm font-bold text-gray-900">{val}</span>
                            </div>
                          );
                        })}
                    </div>
                  </div>
                </div>

                {/* Full source table */}
                <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
                  <div className="px-6 py-4 border-b border-gray-200">
                    <h2 className="text-lg font-bold text-gray-900">Full Lead Source Breakdown</h2>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="bg-gray-50 text-left">
                          {["Source","Total Leads","Converted","Conversion Rate","Revenue","Avg. Deal Value"].map((h) => (
                            <th key={h} className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide whitespace-nowrap">
                              {h}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-100">
                        {MOCK_STATS.map((s) => {
                          const rate = Math.round((s.converted / s.totalLeads) * 100);
                          const avg = s.converted > 0 ? Math.round(s.revenue / s.converted) : 0;
                          const colors = LEAD_SOURCE_COLORS[s.source];
                          const Icon = LEAD_SOURCE_ICONS[s.source];
                          return (
                            <tr key={s.source} className="hover:bg-blue-50/30 transition-colors">
                              <td className="px-4 py-3">
                                <div className="flex items-center gap-2">
                                  <div className={`p-1.5 rounded-lg ${colors.bg}`}>
                                    <Icon className={colors.text} size={14} />
                                  </div>
                                  <span className="font-semibold text-gray-800">{s.source}</span>
                                </div>
                              </td>
                              <td className="px-4 py-3 text-gray-700">{s.totalLeads}</td>
                              <td className="px-4 py-3 text-gray-700">{s.converted}</td>
                              <td className="px-4 py-3">
                                <div className="flex items-center gap-2">
                                  <div className="w-16 bg-gray-100 rounded-full h-1.5">
                                    <div
                                      className="bg-blue-500 h-1.5 rounded-full"
                                      style={{ width: `${rate}%` }}
                                    />
                                  </div>
                                  <span className="font-semibold text-gray-800">{rate}%</span>
                                </div>
                              </td>
                              <td className="px-4 py-3 font-semibold text-gray-800">{formatCurrency(s.revenue)}</td>
                              <td className="px-4 py-3 text-gray-700">{formatCurrency(avg)}</td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {/* Info Note */}
            <div className="mt-8 flex items-start gap-3 p-4 bg-blue-50 rounded-lg border border-blue-200">
              <Info className="w-5 h-5 text-blue-600 mt-1 flex-shrink-0" />
              <p className="text-blue-900 text-sm">
                This CRM dashboard provides a comprehensive view of your insurance sales pipeline. 
                Track quotes, monitor deal progression through stages, and analyze lead source performance. 
                Use the quick actions to create new quotes or generate reports.
              </p>
            </div>

            {/* Footer */}
            <p className="text-center text-xs text-gray-400 pb-4">
              Insurance CRM · Admin Dashboard · {new Date().toLocaleDateString("en-US", { month: "long", year: "numeric" })}
            </p>
          </div>
        </div>
      </div>

      {showModal && <QuoteModal onClose={() => setShowModal(false)} onSave={handleAddQuote} />}
    </div>
  );
}