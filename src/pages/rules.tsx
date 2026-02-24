import React, { useState } from "react";
import {
  Search,
  Plus,
  Edit2,
  Trash2,
  Filter,
  Download,
  ChevronDown,
  CheckCircle,
  XCircle,
  AlertCircle,
  Shield,
} from "lucide-react";

interface InsuranceRule {
  id: string;
  name: string;
  type: string;
  status: "active" | "inactive" | "pending";
  coverage: string;
  premium: number;
  deductible: number;
  lastModified: string;
}

const Rules: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"list" | "rules">("list");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [showAddRule, setShowAddRule] = useState<boolean>(false);
  const [editingRule, setEditingRule] = useState<InsuranceRule | null>(null);

  const [rules, setRules] = useState<InsuranceRule[]>([
    {
      id: "1",
      name: "Standard Health Insurance",
      type: "Health",
      status: "active",
      coverage: "Comprehensive",
      premium: 250,
      deductible: 1000,
      lastModified: "2025-10-15",
    },
    {
      id: "2",
      name: "Auto Insurance Basic",
      type: "Auto",
      status: "active",
      coverage: "Basic",
      premium: 120,
      deductible: 500,
      lastModified: "2025-10-10",
    },
    {
      id: "3",
      name: "Home Insurance Premium",
      type: "Home",
      status: "pending",
      coverage: "Premium",
      premium: 180,
      deductible: 750,
      lastModified: "2025-10-18",
    },
    {
      id: "4",
      name: "Life Insurance Standard",
      type: "Life",
      status: "inactive",
      coverage: "Standard",
      premium: 95,
      deductible: 0,
      lastModified: "2025-09-28",
    },
  ]);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "active":
        return <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-500" />;
      case "inactive":
        return <XCircle className="w-4 h-4 sm:w-5 sm:h-5 text-red-500" />;
      case "pending":
        return (
          <AlertCircle className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-500" />
        );
      default:
        return null;
    }
  };

  const getStatusBadge = (status: string) => {
    const colors = {
      active: "bg-green-100 text-green-700",
      inactive: "bg-red-100 text-red-700",
      pending: "bg-yellow-100 text-yellow-700",
    };
    return colors[status as keyof typeof colors] || "bg-gray-100 text-gray-700";
  };

  const handleEditRule = (rule: InsuranceRule) => {
    setEditingRule(rule);
  };

  const handleSaveEdit = () => {
    if (editingRule) {
      const updatedRules = rules.map((rule) =>
        rule.id === editingRule.id
          ? {
              ...editingRule,
              lastModified: new Date().toISOString().split("T")[0],
            }
          : rule,
      );
      setRules(updatedRules);
      setEditingRule(null);
    }
  };

  const handleDeleteRule = (ruleId: string) => {
    if (window.confirm("Are you sure you want to delete this rule?")) {
      const updatedRules = rules.filter((rule) => rule.id !== ruleId);
      setRules(updatedRules);
    }
  };

  const handleAddRule = (
    newRule: Omit<InsuranceRule, "id" | "lastModified">,
  ) => {
    const rule: InsuranceRule = {
      ...newRule,
      id: (rules.length + 1).toString(),
      lastModified: new Date().toISOString().split("T")[0],
    };
    setRules([...rules, rule]);
    setShowAddRule(false);
  };

  const filteredRules = rules.filter((rule) => {
    const matchesSearch =
      rule.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      rule.type.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter =
      filterStatus === "all" || rule.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-blue-50 to-blue-100">
      {/* Header */}
      <header className="bg-white border-b border-blue-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-blue-900">
                Insurance Admin Portal
              </h1>
              <p className="text-xs sm:text-sm text-blue-600 mt-1">
                Manage policies and rules
              </p>
            </div>
            <div className="flex items-center gap-2 sm:gap-3">
              <button className="px-3 sm:px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition flex items-center gap-2 text-sm sm:text-base">
                <Download className="w-4 h-4" />
                <span className="hidden sm:inline">Export</span>
              </button>
              <button
                onClick={() => setShowAddRule(true)}
                className="px-3 sm:px-4 py-2 bg-blue-700 text-white rounded-lg hover:bg-blue-800 transition flex items-center gap-2 font-semibold text-sm sm:text-base"
              >
                <Plus className="w-4 h-4" />
                <span className="hidden sm:inline">Add Rule</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
        {/* Tabs */}
        <div className="flex gap-2 mb-4 sm:mb-6">
          <button
            onClick={() => setActiveTab("list")}
            className={`flex-1 sm:flex-none px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-semibold transition text-sm sm:text-base ${
              activeTab === "list"
                ? "bg-blue-600 text-white shadow-md"
                : "bg-white text-blue-700 hover:bg-blue-50"
            }`}
          >
            Insurance List
          </button>
          <button
            onClick={() => setActiveTab("rules")}
            className={`flex-1 sm:flex-none px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-semibold transition text-sm sm:text-base ${
              activeTab === "rules"
                ? "bg-blue-600 text-white shadow-md"
                : "bg-white text-blue-700 hover:bg-blue-50"
            }`}
          >
            Rules Management
          </button>
        </div>

        {/* Search and Filter Bar */}
        <div className="bg-white rounded-xl shadow-md p-4 mb-4 sm:mb-6 border border-blue-100">
          <div className="flex flex-col sm:flex-row gap-4 items-center">
            <div className="flex-1 relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-400 w-4 h-4 sm:w-5 sm:h-5" />
              <input
                type="text"
                placeholder="Search by name or type..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 sm:pl-10 pr-4 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
              />
            </div>
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <Filter className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600" />
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="flex-1 sm:w-auto px-3 sm:px-4 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-sm sm:text-base"
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="pending">Pending</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
          </div>
        </div>

        {/* Content Based on Active Tab */}
        {activeTab === "list" ? (
          <div className="bg-white rounded-xl shadow-lg border border-blue-100 overflow-hidden">
            {/* Desktop Table */}
            <div className="hidden lg:block overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gradient-to-r from-blue-600 to-blue-700 text-white">
                  <tr>
                    <th className="px-4 sm:px-6 py-3 text-left text-xs sm:text-sm font-semibold">
                      Status
                    </th>
                    <th className="px-4 sm:px-6 py-3 text-left text-xs sm:text-sm font-semibold">
                      Name
                    </th>
                    <th className="px-4 sm:px-6 py-3 text-left text-xs sm:text-sm font-semibold">
                      Type
                    </th>
                    <th className="px-4 sm:px-6 py-3 text-left text-xs sm:text-sm font-semibold">
                      Coverage
                    </th>
                    <th className="px-4 sm:px-6 py-3 text-left text-xs sm:text-sm font-semibold">
                      Premium
                    </th>
                    <th className="px-4 sm:px-6 py-3 text-left text-xs sm:text-sm font-semibold">
                      Deductible
                    </th>
                    <th className="px-4 sm:px-6 py-3 text-left text-xs sm:text-sm font-semibold">
                      Last Modified
                    </th>
                    <th className="px-4 sm:px-6 py-3 text-left text-xs sm:text-sm font-semibold">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-blue-100">
                  {filteredRules.map((rule) => (
                    <tr key={rule.id} className="hover:bg-blue-50 transition">
                      <td className="px-4 sm:px-6 py-3 sm:py-4">
                        <div className="flex items-center gap-2">
                          {getStatusIcon(rule.status)}
                          <span
                            className={`px-2 sm:px-3 py-1 rounded-full text-xs font-semibold ${getStatusBadge(rule.status)}`}
                          >
                            {rule.status}
                          </span>
                        </div>
                      </td>
                      <td className="px-4 sm:px-6 py-3 sm:py-4 font-medium text-blue-900 text-sm sm:text-base">
                        {rule.name}
                      </td>
                      <td className="px-4 sm:px-6 py-3 sm:py-4 text-blue-700 text-sm sm:text-base">
                        {rule.type}
                      </td>
                      <td className="px-4 sm:px-6 py-3 sm:py-4 text-blue-700 text-sm sm:text-base">
                        {rule.coverage}
                      </td>
                      <td className="px-4 sm:px-6 py-3 sm:py-4 text-blue-900 font-semibold text-sm sm:text-base">
                        ${rule.premium}
                      </td>
                      <td className="px-4 sm:px-6 py-3 sm:py-4 text-blue-700 text-sm sm:text-base">
                        ${rule.deductible}
                      </td>
                      <td className="px-4 sm:px-6 py-3 sm:py-4 text-blue-600 text-xs sm:text-sm">
                        {rule.lastModified}
                      </td>
                      <td className="px-4 sm:px-6 py-3 sm:py-4">
                        <div className="flex gap-1 sm:gap-2">
                          <button
                            onClick={() => handleEditRule(rule)}
                            className="p-1 sm:p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition"
                          >
                            <Edit2 className="w-3 h-3 sm:w-4 sm:h-4" />
                          </button>
                          <button
                            onClick={() => handleDeleteRule(rule.id)}
                            className="p-1 sm:p-2 text-red-600 hover:bg-red-100 rounded-lg transition"
                          >
                            <Trash2 className="w-3 h-3 sm:w-4 sm:h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile Cards */}
            <div className="lg:hidden p-4 space-y-4">
              {filteredRules.map((rule) => (
                <div
                  key={rule.id}
                  className="bg-white border border-blue-200 rounded-lg shadow-sm p-4 hover:shadow-md transition"
                >
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex items-center gap-2">
                      {getStatusIcon(rule.status)}
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-semibold ${getStatusBadge(rule.status)}`}
                      >
                        {rule.status}
                      </span>
                    </div>
                    <div className="flex gap-1">
                      <button
                        onClick={() => handleEditRule(rule)}
                        className="p-1 text-blue-600 hover:bg-blue-100 rounded-lg transition"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteRule(rule.id)}
                        className="p-1 text-red-600 hover:bg-red-100 rounded-lg transition"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div>
                      <h3 className="font-semibold text-blue-900 text-base">
                        {rule.name}
                      </h3>
                      <p className="text-blue-700 text-sm">
                        {rule.type} • {rule.coverage}
                      </p>
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div>
                        <span className="text-blue-600 font-medium">
                          Premium:
                        </span>
                        <span className="text-blue-900 font-semibold ml-1">
                          ${rule.premium}
                        </span>
                      </div>
                      <div>
                        <span className="text-blue-600 font-medium">
                          Deductible:
                        </span>
                        <span className="text-blue-900 font-semibold ml-1">
                          ${rule.deductible}
                        </span>
                      </div>
                    </div>

                    <div className="text-xs text-blue-500">
                      Last modified: {rule.lastModified}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {filteredRules.length === 0 && (
              <div className="text-center py-8 sm:py-12 text-blue-400 text-sm sm:text-base">
                No insurance policies found
              </div>
            )}
          </div>
        ) : (
          <div className="grid gap-4 sm:gap-6">
            {/* Rules Overview Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-6">
              <div className="bg-white rounded-xl p-4 sm:p-6 border border-blue-200 shadow-md hover:shadow-lg transition">
                <h3 className="text-base sm:text-lg font-semibold text-blue-900 mb-2">
                  Eligibility Rules
                </h3>
                <p className="text-2xl sm:text-3xl font-bold text-blue-600 mb-2">
                  12
                </p>
                <p className="text-xs sm:text-sm text-blue-500">
                  Active criteria
                </p>
              </div>
              <div className="bg-white rounded-xl p-4 sm:p-6 border border-blue-200 shadow-md hover:shadow-lg transition">
                <h3 className="text-base sm:text-lg font-semibold text-blue-900 mb-2">
                  Pricing Rules
                </h3>
                <p className="text-2xl sm:text-3xl font-bold text-blue-600 mb-2">
                  8
                </p>
                <p className="text-xs sm:text-sm text-blue-500">
                  Dynamic calculations
                </p>
              </div>
              <div className="bg-white rounded-xl p-4 sm:p-6 border border-blue-200 shadow-md hover:shadow-lg transition">
                <h3 className="text-base sm:text-lg font-semibold text-blue-900 mb-2">
                  Approval Rules
                </h3>
                <p className="text-2xl sm:text-3xl font-bold text-blue-600 mb-2">
                  6
                </p>
                <p className="text-xs sm:text-sm text-blue-500">
                  Workflow conditions
                </p>
              </div>
            </div>

            {/* Rules Details */}
            <div className="bg-white rounded-xl shadow-lg border border-blue-100 p-4 sm:p-6">
              <h2 className="text-xl sm:text-2xl font-bold text-blue-900 mb-4 sm:mb-6">
                Insurance Rules Configuration
              </h2>

              <div className="space-y-3 sm:space-y-4">
                <div className="border border-blue-200 rounded-lg p-3 sm:p-4 hover:bg-blue-50 transition">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                    <div className="flex-1">
                      <h3 className="font-semibold text-blue-900 text-base sm:text-lg">
                        Age-Based Premium Calculation
                      </h3>
                      <p className="text-xs sm:text-sm text-blue-600 mt-1">
                        Adjust premiums based on applicant age groups
                      </p>
                      <div className="flex flex-wrap gap-2 sm:gap-4 mt-2 text-xs sm:text-sm text-blue-700">
                        <span>
                          Type: <strong>Pricing</strong>
                        </span>
                        <span>
                          Priority: <strong>High</strong>
                        </span>
                        <span className="text-green-600 font-semibold">
                          ✓ Active
                        </span>
                      </div>
                    </div>
                    <div className="flex gap-2 self-end sm:self-auto">
                      <button
                        onClick={() =>
                          alert("Editing Age-Based Premium Calculation rule...")
                        }
                        className="px-3 sm:px-4 py-1 sm:py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition text-xs sm:text-sm"
                      >
                        Edit
                      </button>
                      <ChevronDown className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600" />
                    </div>
                  </div>
                </div>

                <div className="border border-blue-200 rounded-lg p-3 sm:p-4 hover:bg-blue-50 transition">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                    <div className="flex-1">
                      <h3 className="font-semibold text-blue-900 text-base sm:text-lg">
                        Pre-existing Condition Check
                      </h3>
                      <p className="text-xs sm:text-sm text-blue-600 mt-1">
                        Validate medical history requirements
                      </p>
                      <div className="flex flex-wrap gap-2 sm:gap-4 mt-2 text-xs sm:text-sm text-blue-700">
                        <span>
                          Type: <strong>Eligibility</strong>
                        </span>
                        <span>
                          Priority: <strong>Critical</strong>
                        </span>
                        <span className="text-green-600 font-semibold">
                          ✓ Active
                        </span>
                      </div>
                    </div>
                    <div className="flex gap-2 self-end sm:self-auto">
                      <button
                        onClick={() =>
                          alert("Editing Pre-existing Condition Check rule...")
                        }
                        className="px-3 sm:px-4 py-1 sm:py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition text-xs sm:text-sm"
                      >
                        Edit
                      </button>
                      <ChevronDown className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600" />
                    </div>
                  </div>
                </div>

                <div className="border border-blue-200 rounded-lg p-3 sm:p-4 hover:bg-blue-50 transition">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                    <div className="flex-1">
                      <h3 className="font-semibold text-blue-900 text-base sm:text-lg">
                        Multi-Policy Discount
                      </h3>
                      <p className="text-xs sm:text-sm text-blue-600 mt-1">
                        Apply discounts for bundled policies
                      </p>
                      <div className="flex flex-wrap gap-2 sm:gap-4 mt-2 text-xs sm:text-sm text-blue-700">
                        <span>
                          Type: <strong>Pricing</strong>
                        </span>
                        <span>
                          Priority: <strong>Medium</strong>
                        </span>
                        <span className="text-green-600 font-semibold">
                          ✓ Active
                        </span>
                      </div>
                    </div>
                    <div className="flex gap-2 self-end sm:self-auto">
                      <button
                        onClick={() =>
                          alert("Editing Multi-Policy Discount rule...")
                        }
                        className="px-3 sm:px-4 py-1 sm:py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition text-xs sm:text-sm"
                      >
                        Edit
                      </button>
                      <ChevronDown className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Add Rule Modal */}
      {showAddRule && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
          onClick={() => setShowAddRule(false)}
        >
          <div
            className="bg-white rounded-xl shadow-2xl p-4 sm:p-6 lg:p-8 max-w-2xl w-full mx-4 border-2 border-blue-200 max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-xl sm:text-2xl font-bold text-blue-900 mb-4 sm:mb-6">
              Add New Insurance Rule
            </h2>
            <div className="space-y-3 sm:space-y-4">
              <div>
                <label className="block text-sm font-semibold text-blue-900 mb-2">
                  Rule Name
                </label>
                <input
                  type="text"
                  className="w-full px-3 sm:px-4 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <div>
                  <label className="block text-sm font-semibold text-blue-900 mb-2">
                    Type
                  </label>
                  <select className="w-full px-3 sm:px-4 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base">
                    <option>Health</option>
                    <option>Auto</option>
                    <option>Home</option>
                    <option>Life</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-blue-900 mb-2">
                    Coverage
                  </label>
                  <select className="w-full px-3 sm:px-4 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base">
                    <option>Basic</option>
                    <option>Standard</option>
                    <option>Comprehensive</option>
                    <option>Premium</option>
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <div>
                  <label className="block text-sm font-semibold text-blue-900 mb-2">
                    Premium ($)
                  </label>
                  <input
                    type="number"
                    className="w-full px-3 sm:px-4 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-blue-900 mb-2">
                    Deductible ($)
                  </label>
                  <input
                    type="number"
                    className="w-full px-3 sm:px-4 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
                  />
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-3 mt-4 sm:mt-6">
                <button
                  onClick={() => {
                    const newRule = {
                      name: "New Rule",
                      type: "Health",
                      status: "active" as const,
                      coverage: "Basic",
                      premium: 100,
                      deductible: 500,
                    };
                    handleAddRule(newRule);
                  }}
                  className="flex-1 px-4 sm:px-6 py-2 sm:py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-semibold text-sm sm:text-base"
                >
                  Create Rule
                </button>
                <button
                  onClick={() => setShowAddRule(false)}
                  className="flex-1 px-4 sm:px-6 py-2 sm:py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition font-semibold text-sm sm:text-base"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Edit Rule Modal */}
      {editingRule && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
          onClick={() => setEditingRule(null)}
        >
          <div
            className="bg-white rounded-xl shadow-2xl p-4 sm:p-6 lg:p-8 max-w-2xl w-full mx-4 border-2 border-blue-200 max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-xl sm:text-2xl font-bold text-blue-900 mb-4 sm:mb-6">
              Edit Insurance Rule
            </h2>
            <div className="space-y-3 sm:space-y-4">
              <div>
                <label className="block text-sm font-semibold text-blue-900 mb-2">
                  Rule Name
                </label>
                <input
                  type="text"
                  value={editingRule.name}
                  onChange={(e) =>
                    setEditingRule({ ...editingRule, name: e.target.value })
                  }
                  className="w-full px-3 sm:px-4 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <div>
                  <label className="block text-sm font-semibold text-blue-900 mb-2">
                    Type
                  </label>
                  <select
                    value={editingRule.type}
                    onChange={(e) =>
                      setEditingRule({ ...editingRule, type: e.target.value })
                    }
                    className="w-full px-3 sm:px-4 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
                  >
                    <option>Health</option>
                    <option>Auto</option>
                    <option>Home</option>
                    <option>Life</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-blue-900 mb-2">
                    Status
                  </label>
                  <select
                    value={editingRule.status}
                    onChange={(e) =>
                      setEditingRule({
                        ...editingRule,
                        status: e.target.value as
                          | "active"
                          | "inactive"
                          | "pending",
                      })
                    }
                    className="w-full px-3 sm:px-4 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
                  >
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                    <option value="pending">Pending</option>
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <div>
                  <label className="block text-sm font-semibold text-blue-900 mb-2">
                    Coverage
                  </label>
                  <select
                    value={editingRule.coverage}
                    onChange={(e) =>
                      setEditingRule({
                        ...editingRule,
                        coverage: e.target.value,
                      })
                    }
                    className="w-full px-3 sm:px-4 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
                  >
                    <option>Basic</option>
                    <option>Standard</option>
                    <option>Comprehensive</option>
                    <option>Premium</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-blue-900 mb-2">
                    Premium ($)
                  </label>
                  <input
                    type="number"
                    value={editingRule.premium}
                    onChange={(e) =>
                      setEditingRule({
                        ...editingRule,
                        premium: Number(e.target.value),
                      })
                    }
                    className="w-full px-3 sm:px-4 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-blue-900 mb-2">
                  Deductible ($)
                </label>
                <input
                  type="number"
                  value={editingRule.deductible}
                  onChange={(e) =>
                    setEditingRule({
                      ...editingRule,
                      deductible: Number(e.target.value),
                    })
                  }
                  className="w-full px-3 sm:px-4 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
                />
              </div>
              <div className="flex flex-col sm:flex-row gap-3 mt-4 sm:mt-6">
                <button
                  onClick={handleSaveEdit}
                  className="flex-1 px-4 sm:px-6 py-2 sm:py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-semibold text-sm sm:text-base"
                >
                  Save Changes
                </button>
                <button
                  onClick={() => setEditingRule(null)}
                  className="flex-1 px-4 sm:px-6 py-2 sm:py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition font-semibold text-sm sm:text-base"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Rules;
