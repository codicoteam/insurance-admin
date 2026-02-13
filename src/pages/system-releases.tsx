import React, { useState } from "react";
import {
  Tag,
  GitBranch,
  GitCommit,
  Clock,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Calendar,
  User,
  Shield,
  Menu,
  ChevronDown,
  ChevronRight,
  Play,
  RefreshCw,
} from "lucide-react";
import InsuranceSidebar from "../Components/sidebar";

interface Release {
  id: string;
  version: string;
  name: string;
  status: "deployed" | "in_progress" | "failed" | "scheduled" | "rollback";
  environment: "production" | "staging" | "development";
  deployedAt: string;
  deployedBy: string;
  description: string;
  services: string[];
  commits: number;
}

interface Pipeline {
  id: string;
  name: string;
  status: "success" | "running" | "failed" | "pending";
  branch: string;
  commit: string;
  duration: string;
  startedAt: string;
  stages: { name: string; status: string; duration: string }[];
}

const SystemReleasesScreen = () => {
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<"releases" | "pipelines" | "history">(
    "releases",
  );
  const [expandedRelease, setExpandedRelease] = useState<string | null>(null);

  const releases: Release[] = [
    {
      id: "REL-001",
      version: "v2.4.1",
      name: "February Security Patch",
      status: "deployed",
      environment: "production",
      deployedAt: "2024-01-15 08:30:00",
      deployedBy: "John Smith",
      description: "Security updates and performance improvements",
      services: ["api-gateway", "auth-service", "policy-service"],
      commits: 12,
    },
    {
      id: "REL-002",
      version: "v2.4.0",
      name: "Claims Enhancement",
      status: "in_progress",
      environment: "staging",
      deployedAt: "2024-01-15 10:00:00",
      deployedBy: "Jane Doe",
      description: "New claims processing workflow",
      services: ["claims-service", "notification-service"],
      commits: 28,
    },
    {
      id: "REL-003",
      version: "v2.3.9",
      name: "Bug Fix Release",
      status: "deployed",
      environment: "production",
      deployedAt: "2024-01-10 14:00:00",
      deployedBy: "Mike Johnson",
      description: "Critical bug fixes for billing module",
      services: ["billing-service"],
      commits: 5,
    },
    {
      id: "REL-004",
      version: "v2.5.0-beta",
      name: "Feature Branch",
      status: "scheduled",
      environment: "development",
      deployedAt: "2024-01-20 09:00:00",
      deployedBy: "Sarah Wilson",
      description: "Quarterly feature release",
      services: ["all"],
      commits: 45,
    },
    {
      id: "REL-005",
      version: "v2.3.8",
      name: "Emergency Patch",
      status: "rollback",
      environment: "production",
      deployedAt: "2024-01-08 16:00:00",
      deployedBy: "Tom Brown",
      description: "Hotfix for database connectivity issue",
      services: ["database-primary"],
      commits: 2,
    },
  ];

  const pipelines: Pipeline[] = [
    {
      id: "PIPE-001",
      name: "build-and-test",
      status: "success",
      branch: "main",
      commit: "a1b2c3d",
      duration: "12m 34s",
      startedAt: "2024-01-15 10:00:00",
      stages: [
        { name: "Checkout", status: "success", duration: "15s" },
        { name: "Install", status: "success", duration: "2m 12s" },
        { name: "Lint", status: "success", duration: "1m 45s" },
        { name: "Test", status: "success", duration: "5m 22s" },
        { name: "Build", status: "success", duration: "3m 00s" },
      ],
    },
    {
      id: "PIPE-002",
      name: "deploy-production",
      status: "running",
      branch: "main",
      commit: "e4f5g6h",
      duration: "Running...",
      startedAt: "2024-01-15 09:45:00",
      stages: [
        { name: "Checkout", status: "success", duration: "12s" },
        { name: "Build", status: "success", duration: "4m 30s" },
        { name: "Test", status: "success", duration: "6m 15s" },
        { name: "Deploy Staging", status: "success", duration: "2m 45s" },
        { name: "Deploy Production", status: "running", duration: "-" },
      ],
    },
    {
      id: "PIPE-003",
      name: "security-scan",
      status: "failed",
      branch: "feature/new-ui",
      commit: "i7j8k9l",
      duration: "8m 22s",
      startedAt: "2024-01-15 09:30:00",
      stages: [
        { name: "Checkout", status: "success", duration: "18s" },
        { name: "SAST Scan", status: "failed", duration: "8m 04s" },
        { name: "Dependency Check", status: "pending", duration: "-" },
      ],
    },
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "deployed":
      case "success":
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case "in_progress":
      case "running":
        return <RefreshCw className="w-5 h-5 text-blue-500 animate-spin" />;
      case "failed":
        return <XCircle className="w-5 h-5 text-red-500" />;
      case "scheduled":
        return <Clock className="w-5 h-5 text-purple-500" />;
      case "rollback":
        return <AlertTriangle className="w-5 h-5 text-yellow-500" />;
      default:
        return <Clock className="w-5 h-5 text-gray-500" />;
    }
  };

  const getStatusBadge = (status: string) => {
    const baseClasses = "px-3 py-1 text-xs font-medium rounded-full";
    switch (status) {
      case "deployed":
      case "success":
        return <span className={`${baseClasses} bg-green-100 text-green-700`}>Deployed</span>;
      case "in_progress":
      case "running":
        return <span className={`${baseClasses} bg-blue-100 text-blue-700`}>In Progress</span>;
      case "failed":
        return <span className={`${baseClasses} bg-red-100 text-red-700`}>Failed</span>;
      case "scheduled":
        return <span className={`${baseClasses} bg-purple-100 text-purple-700`}>Scheduled</span>;
      case "rollback":
        return <span className={`${baseClasses} bg-yellow-100 text-yellow-700`}>Rolled Back</span>;
      default:
        return <span className={`${baseClasses} bg-gray-100 text-gray-700`}>{status}</span>;
    }
  };

  const getEnvironmentBadge = (env: string) => {
    const baseClasses = "px-2 py-0.5 text-xs font-medium rounded";
    switch (env) {
      case "production":
        return <span className={`${baseClasses} bg-red-100 text-red-700`}>Production</span>;
      case "staging":
        return <span className={`${baseClasses} bg-yellow-100 text-yellow-700`}>Staging</span>;
      case "development":
        return <span className={`${baseClasses} bg-blue-100 text-blue-700`}>Development</span>;
      default:
        return null;
    }
  };

  const deployedCount = releases.filter((r) => r.status === "deployed").length;
  const inProgressCount = releases.filter((r) => r.status === "in_progress").length;
  const scheduledCount = releases.filter((r) => r.status === "scheduled").length;

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
                  Release Management
                </h1>
                <p className="text-gray-600">
                  Deploy and manage application releases
                </p>
              </div>
              <div className="mt-4 md:mt-0 flex gap-3">
                <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2 font-medium">
                  <Play className="w-5 h-5" />
                  New Release
                </button>
              </div>
            </div>

            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <div className="bg-white rounded-xl shadow-sm border border-blue-100 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-600 text-sm font-medium">Deployed</p>
                    <p className="text-2xl font-bold text-green-600 mt-1">{deployedCount}</p>
                  </div>
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                    <CheckCircle className="w-6 h-6 text-green-600" />
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-xl shadow-sm border border-blue-100 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-600 text-sm font-medium">In Progress</p>
                    <p className="text-2xl font-bold text-blue-600 mt-1">{inProgressCount}</p>
                  </div>
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <RefreshCw className="w-6 h-6 text-blue-600 animate-spin" />
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-xl shadow-sm border border-blue-100 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-600 text-sm font-medium">Scheduled</p>
                    <p className="text-2xl font-bold text-purple-600 mt-1">{scheduledCount}</p>
                  </div>
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                    <Calendar className="w-6 h-6 text-purple-600" />
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-xl shadow-sm border border-blue-100 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-600 text-sm font-medium">Total Releases</p>
                    <p className="text-2xl font-bold text-gray-800 mt-1">{releases.length}</p>
                  </div>
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Tag className="w-6 h-6 text-blue-600" />
                  </div>
                </div>
              </div>
            </div>

            {/* Tab Navigation */}
            <div className="bg-white rounded-xl shadow-sm border border-blue-100 mb-6">
              <div className="flex border-b border-gray-200">
                <button
                  onClick={() => setActiveTab("releases")}
                  className={`flex-1 px-6 py-4 font-medium transition-colors ${
                    activeTab === "releases"
                      ? "text-blue-600 border-b-2 border-blue-600 bg-blue-50"
                      : "text-gray-600 hover:text-gray-800 hover:bg-gray-50"
                  }`}
                >
                  <div className="flex items-center justify-center gap-2">
                    <Tag className="w-5 h-5" />
                    Releases
                  </div>
                </button>
                <button
                  onClick={() => setActiveTab("pipelines")}
                  className={`flex-1 px-6 py-4 font-medium transition-colors ${
                    activeTab === "pipelines"
                      ? "text-blue-600 border-b-2 border-blue-600 bg-blue-50"
                      : "text-gray-600 hover:text-gray-800 hover:bg-gray-50"
                  }`}
                >
                  <div className="flex items-center justify-center gap-2">
                    <GitBranch className="w-5 h-5" />
                    Pipelines
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
                    <GitCommit className="w-5 h-5" />
                    History
                  </div>
                </button>
              </div>
            </div>

            {activeTab === "releases" && (
              <div className="bg-white rounded-xl shadow-sm border border-blue-100 overflow-hidden">
                <div className="divide-y divide-gray-200">
                  {releases.map((release) => (
                    <div key={release.id}>
                      <div
                        className="px-6 py-4 hover:bg-gray-50 transition-colors cursor-pointer"
                        onClick={() =>
                          setExpandedRelease(expandedRelease === release.id ? null : release.id)
                        }
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex items-start gap-4">
                            {getStatusIcon(release.status)}
                            <div>
                              <div className="flex items-center gap-3 mb-1">
                                <span className="text-lg font-bold text-gray-800">
                                  {release.version}
                                </span>
                                {getStatusBadge(release.status)}
                                {getEnvironmentBadge(release.environment)}
                              </div>
                              <p className="text-gray-800 font-medium">{release.name}</p>
                              <p className="text-sm text-gray-500 mt-1">{release.description}</p>
                              <div className="flex items-center gap-4 mt-2 text-xs text-gray-500">
                                <span className="flex items-center gap-1">
                                  <Calendar className="w-3 h-3" />
                                  {release.deployedAt}
                                </span>
                                <span className="flex items-center gap-1">
                                  <User className="w-3 h-3" />
                                  {release.deployedBy}
                                </span>
                                <span className="flex items-center gap-1">
                                  <GitCommit className="w-3 h-3" />
                                  {release.commits} commits
                                </span>
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            {release.status === "deployed" && (
                              <button className="px-3 py-1 bg-red-50 text-red-700 text-sm rounded-lg hover:bg-red-100 transition-colors">
                                Rollback
                              </button>
                            )}
                            <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                              {expandedRelease === release.id ? (
                                <ChevronDown className="w-5 h-5" />
                              ) : (
                                <ChevronRight className="w-5 h-5" />
                              )}
                            </button>
                          </div>
                        </div>
                      </div>
                      {expandedRelease === release.id && (
                        <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
                          <h4 className="text-sm font-semibold text-gray-700 mb-2">
                            Services Updated
                          </h4>
                          <div className="flex flex-wrap gap-2">
                            {release.services.map((service) => (
                              <span
                                key={service}
                                className="px-3 py-1 bg-blue-100 text-blue-700 text-sm rounded-full"
                              >
                                {service}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "pipelines" && (
              <div className="space-y-4">
                {pipelines.map((pipeline) => (
                  <div
                    key={pipeline.id}
                    className="bg-white rounded-xl shadow-sm border border-blue-100 p-6"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-start gap-4">
                        {getStatusIcon(pipeline.status)}
                        <div>
                          <h4 className="text-gray-800 font-medium">{pipeline.name}</h4>
                          <div className="flex items-center gap-3 mt-1">
                            <span className="flex items-center gap-1 text-sm text-gray-500">
                              <GitBranch className="w-4 h-4" />
                              {pipeline.branch}
                            </span>
                            <span className="flex items-center gap-1 text-sm text-gray-500">
                              <GitCommit className="w-4 h-4" />
                              {pipeline.commit}
                            </span>
                            <span className="text-sm text-gray-500">
                              {pipeline.duration}
                            </span>
                          </div>
                        </div>
                      </div>
                      {getStatusBadge(pipeline.status)}
                    </div>
                    <div className="flex items-center gap-2 overflow-x-auto pb-2">
                      {pipeline.stages.map((stage, index) => (
                        <React.Fragment key={stage.name}>
                          <div
                            className={`px-3 py-1 text-sm rounded ${
                              stage.status === "success"
                                ? "bg-green-100 text-green-700"
                                : stage.status === "running"
                                ? "bg-blue-100 text-blue-700"
                                : stage.status === "failed"
                                ? "bg-red-100 text-red-700"
                                : "bg-gray-100 text-gray-500"
                            }`}
                          >
                            {stage.name}
                          </div>
                          {index < pipeline.stages.length - 1 && (
                            <ChevronRight className="w-4 h-4 text-gray-400 flex-shrink-0" />
                          )}
                        </React.Fragment>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === "history" && (
              <div className="bg-white rounded-xl shadow-sm border border-blue-100 p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">
                  Release History
                </h3>
                <div className="space-y-4">
                  {releases
                    .filter((r) => r.status === "deployed" || r.status === "rollback")
                    .map((release) => (
                      <div
                        key={release.id}
                        className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                      >
                        <div className="flex items-center gap-4">
                          {getStatusIcon(release.status)}
                          <div>
                            <span className="font-medium text-gray-800">
                              {release.version}
                            </span>
                            <span className="text-gray-500 mx-2">-</span>
                            <span className="text-gray-600">{release.name}</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          {getEnvironmentBadge(release.environment)}
                          <span className="text-sm text-gray-500">
                            {release.deployedAt}
                          </span>
                          <span className="text-sm text-gray-500">
                            by {release.deployedBy}
                          </span>
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

export default SystemReleasesScreen;
