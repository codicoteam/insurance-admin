import { useState } from "react";
import {
  AlertTriangle,
  CheckCircle,
  Clock,
  TrendingUp,
  Activity,
  Bell,
  Filter,
  Search,
  ChevronDown,
  MoreVertical,
  DollarSign,
  Shield,
  Zap,
} from "lucide-react";

const AlertsTasksScreen = () => {
  const [activeTab, setActiveTab] = useState("all");
  const [filterOpen, setFilterOpen] = useState(false);
  const [selectedPriority, setSelectedPriority] = useState("all");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const alerts = [
    {
      id: 1,
      type: "compliance",
      severity: "critical",
      title: "Regulatory Compliance Deadline",
      description: "HIPAA audit documentation due in 3 days",
      time: "10 min ago",
      icon: Shield,
      color: "red",
      status: "pending",
    },
    {
      id: 2,
      type: "claim",
      severity: "high",
      title: "High-Value Claim Alert",
      description: "Claim #CL-8492 ($125,000) requires immediate review",
      time: "25 min ago",
      icon: DollarSign,
      color: "orange",
      status: "pending",
    },
    {
      id: 3,
      type: "outage",
      severity: "critical",
      title: "System Performance Degradation",
      description: "Claims processing API response time increased by 340%",
      time: "1 hour ago",
      icon: Activity,
      color: "red",
      status: "in-progress",
    },
    {
      id: 4,
      type: "compliance",
      severity: "medium",
      title: "Policy Update Required",
      description: "15 policies need beneficiary verification",
      time: "2 hours ago",
      icon: Shield,
      color: "yellow",
      status: "pending",
    },
    {
      id: 5,
      type: "claim",
      severity: "high",
      title: "Fraud Detection Alert",
      description: "Suspicious pattern detected in claims batch #BT-3021",
      time: "3 hours ago",
      icon: AlertTriangle,
      color: "orange",
      status: "pending",
    },
    {
      id: 6,
      type: "outage",
      severity: "low",
      title: "Scheduled Maintenance Complete",
      description: "Customer portal backup completed successfully",
      time: "5 hours ago",
      icon: CheckCircle,
      color: "green",
      status: "resolved",
    },
  ];

  const stats = [
    {
      label: "Critical Alerts",
      value: "3",
      change: "+2",
      trend: "up",
      icon: AlertTriangle,
      color: "red",
    },
    {
      label: "Pending Tasks",
      value: "12",
      change: "-3",
      trend: "down",
      icon: Clock,
      color: "orange",
    },
    {
      label: "Resolved Today",
      value: "28",
      change: "+15",
      trend: "up",
      icon: CheckCircle,
      color: "green",
    },
    {
      label: "Avg Response Time",
      value: "8m",
      change: "-2m",
      trend: "down",
      icon: Zap,
      color: "blue",
    },
  ];

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "critical":
        return "bg-red-100 text-red-700 border-red-200";
      case "high":
        return "bg-orange-100 text-orange-700 border-orange-200";
      case "medium":
        return "bg-yellow-100 text-yellow-700 border-yellow-200";
      case "low":
        return "bg-green-100 text-green-700 border-green-200";
      default:
        return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-700";
      case "in-progress":
        return "bg-blue-100 text-blue-700";
      case "resolved":
        return "bg-green-100 text-green-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const filteredAlerts = alerts.filter((alert) => {
    if (activeTab !== "all" && alert.type !== activeTab) return false;
    if (selectedPriority !== "all" && alert.severity !== selectedPriority)
      return false;
    return true;
  });

  return (
    <div className="flex min-h-screen bg-white">
      {/* Main Content */}
      <div className="flex-1 lg:ml-0">
        {/* Mobile Header */}
        <div className="lg:hidden bg-white border-b border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => setSidebarOpen(true)}
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
              aria-label="Open sidebar"
            >
              <MoreVertical className="w-6 h-6 text-gray-600" />
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

        <div className="p-4 lg:p-8">
          {/* Header */}
          <div className="mb-6 lg:mb-8">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-4">
              <div>
                <h1 className="text-2xl lg:text-4xl font-bold text-gray-900 mb-2">
                  Alerts & Tasks
                </h1>
                <p className="text-gray-600 text-sm lg:text-base">
                  Monitor compliance hits, high-severity claims, and system
                  outages
                </p>
              </div>
              <div className="flex items-center gap-3">
                <button className="p-2 lg:p-3 bg-gray-100 rounded-xl hover:bg-gray-200 transition-colors relative">
                  <Bell className="w-5 h-5 text-gray-700" />
                  <span className="absolute top-1 right-1 lg:top-2 lg:right-2 w-2 h-2 bg-red-500 rounded-full"></span>
                </button>
                <button className="px-4 py-2 lg:px-6 lg:py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors font-medium text-sm lg:text-base shadow-lg shadow-blue-600/30">
                  Generate Report
                </button>
              </div>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-6 lg:mb-8">
            {stats.map((stat, idx) => (
              <div
                key={idx}
                className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-4 lg:p-6 border border-gray-200 hover:shadow-lg transition-shadow"
              >
                <div className="flex items-start justify-between mb-3 lg:mb-4">
                  <div className={`p-2 lg:p-3 rounded-xl bg-${stat.color}-100`}>
                    <stat.icon
                      className={`w-5 h-5 lg:w-6 lg:h-6 text-${stat.color}-600`}
                    />
                  </div>
                  <div
                    className={`flex items-center gap-1 text-xs lg:text-sm font-medium ${stat.trend === "up" ? "text-red-600" : "text-green-600"}`}
                  >
                    <TrendingUp
                      className={`w-3 h-3 lg:w-4 lg:h-4 ${stat.trend === "down" ? "rotate-180" : ""}`}
                    />
                    {stat.change}
                  </div>
                </div>
                <div className="text-2xl lg:text-3xl font-bold text-gray-900 mb-1">
                  {stat.value}
                </div>
                <div className="text-xs lg:text-sm text-gray-600">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>

          {/* Filters & Tabs */}
          <div className="mb-6 flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
            <div className="flex gap-1 lg:gap-2 bg-gray-100 p-1 lg:p-1.5 rounded-xl w-full sm:w-auto overflow-x-auto">
              {["all", "compliance", "claim", "outage"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-3 py-2 lg:px-5 lg:py-2.5 rounded-lg font-medium transition-all text-sm lg:text-base whitespace-nowrap ${
                    activeTab === tab
                      ? "bg-white text-gray-900 shadow-sm"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </div>

            <div className="flex gap-3 w-full sm:w-auto">
              <div className="relative flex-1 sm:flex-initial min-w-0">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 lg:w-5 lg:h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search alerts..."
                  className="w-full sm:w-48 lg:w-64 pl-9 lg:pl-11 pr-4 py-2 lg:py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm lg:text-base"
                />
              </div>

              <div className="relative">
                <button
                  onClick={() => setFilterOpen(!filterOpen)}
                  className="px-3 py-2 lg:px-4 lg:py-2.5 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors flex items-center gap-2 text-sm lg:text-base"
                >
                  <Filter className="w-4 h-4 lg:w-5 lg:h-5 text-gray-600" />
                  <span className="font-medium text-gray-700 hidden sm:inline">
                    Filter
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 text-gray-600 transition-transform ${filterOpen ? "rotate-180" : ""}`}
                  />
                </button>

                {filterOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-xl border border-gray-200 py-2 z-10">
                    <div className="px-3 py-2 text-xs font-semibold text-gray-500 uppercase">
                      Priority
                    </div>
                    {["all", "critical", "high", "medium", "low"].map(
                      (priority) => (
                        <button
                          key={priority}
                          onClick={() => {
                            setSelectedPriority(priority);
                            setFilterOpen(false);
                          }}
                          className={`w-full px-4 py-2 text-left hover:bg-gray-50 text-sm ${
                            selectedPriority === priority
                              ? "bg-blue-50 text-blue-700"
                              : "text-gray-700"
                          }`}
                        >
                          {priority.charAt(0).toUpperCase() + priority.slice(1)}
                        </button>
                      ),
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Alerts List */}
          <div className="space-y-3 lg:space-y-4">
            {filteredAlerts.map((alert) => (
              <div
                key={alert.id}
                className="bg-white border border-gray-200 rounded-2xl p-4 lg:p-6 hover:shadow-lg transition-all group"
              >
                <div className="flex items-start gap-3 lg:gap-4">
                  <div
                    className={`p-2 lg:p-3 rounded-xl ${
                      alert.color === "red"
                        ? "bg-red-100"
                        : alert.color === "orange"
                          ? "bg-orange-100"
                          : alert.color === "yellow"
                            ? "bg-yellow-100"
                            : alert.color === "green"
                              ? "bg-green-100"
                              : "bg-blue-100"
                    }`}
                  >
                    <alert.icon
                      className={`w-5 h-5 lg:w-6 lg:h-6 ${
                        alert.color === "red"
                          ? "text-red-600"
                          : alert.color === "orange"
                            ? "text-orange-600"
                            : alert.color === "yellow"
                              ? "text-yellow-600"
                              : alert.color === "green"
                                ? "text-green-600"
                                : "text-blue-600"
                      }`}
                    />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between mb-2">
                      <div className="min-w-0 flex-1">
                        <h3 className="text-base lg:text-lg font-bold text-gray-900 mb-1 truncate">
                          {alert.title}
                        </h3>
                        <p className="text-gray-600 text-sm lg:text-base line-clamp-2">
                          {alert.description}
                        </p>
                      </div>
                      <button className="p-1 lg:p-2 hover:bg-gray-100 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0 ml-2">
                        <MoreVertical className="w-4 h-4 lg:w-5 lg:h-5 text-gray-600" />
                      </button>
                    </div>

                    <div className="flex flex-wrap items-center gap-2 mt-3 lg:mt-4">
                      <span
                        className={`px-2 py-1 lg:px-3 lg:py-1 rounded-full text-xs font-semibold border ${getSeverityColor(alert.severity)}`}
                      >
                        {alert.severity.toUpperCase()}
                      </span>
                      <span
                        className={`px-2 py-1 lg:px-3 lg:py-1 rounded-full text-xs font-semibold ${getStatusColor(alert.status)}`}
                      >
                        {alert.status.replace("-", " ").toUpperCase()}
                      </span>
                      <span className="text-xs lg:text-sm text-gray-500 flex items-center gap-1">
                        <Clock className="w-3 h-3 lg:w-4 lg:h-4" />
                        {alert.time}
                      </span>
                    </div>

                    <div className="flex flex-wrap gap-2 mt-3 lg:mt-4">
                      <button className="px-3 py-1.5 lg:px-4 lg:py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium text-xs lg:text-sm">
                        Take Action
                      </button>
                      <button className="px-3 py-1.5 lg:px-4 lg:py-2 border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium text-xs lg:text-sm">
                        View Details
                      </button>
                      <button className="px-3 py-1.5 lg:px-4 lg:py-2 border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium text-xs lg:text-sm">
                        Assign
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Empty State */}
          {filteredAlerts.length === 0 && (
            <div className="text-center py-12 lg:py-16">
              <div className="inline-block p-4 lg:p-6 bg-gray-100 rounded-full mb-4">
                <CheckCircle className="w-8 h-8 lg:w-12 lg:h-12 text-gray-400" />
              </div>
              <h3 className="text-lg lg:text-xl font-bold text-gray-900 mb-2">
                No alerts found
              </h3>
              <p className="text-gray-600 text-sm lg:text-base">
                All systems operational with your current filters
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AlertsTasksScreen;
