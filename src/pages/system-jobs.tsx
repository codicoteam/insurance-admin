import { useState } from "react";
import {
  Clock,
  Play,
  Pause,
  RotateCcw,
  MoreVertical,
  CheckCircle,
  XCircle,
  Calendar,
  Filter,
  Search,
  Download,
  Server,
  Shield,
  Menu,
  Activity,
} from "lucide-react";

interface Job {
  id: string;
  name: string;
  type: string;
  status: "completed" | "running" | "failed" | "pending" | "scheduled";
  startTime: string;
  duration: string;
  owner: string;
  priority: "high" | "medium" | "low";
  progress: number;
}

interface Queue {
  id: string;
  name: string;
  pending: number;
  processing: number;
  failed: number;
  avgWaitTime: string;
  lastUpdated: string;
}

const SystemJobsScreen = () => {
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<"jobs" | "queues" | "scheduled">(
    "jobs",
  );
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const jobs: Job[] = [
    {
      id: "JOB-001",
      name: "Policy Expiration Notification",
      type: "Notification",
      status: "completed",
      startTime: "2024-01-15 08:00:00",
      duration: "2m 34s",
      owner: "System",
      priority: "high",
      progress: 100,
    },
    {
      id: "JOB-002",
      name: "Premium Reconciliation",
      type: "Billing",
      status: "running",
      startTime: "2024-01-15 09:30:00",
      duration: "Running...",
      owner: "Finance Team",
      priority: "high",
      progress: 65,
    },
    {
      id: "JOB-003",
      name: "Claims Auto-Adjudication",
      type: "Claims",
      status: "running",
      startTime: "2024-01-15 09:45:00",
      duration: "Running...",
      owner: "Claims Team",
      priority: "medium",
      progress: 42,
    },
    {
      id: "JOB-004",
      name: "Daily Batch Processing",
      type: "ETL",
      status: "failed",
      startTime: "2024-01-15 06:00:00",
      duration: "45m 12s",
      owner: "Data Team",
      priority: "high",
      progress: 78,
    },
    {
      id: "JOB-005",
      name: "Policy Renewal Reminders",
      type: "Notification",
      status: "pending",
      startTime: "2024-01-15 14:00:00",
      duration: "-",
      owner: "System",
      priority: "medium",
      progress: 0,
    },
    {
      id: "JOB-006",
      name: "Report Generation - Daily",
      type: "Reporting",
      status: "completed",
      startTime: "2024-01-15 07:00:00",
      duration: "5m 22s",
      owner: "Analytics",
      priority: "low",
      progress: 100,
    },
    {
      id: "JOB-007",
      name: "Data Sync - External Systems",
      type: "Integration",
      status: "scheduled",
      startTime: "2024-01-15 12:00:00",
      duration: "-",
      owner: "Integration Team",
      priority: "medium",
      progress: 0,
    },
    {
      id: "JOB-008",
      name: "Fraud Detection Batch",
      type: "Fraud",
      status: "running",
      startTime: "2024-01-15 10:00:00",
      duration: "Running...",
      owner: "Risk Team",
      priority: "high",
      progress: 23,
    },
  ];

  const queues: Queue[] = [
    {
      id: "Q-001",
      name: "Policy Updates",
      pending: 45,
      processing: 3,
      failed: 2,
      avgWaitTime: "2.3s",
      lastUpdated: "2 min ago",
    },
    {
      id: "Q-002",
      name: "Claims Processing",
      pending: 128,
      processing: 8,
      failed: 5,
      avgWaitTime: "15.7s",
      lastUpdated: "1 min ago",
    },
    {
      id: "Q-003",
      name: "Email Notifications",
      pending: 234,
      processing: 12,
      failed: 3,
      avgWaitTime: "8.2s",
      lastUpdated: "30 sec ago",
    },
    {
      id: "Q-004",
      name: "SMS Notifications",
      pending: 89,
      processing: 5,
      failed: 1,
      avgWaitTime: "5.1s",
      lastUpdated: "45 sec ago",
    },
    {
      id: "Q-005",
      name: "PDF Generation",
      pending: 67,
      processing: 4,
      failed: 0,
      avgWaitTime: "12.4s",
      lastUpdated: "1 min ago",
    },
    {
      id: "Q-006",
      name: "External API Calls",
      pending: 23,
      processing: 2,
      failed: 1,
      avgWaitTime: "3.8s",
      lastUpdated: "2 min ago",
    },
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case "running":
        return <Activity className="w-5 h-5 text-blue-500 animate-pulse" />;
      case "failed":
        return <XCircle className="w-5 h-5 text-red-500" />;
      case "pending":
        return <Clock className="w-5 h-5 text-yellow-500" />;
      case "scheduled":
        return <Calendar className="w-5 h-5 text-purple-500" />;
      default:
        return <Clock className="w-5 h-5 text-gray-500" />;
    }
  };

  const getStatusBadge = (status: string) => {
    const baseClasses = "px-3 py-1 text-xs font-medium rounded-full";
    switch (status) {
      case "completed":
        return (
          <span className={`${baseClasses} bg-green-100 text-green-700`}>
            Completed
          </span>
        );
      case "running":
        return (
          <span className={`${baseClasses} bg-blue-100 text-blue-700`}>
            Running
          </span>
        );
      case "failed":
        return (
          <span className={`${baseClasses} bg-red-100 text-red-700`}>
            Failed
          </span>
        );
      case "pending":
        return (
          <span className={`${baseClasses} bg-yellow-100 text-yellow-700`}>
            Pending
          </span>
        );
      case "scheduled":
        return (
          <span className={`${baseClasses} bg-purple-100 text-purple-700`}>
            Scheduled
          </span>
        );
      default:
        return (
          <span className={`${baseClasses} bg-gray-100 text-gray-700`}>
            {status}
          </span>
        );
    }
  };

  const getPriorityBadge = (priority: string) => {
    const baseClasses = "px-2 py-0.5 text-xs font-medium rounded";
    switch (priority) {
      case "high":
        return (
          <span className={`${baseClasses} bg-red-100 text-red-700`}>High</span>
        );
      case "medium":
        return (
          <span className={`${baseClasses} bg-yellow-100 text-yellow-700`}>
            Medium
          </span>
        );
      case "low":
        return (
          <span className={`${baseClasses} bg-gray-100 text-gray-700`}>
            Low
          </span>
        );
      default:
        return null;
    }
  };

  const filteredJobs = jobs.filter((job) => {
    const matchesSearch =
      job.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || job.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const completedJobs = jobs.filter((j) => j.status === "completed").length;
  const runningJobs = jobs.filter((j) => j.status === "running").length;
  const failedJobs = jobs.filter((j) => j.status === "failed").length;
  const pendingJobs = jobs.filter(
    (j) => j.status === "pending" || j.status === "scheduled",
  ).length;

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
                  Jobs & Queues
                </h1>
                <p className="text-gray-600">
                  Monitor and manage background jobs and message queues
                </p>
              </div>
              <button className="mt-4 md:mt-0 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2 font-medium">
                <Play className="w-5 h-5" />
                Run New Job
              </button>
            </div>

            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <div className="bg-white rounded-xl shadow-sm border border-blue-100 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-600 text-sm font-medium">Running</p>
                    <p className="text-2xl font-bold text-blue-600 mt-1">
                      {runningJobs}
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Activity className="w-6 h-6 text-blue-600" />
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-xl shadow-sm border border-blue-100 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-600 text-sm font-medium">
                      Completed
                    </p>
                    <p className="text-2xl font-bold text-green-600 mt-1">
                      {completedJobs}
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
                    <p className="text-gray-600 text-sm font-medium">Failed</p>
                    <p className="text-2xl font-bold text-red-600 mt-1">
                      {failedJobs}
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
                    <p className="text-gray-600 text-sm font-medium">Pending</p>
                    <p className="text-2xl font-bold text-yellow-600 mt-1">
                      {pendingJobs}
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                    <Clock className="w-6 h-6 text-yellow-600" />
                  </div>
                </div>
              </div>
            </div>

            {/* Tab Navigation */}
            <div className="bg-white rounded-xl shadow-sm border border-blue-100 mb-6">
              <div className="flex border-b border-gray-200">
                <button
                  onClick={() => setActiveTab("jobs")}
                  className={`flex-1 px-6 py-4 font-medium transition-colors ${
                    activeTab === "jobs"
                      ? "text-blue-600 border-b-2 border-blue-600 bg-blue-50"
                      : "text-gray-600 hover:text-gray-800 hover:bg-gray-50"
                  }`}
                >
                  <div className="flex items-center justify-center gap-2">
                    <Server className="w-5 h-5" />
                    Jobs
                  </div>
                </button>
                <button
                  onClick={() => setActiveTab("queues")}
                  className={`flex-1 px-6 py-4 font-medium transition-colors ${
                    activeTab === "queues"
                      ? "text-blue-600 border-b-2 border-blue-600 bg-blue-50"
                      : "text-gray-600 hover:text-gray-800 hover:bg-gray-50"
                  }`}
                >
                  <div className="flex items-center justify-center gap-2">
                    <Clock className="w-5 h-5" />
                    Queues
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
                    <Calendar className="w-5 h-5" />
                    Scheduled
                  </div>
                </button>
              </div>
            </div>

            {activeTab === "jobs" && (
              <>
                {/* Filters */}
                <div className="bg-white rounded-xl shadow-sm border border-blue-100 p-6 mb-6">
                  <div className="flex flex-col md:flex-row gap-4">
                    <div className="flex-1 relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <input
                        type="text"
                        placeholder="Search jobs..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                      />
                    </div>
                    <div className="relative">
                      <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <select
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                        className="pl-10 pr-8 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none bg-white appearance-none cursor-pointer"
                      >
                        <option value="all">All Status</option>
                        <option value="running">Running</option>
                        <option value="completed">Completed</option>
                        <option value="failed">Failed</option>
                        <option value="pending">Pending</option>
                        <option value="scheduled">Scheduled</option>
                      </select>
                    </div>
                    <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2 font-medium">
                      <Download className="w-5 h-5" />
                      Export
                    </button>
                  </div>
                </div>

                {/* Jobs Table */}
                <div className="bg-white rounded-xl shadow-sm border border-blue-100 overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-gray-50 border-b border-gray-200">
                        <tr>
                          <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                            Job ID
                          </th>
                          <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                            Name
                          </th>
                          <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                            Status
                          </th>
                          <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                            Priority
                          </th>
                          <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                            Duration
                          </th>
                          <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                            Progress
                          </th>
                          <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        {filteredJobs.map((job) => (
                          <tr
                            key={job.id}
                            className="hover:bg-gray-50 transition-colors"
                          >
                            <td className="px-6 py-4 text-gray-800 font-medium">
                              {job.id}
                            </td>
                            <td className="px-6 py-4">
                              <div>
                                <span className="text-gray-800 font-medium block">
                                  {job.name}
                                </span>
                                <span className="text-xs text-gray-500">
                                  {job.type} • {job.owner}
                                </span>
                              </div>
                            </td>
                            <td className="px-6 py-4">
                              <div className="flex items-center gap-2">
                                {getStatusIcon(job.status)}
                                {getStatusBadge(job.status)}
                              </div>
                            </td>
                            <td className="px-6 py-4">
                              {getPriorityBadge(job.priority)}
                            </td>
                            <td className="px-6 py-4 text-gray-600">
                              {job.duration}
                            </td>
                            <td className="px-6 py-4">
                              <div className="flex items-center gap-2">
                                <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                                  <div
                                    className={`h-full rounded-full transition-all ${
                                      job.status === "running"
                                        ? "bg-blue-500"
                                        : job.status === "failed"
                                          ? "bg-red-500"
                                          : "bg-green-500"
                                    }`}
                                    style={{ width: `${job.progress}%` }}
                                  />
                                </div>
                                <span className="text-xs text-gray-500 w-10">
                                  {job.progress}%
                                </span>
                              </div>
                            </td>
                            <td className="px-6 py-4">
                              <div className="flex items-center gap-2">
                                {job.status === "running" && (
                                  <button
                                    className="p-2 text-gray-500 hover:text-yellow-600 hover:bg-yellow-50 rounded-lg transition-colors"
                                    title="Pause"
                                  >
                                    <Pause className="w-4 h-4" />
                                  </button>
                                )}
                                {job.status === "pending" && (
                                  <button
                                    className="p-2 text-gray-500 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                                    title="Run Now"
                                  >
                                    <Play className="w-4 h-4" />
                                  </button>
                                )}
                                {job.status === "failed" && (
                                  <button
                                    className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                    title="Retry"
                                  >
                                    <RotateCcw className="w-4 h-4" />
                                  </button>
                                )}
                                <button
                                  className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                                  title="More Actions"
                                >
                                  <MoreVertical className="w-4 h-4" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </>
            )}

            {activeTab === "queues" && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {queues.map((queue) => (
                  <div
                    key={queue.id}
                    className="bg-white rounded-xl shadow-sm border border-blue-100 p-6 hover:shadow-md transition-all"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-semibold text-gray-800">
                        {queue.name}
                      </h3>
                      <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                        <MoreVertical className="w-4 h-4" />
                      </button>
                    </div>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <span className="text-gray-600 text-sm">Pending</span>
                        <span className="text-gray-800 font-medium">
                          {queue.pending}
                        </span>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                        <span className="text-blue-600 text-sm">
                          Processing
                        </span>
                        <span className="text-blue-800 font-medium">
                          {queue.processing}
                        </span>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
                        <span className="text-red-600 text-sm">Failed</span>
                        <span className="text-red-800 font-medium">
                          {queue.failed}
                        </span>
                      </div>
                      <div className="pt-3 border-t border-gray-200">
                        <div className="flex items-center justify-between">
                          <span className="text-gray-500 text-sm">
                            Avg Wait Time
                          </span>
                          <span className="text-gray-800 font-medium">
                            {queue.avgWaitTime}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="mt-4 pt-4 border-t border-gray-200">
                      <p className="text-xs text-gray-400 text-center">
                        Last updated: {queue.lastUpdated}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === "scheduled" && (
              <div className="bg-white rounded-xl shadow-sm border border-blue-100 p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">
                  Scheduled Jobs Overview
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {jobs
                    .filter(
                      (j) => j.status === "scheduled" || j.status === "pending",
                    )
                    .map((job) => (
                      <div
                        key={job.id}
                        className="p-4 bg-gray-50 rounded-lg border border-gray-200"
                      >
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-xs text-gray-500">
                            {job.id}
                          </span>
                          {getPriorityBadge(job.priority)}
                        </div>
                        <h4 className="text-gray-800 font-medium mb-2">
                          {job.name}
                        </h4>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Calendar className="w-4 h-4" />
                          {job.startTime}
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SystemJobsScreen;
