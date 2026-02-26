import React, { useState, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
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
  PanelLeftClose,
  PanelLeft,
} from "lucide-react";
import { useSidebar } from "../contexts/useSidebar";

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

interface InsuranceSidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

const InsuranceSidebar: React.FC<InsuranceSidebarProps> = ({
  isOpen = false,
  onClose,
}) => {
  const {
    isCollapsed,
    setIsCollapsed,
    expandedSections,
    toggleSection,
    setActiveSectionId,
  } = useSidebar();

  const [hoveredSection, setHoveredSection] = useState<string | null>(null);
  const location = useLocation();

  const menuItems: MenuSection[] = [
    {
      id: "home",
      label: "Home & Dashboards",
      icon: Home,
      children: [
        { id: "dashboard", label: "Dashboard", path: "/dashboard" },
        {
          id: "executive-overview",
          label: "Executive Overview",
          path: "/dashboard/executive",
        },
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
        { id: "forms", label: "Forms & Disclosures", path: "/forms" },
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

  // Set active section based on current path
  useEffect(() => {
    const currentPath = location.pathname;
    const activeSection = menuItems.find((section) =>
      section.children.some((child) => child.path === currentPath),
    );
    if (activeSection) {
      setActiveSectionId(activeSection.id);
    }
  }, [location.pathname, menuItems, setActiveSectionId]);

  const sidebarWidthClass = isCollapsed ? "w-16" : "w-64";

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024 && onClose) {
        onClose();
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [onClose]);

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed lg:sticky top-0 h-screen ${sidebarWidthClass} bg-white border-r border-gray-200 overflow-y-auto flex flex-col transition-all duration-200 ease-out z-50 ${
          isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        {/* Header */}
        <div
          className={`${isCollapsed ? "p-2" : "p-4"} border-b border-gray-200 flex-shrink-0`}
        >
          <div className="flex items-center justify-between">
            <div
              className={`flex items-center ${isCollapsed ? "justify-center w-full" : "space-x-3"}`}
            >
              <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-blue-800 rounded-lg flex items-center justify-center flex-shrink-0">
                <Shield className="w-5 h-5 text-white" />
              </div>
              {!isCollapsed && (
                <div>
                  <h1 className="text-lg font-bold text-gray-900">
                    InsureCore
                  </h1>
                  <p className="text-xs text-gray-500">Admin Portal</p>
                </div>
              )}
            </div>
          </div>

          {/* Collapse/Expand and Close buttons */}
          <div
            className={`flex items-center ${isCollapsed ? "flex-col mt-2 gap-2" : "justify-between mt-3"}`}
          >
            {/* Mobile close button */}
            {onClose && (
              <button
                onClick={onClose}
                className="p-2 rounded-lg hover:bg-gray-100 transition-colors lg:hidden"
                aria-label="Close sidebar"
              >
                <X className="w-5 h-5 text-gray-600" />
              </button>
            )}

            {/* Desktop collapse/expand button */}
            <button
              onClick={() => setIsCollapsed(!isCollapsed)}
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors hidden lg:flex"
              aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
              title={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
            >
              {isCollapsed ? (
                <PanelLeft className="w-5 h-5 text-gray-600" />
              ) : (
                <PanelLeftClose className="w-5 h-5 text-gray-600" />
              )}
            </button>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto p-2">
          {menuItems.map((section) => {
            const Icon = section.icon;
            const isExpanded = expandedSections[section.id] || false;
            const hasActiveChild = section.children.some(
              (child) => child.path === location.pathname,
            );

            return (
              <div key={section.id} className="mb-1 relative">
                {/* Section header button */}
                <div className="relative group">
                  <button
                    onClick={() => toggleSection(section.id)}
                    onMouseEnter={() =>
                      isCollapsed && setHoveredSection(section.id)
                    }
                    onMouseLeave={() => setHoveredSection(null)}
                    className={`w-full flex items-center ${isCollapsed ? "justify-center p-2" : "justify-between px-3 py-2"} text-sm font-medium rounded-lg transition-colors ${
                      hasActiveChild
                        ? "bg-blue-100 text-blue-800"
                        : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                    }`}
                  >
                    <div
                      className={`flex items-center ${isCollapsed ? "" : "space-x-3"}`}
                    >
                      <Icon
                        className={`w-5 h-5 ${hasActiveChild ? "text-blue-600" : "text-gray-500"} flex-shrink-0`}
                      />
                      {!isCollapsed && (
                        <span className="truncate">{section.label}</span>
                      )}
                    </div>
                    {!isCollapsed && (
                      <div className="flex-shrink-0">
                        {isExpanded ? (
                          <ChevronDown className="w-4 h-4 text-gray-400" />
                        ) : (
                          <ChevronRight className="w-4 h-4 text-gray-400" />
                        )}
                      </div>
                    )}
                  </button>

                  {/* Tooltip for collapsed mode */}
                  {isCollapsed && hoveredSection === section.id && (
                    <div className="absolute left-full top-0 ml-2 px-3 py-2 bg-gray-900 text-white text-sm rounded-lg shadow-lg whitespace-nowrap z-50">
                      {section.label}
                      <div className="absolute -left-1 top-1/2 -translate-y-1/2 border-4 border-transparent border-r-gray-900" />
                    </div>
                  )}
                </div>

                {/* Submenu items */}
                {isExpanded && !isCollapsed && (
                  <div className="mt-1 ml-4 space-y-1">
                    {section.children.map((child) => (
                      <NavLink
                        key={child.id}
                        to={child.path}
                        onClick={() => {
                          if (onClose && window.innerWidth < 1024) {
                            onClose();
                          }
                        }}
                        className={({ isActive }) =>
                          `block px-3 py-2 text-sm rounded-lg transition-colors ${
                            isActive
                              ? "bg-blue-100 text-blue-800 font-medium"
                              : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
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
      </aside>
    </>
  );
};

export default InsuranceSidebar;
