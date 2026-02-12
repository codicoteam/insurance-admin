import React, { useState } from "react";
import {
  TrendingUp,
  TrendingDown,
  Users,
  Calendar,
  Filter,
  Search,
  Download,
  Activity,
  Clock,
  CheckCircle,
  AlertTriangle,
  Menu,
  Shield,
} from "lucide-react";
import InsuranceSidebar from "../Components/sidebar";

interface OperationalMetric {
  id: string;
  title: string;
  value: string;
  change: number;
  changeType: "increase" | "decrease" | "neutral";
  period: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
}

const OperationalReportsScreen = () => {
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<
    "overview" | "processing" | "productivity"
  >("overview");
  const [dateRange, setDateRange] = useState("month");
  const [searchTerm, setSearchTerm] = useState("");

  const operationalMetrics: OperationalMetric[] = [
    {
      id: "policies-processed",
      title: "Policies Processed",
      value: "4,287",
      change: 8.5,
      changeType: "increase",
      period: "vs last month",
      icon: CheckCircle,
      color: "bg-green-500",
    },
    {
      id: "avg-time",
      title: "Avg Processing Time",
      value: "2.4 hrs",
      change: -12.5,
      changeType: "decrease",
      period: "vs last month",
      icon: Clock,
      color: "bg-blue-500",
    },
    {
      id: "quotes-given",
      title: "Quotes Generated",
      value: "8,234",
      change: 15.3,
      changeType: "increase",
      period: "vs last month",
      icon: Activity,
      color: "bg-purple-500",
    },
    {
      id: "claims-processed",
      title: "Claims Processed",
      value: "3,847",
      change: 5.2,
      changeType: "increase",
      period: "vs last month",
      icon: Activity,
      color: "bg-teal-500",
    },
    {
      id: "pending",
      title: "Pending Items",
      value: "1,247",
      change: -8.3,
      changeType: "decrease",
      period: "vs last month",
      icon: AlertTriangle,
      color: "bg-orange-500",
    },
    {
      id: "agents",
      title: "Active Agents",
      value: "124",
      change: 3.2,
      changeType: "increase",
      period: "vs last month",
      icon: Users,
      color: "bg-indigo-500",
    },
  ];

  const processingTimeData = [
    { label: "Auto Insurance", value: 1.8, color: "bg-blue-500" },
    { label: "Home Insurance", value: 2.5, color: "bg-green-500" },
    { label: "Life Insurance", value: 4.2, color: "bg-purple-500" },
    { label: "Health Insurance", value: 3.1, color: "bg-orange-500" },
    { label: "Commercial", value: 5.8, color: "bg-gray-400" },
  ];

  const agentProductivity = [
    { label: "John Smith", value: 156, status: "Excellent" },
    { label: "Sarah Johnson", value: 142, status: "Good" },
    { label: "Mike Davis", value: 138, status: "Good" },
    { label: "Emily Brown", value: 125, status: "Average" },
    { label: "David Wilson", value: 118, status: "Average" },
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
                Operational Reports
              </h1>
              <p className="text-gray-600">
                Monitor operational performance and agent productivity
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
                    <Activity className="w-5 h-5" />
                    Overview
                  </div>
                </button>
                <button
                  onClick={() => setActiveTab("processing")}
                  className={`flex-1 px-6 py-4 font-medium transition-colors ${
                    activeTab === "processing"
                      ? "text-blue-600 border-b-2 border-blue-600 bg-blue-50"
                      : "text-gray-600 hover:text-gray-800 hover:bg-gray-50"
                  }`}
                >
                  <div className="flex items-center justify-center gap-2">
                    <Clock className="w-5 h-5" />
                    Processing
                  </div>
                </button>
                <button
                  onClick={() => setActiveTab("productivity")}
                  className={`flex-1 px-6 py-4 font-medium transition-colors ${
                    activeTab === "productivity"
                      ? "text-blue-600 border-b-2 border-blue-600 bg-blue-50"
                      : "text-gray-600 hover:text-gray-800 hover:bg-gray-50"
                  }`}
                >
                  <div className="flex items-center justify-center gap-2">
                    <Users className="w-5 h-5" />
                    Productivity
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
                    placeholder="Search operations..."
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
              {operationalMetrics.map((metric) => {
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
              {/* Processing Time by Product */}
              <div className="bg-white rounded-xl shadow-sm border border-blue-100 p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold text-gray-800">
                    Processing Time by Product
                  </h3>
                  <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                    View Details
                  </button>
                </div>
                <div className="space-y-4">
                  {processingTimeData.map((item) => (
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
                          {item.value} hrs
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-3">
                        <div
                          className={`${item.color} h-3 rounded-full transition-all duration-500`}
                          style={{ width: `${(item.value / 6) * 100}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Agent Productivity */}
              <div className="bg-white rounded-xl shadow-sm border border-blue-100 p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold text-gray-800">
                    Top Performing Agents
                  </h3>
                  <div className="flex items-center gap-2">
                    <Filter className="w-4 h-4 text-gray-400" />
                    <select className="text-sm border-none bg-transparent text-gray-600 focus:outline-none">
                      <option>This Month</option>
                      <option>Last Month</option>
                      <option>This Quarter</option>
                    </select>
                  </div>
                </div>
                <div className="space-y-4">
                  {agentProductivity.map((agent, index) => (
                    <div
                      key={agent.label}
                      className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-700 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                          {index + 1}
                        </div>
                        <span className="text-sm font-medium text-gray-800">
                          {agent.label}
                        </span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-sm font-semibold text-gray-800">
                          {agent.value} tasks
                        </span>
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${
                            agent.status === "Excellent"
                              ? "bg-green-100 text-green-700"
                              : agent.status === "Good"
                                ? "bg-blue-100 text-blue-700"
                                : "bg-yellow-100 text-yellow-700"
                          }`}
                        >
                          {agent.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Queue Status Table */}
            <div className="bg-white rounded-xl shadow-sm border border-blue-100 p-6 mt-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-800">
                  Queue Status
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
                        Queue
                      </th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">
                        Pending
                      </th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">
                        In Progress
                      </th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">
                        Avg Wait Time
                      </th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-gray-100 hover:bg-blue-50 transition-colors">
                      <td className="py-3 px-4 text-sm text-gray-800 font-medium">
                        New Applications
                      </td>
                      <td className="py-3 px-4 text-sm text-gray-800">245</td>
                      <td className="py-3 px-4 text-sm text-gray-800">32</td>
                      <td className="py-3 px-4 text-sm text-gray-800">
                        1.2 hrs
                      </td>
                      <td className="py-3 px-4">
                        <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">
                          Normal
                        </span>
                      </td>
                    </tr>
                    <tr className="border-b border-gray-100 hover:bg-blue-50 transition-colors">
                      <td className="py-3 px-4 text-sm text-gray-800 font-medium">
                        Quote Requests
                      </td>
                      <td className="py-3 px-4 text-sm text-gray-800">187</td>
                      <td className="py-3 px-4 text-sm text-gray-800">28</td>
                      <td className="py-3 px-4 text-sm text-gray-800">
                        0.8 hrs
                      </td>
                      <td className="py-3 px-4">
                        <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">
                          Normal
                        </span>
                      </td>
                    </tr>
                    <tr className="hover:bg-blue-50 transition-colors">
                      <td className="py-3 px-4 text-sm text-gray-800 font-medium">
                        Claims Review
                      </td>
                      <td className="py-3 px-4 text-sm text-gray-800">156</td>
                      <td className="py-3 px-4 text-sm text-gray-800">45</td>
                      <td className="py-3 px-4 text-sm text-gray-800">
                        2.5 hrs
                      </td>
                      <td className="py-3 px-4">
                        <span className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-xs font-medium">
                          Busy
                        </span>
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

export default OperationalReportsScreen;
//