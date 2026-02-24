import { useState } from "react";
import {
  Search,
  Filter,
  Plus,
  FileText,
  Users,
  AlertCircle,
  CheckCircle,
  Clock,
  XCircle,
  MoreVertical,
  Shield,
} from "lucide-react";

interface Policy {
  _id: string;
  policyNumber: string;
  user: { name: string; email: string };
  agent?: { name: string };
  productType: string;
  coverageDetails: {
    sumAssured: number;
    premium: number;
    coveragePeriod: number;
    startDate: string;
    endDate: string;
  };
  status: "active" | "expired" | "cancelled" | "pending" | "lapsed";
  beneficiaries: Array<{
    name: string;
    relationship: string;
    percentage: number;
  }>;
  createdAt: string;
}

const mockPolicies: Policy[] = [
  {
    _id: "1",
    policyNumber: "FUN123456",
    user: { name: "John Doe", email: "john@example.com" },
    agent: { name: "Agent Smith" },
    productType: "funeral",
    coverageDetails: {
      sumAssured: 50000,
      premium: 250,
      coveragePeriod: 12,
      startDate: "2024-01-15",
      endDate: "2025-01-15",
    },
    status: "active",
    beneficiaries: [
      { name: "Jane Doe", relationship: "Spouse", percentage: 100 },
    ],
    createdAt: "2024-01-15T10:00:00Z",
  },
  {
    _id: "2",
    policyNumber: "VEH789012",
    user: { name: "Sarah Johnson", email: "sarah@example.com" },
    agent: { name: "Agent Brown" },
    productType: "vehicle",
    coverageDetails: {
      sumAssured: 300000,
      premium: 1200,
      coveragePeriod: 12,
      startDate: "2024-03-01",
      endDate: "2025-03-01",
    },
    status: "active",
    beneficiaries: [],
    createdAt: "2024-03-01T14:30:00Z",
  },
  {
    _id: "3",
    policyNumber: "LIF345678",
    user: { name: "Michael Chen", email: "michael@example.com" },
    productType: "life",
    coverageDetails: {
      sumAssured: 1000000,
      premium: 850,
      coveragePeriod: 12,
      startDate: "2023-12-01",
      endDate: "2024-12-01",
    },
    status: "pending",
    beneficiaries: [
      { name: "Lisa Chen", relationship: "Spouse", percentage: 60 },
      { name: "Tommy Chen", relationship: "Child", percentage: 40 },
    ],
    createdAt: "2023-12-01T09:15:00Z",
  },
];

export default function PolicyAdminScreen() {
  const [policies] = useState<Policy[]>(mockPolicies);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [filterProduct, setFilterProduct] = useState<string>("all");
  const [selectedPolicy, setSelectedPolicy] = useState<Policy | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const statusConfig = {
    active: { color: "bg-green-100 text-green-800", icon: CheckCircle },
    pending: { color: "bg-yellow-100 text-yellow-800", icon: Clock },
    expired: { color: "bg-gray-100 text-gray-800", icon: AlertCircle },
    cancelled: { color: "bg-red-100 text-red-800", icon: XCircle },
    lapsed: { color: "bg-orange-100 text-orange-800", icon: AlertCircle },
  };

  const productColors: { [key: string]: string } = {
    funeral: "bg-purple-100 text-purple-800",
    life: "bg-blue-100 text-blue-800",
    vehicle: "bg-indigo-100 text-indigo-800",
    health: "bg-green-100 text-green-800",
    property: "bg-yellow-100 text-yellow-800",
    business: "bg-pink-100 text-pink-800",
  };

  const filteredPolicies = policies.filter((policy) => {
    const matchesSearch =
      policy.policyNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      policy.user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      policy.user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      filterStatus === "all" || policy.status === filterStatus;
    const matchesProduct =
      filterProduct === "all" || policy.productType === filterProduct;
    return matchesSearch && matchesStatus && matchesProduct;
  });

  const stats = {
    total: policies.length,
    active: policies.filter((p) => p.status === "active").length,
    pending: policies.filter((p) => p.status === "pending").length,
    totalPremium: policies.reduce(
      (sum, p) => sum + p.coverageDetails.premium,
      0,
    ),
  };

  return (
    <div className="flex min-h-screen bg-white">
      {/* Main Content */}
      <div className="flex-1 lg:ml-0">
        {/* Mobile Header */}
        <div className="lg:hidden bg-white border-b border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => setSidebarOpen(true)}
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
              aria-label="Open sidebar"
            >
              <MoreVertical className="w-6 h-6 text-gray-600" />
            </button>
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-blue-800 rounded-lg flex items-center justify-center">
                <Shield className="w-4 h-4 text-white" />
              </div>
              <div>
                <h1 className="text-lg font-bold text-gray-900">InsureCore</h1>
              </div>
            </div>
          </div>
        </div>

        <div className="p-4 lg:p-8">
          {/* Header */}
          <div className="border-b border-gray-200 bg-white sticky top-0 z-10 mb-6 lg:mb-8">
            <div className="pb-6">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                <div>
                  <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-2">
                    Policy Management
                  </h1>
                  <p className="text-gray-600 text-sm lg:text-base">
                    Manage and monitor all insurance policies
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 lg:px-6 lg:py-3 rounded-lg hover:bg-blue-700 transition-colors shadow-sm text-sm lg:text-base">
                    <Plus size={18} />
                    New Policy
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-6 lg:mb-8">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-4 lg:p-6 border border-blue-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-600 text-sm font-medium">
                    Total Policies
                  </p>
                  <p className="text-2xl lg:text-3xl font-bold text-blue-900 mt-2">
                    {stats.total}
                  </p>
                </div>
                <FileText className="text-blue-600 w-8 h-8 lg:w-10 lg:h-10" />
              </div>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-4 lg:p-6 border border-green-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-600 text-sm font-medium">
                    Active Policies
                  </p>
                  <p className="text-2xl lg:text-3xl font-bold text-green-900 mt-2">
                    {stats.active}
                  </p>
                </div>
                <CheckCircle className="text-green-600 w-8 h-8 lg:w-10 lg:h-10" />
              </div>
            </div>

            <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-xl p-4 lg:p-6 border border-yellow-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-yellow-600 text-sm font-medium">
                    Pending Review
                  </p>
                  <p className="text-2xl lg:text-3xl font-bold text-yellow-900 mt-2">
                    {stats.pending}
                  </p>
                </div>
                <Clock className="text-yellow-600 w-8 h-8 lg:w-10 lg:h-10" />
              </div>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-4 lg:p-6 border border-purple-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-600 text-sm font-medium">
                    Monthly Premium
                  </p>
                  <p className="text-2xl lg:text-3xl font-bold text-purple-900 mt-2">
                    ${stats.totalPremium}
                  </p>
                </div>
                <Users className="text-purple-600 w-8 h-8 lg:w-10 lg:h-10" />
              </div>
            </div>
          </div>

          {/* Filters and Search */}
          <div className="bg-gray-50 rounded-xl p-4 lg:p-6 mb-6 border border-gray-200">
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 lg:w-5 lg:h-5" />
                <input
                  type="text"
                  placeholder="Search by policy number, name, or email..."
                  className="w-full pl-9 lg:pl-11 pr-4 py-2 lg:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm lg:text-base"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              <div className="flex gap-3">
                <div className="relative">
                  <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 lg:w-5 lg:h-5" />
                  <select
                    className="pl-9 lg:pl-11 pr-8 py-2 lg:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white text-sm lg:text-base"
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                  >
                    <option value="all">All Status</option>
                    <option value="active">Active</option>
                    <option value="pending">Pending</option>
                    <option value="expired">Expired</option>
                    <option value="cancelled">Cancelled</option>
                    <option value="lapsed">Lapsed</option>
                  </select>
                </div>

                <select
                  className="px-4 py-2 lg:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white text-sm lg:text-base"
                  value={filterProduct}
                  onChange={(e) => setFilterProduct(e.target.value)}
                >
                  <option value="all">All Products</option>
                  <option value="funeral">Funeral</option>
                  <option value="life">Life</option>
                  <option value="vehicle">Vehicle</option>
                  <option value="health">Health</option>
                  <option value="property">Property</option>
                  <option value="business">Business</option>
                </select>
              </div>
            </div>
          </div>

          {/* Policies Table - Mobile Cards & Desktop Table */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            {/* Desktop Table */}
            <div className="hidden lg:block overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Policy
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Policyholder
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Product
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Coverage
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Premium
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredPolicies.map((policy) => {
                    const StatusIcon = statusConfig[policy.status].icon;
                    return (
                      <tr
                        key={policy._id}
                        className="hover:bg-gray-50 transition-colors"
                      >
                        <td className="px-6 py-4">
                          <div>
                            <p className="font-semibold text-gray-900">
                              {policy.policyNumber}
                            </p>
                            <p className="text-sm text-gray-500">
                              {new Date(policy.createdAt).toLocaleDateString()}
                            </p>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div>
                            <p className="font-medium text-gray-900">
                              {policy.user.name}
                            </p>
                            <p className="text-sm text-gray-500">
                              {policy.user.email}
                            </p>
                            {policy.agent && (
                              <p className="text-xs text-blue-600 mt-1">
                                Agent: {policy.agent.name}
                              </p>
                            )}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span
                            className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${productColors[policy.productType] || "bg-gray-100 text-gray-800"}`}
                          >
                            {policy.productType.charAt(0).toUpperCase() +
                              policy.productType.slice(1)}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div>
                            <p className="font-semibold text-gray-900">
                              $
                              {policy.coverageDetails.sumAssured.toLocaleString()}
                            </p>
                            <p className="text-sm text-gray-500">
                              {policy.coverageDetails.coveragePeriod} months
                            </p>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <p className="font-semibold text-gray-900">
                            ${policy.coverageDetails.premium}/mo
                          </p>
                        </td>
                        <td className="px-6 py-4">
                          <span
                            className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium ${statusConfig[policy.status].color}`}
                          >
                            <StatusIcon size={14} />
                            {policy.status.charAt(0).toUpperCase() +
                              policy.status.slice(1)}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <button
                            onClick={() => setSelectedPolicy(policy)}
                            className="text-blue-600 hover:text-blue-800 font-medium text-sm"
                          >
                            View Details
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Mobile Cards */}
            <div className="lg:hidden">
              {filteredPolicies.map((policy) => {
                const StatusIcon = statusConfig[policy.status].icon;
                return (
                  <div
                    key={policy._id}
                    className="border-b border-gray-200 last:border-b-0 p-4 hover:bg-gray-50 transition-colors"
                  >
                    <div className="space-y-3">
                      {/* Header Row */}
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <p className="font-semibold text-gray-900 text-lg">
                            {policy.policyNumber}
                          </p>
                          <p className="text-sm text-gray-500">
                            {new Date(policy.createdAt).toLocaleDateString()}
                          </p>
                        </div>
                        <span
                          className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${statusConfig[policy.status].color}`}
                        >
                          <StatusIcon size={12} />
                          {policy.status.charAt(0).toUpperCase() +
                            policy.status.slice(1)}
                        </span>
                      </div>

                      {/* Policyholder Info */}
                      <div>
                        <p className="font-medium text-gray-900">
                          {policy.user.name}
                        </p>
                        <p className="text-sm text-gray-500">
                          {policy.user.email}
                        </p>
                        {policy.agent && (
                          <p className="text-xs text-blue-600 mt-1">
                            Agent: {policy.agent.name}
                          </p>
                        )}
                      </div>

                      {/* Product and Coverage */}
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-xs text-gray-500">Product</p>
                          <span
                            className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${productColors[policy.productType] || "bg-gray-100 text-gray-800"}`}
                          >
                            {policy.productType.charAt(0).toUpperCase() +
                              policy.productType.slice(1)}
                          </span>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">Coverage</p>
                          <p className="font-semibold text-gray-900">
                            $
                            {policy.coverageDetails.sumAssured.toLocaleString()}
                          </p>
                        </div>
                      </div>

                      {/* Premium and Action */}
                      <div className="flex justify-between items-center pt-2">
                        <div>
                          <p className="text-xs text-gray-500">Premium</p>
                          <p className="font-semibold text-gray-900">
                            ${policy.coverageDetails.premium}/mo
                          </p>
                        </div>
                        <button
                          onClick={() => setSelectedPolicy(policy)}
                          className="text-blue-600 hover:text-blue-800 font-medium text-sm px-3 py-1 border border-blue-200 rounded-lg hover:bg-blue-50 transition-colors"
                        >
                          View Details
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {filteredPolicies.length === 0 && (
            <div className="text-center py-8 lg:py-12">
              <AlertCircle className="mx-auto text-gray-400 mb-4 w-8 h-8 lg:w-12 lg:h-12" />
              <p className="text-gray-600 text-base lg:text-lg">
                No policies found matching your criteria
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Policy Detail Modal */}
      {selectedPolicy && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="sticky top-0 bg-white border-b border-gray-200 px-4 lg:px-6 py-4 flex justify-between items-center">
              <h2 className="text-xl lg:text-2xl font-bold text-gray-900">
                Policy Details
              </h2>
              <button
                onClick={() => setSelectedPolicy(null)}
                className="text-gray-400 hover:text-gray-600"
              >
                <XCircle size={24} className="lg:w-7 lg:h-7" />
              </button>
            </div>

            <div className="p-4 lg:p-6 space-y-4 lg:space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-6">
                <div>
                  <p className="text-sm text-gray-500 mb-1">Policy Number</p>
                  <p className="font-semibold text-lg">
                    {selectedPolicy.policyNumber}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">Status</p>
                  <span
                    className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${statusConfig[selectedPolicy.status].color}`}
                  >
                    {selectedPolicy.status.charAt(0).toUpperCase() +
                      selectedPolicy.status.slice(1)}
                  </span>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">Product Type</p>
                  <p className="font-semibold">{selectedPolicy.productType}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">Coverage Period</p>
                  <p className="font-semibold">
                    {selectedPolicy.coverageDetails.coveragePeriod} months
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">Sum Assured</p>
                  <p className="font-semibold text-lg text-green-600">
                    $
                    {selectedPolicy.coverageDetails.sumAssured.toLocaleString()}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">Premium</p>
                  <p className="font-semibold text-lg text-blue-600">
                    ${selectedPolicy.coverageDetails.premium}/month
                  </p>
                </div>
              </div>

              <div className="border-t pt-4 lg:pt-6">
                <h3 className="font-semibold text-lg mb-3">
                  Policyholder Information
                </h3>
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="font-medium">{selectedPolicy.user.name}</p>
                  <p className="text-gray-600">{selectedPolicy.user.email}</p>
                  {selectedPolicy.agent && (
                    <p className="text-sm text-blue-600 mt-2">
                      Assigned Agent: {selectedPolicy.agent.name}
                    </p>
                  )}
                </div>
              </div>

              {selectedPolicy.beneficiaries.length > 0 && (
                <div className="border-t pt-4 lg:pt-6">
                  <h3 className="font-semibold text-lg mb-3">Beneficiaries</h3>
                  <div className="space-y-2">
                    {selectedPolicy.beneficiaries.map((ben, idx) => (
                      <div
                        key={idx}
                        className="bg-gray-50 rounded-lg p-3 flex justify-between items-center"
                      >
                        <div>
                          <p className="font-medium">{ben.name}</p>
                          <p className="text-sm text-gray-600">
                            {ben.relationship}
                          </p>
                        </div>
                        <span className="font-semibold text-blue-600">
                          {ben.percentage}%
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="border-t pt-4 lg:pt-6 flex gap-3">
                <button className="flex-1 bg-blue-600 text-white py-2 lg:py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium text-sm lg:text-base">
                  Edit Policy
                </button>
                <button className="flex-1 bg-gray-100 text-gray-700 py-2 lg:py-3 rounded-lg hover:bg-gray-200 transition-colors font-medium text-sm lg:text-base">
                  Download Documents
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
