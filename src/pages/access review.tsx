import { useState } from "react";
import {
  Search,
  Filter,
  Download,
  CheckCircle,
  XCircle,
  Clock,
  User,
  Shield,
  Calendar,
} from "lucide-react";

export default function AccessReviewScreen() {
  const [selectedTab, setSelectedTab] = useState("pending");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedUsers, setSelectedUsers] = useState<number[]>([]);

  const accessRequests = [
    {
      id: 1,
      name: "Sarah Johnson",
      email: "sarah.johnson@insurance.com",
      department: "Claims Processing",
      role: "Claims Adjuster",
      requestedAccess: "Premium Claims Module",
      requestDate: "2024-10-15",
      status: "pending",
      reason: "Need access to handle high-value claims",
      manager: "Michael Chen",
    },
    {
      id: 2,
      name: "Robert Martinez",
      email: "robert.martinez@insurance.com",
      department: "Underwriting",
      role: "Senior Underwriter",
      requestedAccess: "Risk Assessment Tools",
      requestDate: "2024-10-14",
      status: "pending",
      reason: "Required for new product line assessment",
      manager: "Lisa Anderson",
    },
    {
      id: 3,
      name: "Emily Watson",
      email: "emily.watson@insurance.com",
      department: "Customer Service",
      role: "Service Representative",
      requestedAccess: "Policy Management System",
      requestDate: "2024-10-13",
      status: "approved",
      reason: "Standard access for role requirements",
      manager: "David Kim",
    },
    {
      id: 4,
      name: "James Wilson",
      email: "james.wilson@insurance.com",
      department: "Finance",
      role: "Financial Analyst",
      requestedAccess: "Premium Analytics Dashboard",
      requestDate: "2024-10-12",
      status: "rejected",
      reason: "Quarterly financial reporting needs",
      manager: "Patricia Brown",
    },
  ];

  const filteredRequests = accessRequests.filter(
    (req) =>
      req.status === selectedTab &&
      (req.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        req.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        req.department.toLowerCase().includes(searchTerm.toLowerCase())),
  );

  const handleApprove = (id: number) => {
    console.log("Approved request:", id);
  };

  const handleReject = (id: number) => {
    console.log("Rejected request:", id);
  };

  const toggleUserSelection = (id: number) => {
    setSelectedUsers((prev) =>
      prev.includes(id)
        ? prev.filter((userId) => userId !== id)
        : [...prev, id],
    );
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "text-amber-600 bg-amber-50";
      case "approved":
        return "text-green-600 bg-green-50";
      case "rejected":
        return "text-red-600 bg-red-50";
      default:
        return "text-gray-600 bg-gray-50";
    }
  };

  const stats = [
    {
      label: "Pending Reviews",
      value: accessRequests.filter((r) => r.status === "pending").length,
      icon: Clock,
      color: "blue",
    },
    { label: "Approved Today", value: "12", icon: CheckCircle, color: "green" },
    { label: "Active Users", value: "284", icon: User, color: "indigo" },
    { label: "Security Alerts", value: "3", icon: Shield, color: "red" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-blue-50 to-white">
      {/* Header */}
      <div className="bg-white border-b border-blue-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Access Review Management
              </h1>
              <p className="text-sm text-gray-600 mt-1">
                Review and manage user access requests
              </p>
            </div>
            <div className="flex gap-3">
              <button className="flex items-center gap-2 px-4 py-2 bg-white border border-blue-200 text-blue-700 rounded-lg hover:bg-blue-50 transition-colors">
                <Download size={18} />
                Export Report
              </button>
              <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                <Filter size={18} />
                Advanced Filter
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-6">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {stats.map((stat, idx) => (
            <div
              key={idx}
              className="bg-white rounded-xl p-5 shadow-sm border border-blue-100 hover:shadow-md transition-shadow"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">{stat.label}</p>
                  <p className="text-3xl font-bold text-gray-900">
                    {stat.value}
                  </p>
                </div>
                <div
                  className={`p-3 rounded-lg ${
                    stat.color === "blue"
                      ? "bg-blue-50"
                      : stat.color === "green"
                        ? "bg-green-50"
                        : stat.color === "indigo"
                          ? "bg-indigo-50"
                          : "bg-red-50"
                  }`}
                >
                  <stat.icon
                    className={
                      stat.color === "blue"
                        ? "text-blue-600"
                        : stat.color === "green"
                          ? "text-green-600"
                          : stat.color === "indigo"
                            ? "text-indigo-600"
                            : "text-red-600"
                    }
                    size={24}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Main Content */}
        <div className="bg-white rounded-xl shadow-sm border border-blue-100">
          {/* Search and Tabs */}
          <div className="p-6 border-b border-blue-100">
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
              <div className="flex gap-2">
                <button
                  onClick={() => setSelectedTab("pending")}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    selectedTab === "pending"
                      ? "bg-blue-600 text-white"
                      : "bg-blue-50 text-blue-700 hover:bg-blue-100"
                  }`}
                >
                  Pending (
                  {accessRequests.filter((r) => r.status === "pending").length})
                </button>
                <button
                  onClick={() => setSelectedTab("approved")}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    selectedTab === "approved"
                      ? "bg-blue-600 text-white"
                      : "bg-blue-50 text-blue-700 hover:bg-blue-100"
                  }`}
                >
                  Approved (
                  {accessRequests.filter((r) => r.status === "approved").length}
                  )
                </button>
                <button
                  onClick={() => setSelectedTab("rejected")}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    selectedTab === "rejected"
                      ? "bg-blue-600 text-white"
                      : "bg-blue-50 text-blue-700 hover:bg-blue-100"
                  }`}
                >
                  Rejected (
                  {accessRequests.filter((r) => r.status === "rejected").length}
                  )
                </button>
              </div>

              <div className="relative w-full sm:w-80">
                <Search
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  size={18}
                />
                <input
                  type="text"
                  placeholder="Search users, departments..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>

          {/* Requests List */}
          <div className="divide-y divide-blue-50">
            {filteredRequests.length === 0 ? (
              <div className="p-12 text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-50 mb-4">
                  <Search className="text-blue-400" size={32} />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  No requests found
                </h3>
                <p className="text-gray-600">
                  Try adjusting your search or filter criteria
                </p>
              </div>
            ) : (
              filteredRequests.map((request) => (
                <div
                  key={request.id}
                  className="p-6 hover:bg-blue-50 transition-colors"
                >
                  <div className="flex items-start gap-4">
                    <input
                      type="checkbox"
                      checked={selectedUsers.includes(request.id)}
                      onChange={() => toggleUserSelection(request.id)}
                      className="mt-1 w-4 h-4 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
                    />

                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900">
                            {request.name}
                          </h3>
                          <p className="text-sm text-gray-600">
                            {request.email}
                          </p>
                        </div>
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(request.status)}`}
                        >
                          {request.status.charAt(0).toUpperCase() +
                            request.status.slice(1)}
                        </span>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                        <div>
                          <p className="text-xs text-gray-500 mb-1">
                            Department
                          </p>
                          <p className="text-sm font-medium text-gray-900">
                            {request.department}
                          </p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500 mb-1">
                            Current Role
                          </p>
                          <p className="text-sm font-medium text-gray-900">
                            {request.role}
                          </p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500 mb-1">
                            Requested Access
                          </p>
                          <p className="text-sm font-medium text-blue-700">
                            {request.requestedAccess}
                          </p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500 mb-1">
                            Request Date
                          </p>
                          <p className="text-sm font-medium text-gray-900 flex items-center gap-1">
                            <Calendar size={14} />
                            {request.requestDate}
                          </p>
                        </div>
                      </div>

                      <div className="mb-4">
                        <p className="text-xs text-gray-500 mb-1">
                          Reason for Access
                        </p>
                        <p className="text-sm text-gray-700">
                          {request.reason}
                        </p>
                      </div>

                      <div className="flex items-center justify-between">
                        <p className="text-xs text-gray-500">
                          Manager:{" "}
                          <span className="font-medium text-gray-700">
                            {request.manager}
                          </span>
                        </p>

                        {request.status === "pending" && (
                          <div className="flex gap-2">
                            <button
                              onClick={() => handleReject(request.id)}
                              className="flex items-center gap-1 px-4 py-2 bg-red-50 text-red-700 rounded-lg hover:bg-red-100 transition-colors"
                            >
                              <XCircle size={16} />
                              Reject
                            </button>
                            <button
                              onClick={() => handleApprove(request.id)}
                              className="flex items-center gap-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                            >
                              <CheckCircle size={16} />
                              Approve
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Bulk Actions */}
          {selectedUsers.length > 0 && (
            <div className="p-4 bg-blue-50 border-t border-blue-100">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-gray-700">
                  {selectedUsers.length} user
                  {selectedUsers.length !== 1 ? "s" : ""} selected
                </p>
                <div className="flex gap-2">
                  <button className="px-4 py-2 bg-white border border-red-200 text-red-700 rounded-lg hover:bg-red-50 transition-colors">
                    Bulk Reject
                  </button>
                  <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                    Bulk Approve
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
