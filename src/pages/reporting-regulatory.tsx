import React, { useState } from "react";
import {
  TrendingUp,
  TrendingDown,
  FileText,
  Calendar,
  Filter,
  Search,
  Download,
  CheckCircle,
  AlertTriangle,
  Clock,
  Menu,
  Shield,
} from "lucide-react";

interface RegulatoryMetric {
  id: string;
  title: string;
  value: string;
  change: number;
  changeType: "increase" | "decrease" | "neutral";
  period: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
}

const RegulatoryReportsScreen = () => {
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<
    "compliance" | "filings" | "audits"
  >("compliance");
  const [dateRange, setDateRange] = useState("month");
  const [searchTerm, setSearchTerm] = useState("");

  const regulatoryMetrics: RegulatoryMetric[] = [
    {
      id: "compliance-rate",
      title: "Compliance Rate",
      value: "98.5%",
      change: 0.5,
      changeType: "increase",
      period: "vs last month",
      icon: CheckCircle,
      color: "bg-green-500",
    },
    {
      id: "filings",
      title: "Regulatory Filings",
      value: "24",
      change: 8.3,
      changeType: "increase",
      period: "vs last month",
      icon: FileText,
      color: "bg-blue-500",
    },
    {
      id: "pending-reviews",
      title: "Pending Reviews",
      value: "7",
      change: -15.2,
      changeType: "decrease",
      period: "vs last month",
      icon: Clock,
      color: "bg-orange-500",
    },
    {
      id: "violations",
      title: "Compliance Violations",
      value: "2",
      change: -50.0,
      changeType: "decrease",
      period: "vs last month",
      icon: AlertTriangle,
      color: "bg-red-500",
    },
    {
      id: "audits",
      title: "Completed Audits",
      value: "12",
      change: 20.0,
      changeType: "increase",
      period: "vs last month",
      icon: CheckCircle,
      color: "bg-purple-500",
    },
    {
      id: "pending-audits",
      title: "Pending Audits",
      value: "5",
      change: -25.0,
      changeType: "decrease",
      period: "vs last month",
      icon: Clock,
      color: "bg-teal-500",
    },
  ];

  const complianceByCategory = [
    { label: "Data Privacy", value: 99, color: "bg-green-500" },
    { label: "Financial Reporting", value: 98, color: "bg-blue-500" },
    { label: "Consumer Protection", value: 97, color: "bg-purple-500" },
    { label: "Anti-Money Laundering", value: 100, color: "bg-teal-500" },
    { label: "Claims Handling", value: 96, color: "bg-orange-500" },
  ];

  const recentFilings = [
    {
      id: "FIL-2024-001",
      title: "Q3 Financial Statement",
      status: "Approved",
      date: "2024-10-15",
      agency: "SEC",
    },
    {
      id: "FIL-2024-002",
      title: "Claims Ratio Report",
      status: "Pending",
      date: "2024-10-18",
      agency: "DOI",
    },
    {
      id: "FIL-2024-003",
      title: "Capital Adequacy Report",
      status: "Approved",
      date: "2024-10-20",
      agency: "NAIC",
    },
    {
      id: "FIL-2024-004",
      title: "Consumer Complaint Summary",
      status: "Under Review",
      date: "2024-10-21",
      agency: "CFPB",
    },
    {
      id: "FIL-2024-005",
      title: "Market Conduct Examination",
      status: "Pending",
      date: "2024-10-22",
      agency: "DOI",
    },
  ];

  const getChangeIcon = (changeType: string) => {
    if (changeType === "increase") return <TrendingUp className="w-4 h-4" />;
    if (changeType === "decrease") return <TrendingDown className="w-4 h-4" />;
    return null;
  };

  const getChangeColor = (changeType: string) => {
    if (changeType === "increase") return "text-green-600";
    if (changeType === "decrease") return "text-red-600";
    return "text-gray-600";
  };

  const getStatusBadge = (status: string) => {
    const styles: { [key: string]: string } = {
      Approved: "bg-green-100 text-green-700",
      Pending: "bg-yellow-100 text-yellow-700",
      "Under Review": "bg-blue-100 text-blue-700",
    };
    return (
      <span
        className={`px-3 py-1 rounded-full text-xs font-medium ${styles[status] || "bg-gray-100 text-gray-700"}`}
      >
        {status}
      </span>
    );
  };

  return (
    <div className="flex min-h-screen bg-white">
      <div className="flex-1 lg:ml-0">
        {/* Mobile Header */}
        <div className="lg:hidden bg-white border-b border-blue-100 shadow-sm p-4">
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

        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 p-6">
          <div className="max-w-7xl mx-auto">
            {/* Header */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-800 mb-2">
                Regulatory Reports
              </h1>
              <p className="text-gray-600">
                Track compliance status and regulatory filings
              </p>
            </div>

            {/* Tab Navigation */}
            <div className="bg-white rounded-xl shadow-sm border border-blue-100 mb-6">
              <div className="flex border-b border-gray-200">
                <button
                  onClick={() => setActiveTab("compliance")}
                  className={`flex-1 px-6 py-4 font-medium transition-colors ${
                    activeTab === "compliance"
                      ? "text-blue-600 border-b-2 border-blue-600 bg-blue-50"
                      : "text-gray-600 hover:text-gray-800 hover:bg-gray-50"
                  }`}
                >
                  <div className="flex items-center justify-center gap-2">
                    <CheckCircle className="w-5 h-5" />
                    Compliance
                  </div>
                </button>
                <button
                  onClick={() => setActiveTab("filings")}
                  className={`flex-1 px-6 py-4 font-medium transition-colors ${
                    activeTab === "filings"
                      ? "text-blue-600 border-b-2 border-blue-600 bg-blue-50"
                      : "text-gray-600 hover:text-gray-800 hover:bg-gray-50"
                  }`}
                >
                  <div className="flex items-center justify-center gap-2">
                    <FileText className="w-5 h-5" />
                    Filings
                  </div>
                </button>
                <button
                  onClick={() => setActiveTab("audits")}
                  className={`flex-1 px-6 py-4 font-medium transition-colors ${
                    activeTab === "audits"
                      ? "text-blue-600 border-b-2 border-blue-600 bg-blue-50"
                      : "text-gray-600 hover:text-gray-800 hover:bg-gray-50"
                  }`}
                >
                  <div className="flex items-center justify-center gap-2">
                    <Clock className="w-5 h-5" />
                    Audits
                  </div>
                </button>
              </div>
            </div>

            {/* Filters */}
            <div className="bg-white rounded-xl shadow-sm border border-blue-100 p-6 mb-6">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Search reports..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  />
                </div>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <select
                    value={dateRange}
                    onChange={(e) => setDateRange(e.target.value)}
                    className="pl-10 pr-8 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none bg-white appearance-none cursor-pointer"
                  >
                    <option value="week">Last Week</option>
                    <option value="month">Last Month</option>
                    <option value="quarter">Last Quarter</option>
                    <option value="year">Last Year</option>
                  </select>
                </div>
                <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2 font-medium">
                  <Download className="w-5 h-5" />
                  Export
                </button>
              </div>
            </div>

            {/* KPI Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {regulatoryMetrics.map((metric) => {
                const Icon = metric.icon;
                return (
                  <div
                    key={metric.id}
                    className="bg-white rounded-xl shadow-sm border border-blue-100 p-6 hover:shadow-md transition-all"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div
                        className={`w-12 h-12 ${metric.color} rounded-lg flex items-center justify-center`}
                      >
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <div
                        className={`flex items-center gap-1 text-sm font-medium ${getChangeColor(metric.changeType)}`}
                      >
                        {getChangeIcon(metric.changeType)}
                        {Math.abs(metric.change)}%
                      </div>
                    </div>
                    <h3 className="text-gray-600 text-sm font-medium mb-1">
                      {metric.title}
                    </h3>
                    <p className="text-3xl font-bold text-gray-800 mb-2">
                      {metric.value}
                    </p>
                    <p className="text-xs text-gray-500">{metric.period}</p>
                  </div>
                );
              })}
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Compliance by Category */}
              <div className="bg-white rounded-xl shadow-sm border border-blue-100 p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold text-gray-800">
                    Compliance by Category
                  </h3>
                  <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                    View Details
                  </button>
                </div>
                <div className="space-y-4">
                  {complianceByCategory.map((item) => (
                    <div key={item.label}>
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <div
                            className={`w-3 h-3 ${item.color} rounded-full`}
                          />
                          <span className="text-sm font-medium text-gray-700">
                            {item.label}
                          </span>
                        </div>
                        <span className="text-sm text-gray-600">
                          {item.value}%
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-3">
                        <div
                          className={`${item.color} h-3 rounded-full transition-all duration-500`}
                          style={{ width: `${item.value}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Upcoming Deadlines */}
              <div className="bg-white rounded-xl shadow-sm border border-blue-100 p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold text-gray-800">
                    Upcoming Deadlines
                  </h3>
                  <div className="flex items-center gap-2">
                    <Filter className="w-4 h-4 text-gray-400" />
                    <select className="text-sm border-none bg-transparent text-gray-600 focus:outline-none">
                      <option>All</option>
                      <option>This Week</option>
                      <option>This Month</option>
                    </select>
                  </div>
                </div>
                <div className="space-y-4">
                  {[
                    {
                      title: "Q4 Financial Report",
                      date: "2024-11-15",
                      daysLeft: 27,
                      priority: "High",
                    },
                    {
                      title: "Annual Claims Audit",
                      date: "2024-11-30",
                      daysLeft: 42,
                      priority: "Medium",
                    },
                    {
                      title: "Consumer Protection Filing",
                      date: "2024-12-01",
                      daysLeft: 43,
                      priority: "High",
                    },
                    {
                      title: "Capital Adequacy Update",
                      date: "2024-12-15",
                      daysLeft: 57,
                      priority: "Medium",
                    },
                    {
                      title: "Anti-Money Laundering Review",
                      date: "2024-12-31",
                      daysLeft: 73,
                      priority: "Low",
                    },
                  ].map((deadline) => (
                    <div
                      key={deadline.title}
                      className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                    >
                      <div>
                        <p className="text-sm font-medium text-gray-800">
                          {deadline.title}
                        </p>
                        <p className="text-xs text-gray-500">
                          Due: {deadline.date}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium text-gray-800">
                          {deadline.daysLeft} days
                        </span>
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${
                            deadline.priority === "High"
                              ? "bg-red-100 text-red-700"
                              : deadline.priority === "Medium"
                                ? "bg-yellow-100 text-yellow-700"
                                : "bg-green-100 text-green-700"
                          }`}
                        >
                          {deadline.priority}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Recent Filings Table */}
            <div className="bg-white rounded-xl shadow-sm border border-blue-100 p-6 mt-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-800">
                  Recent Regulatory Filings
                </h3>
                <button className="text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center gap-1">
                  <Download className="w-4 h-4" />
                  Download CSV
                </button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">
                        Filing ID
                      </th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">
                        Title
                      </th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">
                        Agency
                      </th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">
                        Date
                      </th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentFilings.map((filing) => (
                      <tr
                        key={filing.id}
                        className="border-b border-gray-100 hover:bg-blue-50 transition-colors"
                      >
                        <td className="py-3 px-4 text-sm text-blue-600 font-medium">
                          {filing.id}
                        </td>
                        <td className="py-3 px-4 text-sm text-gray-800">
                          {filing.title}
                        </td>
                        <td className="py-3 px-4 text-sm text-gray-600">
                          {filing.agency}
                        </td>
                        <td className="py-3 px-4 text-sm text-gray-600">
                          {filing.date}
                        </td>
                        <td className="py-3 px-4">
                          {getStatusBadge(filing.status)}
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
    </div>
  );
};

export default RegulatoryReportsScreen;
//
