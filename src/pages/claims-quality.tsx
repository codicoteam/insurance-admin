import { useState } from "react";
import {
  Search,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Clock,
  Menu,
  Shield,
} from "lucide-react";

interface QualityReview {
  id: string;
  claimNumber: string;
  policyholder: string;
  amount: number;
  reviewedBy: string;
  reviewDate: string;
  status: "passed" | "failed" | "pending";
  score: number;
  findings: string[];
  adjuster: string;
  category: "documentation" | "process" | "settlement" | "timeliness";
}

const QualityLeakageScreen = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const reviews: QualityReview[] = [
    {
      id: "1",
      claimNumber: "CLM384756",
      policyholder: "John Doe",
      amount: 3500,
      reviewedBy: "Quality Team",
      reviewDate: "2024-10-05",
      status: "passed",
      score: 92,
      findings: [],
      adjuster: "Sarah Johnson",
      category: "documentation",
    },
    {
      id: "2",
      claimNumber: "CLM492831",
      policyholder: "Emily Smith",
      amount: 8500,
      reviewedBy: "Quality Team",
      reviewDate: "2024-10-04",
      status: "failed",
      score: 68,
      findings: [
        "Missing incident photos",
        "Incomplete witness statements",
        "Settlement exceeds guidelines",
      ],
      adjuster: "Michael Chen",
      category: "settlement",
    },
    {
      id: "3",
      claimNumber: "CLM583947",
      policyholder: "Michael Johnson",
      amount: 5200,
      reviewedBy: "Quality Team",
      reviewDate: "2024-10-03",
      status: "pending",
      score: 0,
      findings: [],
      adjuster: "David Williams",
      category: "timeliness",
    },
    {
      id: "4",
      claimNumber: "CLM672345",
      policyholder: "Sarah Williams",
      amount: 12500,
      reviewedBy: "Quality Team",
      reviewDate: "2024-10-02",
      status: "passed",
      score: 95,
      findings: [],
      adjuster: "Jennifer Davis",
      category: "process",
    },
    {
      id: "5",
      claimNumber: "CLM783456",
      policyholder: "Robert Brown",
      amount: 2800,
      reviewedBy: "Quality Team",
      reviewDate: "2024-10-01",
      status: "failed",
      score: 55,
      findings: ["Late submission beyond SLA", "Documentation incomplete"],
      adjuster: "Sarah Johnson",
      category: "documentation",
    },
    {
      id: "6",
      claimNumber: "CLM894567",
      policyholder: "Jennifer Davis",
      amount: 4200,
      reviewedBy: "Quality Team",
      reviewDate: "2024-09-30",
      status: "passed",
      score: 88,
      findings: [],
      adjuster: "Michael Chen",
      category: "settlement",
    },
  ];

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      passed: "bg-green-100 text-green-700",
      failed: "bg-red-100 text-red-700",
      pending: "bg-yellow-100 text-yellow-700",
    };
    return colors[status] || "bg-gray-100 text-gray-700";
  };

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      documentation: "bg-blue-100 text-blue-700",
      process: "bg-purple-100 text-purple-700",
      settlement: "bg-green-100 text-green-700",
      timeliness: "bg-orange-100 text-orange-700",
    };
    return colors[category] || "bg-gray-100 text-gray-700";
  };

  const stats = {
    total: reviews.length,
    passed: reviews.filter((r) => r.status === "passed").length,
    failed: reviews.filter((r) => r.status === "failed").length,
    pending: reviews.filter((r) => r.status === "pending").length,
    avgScore: Math.round(
      reviews.filter((r) => r.score > 0).reduce((sum, r) => sum + r.score, 0) /
        reviews.filter((r) => r.score > 0).length,
    ),
  };

  const passRate = (
    (stats.passed / (stats.total - stats.pending)) *
    100
  ).toFixed(1);

  const filteredReviews = reviews.filter((review) => {
    const matchesSearch =
      review.claimNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      review.policyholder.toLowerCase().includes(searchTerm.toLowerCase()) ||
      review.adjuster.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || review.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="flex min-h-screen bg-gray-50">
      <div className="flex-1 lg:ml-0">
        {/* Mobile Header */}
        <div className="lg:hidden bg-white border-b border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => setSidebarOpen(true)}
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
              aria-label="Open sidebar"
            >
              <Menu className="w-6 h-6 text-gray-600" />
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

        {/* Page Header */}
        <div className="bg-white border-b border-gray-200 p-6">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-1">
                  Quality & Leakage
                </h1>
                <p className="text-gray-600">
                  Claims quality reviews and leakage analysis
                </p>
              </div>
              <div className="flex items-center gap-2">
                <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium">
                  Generate Report
                </button>
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium">
                  Configure Rules
                </button>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-4 gap-4">
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                <p className="text-gray-600 text-sm mb-1">Total Reviews</p>
                <p className="text-3xl font-bold text-gray-900">
                  {stats.total}
                </p>
              </div>
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <p className="text-green-600 text-sm mb-1">Pass Rate</p>
                <p className="text-3xl font-bold text-green-700">{passRate}%</p>
              </div>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <p className="text-blue-600 text-sm mb-1">Avg Quality Score</p>
                <p className="text-3xl font-bold text-blue-700">
                  {stats.avgScore}/100
                </p>
              </div>
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <p className="text-red-600 text-sm mb-1">Issues Found</p>
                <p className="text-3xl font-bold text-red-700">
                  {stats.failed}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Status Filters */}
        <div className="bg-white border-b border-gray-200 p-4">
          <div className="max-w-7xl mx-auto">
            <div className="flex gap-4 overflow-x-auto pb-2">
              {[
                { id: "all", name: "All Reviews" },
                { id: "passed", name: "Passed" },
                { id: "failed", name: "Failed" },
                { id: "pending", name: "Pending" },
              ].map((filter) => (
                <button
                  key={filter.id}
                  onClick={() => setStatusFilter(filter.id)}
                  className={`px-4 py-2 rounded-lg border transition-colors whitespace-nowrap ${
                    statusFilter === filter.id
                      ? "bg-blue-50 border-blue-200 text-blue-700"
                      : "bg-white border-gray-200 text-gray-600 hover:bg-gray-50"
                  }`}
                >
                  {filter.name}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white border-b border-gray-200 p-4">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search by claim number, policyholder, or adjuster..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Quality Reviews Table */}
        <div className="max-w-7xl mx-auto p-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-200">
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">
                      Claim #
                    </th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">
                      Policyholder
                    </th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">
                      Amount
                    </th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">
                      Adjuster
                    </th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">
                      Category
                    </th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">
                      Score
                    </th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">
                      Findings
                    </th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">
                      Review Date
                    </th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">
                      Status
                    </th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredReviews.map((review) => (
                    <tr
                      key={review.id}
                      className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
                    >
                      <td className="py-4 px-4">
                        <span className="text-blue-600 font-medium">
                          {review.claimNumber}
                        </span>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-700 font-semibold">
                            {review.policyholder
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </div>
                          <span className="font-medium text-gray-900">
                            {review.policyholder}
                          </span>
                        </div>
                      </td>
                      <td className="py-4 px-4 font-semibold text-gray-900">
                        ${review.amount.toLocaleString()}
                      </td>
                      <td className="py-4 px-4 text-gray-600">
                        {review.adjuster}
                      </td>
                      <td className="py-4 px-4">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium capitalize ${getCategoryColor(review.category)}`}
                        >
                          {review.category}
                        </span>
                      </td>
                      <td className="py-4 px-4">
                        {review.status === "pending" ? (
                          <span className="text-gray-400">--</span>
                        ) : (
                          <div className="flex items-center gap-2">
                            <div className="w-12 bg-gray-200 rounded-full h-2">
                              <div
                                className={`h-2 rounded-full ${
                                  review.score >= 80
                                    ? "bg-green-500"
                                    : review.score >= 60
                                      ? "bg-yellow-500"
                                      : "bg-red-500"
                                }`}
                                style={{ width: `${review.score}%` }}
                              />
                            </div>
                            <span
                              className={`font-semibold ${
                                review.score >= 80
                                  ? "text-green-600"
                                  : review.score >= 60
                                    ? "text-yellow-600"
                                    : "text-red-600"
                              }`}
                            >
                              {review.score}
                            </span>
                          </div>
                        )}
                      </td>
                      <td className="py-4 px-4">
                        {review.findings.length > 0 ? (
                          <div className="flex items-center gap-1 text-red-600">
                            <AlertTriangle className="w-4 h-4" />
                            <span className="text-sm">
                              {review.findings.length} issues
                            </span>
                          </div>
                        ) : (
                          <span className="text-gray-400 text-sm">None</span>
                        )}
                      </td>
                      <td className="py-4 px-4 text-gray-600">
                        {new Date(review.reviewDate).toLocaleDateString()}
                      </td>
                      <td className="py-4 px-4">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium capitalize flex items-center gap-1 ${getStatusColor(review.status)}`}
                        >
                          {review.status === "passed" ? (
                            <CheckCircle className="w-3 h-3" />
                          ) : review.status === "failed" ? (
                            <XCircle className="w-3 h-3" />
                          ) : (
                            <Clock className="w-3 h-3" />
                          )}
                          {review.status}
                        </span>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-2">
                          <button className="px-3 py-1 text-sm font-medium text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                            View Details
                          </button>
                          {review.status === "failed" && (
                            <button className="px-3 py-1 text-sm font-medium text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                              Create Action
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QualityLeakageScreen;
