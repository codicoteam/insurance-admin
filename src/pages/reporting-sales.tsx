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
  BarChart3,
  PieChart,
  Activity,
  Menu,
  Shield,
} from "lucide-react";

interface SalesMetric {
  id: string;
  title: string;
  value: string;
  change: number;
  changeType: "increase" | "decrease" | "neutral";
  period: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
}

const SalesFunnelScreen = () => {
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<
    "funnel" | "sources" | "conversion"
  >("funnel");
  const [dateRange, setDateRange] = useState("month");
  const [searchTerm, setSearchTerm] = useState("");

  const salesMetrics: SalesMetric[] = [
    {
      id: "leads",
      title: "Total Leads",
      value: "12,847",
      change: 15.3,
      changeType: "increase",
      period: "vs last month",
      icon: Users,
      color: "bg-blue-500",
    },
    {
      id: "quotes",
      title: "Quotes Generated",
      value: "8,234",
      change: 12.1,
      changeType: "increase",
      period: "vs last month",
      icon: Target,
      color: "bg-purple-500",
    },
    {
      id: "policies",
      title: "Policies Sold",
      value: "3,847",
      change: 8.5,
      changeType: "increase",
      period: "vs last month",
      icon: DollarSign,
      color: "bg-green-500",
    },
    {
      id: "revenue",
      title: "New Revenue",
      value: "$4.2M",
      change: 18.2,
      changeType: "increase",
      period: "vs last month",
      icon: Activity,
      color: "bg-teal-500",
    },
    {
      id: "conversion",
      title: "Conversion Rate",
      value: "29.9%",
      change: -1.2,
      changeType: "decrease",
      period: "vs last month",
      icon: TrendingDown,
      color: "bg-orange-500",
    },
    {
      id: "avg-premium",
      title: "Avg Premium",
      value: "$1,092",
      change: 5.8,
      changeType: "increase",
      period: "vs last month",
      icon: Target,
      color: "bg-indigo-500",
    },
  ];

  const funnelData = [
    { label: "Website Visitors", value: 45000, percentage: 100 },
    { label: "Lead Form Submissions", value: 12847, percentage: 28.5 },
    { label: "Quotes Generated", value: 8234, percentage: 18.3 },
    { label: "Quote Comparisons", value: 5120, percentage: 11.4 },
    { label: "Policies Sold", value: 3847, percentage: 8.5 },
  ];

  const leadSourcesData = [
    { label: "Organic Search", value: 38, color: "bg-blue-500" },
    { label: "Paid Advertising", value: 28, color: "bg-green-500" },
    { label: "Referrals", value: 18, color: "bg-purple-500" },
    { label: "Direct Traffic", value: 10, color: "bg-orange-500" },
    { label: "Social Media", value: 6, color: "bg-gray-400" },
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
                Sales & Funnel Analytics
              </h1>
              <p className="text-gray-600">
                Track your sales pipeline and conversion performance
              </p>
            </div>

            {/* Tab Navigation */}
            <div className="bg-white rounded-xl shadow-sm border border-blue-100 mb-6">
              <div className="flex border-b border-gray-200">
                <button
                  onClick={() => setActiveTab("funnel")}
                  className={`flex-1 px-6 py-4 font-medium transition-colors ${
                    activeTab === "funnel"
                      ? "text-blue-600 border-b-2 border-blue-600 bg-blue-50"
                      : "text-gray-600 hover:text-gray-800 hover:bg-gray-50"
                  }`}
                >
                  <div className="flex items-center justify-center gap-2">
                    <BarChart3 className="w-5 h-5" />
                    Funnel
                  </div>
                </button>
                <button
                  onClick={() => setActiveTab("sources")}
                  className={`flex-1 px-6 py-4 font-medium transition-colors ${
                    activeTab === "sources"
                      ? "text-blue-600 border-b-2 border-blue-600 bg-blue-50"
                      : "text-gray-600 hover:text-gray-800 hover:bg-gray-50"
                  }`}
                >
                  <div className="flex items-center justify-center gap-2">
                    <PieChart className="w-5 h-5" />
                    Lead Sources
                  </div>
                </button>
                <button
                  onClick={() => setActiveTab("conversion")}
                  className={`flex-1 px-6 py-4 font-medium transition-colors ${
                    activeTab === "conversion"
                      ? "text-blue-600 border-b-2 border-blue-600 bg-blue-50"
                      : "text-gray-600 hover:text-gray-800 hover:bg-gray-50"
                  }`}
                >
                  <div className="flex items-center justify-center gap-2">
                    <Target className="w-5 h-5" />
                    Conversion
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
                    placeholder="Search leads..."
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
              {salesMetrics.map((metric) => {
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

            {/* Funnel Chart */}
            <div className="bg-white rounded-xl shadow-sm border border-blue-100 p-6 mb-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-800">
                  Sales Funnel
                </h3>
                <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                  View Details
                </button>
              </div>
              <div className="space-y-4">
                {funnelData.map((item) => {
                  const width = item.percentage;
                  return (
                    <div key={item.label} className="flex items-center gap-4">
                      <span className="w-32 text-sm text-gray-600">
                        {item.label}
                      </span>
                      <div className="flex-1">
                        <div className="relative">
                          <div
                            className="h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg transition-all duration-500 flex items-center justify-end pr-4"
                            style={{ width: `${width}%` }}
                          >
                            <span className="text-white font-semibold">
                              {item.value.toLocaleString()}
                            </span>
                          </div>
                        </div>
                      </div>
                      <span className="w-16 text-sm text-right text-gray-600">
                        {item.percentage}%
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Lead Sources */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white rounded-xl shadow-sm border border-blue-100 p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold text-gray-800">
                    Lead Sources
                  </h3>
                  <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                    View Details
                  </button>
                </div>
                <div className="space-y-4">
                  {leadSourcesData.map((item) => (
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

              {/* Conversion by Source */}
              <div className="bg-white rounded-xl shadow-sm border border-blue-100 p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold text-gray-800">
                    Conversion by Source
                  </h3>
                  <div className="flex items-center gap-2">
                    <Filter className="w-4 h-4 text-gray-400" />
                    <select className="text-sm border-none bg-transparent text-gray-600 focus:outline-none">
                      <option>Last 30 Days</option>
                      <option>Last 60 Days</option>
                    </select>
                  </div>
                </div>
                <div className="space-y-4">
                  {[
                    { source: "Organic Search", rate: "32.4%", change: 2.1 },
                    { source: "Paid Advertising", rate: "28.1%", change: -1.5 },
                    { source: "Referrals", rate: "45.2%", change: 5.3 },
                    { source: "Direct Traffic", rate: "35.8%", change: 0.8 },
                    { source: "Social Media", rate: "22.3%", change: 3.2 },
                  ].map((item) => (
                    <div
                      key={item.source}
                      className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                    >
                      <span className="text-sm font-medium text-gray-800">
                        {item.source}
                      </span>
                      <div className="flex items-center gap-3">
                        <span className="text-sm font-semibold text-gray-800">
                          {item.rate}
                        </span>
                        <span
                          className={`text-xs ${item.change >= 0 ? "text-green-600" : "text-red-600"}`}
                        >
                          {item.change >= 0 ? "+" : ""}
                          {item.change}%
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SalesFunnelScreen;
//
