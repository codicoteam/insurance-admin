import React, { useState } from "react";
import {
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  DollarSign,
  Clock,
  CheckCircle,
  FileText,
  Calendar,
  Filter,
  Search,
  Download,
  BarChart3,
  Activity,
  Menu,
  Shield,
} from "lucide-react";
import InsuranceSidebar from "../Components/sidebar";

interface ClaimsMetric {
  id: string;
  title: string;
  value: string;
  change: number;
  changeType: "increase" | "decrease" | "neutral";
  period: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
}

const ClaimsAnalyticsScreen = () => {
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<
    "overview" | "severity" | "duration"
  >("overview");
  const [dateRange, setDateRange] = useState("month");
  const [searchTerm, setSearchTerm] = useState("");

  const claimsMetrics: ClaimsMetric[] = [
    {
      id: "total-claims",
      title: "Total Claims",
      value: "3,847",
      change: 8.2,
      changeType: "increase",
      period: "vs last month",
      icon: FileText,
      color: "bg-blue-500",
    },
    {
      id: "claim-amount",
      title: "Total Claim Amount",
      value: "$18.2M",
      change: 12.5,
      changeType: "increase",
      period: "vs last month",
      icon: DollarSign,
      color: "bg-green-500",
    },
    {
      id: "avg-claim",
      title: "Avg Claim Size",
      value: "$4,732",
      change: 3.8,
      changeType: "increase",
      period: "vs last month",
      icon: Activity,
      color: "bg-purple-500",
    },
    {
      id: "pending",
      title: "Pending Claims",
      value: "892",
      change: -5.2,
      changeType: "decrease",
      period: "vs last month",
      icon: Clock,
      color: "bg-orange-500",
    },
    {
      id: "approved",
      title: "Approved Claims",
      value: "2,654",
      change: 15.3,
      changeType: "increase",
      period: "vs last month",
      icon: CheckCircle,
      color: "bg-teal-500",
    },
    {
      id: "denied",
      title: "Denied Claims",
      value: "301",
      change: -2.1,
      changeType: "decrease",
      period: "vs last month",
      icon: AlertTriangle,
      color: "bg-red-500",
    },
  ];

  const claimsByTypeData = [
    { label: "Auto Collision", value: 32, color: "bg-blue-500" },
    { label: "Property Damage", value: 24, color: "bg-green-500" },
    { label: "Theft", value: 18, color: "bg-purple-500" },
    { label: "Medical", value: 14, color: "bg-orange-500" },
    { label: "Other", value: 12, color: "bg-gray-400" },
  ];

  const monthlyClaimsTrend = [
    { label: "Jan", value: 580 },
    { label: "Feb", value: 620 },
    { label: "Mar", value: 590 },
    { label: "Apr", value: 650 },
    { label: "May", value: 680 },
    { label: "Jun", value: 727 },
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

  return (
    <div className="flex min-h-screen bg-white">
      <InsuranceSidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

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
                Claims Analytics
              </h1>
              <p className="text-gray-600">
                Analyze claims patterns, severity, and processing efficiency
              </p>
            </div>

            {/* Tab Navigation */}
            <div className="bg-white rounded-xl shadow-sm border border-blue-100 mb-6">
              <div className="flex border-b border-gray-200">
                <button
                  onClick={() => setActiveTab("overview")}
                  className={`flex-1 px-6 py-4 font-medium transition-colors ${
                    activeTab === "overview"
                      ? "text-blue-600 border-b-2 border-blue-600 bg-blue-50"
                      : "text-gray-600 hover:text-gray-800 hover:bg-gray-50"
                  }`}
                >
                  <div className="flex items-center justify-center gap-2">
                    <BarChart3 className="w-5 h-5" />
                    Overview
                  </div>
                </button>
                <button
                  onClick={() => setActiveTab("severity")}
                  className={`flex-1 px-6 py-4 font-medium transition-colors ${
                    activeTab === "severity"
                      ? "text-blue-600 border-b-2 border-blue-600 bg-blue-50"
                      : "text-gray-600 hover:text-gray-800 hover:bg-gray-50"
                  }`}
                >
                  <div className="flex items-center justify-center gap-2">
                    <AlertTriangle className="w-5 h-5" />
                    Severity
                  </div>
                </button>
                <button
                  onClick={() => setActiveTab("duration")}
                  className={`flex-1 px-6 py-4 font-medium transition-colors ${
                    activeTab === "duration"
                      ? "text-blue-600 border-b-2 border-blue-600 bg-blue-50"
                      : "text-gray-600 hover:text-gray-800 hover:bg-gray-50"
                  }`}
                >
                  <div className="flex items-center justify-center gap-2">
                    <Clock className="w-5 h-5" />
                    Duration
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
                    placeholder="Search claims..."
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
              {claimsMetrics.map((metric) => {
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
              {/* Claims by Type */}
              <div className="bg-white rounded-xl shadow-sm border border-blue-100 p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold text-gray-800">
                    Claims by Type
                  </h3>
                  <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                    View Details
                  </button>
                </div>
                <div className="space-y-4">
                  {claimsByTypeData.map((item) => (
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

              {/* Monthly Claims Trend */}
              <div className="bg-white rounded-xl shadow-sm border border-blue-100 p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold text-gray-800">
                    Monthly Claims Trend
                  </h3>
                  <div className="flex items-center gap-2">
                    <Filter className="w-4 h-4 text-gray-400" />
                    <select className="text-sm border-none bg-transparent text-gray-600 focus:outline-none">
                      <option>Last 6 Months</option>
                      <option>Last 12 Months</option>
                    </select>
                  </div>
                </div>
                <div className="flex items-end justify-between h-48">
                  {monthlyClaimsTrend.map((item) => {
                    const maxValue = Math.max(
                      ...monthlyClaimsTrend.map((d) => d.value),
                    );
                    const height = (item.value / maxValue) * 100;
                    return (
                      <div
                        key={item.label}
                        className="flex flex-col items-center flex-1"
                      >
                        <div className="w-full px-2">
                          <div
                            className="bg-gradient-to-t from-blue-600 to-blue-400 rounded-t-lg transition-all duration-500 hover:from-blue-700 hover:to-blue-500"
                            style={{ height: `${height}%`, minHeight: "20px" }}
                          />
                        </div>
                        <span className="text-xs text-gray-600 mt-2">
                          {item.label}
                        </span>
                        <span className="text-xs font-medium text-gray-800">
                          {item.value}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Recent Claims Table */}
            <div className="bg-white rounded-xl shadow-sm border border-blue-100 p-6 mt-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-800">
                  Recent Claims Activity
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
                        Claim ID
                      </th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">
                        Policyholder
                      </th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">
                        Type
                      </th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">
                        Amount
                      </th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">
                        Status
                      </th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">
                        Date
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-gray-100 hover:bg-blue-50 transition-colors">
                      <td className="py-3 px-4 text-sm text-blue-600 font-medium">
                        CLM-2024-3847
                      </td>
                      <td className="py-3 px-4 text-sm text-gray-800">
                        John Anderson
                      </td>
                      <td className="py-3 px-4 text-sm text-gray-600">
                        Auto Collision
                      </td>
                      <td className="py-3 px-4 text-sm font-medium text-gray-800">
                        $12,450
                      </td>
                      <td className="py-3 px-4">
                        <span className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-xs font-medium">
                          Pending
                        </span>
                      </td>
                      <td className="py-3 px-4 text-sm text-gray-600">
                        2024-10-19
                      </td>
                    </tr>
                    <tr className="border-b border-gray-100 hover:bg-blue-50 transition-colors">
                      <td className="py-3 px-4 text-sm text-blue-600 font-medium">
                        CLM-2024-3846
                      </td>
                      <td className="py-3 px-4 text-sm text-gray-800">
                        Maria Rodriguez
                      </td>
                      <td className="py-3 px-4 text-sm text-gray-600">
                        Property Damage
                      </td>
                      <td className="py-3 px-4 text-sm font-medium text-gray-800">
                        $8,230
                      </td>
                      <td className="py-3 px-4">
                        <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">
                          Approved
                        </span>
                      </td>
                      <td className="py-3 px-4 text-sm text-gray-600">
                        2024-10-19
                      </td>
                    </tr>
                    <tr className="border-b border-gray-100 hover:bg-blue-50 transition-colors">
                      <td className="py-3 px-4 text-sm text-blue-600 font-medium">
                        CLM-2024-3845
                      </td>
                      <td className="py-3 px-4 text-sm text-gray-800">
                        David Chen
                      </td>
                      <td className="py-3 px-4 text-sm text-gray-600">Theft</td>
                      <td className="py-3 px-4 text-sm font-medium text-gray-800">
                        $3,150
                      </td>
                      <td className="py-3 px-4">
                        <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">
                          Approved
                        </span>
                      </td>
                      <td className="py-3 px-4 text-sm text-gray-600">
                        2024-10-18
                      </td>
                    </tr>
                    <tr className="border-b border-gray-100 hover:bg-blue-50 transition-colors">
                      <td className="py-3 px-4 text-sm text-blue-600 font-medium">
                        CLM-2024-3844
                      </td>
                      <td className="py-3 px-4 text-sm text-gray-800">
                        Emily Watson
                      </td>
                      <td className="py-3 px-4 text-sm text-gray-600">
                        Medical
                      </td>
                      <td className="py-3 px-4 text-sm font-medium text-gray-800">
                        $5,890
                      </td>
                      <td className="py-3 px-4">
                        <span className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-xs font-medium">
                          Denied
                        </span>
                      </td>
                      <td className="py-3 px-4 text-sm text-gray-600">
                        2024-10-18
                      </td>
                    </tr>
                    <tr className="hover:bg-blue-50 transition-colors">
                      <td className="py-3 px-4 text-sm text-blue-600 font-medium">
                        CLM-2024-3843
                      </td>
                      <td className="py-3 px-4 text-sm text-gray-800">
                        Ahmed Hassan
                      </td>
                      <td className="py-3 px-4 text-sm text-gray-600">
                        Auto Collision
                      </td>
                      <td className="py-3 px-4 text-sm font-medium text-gray-800">
                        $15,670
                      </td>
                      <td className="py-3 px-4">
                        <span className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-xs font-medium">
                          Pending
                        </span>
                      </td>
                      <td className="py-3 px-4 text-sm text-gray-600">
                        2024-10-17
                      </td>
                    </tr>
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

export default ClaimsAnalyticsScreen;
