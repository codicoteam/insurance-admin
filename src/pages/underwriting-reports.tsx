import { useState } from "react";
import {
  Search,
  Filter,
  Download,
  Plus,
  FileText,
  Menu,
  BarChart3,
  TrendingUp,
  Calendar,
  Eye,
  RefreshCw,
} from "lucide-react";
import InsuranceSidebar from "../Components/sidebar";

interface Report {
  id: string;
  name: string;
  category: string;
  frequency: string;
  lastRun: string;
  status: "completed" | "running" | "scheduled" | "failed";
  records: number;
}

const UnderwritingReports = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("all");

  const reports: Report[] = [
    {
      id: "UWR-001",
      name: "Daily Underwriting Activity",
      category: "Activity",
      frequency: "Daily",
      lastRun: "2024-10-23 08:00",
      status: "completed",
      records: 156,
    },
    {
      id: "UWR-002",
      name: "Referral Queue Analysis",
      category: "Referrals",
      frequency: "Weekly",
      lastRun: "2024-10-21 09:00",
      status: "completed",
      records: 89,
    },
    {
      id: "UWR-003",
      name: "Risk Assessment Summary",
      category: "Risk",
      frequency: "Monthly",
      lastRun: "2024-10-01 10:00",
      status: "completed",
      records: 1245,
    },
    {
      id: "UWR-004",
      name: "Approval Rate Trends",
      category: "Performance",
      frequency: "Weekly",
      lastRun: "2024-10-23 07:30",
      status: "running",
      records: 0,
    },
    {
      id: "UWR-005",
      name: "Underwriter Productivity",
      category: "Performance",
      frequency: "Monthly",
      lastRun: "2024-10-01 11:00",
      status: "completed",
      records: 45,
    },
    {
      id: "UWR-006",
      name: "Exception Report",
      category: "Exceptions",
      frequency: "Daily",
      lastRun: "2024-10-22 08:00",
      status: "failed",
      records: 0,
    },
    {
      id: "UWR-007",
      name: "Guidelines Compliance",
      category: "Compliance",
      frequency: "Weekly",
      lastRun: "2024-10-21 10:00",
      status: "completed",
      records: 234,
    },
    {
      id: "UWR-008",
      name: "Processing Time Analysis",
      category: "Performance",
      frequency: "Daily",
      lastRun: "2024-10-23 06:00",
      status: "scheduled",
      records: 0,
    },
  ];

  const stats = {
    totalReports: 8,
    completedToday: 3,
    avgProcessingTime: "2.5 min",
    dataPoints: 1769,
  };

  const filteredReports = reports.filter((report) => {
    const matchesSearch =
      report.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      report.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      filterCategory === "all" || report.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  const getStatusBadge = (status: string) => {
    const styles: Record<string, string> = {
      completed: "bg-green-100 text-green-800 border-green-200",
      running: "bg-blue-100 text-blue-800 border-blue-200",
      scheduled: "bg-amber-100 text-amber-800 border-amber-200",
      failed: "bg-red-100 text-red-800 border-red-200",
    };
    return (
      <span
        className={`px-3 py-1 rounded-full text-xs font-medium border ${styles[status]}`}
      >
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  const getFrequencyBadge = (frequency: string) => {
    const styles: Record<string, string> = {
      Daily: "bg-purple-100 text-purple-800 border-purple-200",
      Weekly: "bg-blue-100 text-blue-800 border-blue-200",
      Monthly: "bg-indigo-100 text-indigo-800 border-indigo-200",
      Quarterly: "bg-cyan-100 text-cyan-800 border-cyan-200",
    };
    return (
      <span
        className={`px-3 py-1 rounded-full text-xs font-medium border ${styles[frequency]}`}
      >
        {frequency}
      </span>
    );
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <InsuranceSidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

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
                <FileText className="w-4 h-4 text-white" />
              </div>
              <h1 className="text-lg font-bold text-gray-900">InsureCore</h1>
            </div>
          </div>
        </div>

        {/* Page Content */}
        <div className="p-4 lg:p-6">
          {/* Header */}
          <div className="mb-8">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
              <div>
                <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">
                  UW Reports
                </h1>
                <p className="text-gray-600 mt-1">
                  View and manage underwriting reports and analytics
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
                  <span>New Report</span>
                </button>
              </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              <div className="bg-white rounded-xl border border-gray-200 p-5 hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm font-medium text-gray-600">
                    Total Reports
                  </span>
                  <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
                    <BarChart3 className="w-5 h-5 text-blue-600" />
                  </div>
                </div>
                <span className="text-3xl font-bold text-gray-900">
                  {stats.totalReports}
                </span>
                <p className="text-xs text-gray-500 mt-1">Available reports</p>
              </div>

              <div className="bg-white rounded-xl border border-gray-200 p-5 hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm font-medium text-gray-600">
                    Completed Today
                  </span>
                  <div className="w-10 h-10 bg-green-50 rounded-lg flex items-center justify-center">
                    <TrendingUp className="w-5 h-5 text-green-600" />
                  </div>
                </div>
                <span className="text-3xl font-bold text-gray-900">
                  {stats.completedToday}
                </span>
                <p className="text-xs text-gray-500 mt-1">Reports run</p>
              </div>

              <div className="bg-white rounded-xl border border-gray-200 p-5 hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm font-medium text-gray-600">
                    Avg Processing Time
                  </span>
                  <div className="w-10 h-10 bg-purple-50 rounded-lg flex items-center justify-center">
                    <RefreshCw className="w-5 h-5 text-purple-600" />
                  </div>
                </div>
                <span className="text-3xl font-bold text-gray-900">2.5</span>
                <p className="text-xs text-gray-500 mt-1">Minutes average</p>
              </div>

              <div className="bg-white rounded-xl border border-gray-200 p-5 hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm font-medium text-gray-600">
                    Data Points
                  </span>
                  <div className="w-10 h-10 bg-amber-50 rounded-lg flex items-center justify-center">
                    <Calendar className="w-5 h-5 text-amber-600" />
                  </div>
                </div>
                <span className="text-3xl font-bold text-gray-900">
                  {stats.dataPoints.toLocaleString()}
                </span>
                <p className="text-xs text-gray-500 mt-1">Records processed</p>
              </div>
            </div>

            {/* Filters */}
            <div className="bg-white rounded-xl border border-gray-200 p-4 mb-6">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search reports..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div className="flex gap-3">
                  <select
                    value={filterCategory}
                    onChange={(e) => setFilterCategory(e.target.value)}
                    className="px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                  >
                    <option value="all">All Categories</option>
                    <option value="Activity">Activity</option>
                    <option value="Referrals">Referrals</option>
                    <option value="Risk">Risk</option>
                    <option value="Performance">Performance</option>
                    <option value="Exceptions">Exceptions</option>
                    <option value="Compliance">Compliance</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Reports Table */}
            <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Report ID
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Name
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Category
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Frequency
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Last Run
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Records
                      </th>
                      <th className="px-6 py-4 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {filteredReports.map((report) => (
                      <tr
                        key={report.id}
                        className="hover:bg-gray-50 transition-colors"
                      >
                        <td className="px-6 py-4 text-sm font-medium text-gray-900">
                          {report.id}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-900">
                          {report.name}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-600">
                          {report.category}
                        </td>
                        <td className="px-6 py-4">
                          {getFrequencyBadge(report.frequency)}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-600">
                          {report.lastRun}
                        </td>
                        <td className="px-6 py-4">
                          {getStatusBadge(report.status)}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-600">
                          {report.records > 0
                            ? report.records.toLocaleString()
                            : "-"}
                        </td>
                        <td className="px-6 py-4 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <button
                              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                              title="View Report"
                            >
                              <Eye className="w-4 h-4 text-gray-500" />
                            </button>
                            <button
                              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                              title="Download"
                            >
                              <Download className="w-4 h-4 text-gray-500" />
                            </button>
                            <button
                              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                              title="Run Now"
                            >
                              <RefreshCw className="w-4 h-4 text-gray-500" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {filteredReports.length === 0 && (
                <div className="p-12 text-center">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Search className="w-8 h-8 text-gray-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    No reports found
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

export default UnderwritingReports;
