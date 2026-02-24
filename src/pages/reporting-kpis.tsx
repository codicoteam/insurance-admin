import React, { useState } from "react";
import {
  TrendingUp,
  TrendingDown,
  Users,
  DollarSign,
  FileText,
  Calendar,
  Filter,
  Search,
  Download,
  BarChart3,
  Activity,
  Target,
  Menu,
  Shield,
} from "lucide-react";

interface KPIMetric {
  id: string;
  title: string;
  value: string;
  change: number;
  changeType: "increase" | "decrease" | "neutral";
  period: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
}

interface ChartData {
  label: string;
  value: number;
  total?: number;
}

const PortfolioKPIsScreen = () => {
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<"overview" | "trends" | "targets">(
    "overview",
  );
  const [dateRange, setDateRange] = useState("month");
  const [searchTerm, setSearchTerm] = useState("");

  const kpiMetrics: KPIMetric[] = [
    {
      id: "premium",
      title: "Total Premium",
      value: "$24.5M",
      change: 12.5,
      changeType: "increase",
      period: "vs last month",
      icon: DollarSign,
      color: "bg-green-500",
    },
    {
      id: "policies",
      title: "Active Policies",
      value: "48,234",
      change: 3.2,
      changeType: "increase",
      period: "vs last month",
      icon: FileText,
      color: "bg-blue-500",
    },
    {
      id: "loss-ratio",
      title: "Loss Ratio",
      value: "67.8%",
      change: -2.1,
      changeType: "decrease",
      period: "vs last month",
      icon: TrendingDown,
      color: "bg-orange-500",
    },
    {
      id: "retention",
      title: "Retention Rate",
      value: "94.2%",
      change: 0.8,
      changeType: "increase",
      period: "vs last month",
      icon: Target,
      color: "bg-purple-500",
    },
    {
      id: "claims",
      title: "Claims Ratio",
      value: "72.3%",
      change: 1.5,
      changeType: "increase",
      period: "vs last month",
      icon: Activity,
      color: "bg-red-500",
    },
    {
      id: "customers",
      title: "Total Customers",
      value: "52,847",
      change: 5.3,
      changeType: "increase",
      period: "vs last month",
      icon: Users,
      color: "bg-indigo-500",
    },
  ];

  const premiumByLineData: ChartData[] = [
    { label: "Auto", value: 8.2, total: 24.5 },
    { label: "Home", value: 6.1, total: 24.5 },
    { label: "Life", value: 4.8, total: 24.5 },
    { label: "Health", value: 3.2, total: 24.5 },
    { label: "Commercial", value: 2.2, total: 24.5 },
  ];

  const monthlyTrendData: ChartData[] = [
    { label: "Jan", value: 22.1 },
    { label: "Feb", value: 22.8 },
    { label: "Mar", value: 23.2 },
    { label: "Apr", value: 23.8 },
    { label: "May", value: 24.1 },
    { label: "Jun", value: 24.5 },
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
                Portfolio KPIs
              </h1>
              <p className="text-gray-600">
                Monitor key performance indicators across your insurance
                portfolio
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
                  onClick={() => setActiveTab("trends")}
                  className={`flex-1 px-6 py-4 font-medium transition-colors ${
                    activeTab === "trends"
                      ? "text-blue-600 border-b-2 border-blue-600 bg-blue-50"
                      : "text-gray-600 hover:text-gray-800 hover:bg-gray-50"
                  }`}
                >
                  <div className="flex items-center justify-center gap-2">
                    <TrendingUp className="w-5 h-5" />
                    Trends
                  </div>
                </button>
                <button
                  onClick={() => setActiveTab("targets")}
                  className={`flex-1 px-6 py-4 font-medium transition-colors ${
                    activeTab === "targets"
                      ? "text-blue-600 border-b-2 border-blue-600 bg-blue-50"
                      : "text-gray-600 hover:text-gray-800 hover:bg-gray-50"
                  }`}
                >
                  <div className="flex items-center justify-center gap-2">
                    <Target className="w-5 h-5" />
                    Targets
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
                    placeholder="Search KPIs..."
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
              {kpiMetrics.map((metric) => {
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
              {/* Premium by Line Chart */}
              <div className="bg-white rounded-xl shadow-sm border border-blue-100 p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold text-gray-800">
                    Premium by Line of Business
                  </h3>
                  <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                    View Details
                  </button>
                </div>
                <div className="space-y-4">
                  {premiumByLineData.map((item) => {
                    const percentage = (
                      (item.value / item.total!) *
                      100
                    ).toFixed(1);
                    return (
                      <div key={item.label}>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-medium text-gray-700">
                            {item.label}
                          </span>
                          <span className="text-sm text-gray-600">
                            ${item.value}M ({percentage}%)
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-3">
                          <div
                            className="bg-gradient-to-r from-blue-500 to-blue-600 h-3 rounded-full transition-all duration-500"
                            style={{ width: `${percentage}%` }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Monthly Trend Chart */}
              <div className="bg-white rounded-xl shadow-sm border border-blue-100 p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold text-gray-800">
                    Monthly Premium Trend
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
                  {monthlyTrendData.map((item) => {
                    const maxValue = Math.max(
                      ...monthlyTrendData.map((d) => d.value),
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
                          ${item.value}M
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Data Table */}
            <div className="bg-white rounded-xl shadow-sm border border-blue-100 p-6 mt-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-800">
                  Detailed KPI Breakdown
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
                        KPI Name
                      </th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">
                        Current Value
                      </th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">
                        Previous Value
                      </th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">
                        Change
                      </th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">
                        Target
                      </th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-gray-100 hover:bg-blue-50 transition-colors">
                      <td className="py-3 px-4 text-sm text-gray-800">
                        Total Premium
                      </td>
                      <td className="py-3 px-4 text-sm font-medium text-gray-800">
                        $24.5M
                      </td>
                      <td className="py-3 px-4 text-sm text-gray-600">
                        $21.8M
                      </td>
                      <td className="py-3 px-4 text-sm text-green-600 font-medium">
                        +12.5%
                      </td>
                      <td className="py-3 px-4 text-sm text-gray-600">$25M</td>
                      <td className="py-3 px-4">
                        <span className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-xs font-medium">
                          Near Target
                        </span>
                      </td>
                    </tr>
                    <tr className="border-b border-gray-100 hover:bg-blue-50 transition-colors">
                      <td className="py-3 px-4 text-sm text-gray-800">
                        Active Policies
                      </td>
                      <td className="py-3 px-4 text-sm font-medium text-gray-800">
                        48,234
                      </td>
                      <td className="py-3 px-4 text-sm text-gray-600">
                        46,745
                      </td>
                      <td className="py-3 px-4 text-sm text-green-600 font-medium">
                        +3.2%
                      </td>
                      <td className="py-3 px-4 text-sm text-gray-600">
                        50,000
                      </td>
                      <td className="py-3 px-4">
                        <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">
                          On Track
                        </span>
                      </td>
                    </tr>
                    <tr className="border-b border-gray-100 hover:bg-blue-50 transition-colors">
                      <td className="py-3 px-4 text-sm text-gray-800">
                        Loss Ratio
                      </td>
                      <td className="py-3 px-4 text-sm font-medium text-gray-800">
                        67.8%
                      </td>
                      <td className="py-3 px-4 text-sm text-gray-600">69.9%</td>
                      <td className="py-3 px-4 text-sm text-green-600 font-medium">
                        -2.1%
                      </td>
                      <td className="py-3 px-4 text-sm text-gray-600">≤65%</td>
                      <td className="py-3 px-4">
                        <span className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-xs font-medium">
                          Near Target
                        </span>
                      </td>
                    </tr>
                    <tr className="border-b border-gray-100 hover:bg-blue-50 transition-colors">
                      <td className="py-3 px-4 text-sm text-gray-800">
                        Retention Rate
                      </td>
                      <td className="py-3 px-4 text-sm font-medium text-gray-800">
                        94.2%
                      </td>
                      <td className="py-3 px-4 text-sm text-gray-600">93.4%</td>
                      <td className="py-3 px-4 text-sm text-green-600 font-medium">
                        +0.8%
                      </td>
                      <td className="py-3 px-4 text-sm text-gray-600">≥95%</td>
                      <td className="py-3 px-4">
                        <span className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-xs font-medium">
                          Near Target
                        </span>
                      </td>
                    </tr>
                    <tr className="hover:bg-blue-50 transition-colors">
                      <td className="py-3 px-4 text-sm text-gray-800">
                        Claims Ratio
                      </td>
                      <td className="py-3 px-4 text-sm font-medium text-gray-800">
                        72.3%
                      </td>
                      <td className="py-3 px-4 text-sm text-gray-600">70.8%</td>
                      <td className="py-3 px-4 text-sm text-red-600 font-medium">
                        +1.5%
                      </td>
                      <td className="py-3 px-4 text-sm text-gray-600">≤70%</td>
                      <td className="py-3 px-4">
                        <span className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-xs font-medium">
                          Off Track
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

export default PortfolioKPIsScreen;
//
