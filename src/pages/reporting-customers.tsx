import React, { useState } from "react";
import {
  TrendingUp,
  TrendingDown,
  Users,
  DollarSign,
  Target,
  Calendar,
  Filter,
  Search,
  Download,
  PieChart,
  Activity,
  Mail,
  Menu,
  Shield,
} from "lucide-react";
import InsuranceSidebar from "../Components/sidebar";

interface CustomerMetric {
  id: string;
  title: string;
  value: string;
  change: number;
  changeType: "increase" | "decrease" | "neutral";
  period: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
}

const CustomerAnalyticsScreen = () => {
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<
    "demographics" | "behavior" | "retention"
  >("demographics");
  const [dateRange, setDateRange] = useState("month");
  const [searchTerm, setSearchTerm] = useState("");

  const customerMetrics: CustomerMetric[] = [
    {
      id: "total-customers",
      title: "Total Customers",
      value: "52,847",
      change: 5.3,
      changeType: "increase",
      period: "vs last month",
      icon: Users,
      color: "bg-blue-500",
    },
    {
      id: "new-customers",
      title: "New Customers",
      value: "2,342",
      change: 12.8,
      changeType: "increase",
      period: "vs last month",
      icon: Activity,
      color: "bg-green-500",
    },
    {
      id: "avg-ltv",
      title: "Avg Lifetime Value",
      value: "$8,450",
      change: 3.2,
      changeType: "increase",
      period: "vs last month",
      icon: DollarSign,
      color: "bg-purple-500",
    },
    {
      id: "retention",
      title: "Retention Rate",
      value: "94.2%",
      change: 0.8,
      changeType: "increase",
      period: "vs last month",
      icon: Target,
      color: "bg-teal-500",
    },
    {
      id: "churn",
      title: "Churn Rate",
      value: "5.8%",
      change: -0.5,
      changeType: "decrease",
      period: "vs last month",
      icon: TrendingDown,
      color: "bg-orange-500",
    },
    {
      id: "nps",
      title: "Net Promoter Score",
      value: "72",
      change: 4.2,
      changeType: "increase",
      period: "vs last month",
      icon: Mail,
      color: "bg-indigo-500",
    },
  ];

  const demographicsData = [
    { label: "18-25", value: 12, color: "bg-blue-500" },
    { label: "26-35", value: 28, color: "bg-green-500" },
    { label: "36-45", value: 25, color: "bg-purple-500" },
    { label: "46-55", value: 20, color: "bg-orange-500" },
    { label: "56+", value: 15, color: "bg-gray-400" },
  ];

  const policyDistribution = [
    { label: "Auto", value: 35 },
    { label: "Home", value: 28 },
    { label: "Life", value: 18 },
    { label: "Health", value: 12 },
    { label: "Commercial", value: 7 },
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
                Customer Analytics
              </h1>
              <p className="text-gray-600">
                Understand your customer base and behavior patterns
              </p>
            </div>

            {/* Tab Navigation */}
            <div className="bg-white rounded-xl shadow-sm border border-blue-100 mb-6">
              <div className="flex border-b border-gray-200">
                <button
                  onClick={() => setActiveTab("demographics")}
                  className={`flex-1 px-6 py-4 font-medium transition-colors ${
                    activeTab === "demographics"
                      ? "text-blue-600 border-b-2 border-blue-600 bg-blue-50"
                      : "text-gray-600 hover:text-gray-800 hover:bg-gray-50"
                  }`}
                >
                  <div className="flex items-center justify-center gap-2">
                    <PieChart className="w-5 h-5" />
                    Demographics
                  </div>
                </button>
                <button
                  onClick={() => setActiveTab("behavior")}
                  className={`flex-1 px-6 py-4 font-medium transition-colors ${
                    activeTab === "behavior"
                      ? "text-blue-600 border-b-2 border-blue-600 bg-blue-50"
                      : "text-gray-600 hover:text-gray-800 hover:bg-gray-50"
                  }`}
                >
                  <div className="flex items-center justify-center gap-2">
                    <Activity className="w-5 h-5" />
                    Behavior
                  </div>
                </button>
                <button
                  onClick={() => setActiveTab("retention")}
                  className={`flex-1 px-6 py-4 font-medium transition-colors ${
                    activeTab === "retention"
                      ? "text-blue-600 border-b-2 border-blue-600 bg-blue-50"
                      : "text-gray-600 hover:text-gray-800 hover:bg-gray-50"
                  }`}
                >
                  <div className="flex items-center justify-center gap-2">
                    <Target className="w-5 h-5" />
                    Retention
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
                    placeholder="Search customers..."
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
              {customerMetrics.map((metric) => {
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
              {/* Age Demographics */}
              <div className="bg-white rounded-xl shadow-sm border border-blue-100 p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold text-gray-800">
                    Age Demographics
                  </h3>
                  <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                    View Details
                  </button>
                </div>
                <div className="space-y-4">
                  {demographicsData.map((item) => (
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

              {/* Policy Distribution */}
              <div className="bg-white rounded-xl shadow-sm border border-blue-100 p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold text-gray-800">
                    Policy Distribution
                  </h3>
                  <div className="flex items-center gap-2">
                    <Filter className="w-4 h-4 text-gray-400" />
                    <select className="text-sm border-none bg-transparent text-gray-600 focus:outline-none">
                      <option>All Products</option>
                      <option>Auto</option>
                      <option>Home</option>
                      <option>Life</option>
                    </select>
                  </div>
                </div>
                <div className="flex items-end justify-between h-48">
                  {policyDistribution.map((item) => {
                    const maxValue = Math.max(
                      ...policyDistribution.map((d) => d.value),
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
                          {item.value}%
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Customer Segments Table */}
            <div className="bg-white rounded-xl shadow-sm border border-blue-100 p-6 mt-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-800">
                  Customer Segments
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
                        Segment
                      </th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">
                        Count
                      </th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">
                        Avg Premium
                      </th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">
                        Retention
                      </th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">
                        Growth
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-gray-100 hover:bg-blue-50 transition-colors">
                      <td className="py-3 px-4 text-sm text-gray-800 font-medium">
                        High Value
                      </td>
                      <td className="py-3 px-4 text-sm text-gray-800">8,542</td>
                      <td className="py-3 px-4 text-sm font-medium text-gray-800">
                        $2,450
                      </td>
                      <td className="py-3 px-4">
                        <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">
                          97.2%
                        </span>
                      </td>
                      <td className="py-3 px-4 text-sm text-green-600 font-medium">
                        +8.5%
                      </td>
                    </tr>
                    <tr className="border-b border-gray-100 hover:bg-blue-50 transition-colors">
                      <td className="py-3 px-4 text-sm text-gray-800 font-medium">
                        Medium Value
                      </td>
                      <td className="py-3 px-4 text-sm text-gray-800">
                        22,847
                      </td>
                      <td className="py-3 px-4 text-sm font-medium text-gray-800">
                        $1,092
                      </td>
                      <td className="py-3 px-4">
                        <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">
                          94.5%
                        </span>
                      </td>
                      <td className="py-3 px-4 text-sm text-green-600 font-medium">
                        +5.2%
                      </td>
                    </tr>
                    <tr className="border-b border-gray-100 hover:bg-blue-50 transition-colors">
                      <td className="py-3 px-4 text-sm text-gray-800 font-medium">
                        Low Value
                      </td>
                      <td className="py-3 px-4 text-sm text-gray-800">
                        15,234
                      </td>
                      <td className="py-3 px-4 text-sm font-medium text-gray-800">
                        $485
                      </td>
                      <td className="py-3 px-4">
                        <span className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-xs font-medium">
                          88.3%
                        </span>
                      </td>
                      <td className="py-3 px-4 text-sm text-red-600 font-medium">
                        -2.1%
                      </td>
                    </tr>
                    <tr className="hover:bg-blue-50 transition-colors">
                      <td className="py-3 px-4 text-sm text-gray-800 font-medium">
                        At Risk
                      </td>
                      <td className="py-3 px-4 text-sm text-gray-800">2,847</td>
                      <td className="py-3 px-4 text-sm font-medium text-gray-800">
                        $1,245
                      </td>
                      <td className="py-3 px-4">
                        <span className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-xs font-medium">
                          72.5%
                        </span>
                      </td>
                      <td className="py-3 px-4 text-sm text-red-600 font-medium">
                        -8.3%
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

export default CustomerAnalyticsScreen;
