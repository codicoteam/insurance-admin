import { useState } from "react";
import {
  FileText,
  Search,
  Filter,
  Download,
  Eye,
  Clock,
  AlertTriangle,
  Info,
  CheckCircle,
  XCircle,
  ChevronDown,
  ChevronRight,
  Menu,
  Shield,
  RefreshCw,
} from "lucide-react";

interface LogEntry {
  id: string;
  timestamp: string;
  level: "info" | "warning" | "error" | "debug";
  service: string;
  message: string;
  traceId: string;
  spanId: string;
  userId?: string;
}

interface Trace {
  id: string;
  name: string;
  duration: number;
  status: "success" | "error";
  startTime: string;
  spans: number;
  services: string[];
}

const SystemLogsScreen = () => {
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<"logs" | "traces">("logs");
  const [searchTerm, setSearchTerm] = useState("");
  const [levelFilter, setLevelFilter] = useState("all");
  const [expandedLog, setExpandedLog] = useState<string | null>(null);
  const [refreshing, setRefreshing] = useState(false);

  const logEntries: LogEntry[] = [
    {
      id: "LOG-001",
      timestamp: "2024-01-15 10:45:23.456",
      level: "info",
      service: "api-gateway",
      message: "Incoming request processed successfully",
      traceId: "trace-abc123",
      spanId: "span-001",
      userId: "user-456",
    },
    {
      id: "LOG-002",
      timestamp: "2024-01-15 10:45:22.789",
      level: "warning",
      service: "claims-service",
      message: "High latency detected for claim processing operation",
      traceId: "trace-def456",
      spanId: "span-002",
    },
    {
      id: "LOG-003",
      timestamp: "2024-01-15 10:45:21.234",
      level: "error",
      service: "billing-service",
      message: "Payment gateway timeout - retrying connection",
      traceId: "trace-ghi789",
      spanId: "span-003",
    },
    {
      id: "LOG-004",
      timestamp: "2024-01-15 10:45:20.567",
      level: "info",
      service: "auth-service",
      message: "User authentication successful",
      traceId: "trace-jkl012",
      spanId: "span-004",
      userId: "user-789",
    },
    {
      id: "LOG-005",
      timestamp: "2024-01-15 10:45:19.890",
      level: "debug",
      service: "policy-service",
      message: "Cache hit for policy lookup - key: policy-123",
      traceId: "trace-mno345",
      spanId: "span-005",
    },
    {
      id: "LOG-006",
      timestamp: "2024-01-15 10:45:18.123",
      level: "info",
      service: "notification-service",
      message: "Email notification queued for delivery",
      traceId: "trace-pqr678",
      spanId: "span-006",
      userId: "user-321",
    },
    {
      id: "LOG-007",
      timestamp: "2024-01-15 10:45:17.456",
      level: "error",
      service: "reporting-service",
      message: "Report generation failed - memory limit exceeded",
      traceId: "trace-stu901",
      spanId: "span-007",
    },
    {
      id: "LOG-008",
      timestamp: "2024-01-15 10:45:16.789",
      level: "info",
      service: "database-primary",
      message: "Query executed successfully - 245 rows returned",
      traceId: "trace-vwx234",
      spanId: "span-008",
    },
  ];

  const traces: Trace[] = [
    {
      id: "TRACE-001",
      name: "Create Policy",
      duration: 1250,
      status: "success",
      startTime: "2024-01-15 10:45:20.000",
      spans: 8,
      services: [
        "api-gateway",
        "auth-service",
        "policy-service",
        "database-primary",
      ],
    },
    {
      id: "TRACE-002",
      name: "Submit Claim",
      duration: 3420,
      status: "error",
      startTime: "2024-01-15 10:44:15.000",
      spans: 12,
      services: [
        "api-gateway",
        "claims-service",
        "billing-service",
        "notification-service",
      ],
    },
    {
      id: "TRACE-003",
      name: "Process Payment",
      duration: 890,
      status: "success",
      startTime: "2024-01-15 10:43:45.000",
      spans: 5,
      services: ["api-gateway", "billing-service", "payment-gateway"],
    },
    {
      id: "TRACE-004",
      name: "Generate Report",
      duration: 5670,
      status: "success",
      startTime: "2024-01-15 10:42:30.000",
      spans: 6,
      services: ["api-gateway", "reporting-service", "database-replica"],
    },
    {
      id: "TRACE-005",
      name: "User Login",
      duration: 234,
      status: "success",
      startTime: "2024-01-15 10:42:00.000",
      spans: 3,
      services: ["api-gateway", "auth-service"],
    },
  ];

  const handleRefresh = () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 1500);
  };

  const getLevelIcon = (level: string) => {
    switch (level) {
      case "info":
        return <Info className="w-5 h-5 text-blue-500" />;
      case "warning":
        return <AlertTriangle className="w-5 h-5 text-yellow-500" />;
      case "error":
        return <XCircle className="w-5 h-5 text-red-500" />;
      case "debug":
        return <CheckCircle className="w-5 h-5 text-gray-500" />;
      default:
        return <Info className="w-5 h-5 text-gray-500" />;
    }
  };

  const getLevelBadge = (level: string) => {
    const baseClasses = "px-3 py-1 text-xs font-medium rounded-full";
    switch (level) {
      case "info":
        return (
          <span className={`${baseClasses} bg-blue-100 text-blue-700`}>
            INFO
          </span>
        );
      case "warning":
        return (
          <span className={`${baseClasses} bg-yellow-100 text-yellow-700`}>
            WARN
          </span>
        );
      case "error":
        return (
          <span className={`${baseClasses} bg-red-100 text-red-700`}>
            ERROR
          </span>
        );
      case "debug":
        return (
          <span className={`${baseClasses} bg-gray-100 text-gray-700`}>
            DEBUG
          </span>
        );
      default:
        return (
          <span className={`${baseClasses} bg-gray-100 text-gray-700`}>
            {level.toUpperCase()}
          </span>
        );
    }
  };

  const filteredLogs = logEntries.filter((log) => {
    const matchesSearch =
      log.message.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.service.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.traceId.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesLevel = levelFilter === "all" || log.level === levelFilter;
    return matchesSearch && matchesLevel;
  });

  const infoCount = logEntries.filter((l) => l.level === "info").length;
  const warningCount = logEntries.filter((l) => l.level === "warning").length;
  const errorCount = logEntries.filter((l) => l.level === "error").length;
  const debugCount = logEntries.filter((l) => l.level === "debug").length;

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
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
              <div>
                <h1 className="text-3xl font-bold text-gray-800 mb-2">
                  Logs & Traces
                </h1>
                <p className="text-gray-600">
                  View application logs and distributed traces
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
                {refreshing ? "Refreshing..." : "Refresh"}
              </button>
            </div>

            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <div className="bg-white rounded-xl shadow-sm border border-blue-100 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-600 text-sm font-medium">Info</p>
                    <p className="text-2xl font-bold text-blue-600 mt-1">
                      {infoCount}
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Info className="w-6 h-6 text-blue-600" />
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-xl shadow-sm border border-blue-100 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-600 text-sm font-medium">
                      Warnings
                    </p>
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
                    <p className="text-gray-600 text-sm font-medium">Errors</p>
                    <p className="text-2xl font-bold text-red-600 mt-1">
                      {errorCount}
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                    <XCircle className="w-6 h-6 text-red-600" />
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-xl shadow-sm border border-blue-100 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-600 text-sm font-medium">Debug</p>
                    <p className="text-2xl font-bold text-gray-600 mt-1">
                      {debugCount}
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                    <FileText className="w-6 h-6 text-gray-600" />
                  </div>
                </div>
              </div>
            </div>

            {/* Tab Navigation */}
            <div className="bg-white rounded-xl shadow-sm border border-blue-100 mb-6">
              <div className="flex border-b border-gray-200">
                <button
                  onClick={() => setActiveTab("logs")}
                  className={`flex-1 px-6 py-4 font-medium transition-colors ${
                    activeTab === "logs"
                      ? "text-blue-600 border-b-2 border-blue-600 bg-blue-50"
                      : "text-gray-600 hover:text-gray-800 hover:bg-gray-50"
                  }`}
                >
                  <div className="flex items-center justify-center gap-2">
                    <FileText className="w-5 h-5" />
                    Logs
                  </div>
                </button>
                <button
                  onClick={() => setActiveTab("traces")}
                  className={`flex-1 px-6 py-4 font-medium transition-colors ${
                    activeTab === "traces"
                      ? "text-blue-600 border-b-2 border-blue-600 bg-blue-50"
                      : "text-gray-600 hover:text-gray-800 hover:bg-gray-50"
                  }`}
                >
                  <div className="flex items-center justify-center gap-2">
                    <Clock className="w-5 h-5" />
                    Traces
                  </div>
                </button>
              </div>
            </div>

            {activeTab === "logs" && (
              <>
                {/* Filters */}
                <div className="bg-white rounded-xl shadow-sm border border-blue-100 p-6 mb-6">
                  <div className="flex flex-col md:flex-row gap-4">
                    <div className="flex-1 relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <input
                        type="text"
                        placeholder="Search logs by message, service, or trace ID..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                      />
                    </div>
                    <div className="relative">
                      <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <select
                        value={levelFilter}
                        onChange={(e) => setLevelFilter(e.target.value)}
                        className="pl-10 pr-8 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none bg-white appearance-none cursor-pointer"
                      >
                        <option value="all">All Levels</option>
                        <option value="info">Info</option>
                        <option value="warning">Warning</option>
                        <option value="error">Error</option>
                        <option value="debug">Debug</option>
                      </select>
                    </div>
                    <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2 font-medium">
                      <Download className="w-5 h-5" />
                      Export
                    </button>
                  </div>
                </div>

                {/* Logs List */}
                <div className="bg-white rounded-xl shadow-sm border border-blue-100 overflow-hidden">
                  <div className="divide-y divide-gray-200">
                    {filteredLogs.map((log) => (
                      <div key={log.id}>
                        <div
                          className="px-6 py-4 hover:bg-gray-50 transition-colors cursor-pointer"
                          onClick={() =>
                            setExpandedLog(
                              expandedLog === log.id ? null : log.id,
                            )
                          }
                        >
                          <div className="flex items-start justify-between">
                            <div className="flex items-start gap-4">
                              {getLevelIcon(log.level)}
                              <div>
                                <div className="flex items-center gap-3 mb-1">
                                  <span className="text-xs text-gray-500">
                                    {log.timestamp}
                                  </span>
                                  {getLevelBadge(log.level)}
                                  <span className="text-xs bg-gray-100 text-gray-700 px-2 py-0.5 rounded">
                                    {log.service}
                                  </span>
                                </div>
                                <p className="text-gray-800">{log.message}</p>
                                <div className="flex items-center gap-4 mt-2 text-xs text-gray-500">
                                  <span>Trace: {log.traceId}</span>
                                  <span>Span: {log.spanId}</span>
                                  {log.userId && (
                                    <span>User: {log.userId}</span>
                                  )}
                                </div>
                              </div>
                            </div>
                            <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                              {expandedLog === log.id ? (
                                <ChevronDown className="w-5 h-5" />
                              ) : (
                                <ChevronRight className="w-5 h-5" />
                              )}
                            </button>
                          </div>
                        </div>
                        {expandedLog === log.id && (
                          <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
                            <h4 className="text-sm font-semibold text-gray-700 mb-2">
                              Additional Details
                            </h4>
                            <pre className="text-xs text-gray-600 overflow-x-auto">
                              {JSON.stringify(
                                {
                                  id: log.id,
                                  timestamp: log.timestamp,
                                  level: log.level,
                                  service: log.service,
                                  message: log.message,
                                  traceId: log.traceId,
                                  spanId: log.spanId,
                                  userId: log.userId,
                                  metadata: {
                                    environment: "production",
                                    region: "us-east-1",
                                    version: "2.4.1",
                                  },
                                },
                                null,
                                2,
                              )}
                            </pre>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}

            {activeTab === "traces" && (
              <div className="bg-white rounded-xl shadow-sm border border-blue-100 overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50 border-b border-gray-200">
                      <tr>
                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                          Trace ID
                        </th>
                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                          Operation
                        </th>
                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                          Duration
                        </th>
                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                          Status
                        </th>
                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                          Services
                        </th>
                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {traces.map((trace) => (
                        <tr
                          key={trace.id}
                          className="hover:bg-gray-50 transition-colors"
                        >
                          <td className="px-6 py-4 text-gray-800 font-medium">
                            {trace.id}
                          </td>
                          <td className="px-6 py-4">
                            <div>
                              <span className="text-gray-800 font-medium block">
                                {trace.name}
                              </span>
                              <span className="text-xs text-gray-500">
                                {trace.startTime}
                              </span>
                            </div>
                          </td>
                          <td className="px-6 py-4 text-gray-600">
                            {trace.duration}ms
                          </td>
                          <td className="px-6 py-4">
                            <span
                              className={`px-3 py-1 text-xs font-medium rounded-full ${
                                trace.status === "success"
                                  ? "bg-green-100 text-green-700"
                                  : "bg-red-100 text-red-700"
                              }`}
                            >
                              {trace.status === "success" ? "Success" : "Error"}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex flex-wrap gap-1">
                              {trace.services.map((service) => (
                                <span
                                  key={service}
                                  className="px-2 py-0.5 bg-blue-50 text-blue-700 text-xs rounded"
                                >
                                  {service}
                                </span>
                              ))}
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <button className="px-4 py-2 bg-blue-50 text-blue-700 text-sm rounded-lg hover:bg-blue-100 transition-colors flex items-center gap-2">
                              <Eye className="w-4 h-4" />
                              View
                            </button>
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

export default SystemLogsScreen;
