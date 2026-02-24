import { useState } from "react";
import {
  Database,
  RefreshCw,
  Clock,
  CheckCircle,
  XCircle,
  Download,
  Upload,
  Shield,
  Menu,
  HardDrive,
  Cloud,
  Zap,
} from "lucide-react";

interface Backup {
  id: string;
  name: string;
  type: "full" | "incremental";
  status: "completed" | "in_progress" | "failed" | "scheduled";
  size: string;
  timestamp: string;
  retention: string;
  location: string;
}

interface DRTest {
  id: string;
  name: string;
  lastRun: string;
  status: "passed" | "failed" | "in_progress" | "scheduled";
  rpo: string;
  rto: string;
  failoverTime: string;
}

const SystemBackupsScreen = () => {
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<"backups" | "dr" | "settings">(
    "backups",
  );

  const backups: Backup[] = [
    {
      id: "BK-001",
      name: "Daily Full Backup",
      type: "full",
      status: "completed",
      size: "245 GB",
      timestamp: "2024-01-15 02:00:00",
      retention: "30 days",
      location: "Primary DC (S3)",
    },
    {
      id: "BK-002",
      name: "Hourly Incremental",
      type: "incremental",
      status: "completed",
      size: "12 GB",
      timestamp: "2024-01-15 10:00:00",
      retention: "7 days",
      location: "Primary DC (S3)",
    },
    {
      id: "BK-003",
      name: "Hourly Incremental",
      type: "incremental",
      status: "in_progress",
      size: "-",
      timestamp: "2024-01-15 11:00:00",
      retention: "7 days",
      location: "Primary DC (S3)",
    },
    {
      id: "BK-004",
      name: "Weekly Full Backup",
      type: "full",
      status: "scheduled",
      size: "-",
      timestamp: "2024-01-21 02:00:00",
      retention: "90 days",
      location: "Primary DC (S3)",
    },
    {
      id: "BK-005",
      name: "Transaction Log Backup",
      type: "incremental",
      status: "completed",
      size: "2.3 GB",
      timestamp: "2024-01-15 10:30:00",
      retention: "14 days",
      location: "Primary DC (S3)",
    },
    {
      id: "BK-006",
      name: "Cross-Region Replica",
      type: "full",
      status: "completed",
      size: "245 GB",
      timestamp: "2024-01-15 02:15:00",
      retention: "30 days",
      location: "Secondary DC (S3)",
    },
  ];

  const drTests: DRTest[] = [
    {
      id: "DR-001",
      name: "Full Failover Test",
      lastRun: "2024-01-10 14:00:00",
      status: "passed",
      rpo: "15 min",
      rto: "45 min",
      failoverTime: "38 min",
    },
    {
      id: "DR-002",
      name: "Database Failover",
      lastRun: "2024-01-08 09:00:00",
      status: "passed",
      rpo: "15 min",
      rto: "15 min",
      failoverTime: "12 min",
    },
    {
      id: "DR-003",
      name: "Partial Failover",
      lastRun: "2024-01-05 16:00:00",
      status: "failed",
      rpo: "15 min",
      rto: "30 min",
      failoverTime: "45 min",
    },
    {
      id: "DR-004",
      name: "Data Recovery Test",
      lastRun: "2024-01-03 11:00:00",
      status: "passed",
      rpo: "15 min",
      rto: "60 min",
      failoverTime: "52 min",
    },
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case "in_progress":
        return <RefreshCw className="w-5 h-5 text-blue-500 animate-spin" />;
      case "failed":
        return <XCircle className="w-5 h-5 text-red-500" />;
      case "scheduled":
        return <Clock className="w-5 h-5 text-purple-500" />;
      case "passed":
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      default:
        return <Clock className="w-5 h-5 text-gray-500" />;
    }
  };

  const getStatusBadge = (status: string) => {
    const baseClasses = "px-3 py-1 text-xs font-medium rounded-full";
    switch (status) {
      case "completed":
      case "passed":
        return (
          <span className={`${baseClasses} bg-green-100 text-green-700`}>
            Completed
          </span>
        );
      case "in_progress":
        return (
          <span className={`${baseClasses} bg-blue-100 text-blue-700`}>
            In Progress
          </span>
        );
      case "failed":
        return (
          <span className={`${baseClasses} bg-red-100 text-red-700`}>
            Failed
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

  const getTypeBadge = (type: string) => {
    const baseClasses = "px-2 py-0.5 text-xs font-medium rounded";
    switch (type) {
      case "full":
        return (
          <span className={`${baseClasses} bg-blue-100 text-blue-700`}>
            Full
          </span>
        );
      case "incremental":
        return (
          <span className={`${baseClasses} bg-green-100 text-green-700`}>
            Incremental
          </span>
        );
      default:
        return null;
    }
  };

  const completedBackups = backups.filter(
    (b) => b.status === "completed",
  ).length;
  const inProgressBackups = backups.filter(
    (b) => b.status === "in_progress",
  ).length;
  const passedDRTests = drTests.filter((d) => d.status === "passed").length;

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
                  Backups & DR
                </h1>
                <p className="text-gray-600">
                  Manage backups and disaster recovery procedures
                </p>
              </div>
              <div className="mt-4 md:mt-0 flex gap-3">
                <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2 font-medium">
                  <Upload className="w-5 h-5" />
                  Restore
                </button>
                <button className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2 font-medium">
                  <RefreshCw className="w-5 h-5" />
                  Run Backup
                </button>
              </div>
            </div>

            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <div className="bg-white rounded-xl shadow-sm border border-blue-100 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-600 text-sm font-medium">
                      Total Backups
                    </p>
                    <p className="text-2xl font-bold text-gray-800 mt-1">
                      {backups.length}
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Database className="w-6 h-6 text-blue-600" />
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
                      {completedBackups}
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
                    <p className="text-gray-600 text-sm font-medium">
                      In Progress
                    </p>
                    <p className="text-2xl font-bold text-blue-600 mt-1">
                      {inProgressBackups}
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <RefreshCw className="w-6 h-6 text-blue-600 animate-spin" />
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-xl shadow-sm border border-blue-100 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-600 text-sm font-medium">
                      DR Tests Passed
                    </p>
                    <p className="text-2xl font-bold text-green-600 mt-1">
                      {passedDRTests}/{drTests.length}
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                    <Shield className="w-6 h-6 text-green-600" />
                  </div>
                </div>
              </div>
            </div>

            {/* Tab Navigation */}
            <div className="bg-white rounded-xl shadow-sm border border-blue-100 mb-6">
              <div className="flex border-b border-gray-200">
                <button
                  onClick={() => setActiveTab("backups")}
                  className={`flex-1 px-6 py-4 font-medium transition-colors ${
                    activeTab === "backups"
                      ? "text-blue-600 border-b-2 border-blue-600 bg-blue-50"
                      : "text-gray-600 hover:text-gray-800 hover:bg-gray-50"
                  }`}
                >
                  <div className="flex items-center justify-center gap-2">
                    <Database className="w-5 h-5" />
                    Backups
                  </div>
                </button>
                <button
                  onClick={() => setActiveTab("dr")}
                  className={`flex-1 px-6 py-4 font-medium transition-colors ${
                    activeTab === "dr"
                      ? "text-blue-600 border-b-2 border-blue-600 bg-blue-50"
                      : "text-gray-600 hover:text-gray-800 hover:bg-gray-50"
                  }`}
                >
                  <div className="flex items-center justify-center gap-2">
                    <Shield className="w-5 h-5" />
                    Disaster Recovery
                  </div>
                </button>
                <button
                  onClick={() => setActiveTab("settings")}
                  className={`flex-1 px-6 py-4 font-medium transition-colors ${
                    activeTab === "settings"
                      ? "text-blue-600 border-b-2 border-blue-600 bg-blue-50"
                      : "text-gray-600 hover:text-gray-800 hover:bg-gray-50"
                  }`}
                >
                  <div className="flex items-center justify-center gap-2">
                    <HardDrive className="w-5 h-5" />
                    Settings
                  </div>
                </button>
              </div>
            </div>

            {activeTab === "backups" && (
              <>
                {/* Backups Table */}
                <div className="bg-white rounded-xl shadow-sm border border-blue-100 overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-gray-50 border-b border-gray-200">
                        <tr>
                          <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                            Backup ID
                          </th>
                          <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                            Name
                          </th>
                          <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                            Type
                          </th>
                          <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                            Status
                          </th>
                          <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                            Size
                          </th>
                          <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                            Timestamp
                          </th>
                          <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                            Location
                          </th>
                          <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        {backups.map((backup) => (
                          <tr
                            key={backup.id}
                            className="hover:bg-gray-50 transition-colors"
                          >
                            <td className="px-6 py-4 text-gray-800 font-medium">
                              {backup.id}
                            </td>
                            <td className="px-6 py-4 text-gray-800 font-medium">
                              {backup.name}
                            </td>
                            <td className="px-6 py-4">
                              {getTypeBadge(backup.type)}
                            </td>
                            <td className="px-6 py-4">
                              <div className="flex items-center gap-2">
                                {getStatusIcon(backup.status)}
                                {getStatusBadge(backup.status)}
                              </div>
                            </td>
                            <td className="px-6 py-4 text-gray-600">
                              {backup.size}
                            </td>
                            <td className="px-6 py-4 text-gray-600">
                              {backup.timestamp}
                            </td>
                            <td className="px-6 py-4 text-gray-600">
                              <div className="flex items-center gap-2">
                                <Cloud className="w-4 h-4 text-gray-400" />
                                {backup.location}
                              </div>
                            </td>
                            <td className="px-6 py-4">
                              <div className="flex items-center gap-2">
                                <button
                                  className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                  title="Download"
                                >
                                  <Download className="w-4 h-4" />
                                </button>
                                <button
                                  className="p-2 text-gray-500 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                                  title="Restore"
                                >
                                  <Upload className="w-4 h-4" />
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

            {activeTab === "dr" && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* DR Tests */}
                <div className="bg-white rounded-xl shadow-sm border border-blue-100 overflow-hidden">
                  <div className="p-6 border-b border-gray-200">
                    <h3 className="text-lg font-semibold text-gray-800">
                      DR Test History
                    </h3>
                  </div>
                  <div className="divide-y divide-gray-200">
                    {drTests.map((test) => (
                      <div
                        key={test.id}
                        className="p-6 hover:bg-gray-50 transition-colors"
                      >
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <h4 className="text-gray-800 font-medium">
                              {test.name}
                            </h4>
                            <p className="text-sm text-gray-500">
                              Last run: {test.lastRun}
                            </p>
                          </div>
                          <div className="flex items-center gap-2">
                            {getStatusIcon(test.status)}
                            {getStatusBadge(test.status)}
                          </div>
                        </div>
                        <div className="grid grid-cols-3 gap-4 text-sm">
                          <div>
                            <span className="text-gray-500">RPO</span>
                            <p className="font-medium text-gray-800">
                              {test.rpo}
                            </p>
                          </div>
                          <div>
                            <span className="text-gray-500">RTO</span>
                            <p className="font-medium text-gray-800">
                              {test.rto}
                            </p>
                          </div>
                          <div>
                            <span className="text-gray-500">Failover</span>
                            <p className="font-medium text-gray-800">
                              {test.failoverTime}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* DR Configuration */}
                <div className="bg-white rounded-xl shadow-sm border border-blue-100 p-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">
                    DR Configuration
                  </h3>
                  <div className="space-y-4">
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-gray-700 font-medium">
                          Primary Region
                        </span>
                        <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-full">
                          Active
                        </span>
                      </div>
                      <p className="text-sm text-gray-500">
                        US-East-1 (N. Virginia)
                      </p>
                    </div>
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-gray-700 font-medium">
                          Secondary Region
                        </span>
                        <span className="px-3 py-1 bg-yellow-100 text-yellow-700 text-xs font-medium rounded-full">
                          Standby
                        </span>
                      </div>
                      <p className="text-sm text-gray-500">
                        US-West-2 (Oregon)
                      </p>
                    </div>
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-gray-700 font-medium">
                          Replication Status
                        </span>
                        <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-full">
                          In Sync
                        </span>
                      </div>
                      <p className="text-sm text-gray-500">Lag: 2.3 seconds</p>
                    </div>
                    <div className="p-4 bg-blue-50 rounded-lg border border-blue-100">
                      <div className="flex items-center gap-2 mb-2">
                        <Zap className="w-5 h-5 text-blue-600" />
                        <span className="text-blue-700 font-medium">
                          DR Drill Scheduled
                        </span>
                      </div>
                      <p className="text-sm text-blue-600">
                        January 25, 2024 at 14:00 UTC
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "settings" && (
              <div className="bg-white rounded-xl shadow-sm border border-blue-100 p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-6">
                  Backup Settings
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Full Backup Frequency
                      </label>
                      <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none bg-white">
                        <option>Daily</option>
                        <option>Weekly</option>
                        <option>Monthly</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Incremental Backup Frequency
                      </label>
                      <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none bg-white">
                        <option>Every 15 minutes</option>
                        <option>Every 30 minutes</option>
                        <option>Hourly</option>
                      </select>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Retention Period (Full Backups)
                      </label>
                      <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none bg-white">
                        <option>30 days</option>
                        <option>60 days</option>
                        <option>90 days</option>
                        <option>1 year</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Cross-Region Replication
                      </label>
                      <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none bg-white">
                        <option>Enabled (US-West-2)</option>
                        <option>Enabled (EU-West-1)</option>
                        <option>Disabled</option>
                      </select>
                    </div>
                  </div>
                </div>
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium">
                    Save Settings
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SystemBackupsScreen;
