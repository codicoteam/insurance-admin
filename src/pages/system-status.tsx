import React, { useState } from "react";
import {
  Activity,
  Server,
  Database,
  Cloud,
  CheckCircle,
  AlertTriangle,
  XCircle,
  RefreshCw,
  Cpu,
  HardDrive,
  Wifi,
  Clock,
  TrendingUp,
  TrendingDown,
  Shield,
  Menu,
} from "lucide-react";
import InsuranceSidebar from "../Components/sidebar";

interface ServiceStatus {
  id: string;
  name: string;
  status: "healthy" | "warning" | "critical";
  uptime: string;
  latency: number;
  lastChecked: string;
  icon: React.ComponentType<{ className?: string }>;
}

interface MetricData {
  label: string;
  value: string;
  change: number;
  changeType: "increase" | "decrease" | "neutral";
  unit: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
}

const SystemStatusScreen = () => {
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<
    "overview" | "services" | "infrastructure"
  >("overview");
  const [refreshing, setRefreshing] = useState(false);

  const handleRefresh = () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 1500);
  };

  const serviceStatuses: ServiceStatus[] = [
    {
      id: "api-gateway",
      name: "API Gateway",
      status: "healthy",
      uptime: "99.99%",
      latency: 45,
      lastChecked: "2 min ago",
      icon: Server,
    },
    {
      id: "auth-service",
      name: "Auth Service",
      status: "healthy",
      uptime: "99.97%",
      latency: 32,
      lastChecked: "2 min ago",
      icon: Shield,
    },
    {
      id: "policy-service",
      name: "Policy Service",
      status: "healthy",
      uptime: "99.95%",
      latency: 78,
      lastChecked: "2 min ago",
      icon: Server,
    },
    {
      id: "claims-service",
      name: "Claims Service",
      status: "warning",
      uptime: "98.72%",
      latency: 156,
      lastChecked: "2 min ago",
      icon: AlertTriangle,
    },
    {
      id: "billing-service",
      name: "Billing Service",
      status: "healthy",
      uptime: "99.98%",
      latency: 54,
      lastChecked: "2 min ago",
      icon: Server,
    },
    {
      id: "notification-service",
      name: "Notification Service",
      status: "healthy",
      uptime: "99.88%",
      latency: 120,
      lastChecked: "2 min ago",
      icon: Activity,
    },
    {
      id: "reporting-service",
      name: "Reporting Service",
      status: "healthy",
      uptime: "99.91%",
      latency: 245,
      lastChecked: "2 min ago",
      icon: Server,
    },
    {
      id: "database-primary",
      name: "Database (Primary)",
      status: "healthy",
      uptime: "99.99%",
      latency: 12,
      lastChecked: "2 min ago",
      icon: Database,
    },
    {
      id: "database-replica",
      name: "Database (Replica)",
      status: "healthy",
      uptime: "99.99%",
      latency: 18,
      lastChecked: "2 min ago",
      icon: Database,
    },
    {
      id: "cache",
      name: "Cache Cluster",
      status: "healthy",
      uptime: "99.95%",
      latency: 5,
      lastChecked: "2 min ago",
      icon: Cloud,
    },
    {
      id: "queue",
      name: "Message Queue",
      status: "healthy",
      uptime: "99.92%",
      latency: 8,
      lastChecked: "2 min ago",
      icon: Cloud,
    },
    {
      id: "cdn",
      name: "CDN",
      status: "critical",
      uptime: "95.23%",
      latency: 89,
      lastChecked: "2 min ago",
      icon: Cloud,
    },
  ];

  const metrics: MetricData[] = [
    {
      label: "CPU Usage",
      value: "42",
      change: -5.2,
      changeType: "decrease",
      unit: "%",
      icon: Cpu,
      color: "bg-blue-500",
    },
    {
      label: "Memory Usage",
      value: "68",
      change: 2.1,
      changeType: "increase",
      unit: "%",
      icon: Cpu,
      color: "bg-purple-500",
    },
    {
      label: "Disk Usage",
      value: "54",
      change: 0.8,
      changeType: "increase",
      unit: "%",
      icon: HardDrive,
      color: "bg-orange-500",
    },
    {
      label: "Network I/O",
      value: "1.2",
      change: -12.5,
      changeType: "decrease",
      unit: "GB/s",
      icon: Wifi,
      color: "bg-green-500",
    },
    {
      label: "Active Connections",
      value: "2.4K",
      change: 8.3,
      changeType: "increase",
      unit: "",
      icon: Server,
      color: "bg-indigo-500",
    },
    {
      label: "Avg Response Time",
      value: "89",
      change: -15.2,
      changeType: "decrease",
      unit: "ms",
      icon: Clock,
      color: "bg-cyan-500",
    },
  ];

  const getStatusIcon = (status: string) => {
    if (status === "healthy")
      return <CheckCircle className="w-5 h-5 text-green-500" />;
    if (status === "warning")
      return <AlertTriangle className="w-5 h-5 text-yellow-500" />;
    return <XCircle className="w-5 h-5 text-red-500" />;
  };

  const getStatusBadge = (status: string) => {
    if (status === "healthy")
      return (
        <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-full">
          Healthy
        </span>
      );
    if (status === "warning")
      return (
        <span className="px-3 py-1 bg-yellow-100 text-yellow-700 text-xs font-medium rounded-full">
          Warning
        </span>
      );
    return (
      <span className="px-3 py-1 bg-red-100 text-red-700 text-xs font-medium rounded-full">
        Critical
      </span>
    );
  };

  const getChangeColor = (changeType: string) => {
    if (changeType === "increase") return "text-green-600";
    if (changeType === "decrease") return "text-red-600";
    return "text-gray-600";
  };

  const getChangeIcon = (changeType: string) => {
    if (changeType === "increase") return <TrendingUp className="w-4 h-4" />;
    if (changeType === "decrease") return <TrendingDown className="w-4 h-4" />;
    return null;
  };

  const healthyCount = serviceStatuses.filter(
    (s) => s.status === "healthy",
  ).length;
  const warningCount = serviceStatuses.filter(
    (s) => s.status === "warning",
  ).length;
  const criticalCount = serviceStatuses.filter(
    (s) => s.status === "critical",
  ).length;

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
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
              <div>
                <h1 className="text-3xl font-bold text-gray-800 mb-2">
                  System Status
                </h1>
                <p className="text-gray-600">
                  Monitor the health and performance of your system
                </p>
              </div>
              <button
                onClick={handleRefresh}
                className={`mt-4 md:mt-0 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2 font-medium ${
                  refreshing ? "opacity-75 cursor-not-allowed" : ""
                }`}
                disabled={refreshing}
              >
                <RefreshCw
                  className={`w-5 h-5 ${refreshing ? "animate-spin" : ""}`}
                />
                {refreshing ? "Refreshing..." : "Refresh Status"}
              </button>
            </div>

            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <div className="bg-white rounded-xl shadow-sm border border-blue-100 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-600 text-sm font-medium">
                      Overall Status
                    </p>
                    <p className="text-2xl font-bold text-gray-800 mt-1">
                      Degraded
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                    <AlertTriangle className="w-6 h-6 text-yellow-600" />
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-xl shadow-sm border border-blue-100 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-600 text-sm font-medium">Healthy</p>
                    <p className="text-2xl font-bold text-green-600 mt-1">
                      {healthyCount}
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                    <CheckCircle className="w-6 h-6 text-green-600" />
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-xl shadow-sm border border-blue-100 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-600 text-sm font-medium">Warning</p>
                    <p className="text-2xl font-bold text-yellow-600 mt-1">
                      {warningCount}
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                    <AlertTriangle className="w-6 h-6 text-yellow-600" />
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-xl shadow-sm border border-blue-100 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-600 text-sm font-medium">
                      Critical
                    </p>
                    <p className="text-2xl font-bold text-red-600 mt-1">
                      {criticalCount}
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                    <XCircle className="w-6 h-6 text-red-600" />
                  </div>
                </div>
              </div>
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
                  onClick={() => setActiveTab("services")}
                  className={`flex-1 px-6 py-4 font-medium transition-colors ${
                    activeTab === "services"
                      ? "text-blue-600 border-b-2 border-blue-600 bg-blue-50"
                      : "text-gray-600 hover:text-gray-800 hover:bg-gray-50"
                  }`}
                >
                  <div className="flex items-center justify-center gap-2">
                    <Server className="w-5 h-5" />
                    Services
                  </div>
                </button>
                <button
                  onClick={() => setActiveTab("infrastructure")}
                  className={`flex-1 px-6 py-4 font-medium transition-colors ${
                    activeTab === "infrastructure"
                      ? "text-blue-600 border-b-2 border-blue-600 bg-blue-50"
                      : "text-gray-600 hover:text-gray-800 hover:bg-gray-50"
                  }`}
                >
                  <div className="flex items-center justify-center gap-2">
                    <Cloud className="w-5 h-5" />
                    Infrastructure
                  </div>
                </button>
              </div>
            </div>

            {activeTab === "overview" && (
              <>
                {/* Metrics Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                  {metrics.map((metric) => {
                    const Icon = metric.icon;
                    return (
                      <div
                        key={metric.label}
                        className="bg-white rounded-xl shadow-sm border border-blue-100 p-6 hover:shadow-md transition-all"
                      >
                        <div className="flex items-start justify-between mb-4">
                          <div
                            className={`w-12 h-12 ${metric.color} rounded-lg flex items-center justify-center`}
                          >
                            <Icon className="w-6 h-6 text-white" />
                          </div>
                          <div
                            className={`flex items-center gap-1 text-sm font-medium ${getChangeColor(
                              metric.changeType,
                            )}`}
                          >
                            {getChangeIcon(metric.changeType)}
                            {Math.abs(metric.change)}%
                          </div>
                        </div>
                        <h3 className="text-gray-600 text-sm font-medium mb-1">
                          {metric.label}
                        </h3>
                        <p className="text-3xl font-bold text-gray-800 mb-2">
                          {metric.value}
                          <span className="text-lg text-gray-500 ml-1">
                            {metric.unit}
                          </span>
                        </p>
                        <p className="text-xs text-gray-500">vs last hour</p>
                      </div>
                    );
                  })}
                </div>

                {/* Quick Service Status */}
                <div className="bg-white rounded-xl shadow-sm border border-blue-100 p-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">
                    Service Health Summary
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {serviceStatuses.slice(0, 6).map((service) => {
                      const Icon = service.icon;
                      return (
                        <div
                          key={service.id}
                          className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                        >
                          <div className="flex items-center gap-3">
                            <Icon className="w-5 h-5 text-gray-600" />
                            <span className="text-gray-700 font-medium">
                              {service.name}
                            </span>
                          </div>
                          {getStatusIcon(service.status)}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </>
            )}

            {activeTab === "services" && (
              <div className="bg-white rounded-xl shadow-sm border border-blue-100 overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50 border-b border-gray-200">
                      <tr>
                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                          Service
                        </th>
                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                          Status
                        </th>
                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                          Uptime
                        </th>
                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                          Latency
                        </th>
                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                          Last Checked
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {serviceStatuses.map((service) => {
                        const Icon = service.icon;
                        return (
                          <tr
                            key={service.id}
                            className="hover:bg-gray-50 transition-colors"
                          >
                            <td className="px-6 py-4">
                              <div className="flex items-center gap-3">
                                <Icon className="w-5 h-5 text-gray-500" />
                                <span className="text-gray-800 font-medium">
                                  {service.name}
                                </span>
                              </div>
                            </td>
                            <td className="px-6 py-4">
                              {getStatusBadge(service.status)}
                            </td>
                            <td className="px-6 py-4 text-gray-600">
                              {service.uptime}
                            </td>
                            <td className="px-6 py-4 text-gray-600">
                              {service.latency}ms
                            </td>
                            <td className="px-6 py-4 text-gray-500">
                              {service.lastChecked}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {activeTab === "infrastructure" && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Infrastructure Overview */}
                <div className="bg-white rounded-xl shadow-sm border border-blue-100 p-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">
                    Infrastructure Overview
                  </h3>
                  <div className="space-y-4">
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-gray-700 font-medium">
                          Primary Region (US-EAST)
                        </span>
                        <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-full">
                          Active
                        </span>
                      </div>
                      <div className="text-sm text-gray-500">
                        3 availability zones • 12 instances
                      </div>
                    </div>
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-gray-700 font-medium">
                          Secondary Region (US-WEST)
                        </span>
                        <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-full">
                          Standby
                        </span>
                      </div>
                      <div className="text-sm text-gray-500">
                        2 availability zones • 6 instances
                      </div>
                    </div>
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-gray-700 font-medium">
                          Disaster Recovery
                        </span>
                        <span className="px-3 py-1 bg-blue-100 text-blue-700 text-xs font-medium rounded-full">
                          Ready
                        </span>
                      </div>
                      <div className="text-sm text-gray-500">
                        RPO: 15 min • RTO: 1 hour
                      </div>
                    </div>
                  </div>
                </div>

                {/* Recent Incidents */}
                <div className="bg-white rounded-xl shadow-sm border border-blue-100 p-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">
                    Recent Incidents
                  </h3>
                  <div className="space-y-4">
                    <div className="p-4 border-l-4 border-yellow-500 bg-yellow-50 rounded-r-lg">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-yellow-700 font-medium text-sm">
                          CDN Performance Degradation
                        </span>
                        <span className="text-xs text-yellow-600">
                          2 hours ago
                        </span>
                      </div>
                      <p className="text-sm text-yellow-600">
                        Elevated latency detected in CDN edge locations
                      </p>
                    </div>
                    <div className="p-4 border-l-4 border-green-500 bg-green-50 rounded-r-lg">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-green-700 font-medium text-sm">
                          Claims Service Recovery
                        </span>
                        <span className="text-xs text-green-600">
                          6 hours ago
                        </span>
                      </div>
                      <p className="text-sm text-green-600">
                        Service restored to normal operation
                      </p>
                    </div>
                    <div className="p-4 border-l-4 border-green-500 bg-green-50 rounded-r-lg">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-green-700 font-medium text-sm">
                          Database Failover Complete
                        </span>
                        <span className="text-xs text-green-600">
                          1 day ago
                        </span>
                      </div>
                      <p className="text-sm text-green-600">
                        Automated failover executed successfully
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SystemStatusScreen;
