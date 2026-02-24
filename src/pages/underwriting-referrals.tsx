import { useState } from "react";
import {
  Search,
  Filter,
  Download,
  Plus,
  Edit,
  Clock,
  AlertCircle,
  CheckCircle,
  User,
  Calendar,
  ArrowRight,
} from "lucide-react";

interface Referral {
  id: string;
  policyNumber: string;
  applicantName: string;
  product: string;
  reason: string;
  priority: "high" | "medium" | "low";
  status: "pending" | "in-review" | "approved" | "declined";
  assignedTo: string;
  submittedDate: string;
  daysOpen: number;
}

const UnderwritingReferrals = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  const referrals: Referral[] = [
    {
      id: "REF-001",
      policyNumber: "POL-2024-1234",
      applicantName: "John Smith",
      product: "Life Insurance",
      reason: "High Coverage Amount",
      priority: "high",
      status: "pending",
      assignedTo: "Unassigned",
      submittedDate: "2024-10-22",
      daysOpen: 1,
    },
    {
      id: "REF-002",
      policyNumber: "POL-2024-1235",
      applicantName: "Sarah Johnson",
      product: "Auto Insurance",
      reason: "Previous Claims History",
      priority: "medium",
      status: "in-review",
      assignedTo: "Mike Davis",
      submittedDate: "2024-10-20",
      daysOpen: 3,
    },
    {
      id: "REF-003",
      policyNumber: "POL-2024-1236",
      applicantName: "Robert Brown",
      product: "Property Insurance",
      reason: "High Risk Location",
      priority: "high",
      status: "in-review",
      assignedTo: "Lisa Anderson",
      submittedDate: "2024-10-21",
      daysOpen: 2,
    },
    {
      id: "REF-004",
      policyNumber: "POL-2024-1237",
      applicantName: "Emily Wilson",
      product: "Health Insurance",
      reason: "Medical History Review",
      priority: "medium",
      status: "approved",
      assignedTo: "Mike Davis",
      submittedDate: "2024-10-18",
      daysOpen: 5,
    },
    {
      id: "REF-005",
      policyNumber: "POL-2024-1238",
      applicantName: "David Martinez",
      product: "Commercial Insurance",
      reason: "Business Type Assessment",
      priority: "low",
      status: "pending",
      assignedTo: "Unassigned",
      submittedDate: "2024-10-22",
      daysOpen: 1,
    },
    {
      id: "REF-006",
      policyNumber: "POL-2024-1239",
      applicantName: "Jennifer Lee",
      product: "Life Insurance",
      reason: "Age Verification",
      priority: "high",
      status: "declined",
      assignedTo: "Lisa Anderson",
      submittedDate: "2024-10-15",
      daysOpen: 8,
    },
  ];

  const stats = {
    pendingReferrals: 2,
    inReview: 2,
    avgProcessingTime: "3.2 days",
    todaySubmitted: 3,
  };

  const filteredReferrals = referrals.filter((referral) => {
    const matchesSearch =
      referral.applicantName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      referral.policyNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      referral.product.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      filterStatus === "all" || referral.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status: string) => {
    const styles: Record<string, string> = {
      pending: "bg-amber-100 text-amber-800 border-amber-200",
      "in-review": "bg-blue-100 text-blue-800 border-blue-200",
      approved: "bg-green-100 text-green-800 border-green-200",
      declined: "bg-red-100 text-red-800 border-red-200",
    };
    const labels: Record<string, string> = {
      pending: "Pending",
      "in-review": "In Review",
      approved: "Approved",
      declined: "Declined",
    };
    return (
      <span
        className={`px-3 py-1 rounded-full text-xs font-medium border ${styles[status]}`}
      >
        {labels[status]}
      </span>
    );
  };

  const getPriorityBadge = (priority: string) => {
    const styles: Record<string, string> = {
      high: "bg-red-100 text-red-800 border-red-200",
      medium: "bg-orange-100 text-orange-800 border-orange-200",
      low: "bg-gray-100 text-gray-800 border-gray-200",
    };
    return (
      <span
        className={`px-3 py-1 rounded-full text-xs font-medium border ${styles[priority]}`}
      >
        {priority.charAt(0).toUpperCase() + priority.slice(1)}
      </span>
    );
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <div className="flex-1">
        {/* Page Content */}
        <div className="p-4 lg:p-6">
          {/* Header */}
          <div className="mb-8">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
              <div>
                <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">
                  Referrals Queue
                </h1>
                <p className="text-gray-600 mt-1">
                  Review and process underwriting referrals
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <button className="px-4 py-2.5 bg-white border border-gray-200 rounded-lg text-gray-700 font-medium hover:bg-gray-50 hover:border-gray-300 transition-all flex items-center gap-2 shadow-sm">
                  <Filter className="w-4 h-4" />
                  <span>Filter</span>
                </button>
                <button className="px-4 py-2.5 bg-white border border-gray-200 rounded-lg text-gray-700 font-medium hover:bg-gray-50 hover:border-gray-300 transition-all flex items-center gap-2 shadow-sm">
                  <Download className="w-4 h-4" />
                  <span>Export</span>
                </button>
                <button className="px-4 py-2.5 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 transition-all shadow-lg hover:shadow-xl flex items-center gap-2">
                  <Plus className="w-4 h-4" />
                  <span>New Referral</span>
                </button>
              </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              <div className="bg-white rounded-xl border border-gray-200 p-5 hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm font-medium text-gray-600">
                    Pending Referrals
                  </span>
                  <div className="w-10 h-10 bg-amber-50 rounded-lg flex items-center justify-center">
                    <Clock className="w-5 h-5 text-amber-600" />
                  </div>
                </div>
                <span className="text-3xl font-bold text-gray-900">
                  {stats.pendingReferrals}
                </span>
                <p className="text-xs text-gray-500 mt-1">
                  Awaiting assignment
                </p>
              </div>

              <div className="bg-white rounded-xl border border-gray-200 p-5 hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm font-medium text-gray-600">
                    In Review
                  </span>
                  <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
                    <AlertCircle className="w-5 h-5 text-blue-600" />
                  </div>
                </div>
                <span className="text-3xl font-bold text-gray-900">
                  {stats.inReview}
                </span>
                <p className="text-xs text-gray-500 mt-1">Being processed</p>
              </div>

              <div className="bg-white rounded-xl border border-gray-200 p-5 hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm font-medium text-gray-600">
                    Avg Processing Time
                  </span>
                  <div className="w-10 h-10 bg-green-50 rounded-lg flex items-center justify-center">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                  </div>
                </div>
                <span className="text-3xl font-bold text-gray-900">3.2</span>
                <p className="text-xs text-gray-500 mt-1">Days average</p>
              </div>

              <div className="bg-white rounded-xl border border-gray-200 p-5 hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm font-medium text-gray-600">
                    Today Submitted
                  </span>
                  <div className="w-10 h-10 bg-purple-50 rounded-lg flex items-center justify-center">
                    <Calendar className="w-5 h-5 text-purple-600" />
                  </div>
                </div>
                <span className="text-3xl font-bold text-gray-900">
                  {stats.todaySubmitted}
                </span>
                <p className="text-xs text-gray-500 mt-1">New referrals</p>
              </div>
            </div>

            {/* Filters */}
            <div className="bg-white rounded-xl border border-gray-200 p-4 mb-6">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search referrals..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div className="flex gap-3">
                  <select
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                    className="px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                  >
                    <option value="all">All Status</option>
                    <option value="pending">Pending</option>
                    <option value="in-review">In Review</option>
                    <option value="approved">Approved</option>
                    <option value="declined">Declined</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Referrals Table */}
            <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Referral ID
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Policy Number
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Applicant
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Product
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Reason
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Priority
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Assigned To
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Days Open
                      </th>
                      <th className="px-6 py-4 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {filteredReferrals.map((referral) => (
                      <tr
                        key={referral.id}
                        className="hover:bg-gray-50 transition-colors"
                      >
                        <td className="px-6 py-4 text-sm font-medium text-gray-900">
                          {referral.id}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-900">
                          {referral.policyNumber}
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                              <User className="w-4 h-4 text-gray-600" />
                            </div>
                            <span className="text-sm text-gray-900">
                              {referral.applicantName}
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-600">
                          {referral.product}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-600">
                          {referral.reason}
                        </td>
                        <td className="px-6 py-4">
                          {getPriorityBadge(referral.priority)}
                        </td>
                        <td className="px-6 py-4">
                          {getStatusBadge(referral.status)}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-600">
                          {referral.assignedTo}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-600">
                          {referral.daysOpen} days
                        </td>
                        <td className="px-6 py-4 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <button
                              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                              title="View Details"
                            >
                              <ArrowRight className="w-4 h-4 text-gray-500" />
                            </button>
                            <button
                              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                              title="Edit"
                            >
                              <Edit className="w-4 h-4 text-gray-500" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {filteredReferrals.length === 0 && (
                <div className="p-12 text-center">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Search className="w-8 h-8 text-gray-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    No referrals found
                  </h3>
                  <p className="text-gray-600">
                    Try adjusting your search or filter criteria
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UnderwritingReferrals;
