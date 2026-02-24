"use client";

import React, { useState, useMemo } from "react";
import {
  Users,
  UserCheck,
  Search,
  Filter,
  Edit,
  Trash2,
  Eye,
  X,
  ChevronLeft,
  ChevronRight,
  Shield,
  Phone,
  Mail,
  FileText,
  AlertCircle,
  CheckCircle,
  Plus,
  Heart,
  Baby,
  Info,
  Download,
} from "lucide-react";

// ─── TypeScript Interfaces ────────────────────────────────────────────────────

interface PolicyPerson {
  id: string;
  policyId: string;
  policyholderName: string;
  type: "Beneficiary" | "Dependent";
  fullName: string;
  relationship: string;
  contactNumber: string;
  email: string;
  status: "Active" | "Inactive";
}

interface FormData {
  policyId: string;
  fullName: string;
  relationship: string;
  contactNumber: string;
  email: string;
  type: "Beneficiary" | "Dependent";
  status: "Active" | "Inactive";
}

interface FormErrors {
  policyId?: string;
  fullName?: string;
  relationship?: string;
  contactNumber?: string;
  email?: string;
}

// ─── Mock Data ────────────────────────────────────────────────────────────────

const MOCK_DATA: PolicyPerson[] = [
  {
    id: "1",
    policyId: "POL-001",
    policyholderName: "James Harrington",
    type: "Beneficiary",
    fullName: "Margaret Harrington",
    relationship: "Spouse",
    contactNumber: "555-0101",
    email: "margaret.h@email.com",
    status: "Active",
  },
  {
    id: "2",
    policyId: "POL-001",
    policyholderName: "James Harrington",
    type: "Dependent",
    fullName: "Lucas Harrington",
    relationship: "Son",
    contactNumber: "555-0102",
    email: "lucas.h@email.com",
    status: "Active",
  },
  {
    id: "3",
    policyId: "POL-002",
    policyholderName: "Sophia Caldwell",
    type: "Beneficiary",
    fullName: "Robert Caldwell",
    relationship: "Father",
    contactNumber: "555-0103",
    email: "robert.c@email.com",
    status: "Active",
  },
  {
    id: "4",
    policyId: "POL-003",
    policyholderName: "Nathan Whitfield",
    type: "Dependent",
    fullName: "Olivia Whitfield",
    relationship: "Daughter",
    contactNumber: "555-0104",
    email: "olivia.w@email.com",
    status: "Active",
  },
  {
    id: "5",
    policyId: "POL-003",
    policyholderName: "Nathan Whitfield",
    type: "Dependent",
    fullName: "Ethan Whitfield",
    relationship: "Son",
    contactNumber: "555-0105",
    email: "ethan.w@email.com",
    status: "Inactive",
  },
  {
    id: "6",
    policyId: "POL-004",
    policyholderName: "Claire Thornton",
    type: "Beneficiary",
    fullName: "Daniel Thornton",
    relationship: "Spouse",
    contactNumber: "555-0106",
    email: "daniel.t@email.com",
    status: "Active",
  },
  {
    id: "7",
    policyId: "POL-005",
    policyholderName: "Marcus Bellamy",
    type: "Beneficiary",
    fullName: "Sandra Bellamy",
    relationship: "Mother",
    contactNumber: "555-0107",
    email: "sandra.b@email.com",
    status: "Active",
  },
  {
    id: "8",
    policyId: "POL-005",
    policyholderName: "Marcus Bellamy",
    type: "Dependent",
    fullName: "Tyler Bellamy",
    relationship: "Son",
    contactNumber: "555-0108",
    email: "tyler.b@email.com",
    status: "Active",
  },
  {
    id: "9",
    policyId: "POL-006",
    policyholderName: "Isabelle Fontaine",
    type: "Beneficiary",
    fullName: "Pierre Fontaine",
    relationship: "Brother",
    contactNumber: "555-0109",
    email: "pierre.f@email.com",
    status: "Inactive",
  },
  {
    id: "10",
    policyId: "POL-007",
    policyholderName: "Derek Sinclair",
    type: "Dependent",
    fullName: "Ava Sinclair",
    relationship: "Daughter",
    contactNumber: "555-0110",
    email: "ava.s@email.com",
    status: "Active",
  },
  {
    id: "11",
    policyId: "POL-007",
    policyholderName: "Derek Sinclair",
    type: "Dependent",
    fullName: "Noah Sinclair",
    relationship: "Son",
    contactNumber: "555-0111",
    email: "noah.s@email.com",
    status: "Active",
  },
  {
    id: "12",
    policyId: "POL-008",
    policyholderName: "Priya Nambiar",
    type: "Beneficiary",
    fullName: "Arun Nambiar",
    relationship: "Spouse",
    contactNumber: "555-0112",
    email: "arun.n@email.com",
    status: "Active",
  },
];

const EMPTY_FORM: FormData = {
  policyId: "",
  fullName: "",
  relationship: "",
  contactNumber: "",
  email: "",
  type: "Beneficiary",
  status: "Active",
};

const ITEMS_PER_PAGE = 8;

// ─── Sub-Components ───────────────────────────────────────────────────────────

const StatusBadge: React.FC<{ status: "Active" | "Inactive" }> = ({
  status,
}) => (
  <span
    className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border
    ${
      status === "Active"
        ? "bg-green-50 text-green-700 border-green-200"
        : "bg-red-50 text-red-600 border-red-200"
    }`}
  >
    {status === "Active" ? (
      <CheckCircle className="w-3 h-3" />
    ) : (
      <AlertCircle className="w-3 h-3" />
    )}
    {status}
  </span>
);

const TypeBadge: React.FC<{ type: "Beneficiary" | "Dependent" }> = ({
  type,
}) => (
  <span
    className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border
    ${
      type === "Beneficiary"
        ? "bg-blue-50 text-blue-700 border-blue-200"
        : "bg-purple-50 text-purple-700 border-purple-200"
    }`}
  >
    {type === "Beneficiary" ? (
      <Heart className="w-3 h-3" />
    ) : (
      <Baby className="w-3 h-3" />
    )}
    {type}
  </span>
);

// ─── Main Page Component ──────────────────────────────────────────────────────

export default function BeneficiariesDependentsPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [records, setRecords] = useState<PolicyPerson[]>(MOCK_DATA);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState<
    "All" | "Beneficiary" | "Dependent"
  >("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<"add" | "edit" | "view">("add");
  const [selectedRecord, setSelectedRecord] = useState<PolicyPerson | null>(
    null,
  );
  const [formData, setFormData] = useState<FormData>(EMPTY_FORM);
  const [formErrors, setFormErrors] = useState<FormErrors>({});
  const [defaultType, setDefaultType] = useState<"Beneficiary" | "Dependent">(
    "Beneficiary",
  );

  // ── Derived stats ──
  const totalPolicies = useMemo(
    () => new Set(records.map((r) => r.policyId)).size,
    [records],
  );
  const totalBeneficiaries = useMemo(
    () => records.filter((r) => r.type === "Beneficiary").length,
    [records],
  );
  const totalDependents = useMemo(
    () => records.filter((r) => r.type === "Dependent").length,
    [records],
  );

  // Stats for the header
  const stats = [
    {
      label: "Total Policies",
      value: totalPolicies,
      icon: Shield,
      color: "blue",
    },
    {
      label: "Beneficiaries",
      value: totalBeneficiaries,
      icon: Heart,
      color: "green",
    },
    {
      label: "Dependents",
      value: totalDependents,
      icon: Baby,
      color: "purple",
    },
  ];

  // Quick action buttons
  const actionButtons = [
    {
      icon: Heart,
      label: "Add Beneficiary",
      onClick: () => openAddModal("Beneficiary"),
      color: "blue",
    },
    {
      icon: Baby,
      label: "Add Dependent",
      onClick: () => openAddModal("Dependent"),
      color: "purple",
    },
    { icon: Eye, label: "View All", onClick: () => {}, color: "green" },
    { icon: Download, label: "Export", onClick: () => {}, color: "orange" },
  ];

  // ── Filtered + paginated data ──
  const filtered = useMemo(() => {
    const q = searchQuery.toLowerCase();
    return records.filter((r) => {
      const matchesSearch =
        !q ||
        r.fullName.toLowerCase().includes(q) ||
        r.policyId.toLowerCase().includes(q) ||
        r.policyholderName.toLowerCase().includes(q);
      const matchesType = filterType === "All" || r.type === filterType;
      return matchesSearch && matchesType;
    });
  }, [records, searchQuery, filterType]);

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paginated = filtered.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE,
  );

  // ── Handlers ──
  const openAddModal = (type: "Beneficiary" | "Dependent") => {
    setDefaultType(type);
    setFormData({ ...EMPTY_FORM, type });
    setFormErrors({});
    setModalMode("add");
    setSelectedRecord(null);
    setIsModalOpen(true);
  };

  const openEditModal = (record: PolicyPerson) => {
    setFormData({
      policyId: record.policyId,
      fullName: record.fullName,
      relationship: record.relationship,
      contactNumber: record.contactNumber,
      email: record.email,
      type: record.type,
      status: record.status,
    });
    setFormErrors({});
    setModalMode("edit");
    setSelectedRecord(record);
    setIsModalOpen(true);
  };

  const openViewModal = (record: PolicyPerson) => {
    setSelectedRecord(record);
    setModalMode("view");
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedRecord(null);
    setFormData(EMPTY_FORM);
    setFormErrors({});
  };

  const validateForm = (): boolean => {
    const errors: FormErrors = {};
    if (!formData.policyId.trim()) errors.policyId = "Policy ID is required";
    if (!formData.fullName.trim()) errors.fullName = "Full name is required";
    if (!formData.relationship.trim())
      errors.relationship = "Relationship is required";
    if (!formData.contactNumber.trim())
      errors.contactNumber = "Contact number is required";
    if (!formData.email.trim()) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "Invalid email format";
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSave = () => {
    if (!validateForm()) return;
    if (modalMode === "add") {
      const newRecord: PolicyPerson = {
        id: String(Date.now()),
        policyholderName: "New Policyholder",
        ...formData,
      };
      setRecords((prev) => [newRecord, ...prev]);
    } else if (modalMode === "edit" && selectedRecord) {
      setRecords((prev) =>
        prev.map((r) =>
          r.id === selectedRecord.id ? { ...r, ...formData } : r,
        ),
      );
    }
    closeModal();
  };

  const handleDelete = (id: string) => {
    if (window.confirm("Are you sure you want to delete this record?")) {
      setRecords((prev) => prev.filter((r) => r.id !== id));
    }
  };

  const handleFormChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (formErrors[field as keyof FormErrors]) {
      setFormErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  return (
    <div className="flex min-h-screen bg-white">
      <div className="flex-1">
        {/* Mobile Header */}
        <div className="lg:hidden bg-white border-b border-gray-200 p-4">
          <button
            onClick={() => setSidebarOpen(true)}
            className="p-2 rounded-lg hover:bg-gray-100"
          >
            <Filter className="w-6 h-6 text-gray-600" />
          </button>
        </div>

        <div className="min-h-screen bg-gradient-to-br from-white via-blue-50 to-white">
          {/* Header */}
          <div className="bg-white border-b border-blue-100 shadow-sm">
            <div className="max-w-7xl mx-auto px-6 py-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-50 rounded-lg">
                  <Users className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">
                    Beneficiaries & Dependents
                  </h1>
                  <p className="text-sm text-gray-600">
                    Manage individuals linked to insurance policies
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="max-w-7xl mx-auto px-6 py-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              {stats.map((stat, idx) => {
                const Icon = stat.icon;
                const colorClasses = {
                  blue: "bg-blue-50 text-blue-600",
                  green: "bg-green-50 text-green-600",
                  purple: "bg-purple-50 text-purple-600",
                };
                return (
                  <div
                    key={idx}
                    className="bg-white rounded-xl p-5 shadow-sm border border-blue-100"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600 mb-1">
                          {stat.label}
                        </p>
                        <p className="text-3xl font-bold text-gray-900">
                          {stat.value}
                        </p>
                      </div>
                      <div
                        className={`p-3 rounded-lg ${colorClasses[stat.color as keyof typeof colorClasses]}`}
                      >
                        <Icon size={24} />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Quick Actions */}
            <div className="mb-8">
              <h2 className="text-xl font-bold text-gray-900 mb-4">
                Quick Actions
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {actionButtons.map((action, idx) => {
                  const Icon = action.icon;
                  const colorClasses: Record<string, string> = {
                    blue: "from-blue-500 to-blue-600",
                    purple: "from-purple-500 to-purple-600",
                    green: "from-green-500 to-green-600",
                    orange: "from-orange-500 to-orange-600",
                  };
                  return (
                    <button
                      key={idx}
                      onClick={action.onClick}
                      className={`flex flex-col items-center justify-center gap-2 p-4 bg-gradient-to-br ${colorClasses[action.color]} text-white rounded-xl shadow hover:shadow-lg transition-all transform hover:-translate-y-0.5`}
                    >
                      <Icon className="w-5 h-5" />
                      <span className="text-sm font-semibold">
                        {action.label}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Search and Filter Section */}
            <div className="mb-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Records</h2>
              <div className="flex flex-col sm:flex-row gap-3 mb-4">
                <div className="relative flex-1 max-w-md">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search by name or policy ID…"
                    value={searchQuery}
                    onChange={(e) => {
                      setSearchQuery(e.target.value);
                      setCurrentPage(1);
                    }}
                    className="w-full pl-9 pr-4 py-2.5 text-sm border border-gray-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div className="relative">
                  <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <select
                    value={filterType}
                    onChange={(e) => {
                      setFilterType(e.target.value as typeof filterType);
                      setCurrentPage(1);
                    }}
                    className="pl-9 pr-8 py-2.5 text-sm border border-gray-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none cursor-pointer"
                  >
                    <option value="All">All Types</option>
                    <option value="Beneficiary">Beneficiaries</option>
                    <option value="Dependent">Dependents</option>
                  </select>
                </div>
                <p className="text-sm text-gray-500 flex items-center">
                  {filtered.length} record{filtered.length !== 1 ? "s" : ""}{" "}
                  found
                </p>
              </div>
            </div>

            {/* Records Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-8">
              {paginated.length === 0 ? (
                <div className="col-span-full text-center py-12">
                  <div className="flex flex-col items-center gap-3">
                    <div className="p-4 bg-gray-100 rounded-full">
                      <Search className="w-8 h-8 text-gray-400" />
                    </div>
                    <p className="text-gray-500 font-medium">
                      No records found
                    </p>
                    <p className="text-sm text-gray-400">
                      Try adjusting your search or filter
                    </p>
                  </div>
                </div>
              ) : (
                paginated.map((record) => (
                  <div
                    key={record.id}
                    className="bg-white rounded-xl border border-gray-200 hover:border-blue-300 shadow-sm hover:shadow-md transition-all p-5"
                  >
                    {/* Header with initials and badges */}
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center flex-shrink-0 shadow-md">
                          <span className="text-white text-lg font-bold">
                            {record.fullName
                              .split(" ")
                              .map((n) => n[0])
                              .join("")
                              .slice(0, 2)}
                          </span>
                        </div>
                        <div>
                          <h3 className="font-bold text-gray-900">
                            {record.fullName}
                          </h3>
                          <p className="text-xs text-gray-500">
                            {record.relationship}
                          </p>
                        </div>
                      </div>
                      <div className="flex gap-1">
                        <button
                          onClick={() => openViewModal(record)}
                          className="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                          title="View"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => openEditModal(record)}
                          className="p-1.5 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                          title="Edit"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(record.id)}
                          className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          title="Delete"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    {/* Badges */}
                    <div className="flex gap-2 mb-4">
                      <TypeBadge type={record.type} />
                      <StatusBadge status={record.status} />
                    </div>

                    {/* Details */}
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-sm">
                        <FileText className="w-4 h-4 text-gray-400" />
                        <span className="text-gray-600 font-medium">
                          {record.policyId}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <UserCheck className="w-4 h-4 text-gray-400" />
                        <span className="text-gray-600">
                          {record.policyholderName}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Phone className="w-4 h-4 text-gray-400" />
                        <span className="text-gray-600">
                          {record.contactNumber}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Mail className="w-4 h-4 text-gray-400" />
                        <span className="text-gray-600 truncate">
                          {record.email}
                        </span>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Pagination */}
            {filtered.length > 0 && (
              <div className="flex flex-col sm:flex-row items-center justify-between gap-3 py-4 border-t border-gray-200">
                <p className="text-sm text-gray-500">
                  Showing{" "}
                  <span className="font-semibold text-gray-700">
                    {Math.min(
                      (currentPage - 1) * ITEMS_PER_PAGE + 1,
                      filtered.length,
                    )}
                  </span>
                  –
                  <span className="font-semibold text-gray-700">
                    {Math.min(currentPage * ITEMS_PER_PAGE, filtered.length)}
                  </span>{" "}
                  of{" "}
                  <span className="font-semibold text-gray-700">
                    {filtered.length}
                  </span>{" "}
                  records
                </p>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                    disabled={currentPage === 1}
                    className="p-2 rounded-lg hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                  >
                    <ChevronLeft className="w-4 h-4 text-gray-600" />
                  </button>
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                    (page) => (
                      <button
                        key={page}
                        onClick={() => setCurrentPage(page)}
                        className={`w-9 h-9 text-sm font-medium rounded-lg transition-colors ${
                          currentPage === page
                            ? "bg-blue-600 text-white shadow-sm"
                            : "text-gray-600 hover:bg-gray-100"
                        }`}
                      >
                        {page}
                      </button>
                    ),
                  )}
                  <button
                    onClick={() =>
                      setCurrentPage((p) => Math.min(totalPages, p + 1))
                    }
                    disabled={currentPage === totalPages || totalPages === 0}
                    className="p-2 rounded-lg hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                  >
                    <ChevronRight className="w-4 h-4 text-gray-600" />
                  </button>
                </div>
              </div>
            )}

            {/* Info Note */}
            <div className="mt-8 flex items-start gap-3 p-4 bg-blue-50 rounded-lg border border-blue-200">
              <Info className="w-5 h-5 text-blue-600 mt-1 flex-shrink-0" />
              <p className="text-blue-900 text-sm">
                This dashboard helps you manage all beneficiaries and dependents
                across your insurance policies. Each card displays key
                information at a glance, with quick actions for viewing,
                editing, or removing records.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ── Modal ── */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={closeModal}
          />

          {/* Modal panel */}
          <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-xl max-h-[90vh] overflow-y-auto">
            {/* Modal header */}
            <div
              className={`px-6 py-5 border-b border-gray-200 flex items-center justify-between rounded-t-2xl
              ${modalMode === "view" ? "bg-gradient-to-r from-blue-50 to-purple-50" : "bg-white"}`}
            >
              <div className="flex items-center gap-3">
                <div
                  className={`p-2.5 rounded-xl ${
                    modalMode === "view"
                      ? "bg-blue-100"
                      : modalMode === "edit"
                        ? "bg-green-100"
                        : "bg-blue-100"
                  }`}
                >
                  {modalMode === "view" ? (
                    <Eye className="w-5 h-5 text-blue-600" />
                  ) : modalMode === "edit" ? (
                    <Edit className="w-5 h-5 text-green-600" />
                  ) : (
                    <Plus className="w-5 h-5 text-blue-600" />
                  )}
                </div>
                <div>
                  <h2 className="text-lg font-bold text-gray-900">
                    {modalMode === "view"
                      ? "View Record"
                      : modalMode === "edit"
                        ? "Edit Record"
                        : `Add ${defaultType}`}
                  </h2>
                  <p className="text-xs text-gray-500">
                    {modalMode === "view"
                      ? "Full record details"
                      : modalMode === "edit"
                        ? "Update existing record"
                        : "Fill in the details below"}
                  </p>
                </div>
              </div>
              <button
                onClick={closeModal}
                className="p-2 hover:bg-gray-100 rounded-xl transition-colors"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            {/* Modal body */}
            <div className="p-6">
              {modalMode === "view" && selectedRecord ? (
                /* ── View mode ── */
                <div className="space-y-4">
                  <div className="flex items-center gap-4 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl border border-blue-100">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center flex-shrink-0 shadow-lg">
                      <span className="text-white text-xl font-bold">
                        {selectedRecord.fullName
                          .split(" ")
                          .map((n) => n[0])
                          .join("")
                          .slice(0, 2)}
                      </span>
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-gray-900">
                        {selectedRecord.fullName}
                      </h3>
                      <div className="flex items-center gap-2 mt-1">
                        <TypeBadge type={selectedRecord.type} />
                        <StatusBadge status={selectedRecord.status} />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    {[
                      {
                        label: "Policy ID",
                        value: selectedRecord.policyId,
                        icon: FileText,
                      },
                      {
                        label: "Relationship",
                        value: selectedRecord.relationship,
                        icon: Users,
                      },
                      {
                        label: "Phone",
                        value: selectedRecord.contactNumber,
                        icon: Phone,
                      },
                      {
                        label: "Email",
                        value: selectedRecord.email,
                        icon: Mail,
                      },
                    ].map(({ label, value, icon: Icon }) => (
                      <div
                        key={label}
                        className="p-3 bg-gray-50 rounded-xl border border-gray-100"
                      >
                        <div className="flex items-center gap-1.5 mb-1">
                          <Icon className="w-4 h-4 text-blue-500" />
                          <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                            {label}
                          </span>
                        </div>
                        <p className="text-sm font-medium text-gray-900 truncate">
                          {value}
                        </p>
                      </div>
                    ))}
                  </div>

                  <div className="p-3 bg-gray-50 rounded-xl border border-gray-100">
                    <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">
                      Policyholder
                    </p>
                    <p className="text-sm font-medium text-gray-900">
                      {selectedRecord.policyholderName}
                    </p>
                  </div>

                  <div className="flex gap-3 pt-2">
                    <button
                      onClick={() => {
                        openEditModal(selectedRecord);
                      }}
                      className="flex-1 py-2.5 bg-green-600 text-white rounded-xl hover:bg-green-700 transition-colors font-medium text-sm flex items-center justify-center gap-2"
                    >
                      <Edit className="w-4 h-4" /> Edit Record
                    </button>
                    <button
                      onClick={closeModal}
                      className="flex-1 py-2.5 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-colors font-medium text-sm"
                    >
                      Close
                    </button>
                  </div>
                </div>
              ) : (
                /* ── Add / Edit form ── */
                <div className="space-y-4">
                  {/* Policy ID */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                      Policy ID <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <FileText className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <input
                        type="text"
                        placeholder="e.g. POL-001"
                        value={formData.policyId}
                        onChange={(e) =>
                          handleFormChange("policyId", e.target.value)
                        }
                        className={`w-full pl-9 pr-4 py-2.5 text-sm border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${
                          formErrors.policyId
                            ? "border-red-400 bg-red-50"
                            : "border-gray-200 bg-gray-50 focus:bg-white"
                        }`}
                      />
                    </div>
                    {formErrors.policyId && (
                      <p className="text-xs text-red-500 mt-1 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />{" "}
                        {formErrors.policyId}
                      </p>
                    )}
                  </div>

                  {/* Full Name */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                      Full Name <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <UserCheck className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <input
                        type="text"
                        placeholder="Full legal name"
                        value={formData.fullName}
                        onChange={(e) =>
                          handleFormChange("fullName", e.target.value)
                        }
                        className={`w-full pl-9 pr-4 py-2.5 text-sm border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${
                          formErrors.fullName
                            ? "border-red-400 bg-red-50"
                            : "border-gray-200 bg-gray-50 focus:bg-white"
                        }`}
                      />
                    </div>
                    {formErrors.fullName && (
                      <p className="text-xs text-red-500 mt-1 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />{" "}
                        {formErrors.fullName}
                      </p>
                    )}
                  </div>

                  {/* Relationship */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                      Relationship <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <Heart className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <input
                        type="text"
                        placeholder="e.g. Spouse, Son, Daughter"
                        value={formData.relationship}
                        onChange={(e) =>
                          handleFormChange("relationship", e.target.value)
                        }
                        className={`w-full pl-9 pr-4 py-2.5 text-sm border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${
                          formErrors.relationship
                            ? "border-red-400 bg-red-50"
                            : "border-gray-200 bg-gray-50 focus:bg-white"
                        }`}
                      />
                    </div>
                    {formErrors.relationship && (
                      <p className="text-xs text-red-500 mt-1 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />{" "}
                        {formErrors.relationship}
                      </p>
                    )}
                  </div>

                  {/* Contact Number */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                      Contact Number <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <input
                        type="tel"
                        placeholder="555-0100"
                        value={formData.contactNumber}
                        onChange={(e) =>
                          handleFormChange("contactNumber", e.target.value)
                        }
                        className={`w-full pl-9 pr-4 py-2.5 text-sm border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${
                          formErrors.contactNumber
                            ? "border-red-400 bg-red-50"
                            : "border-gray-200 bg-gray-50 focus:bg-white"
                        }`}
                      />
                    </div>
                    {formErrors.contactNumber && (
                      <p className="text-xs text-red-500 mt-1 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />{" "}
                        {formErrors.contactNumber}
                      </p>
                    )}
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                      Email Address <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <input
                        type="email"
                        placeholder="email@example.com"
                        value={formData.email}
                        onChange={(e) =>
                          handleFormChange("email", e.target.value)
                        }
                        className={`w-full pl-9 pr-4 py-2.5 text-sm border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${
                          formErrors.email
                            ? "border-red-400 bg-red-50"
                            : "border-gray-200 bg-gray-50 focus:bg-white"
                        }`}
                      />
                    </div>
                    {formErrors.email && (
                      <p className="text-xs text-red-500 mt-1 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" /> {formErrors.email}
                      </p>
                    )}
                  </div>

                  {/* Type & Status row */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                        Type
                      </label>
                      <select
                        value={formData.type}
                        onChange={(e) =>
                          handleFormChange("type", e.target.value)
                        }
                        className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-xl bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
                      >
                        <option value="Beneficiary">Beneficiary</option>
                        <option value="Dependent">Dependent</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                        Status
                      </label>
                      <select
                        value={formData.status}
                        onChange={(e) =>
                          handleFormChange("status", e.target.value)
                        }
                        className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-xl bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
                      >
                        <option value="Active">Active</option>
                        <option value="Inactive">Inactive</option>
                      </select>
                    </div>
                  </div>

                  {/* Action buttons */}
                  <div className="flex gap-3 pt-2">
                    <button
                      onClick={handleSave}
                      className="flex-1 py-2.5 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors font-semibold text-sm flex items-center justify-center gap-2"
                    >
                      <CheckCircle className="w-4 h-4" />
                      {modalMode === "edit" ? "Save Changes" : "Add Record"}
                    </button>
                    <button
                      onClick={closeModal}
                      className="flex-1 py-2.5 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-colors font-medium text-sm"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
