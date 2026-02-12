import React, { useState } from "react";
import {
  TrendingUp,
  TrendingDown,
  FileText,
  Calendar,
  Search,
  Download,
  Upload,
  Clock,
  XCircle,
  Menu,
  Shield,
} from "lucide-react";
import InsuranceSidebar from "../Components/sidebar";

interface ExportMetric {
  id: string;
  title: string;
  value: string;
  change: number;
  changeType: "increase" | "decrease" | "neutral";
  period: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
}

interface ExportRecord {
  id: string;
  name: string;
  type: string;
  size: string;
  format: string;
  status: "completed" | "pending" | "failed";
  createdAt: string;
  createdBy: string;
}

const DataExportsScreen = () => {
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<
    "exports" | "scheduled" | "history"
  >("exports");
  const [dateRange, setDateRange] = useState("month");
  const [searchTerm, setSearchTerm] = useState("");

  const exportMetrics: ExportMetric[] = [
    {
      id: "total-exports",
      title: "Total Exports",
      value: "1,247",
      change: 12.5,
      changeType: "increase",
      period: "vs last month",
      icon: Download,
      color: "bg-blue-500",
    },
    {
      id: "data-usage",
      title: "Data Exported",
      value: "45.8 GB",
      change: 8.3,
      changeType: "increase",
      period: "vs last month",
      icon: FileText,
      color: "bg-green-500",
    },
    {
      id: "scheduled",
      title: "Scheduled Exports",
      value: "24",
      change: 0.0,
      changeType: "neutral",
      period: "vs last month",
      icon: Clock,
      color: "bg-purple-500",
    },
    {
      id: "failed",
      title: "Failed Exports",
      value: "3",
      change: -50.0,
      changeType: "decrease",
      period: "vs last month",
      icon: XCircle,
      color: "bg-red-500",
    },
  ];

  const exportHistory: ExportRecord[] = [
    {
      id: "EXP-2024-001",
      name: "Portfolio Summary Report",
      type: "Report",
      size: "2.4 MB",
      format: "PDF",
      status: "completed",
      createdAt: "2024-10-19 14:30",
      createdBy: "John Anderson",
    },
    {
      id: "EXP-2024-002",
      name: "Claims Data Q3",
      type: "Dataset",
      size: "15.8 MB",
      format: "CSV",
      status: "completed",
      createdAt: "2024-10-19 10:15",
      createdBy: "Sarah Johnson",
    },
    {
      id: "EXP-2024-003",
      name: "Customer Analytics",
      type: "Report",
      size: "8.2 MB",
      format: "Excel",
      status: "pending",
      createdAt: "2024-10-19 09:00",
      createdBy: "Mike Davis",
    },
    {
      id: "EXP-2024-004",
      name: "Policy Details Export",
      type: "Dataset",
      size: "45.6 MB",
      format: "CSV",
      status: "failed",
      createdAt: "2024-10-18 16:45",
      createdBy: "Emily Brown",
    },
    {
      id: "EXP-2024-005",
      name: "Sales Funnel Analysis",
      type: "Report",
      size: "1.8 MB",
      format: "PDF",
      status: "completed",
      createdAt: "2024-10-18 11:20",
      createdBy: "David Wilson",
    },
  ];

  const scheduledExports = [
    {
      id: "SCH-001",
      name: "Daily Claims Summary",
      frequency: "Daily",
      nextRun: "2024-10-20 00:00",
      lastRun: "2024-10-19 00:00",
      status: "Active",
    },
    {
      id: "SCH-002",
      name: "Weekly Portfolio Report",
      frequency: "Weekly",
      nextRun: "2024-10-21 00:00",
      lastRun: "2024-10-14 00:00",
      status: "Active",
    },
    {
      id: "SCH-003",
      name: "Monthly Financial Report",
      frequency: "Monthly",
      nextRun: "2024-11-01 00:00",
      lastRun: "2024-10-01 00:00",
      status: "Active",
    },
    {
      id: "SCH-004",
      name: "Customer Analytics Update",
      frequency: "Daily",
      nextRun: "2024-10-20 00:00",
      lastRun: "2024-10-19 00:00",
      status: "Paused",
    },
    {
      id: "SCH-005",
      name: "Regulatory Compliance Report",
      frequency: "Monthly",
      nextRun: "2024-11-01 00:00",
      lastRun: "2024-10-01 00:00",
      status: "Active",
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
      completed: "bg-green-100 text-green-700",
      pending: "bg-yellow-100 text-yellow-700",
      failed: "bg-red-100 text-red-700",
      Active: "bg-green-100 text-green-700",
      Paused: "bg-gray-100 text-gray-700",
    };
    return (
      <span
        className={`px-3 py-1 rounded-full text-xs font-medium ${styles[status] || "bg-gray-100 text-gray-700"}`}
      >
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
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
                Data Exports
              </h1>
              <p className="text-gray-600">
                Manage data exports, scheduled reports, and download history
              </p>
            </div>

            {/* Tab Navigation */}
            <div className="bg-white rounded-xl shadow-sm border border-blue-100 mb-6">
              <div className="flex border-b border-gray-200">
                <button
                  onClick={() => setActiveTab("exports")}
                  className={`flex-1 px-6 py-4 font-medium transition-colors ${
                    activeTab === "exports"
                      ? "text-blue-600 border-b-2 border-blue-600 bg-blue-50"
                      : "text-gray-600 hover:text-gray-800 hover:bg-gray-50"
                  }`}
                >
                  <div className="flex items-center justify-center gap-2">
                    <Download className="w-5 h-5" />
                    Quick Export
                  </div>
                </button>
                <button
                  onClick={() => setActiveTab("scheduled")}
                  className={`flex-1 px-6 py-4 font-medium transition-colors ${
                    activeTab === "scheduled"
                      ? "text-blue-600 border-b-2 border-blue-600 bg-blue-50"
                      : "text-gray-600 hover:text-gray-800 hover:bg-gray-50"
                  }`}
                >
                  <div className="flex items-center justify-center gap-2">
                    <Clock className="w-5 h-5" />
                    Scheduled
                  </div>
                </button>
                <button
                  onClick={() => setActiveTab("history")}
                  className={`flex-1 px-6 py-4 font-medium transition-colors ${
                    activeTab === "history"
                      ? "text-blue-600 border-b-2 border-blue-600 bg-blue-50"
                      : "text-gray-600 hover:text-gray-800 hover:bg-gray-50"
                  }`}
                >
                  <div className="flex items-center justify-center gap-2">
                    <FileText className="w-5 h-5" />
                    History
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
                    placeholder="Search exports..."
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
                  Export All
                </button>
              </div>
            </div>

            {/* KPI Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {exportMetrics.map((metric) => {
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

            {/* Quick Export Section */}
            {activeTab === "exports" && (
              <div className="bg-white rounded-xl shadow-sm border border-blue-100 p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold text-gray-800">
                    Create New Export
                  </h3>
                  <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                    View Templates
                  </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {[
                    {
                      title: "Portfolio Summary",
                      description: "Export key portfolio metrics and KPIs",
                      icon: Download,
                    },
                    {
                      title: "Claims Report",
                      description: "Detailed claims analysis and statistics",
                      icon: FileText,
                    },
                    {
                      title: "Customer Data",
                      description: "Customer demographics and behavior",
                      icon: FileText,
                    },
                    {
                      title: "Sales Analytics",
                      description: "Sales performance and trends",
                      icon: Download,
                    },
                    {
                      title: "Financial Report",
                      description: "Revenue and expense breakdown",
                      icon: FileText,
                    },
                    {
                      title: "Custom Export",
                      description: "Build your own export configuration",
                      icon: Upload,
                    },
                  ].map((item, index) => (
                    <button
                      key={index}
                      className="text-left p-4 border-2 border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-all group"
                    >
                      <div className="flex items-center gap-3 mb-2">
                        <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center group-hover:bg-blue-200 transition-colors">
                          <item.icon className="w-5 h-5 text-blue-600" />
                        </div>
                        <h4 className="font-semibold text-gray-800">
                          {item.title}
                        </h4>
                      </div>
                      <p className="text-sm text-gray-600">
                        {item.description}
                      </p>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Scheduled Exports Table */}
            {activeTab === "scheduled" && (
              <div className="bg-white rounded-xl shadow-sm border border-blue-100 p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold text-gray-800">
                    Scheduled Exports
                  </h3>
                  <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium">
                    Add Schedule
                  </button>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">
                          Export Name
                        </th>
                        <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">
                          Frequency
                        </th>
                        <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">
                          Next Run
                        </th>
                        <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">
                          Last Run
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
                      {scheduledExports.map((schedule) => (
                        <tr
                          key={schedule.id}
                          className="border-b border-gray-100 hover:bg-blue-50 transition-colors"
                        >
                          <td className="py-3 px-4 text-sm text-gray-800 font-medium">
                            {schedule.name}
                          </td>
                          <td className="py-3 px-4 text-sm text-gray-600">
                            {schedule.frequency}
                          </td>
                          <td className="py-3 px-4 text-sm text-gray-600">
                            {schedule.nextRun}
                          </td>
                          <td className="py-3 px-4 text-sm text-gray-600">
                            {schedule.lastRun}
                          </td>
                          <td className="py-3 px-4">
                            {getStatusBadge(schedule.status)}
                          </td>
                          <td className="py-3 px-4">
                            <div className="flex items-center gap-2">
                              <button className="p-1 hover:bg-gray-100 rounded text-gray-600">
                                <Clock className="w-4 h-4" />
                              </button>
                              <button className="p-1 hover:bg-gray-100 rounded text-gray-600">
                                <XCircle className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Export History Table */}
            {activeTab === "history" && (
              <div className="bg-white rounded-xl shadow-sm border border-blue-100 p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold text-gray-800">
                    Export History
                  </h3>
                  <button className="text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center gap-1">
                    <Download className="w-4 h-4" />
                    Download All
                  </button>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">
                          Export ID
                        </th>
                        <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">
                          Name
                        </th>
                        <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">
                          Type
                        </th>
                        <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">
                          Size
                        </th>
                        <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">
                          Format
                        </th>
                        <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">
                          Created
                        </th>
                        <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">
                          By
                        </th>
                        <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">
                          Status
                        </th>
                        <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">
                          Action
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {exportHistory.map((exportItem) => (
                        <tr
                          key={exportItem.id}
                          className="border-b border-gray-100 hover:bg-blue-50 transition-colors"
                        >
                          <td className="py-3 px-4 text-sm text-blue-600 font-medium">
                            {exportItem.id}
                          </td>
                          <td className="py-3 px-4 text-sm text-gray-800">
                            {exportItem.name}
                          </td>
                          <td className="py-3 px-4 text-sm text-gray-600">
                            {exportItem.type}
                          </td>
                          <td className="py-3 px-4 text-sm text-gray-600">
                            {exportItem.size}
                          </td>
                          <td className="py-3 px-4 text-sm text-gray-600">
                            {exportItem.format}
                          </td>
                          <td className="py-3 px-4 text-sm text-gray-600">
                            {exportItem.createdAt}
                          </td>
                          <td className="py-3 px-4 text-sm text-gray-600">
                            {exportItem.createdBy}
                          </td>
                          <td className="py-3 px-4">
                            {getStatusBadge(exportItem.status)}
                          </td>
                          <td className="py-3 px-4">
                            {exportItem.status === "completed" && (
                              <button className="p-1 hover:bg-blue-100 rounded text-blue-600">
                                <Download className="w-4 h-4" />
                              </button>
                            )}
                            {exportItem.status === "failed" && (
                              <button className="p-1 hover:bg-gray-100 rounded text-gray-600">
                                <Upload className="w-4 h-4" />
                              </button>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DataExportsScreen;
//