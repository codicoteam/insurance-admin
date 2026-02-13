import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  Home,
  Users,
  Shield,
  Package,
  DollarSign,
  FileText,
  ClipboardList,
  FileCheck,
  AlertTriangle,
  BarChart3,
  Activity,
  ChevronDown,
  ChevronRight,
  X,
} from "lucide-react";

interface MenuItem {
  id: string;
  label: string;
  path: string;
}

interface MenuSection {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  children: MenuItem[];
}

interface ExpandedSections {
  [key: string]: boolean;
}

interface InsuranceSidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

const InsuranceSidebar: React.FC<InsuranceSidebarProps> = ({
  isOpen = false,
  onClose,
}) => {
  const [expandedSections, setExpandedSections] = useState<ExpandedSections>({
    home: true,
  });

  const toggleSection = (sectionId: string): void => {
    setExpandedSections((prev) => ({
      ...prev,
      [sectionId]: !prev[sectionId],
    }));
  };

  const menuItems: MenuSection[] = [
    {
      id: "home",
      label: "Home & Dashboards",
      icon: Home,
      children: [
        { id: "executive-overview", label: "Executive Overview", path: "/" },
        {
          id: "operational",
          label: "Operational Dashboards",
          path: "/dashboard/operational",
        },
        { id: "alerts", label: "Alerts & Tasks", path: "/dashboard/alerts" },
      ],
    },
    {
      id: "users",
      label: "Users & Access",
      icon: Users,
      children: [
        { id: "users-list", label: "Users", path: "/users" },
        { id: "roles", label: "Roles & Permissions", path: "/users/roles" },
        {
          id: "access-reviews",
          label: "Access Reviews",
          path: "/users/reviews",
        },
        { id: "audit-trail", label: "Audit Trail", path: "/users/audit" },
      ],
    },
    {
      id: "kyc",
      label: "KYC / AML Console",
      icon: Shield,
      children: [
        {
          id: "verification-queue",
          label: "Verification Queue",
          path: "/kyc/queue",
        },
        { id: "manual-review", label: "Manual Review", path: "/kyc/review" },
        { id: "lists-rules", label: "Lists & Rules", path: "/kyc/rules" },
        { id: "kyc-reports", label: "KYC Reports", path: "/kyc/reports" },
      ],
    },
    {
      id: "products",
      label: "Product Catalog",
      icon: Package,
      children: [
        {
          id: "products-versions",
          label: "Products & Versions",
          path: "/products",
        },
        {
          id: "coverages",
          label: "Coverages & Riders",
          path: "/products/coverages",
        },
        { id: "forms", label: "Forms & Disclosures", path: "/products/forms" },
        {
          id: "doc-templates",
          label: "Document Templates",
          path: "/products/templates",
        },
        {
          id: "availability",
          label: "Availability",
          path: "/products/availability",
        },
      ],
    },
    {
      id: "pricing",
      label: "Pricing & Rating",
      icon: DollarSign,
      children: [
        { id: "rate-tables", label: "Rate Tables", path: "/pricing/rates" },
        {
          id: "rating-factors",
          label: "Rating Factors",
          path: "/pricing/factors",
        },
        {
          id: "experiments",
          label: "Experiments",
          path: "/pricing/experiments",
        },
        { id: "simulation", label: "Simulation", path: "/pricing/simulation" },
        {
          id: "versioning",
          label: "Versioning & Approvals",
          path: "/pricing/versioning",
        },
      ],
    },
    {
      id: "underwriting",
      label: "Underwriting",
      icon: FileText,
      children: [
        {
          id: "rules-engine",
          label: "Rules Engine",
          path: "/underwriting/rules",
        },
        {
          id: "referrals",
          label: "Referrals Queue",
          path: "/underwriting/referrals",
        },
        {
          id: "guidelines",
          label: "Guidelines & Authority",
          path: "/underwriting/guidelines",
        },
        {
          id: "uw-templates",
          label: "Templates",
          path: "/underwriting/templates",
        },
        {
          id: "uw-reports",
          label: "UW Reports",
          path: "/underwriting/reports",
        },
      ],
    },
    {
      id: "quotes",
      label: "Quotes & Pipeline",
      icon: ClipboardList,
      children: [
        {
          id: "quotes-monitor",
          label: "Quotes Monitor",
          path: "/quotes/monitor",
        },
        { id: "lead-sources", label: "Lead Sources", path: "/quotes/sources" },
        {
          id: "recovery",
          label: "Recovery Journeys",
          path: "/quotes/recovery",
        },
      ],
    },
    {
      id: "policies",
      label: "Policies",
      icon: FileCheck,
      children: [
        {
          id: "policy-search",
          label: "Policy Search",
          path: "/policies/search",
        },
        {
          id: "policy-details",
          label: "Details & Timeline",
          path: "/policies/details",
        },
        { id: "policy-actions", label: "Actions", path: "/policies/actions" },
        {
          id: "beneficiaries",
          label: "Beneficiaries/Dependents",
          path: "/policies/beneficiaries",
        },
        { id: "assets", label: "Assets", path: "/policies/assets" },
        { id: "policy-docs", label: "Documents", path: "/policies/documents" },
      ],
    },
    {
      id: "claims",
      label: "Claims",
      icon: AlertTriangle,
      children: [
        { id: "fnol", label: "FNOL Intake", path: "/claims/fnol" },
        { id: "queues", label: "Queues", path: "/claims/queues" },
        {
          id: "assignments",
          label: "Assignments",
          path: "/claims/assignments",
        },
        {
          id: "workbenches",
          label: "Workbenches",
          path: "/claims/workbenches",
        },
        {
          id: "provider-coord",
          label: "Provider Coordination",
          path: "/claims/providers",
        },
        { id: "claim-payments", label: "Payments", path: "/claims/payments" },
        {
          id: "recoveries",
          label: "Recoveries/Subrogation",
          path: "/claims/recoveries",
        },
        { id: "quality", label: "Quality & Leakage", path: "/claims/quality" },
        {
          id: "claim-reports",
          label: "Claim Reports",
          path: "/claims/reports",
        },
      ],
    },
    {
      id: "reporting",
      label: "Reporting & Analytics",
      icon: BarChart3,
      children: [
        {
          id: "portfolio-kpis",
          label: "Portfolio KPIs",
          path: "/reporting/kpis",
        },
        {
          id: "claims-analytics",
          label: "Claims Analytics",
          path: "/reporting/claims",
        },
        {
          id: "sales-funnel",
          label: "Sales & Funnel",
          path: "/reporting/sales",
        },
        {
          id: "customer-analytics",
          label: "Customer Analytics",
          path: "/reporting/customers",
        },
        {
          id: "operational-reports",
          label: "Operational",
          path: "/reporting/operational",
        },
        {
          id: "regulatory",
          label: "Regulatory",
          path: "/reporting/regulatory",
        },
        {
          id: "data-exports",
          label: "Data Exports",
          path: "/reporting/exports",
        },
      ],
    },
    {
      id: "system",
      label: "System Health & Ops",
      icon: Activity,
      children: [
        { id: "status", label: "Status", path: "/system/status" },
        { id: "jobs", label: "Jobs & Queues", path: "/system/jobs" },
        { id: "logs-traces", label: "Logs & Traces", path: "/system/logs" },
        { id: "backups", label: "Backups & DR", path: "/system/backups" },
        {
          id: "releases",
          label: "Release Management",
          path: "/system/releases",
        },
        {
          id: "env-config",
          label: "Environment Config",
          path: "/system/config",
        },
      ],
    },
  ];

  return (
    <div
      className={`w-72 bg-white border-r border-gray-200 overflow-y-auto flex flex-col fixed lg:sticky top-0 h-screen transition-transform duration-200 ease-out ${
        isOpen ? "translate-x-0 z-50" : "-translate-x-full lg:translate-x-0"
      }`}
    >
      {/* Header */}
      <div className="p-6 border-b border-gray-200 flex-shrink-0">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-800 rounded-lg flex items-center justify-center">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">InsureCore</h1>
              <p className="text-xs text-gray-500">Admin Portal</p>
            </div>
          </div>
          {onClose && (
            <button
              onClick={onClose}
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors lg:hidden"
              aria-label="Close sidebar"
            >
              <X className="w-5 h-5 text-gray-600" />
            </button>
          )}
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto p-4">
        {menuItems.map((section) => {
          const Icon = section.icon;
          const isExpanded = expandedSections[section.id];

          return (
            <div key={section.id} className="mb-2">
              <button
                onClick={() => toggleSection(section.id)}
                className="w-full flex items-center justify-between px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
              >
                <div className="flex items-center space-x-3">
                  <Icon className="w-4 h-4 text-gray-500" />
                  <span>{section.label}</span>
                </div>
                {isExpanded ? (
                  <ChevronDown className="w-4 h-4 text-gray-400" />
                ) : (
                  <ChevronRight className="w-4 h-4 text-gray-400" />
                )}
              </button>

              {isExpanded && (
                <div className="mt-1 ml-4 space-y-1">
                  {section.children.map((child) => (
                    <NavLink
                      key={child.id}
                      to={child.path}
                      end
                      onClick={onClose}
                      className={({ isActive }) =>
                        `block px-3 py-2 text-sm rounded-lg transition-colors ${
                          isActive
                            ? "bg-blue-50 text-blue-700 font-medium"
                            : "text-gray-600 hover:bg-gray-50"
                        }`
                      }
                    >
                      {child.label}
                    </NavLink>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </nav>
    </div>
  );
};

export default InsuranceSidebar;
