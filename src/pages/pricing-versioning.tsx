import React, { useState } from "react";
import {
  Search,
  Filter,
  Download,
  Plus,
  Edit,
  Eye,
  Clock,
  CheckCircle,
  XCircle,
  FileText,
  Menu,
  Send,
  History,
} from "lucide-react";

interface Version {
  id: string;
  name: string;
  type: "rate_table" | "rating_factor" | "pricing_model";
  version: string;
  status: "draft" | "pending_approval" | "approved" | "rejected" | "published";
  createdBy: string;
  createdDate: string;
  approvedBy: string | null;
  approvedDate: string | null;
  effectiveDate: string | null;
  changes: number;
}

const PricingVersioning = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  const versions: Version[] = [
    {
      id: "V-001",
      name: "Auto Rates 2024 v2.1",
      type: "rate_table",
      version: "2.1.0",
      status: "published",
      createdBy: "John Smith",
      createdDate: "2024-10-01",
      approvedBy: "Sarah Johnson",
      approvedDate: "2024-10-05",
      effectiveDate: "2024-10-15",
      changes: 12,
    },
    {
      id: "V-002",
      name: "Homeowners Base Rates",
      type: "rate_table",
      version: "3.0.0",
      status: "pending_approval",
      createdBy: "Mike Brown",
      createdDate: "2024-10-20",
      approvedBy: null,
      approvedDate: null,
      effectiveDate: "2024-11-01",
      changes: 28,
    },
    {
      id: "V-003",
      name: "Commercial GL Factors",
      type: "rating_factor",
      version: "1.5.0",
      status: "approved",
      createdBy: "Emily Davis",
      createdDate: "2024-10-18",
      approvedBy: "Sarah Johnson",
      approvedDate: "2024-10-22",
      effectiveDate: "2024-11-01",
      changes: 8,
    },
    {
      id: "V-004",
      name: "Cyber Pricing Model v2",
      type: "pricing_model",
      version: "2.0.0",
      status: "draft",
      createdBy: "Alex Wilson",
      createdDate: "2024-10-23",
      approvedBy: null,
      approvedDate: null,
      effectiveDate: null,
      changes: 45,
    },
    {
      id: "V-005",
      name: "Auto Rates 2024 v2.0",
      type: "rate_table",
      version: "2.0.0",
      status: "rejected",
      createdBy: "John Smith",
      createdDate: "2024-09-15",
      approvedBy: "Sarah Johnson",
      approvedDate: "2024-09-20",
      effectiveDate: null,
      changes: 35,
    },
    {
      id: "V-006",
      name: "Workers Comp Factors",
      type: "rating_factor",
      version: "1.2.0",
      status: "published",
      createdBy: "Lisa Chen",
      createdDate: "2024-09-01",
      approvedBy: "Mike Thompson",
      approvedDate: "2024-09-05",
      effectiveDate: "2024-09-15",
      changes: 6,
    },
  ];

  const stats = {
    pendingApproval: 3,
    publishedThisMonth: 8,
    drafts: 5,
    totalVersions: 156,
  };

  const filteredVersions = versions.filter((v) => {
    const matchesSearch = v.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === "all" || v.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status: string) => {
    const styles: Record<
      string,
      { bg: string; text: string; icon: React.ElementType }
    > = {
      draft: { bg: "bg-gray-100", text: "text-gray-700", icon: FileText },
      pending_approval: {
        bg: "bg-amber-100",
        text: "text-amber-700",
        icon: Clock,
      },
      approved: { bg: "bg-blue-100", text: "text-blue-700", icon: CheckCircle },
      rejected: { bg: "bg-red-100", text: "text-red-700", icon: XCircle },
      published: {
        bg: "bg-green-100",
        text: "text-green-700",
        icon: CheckCircle,
      },
    };
    const style = styles[status] || styles.draft;
    const Icon = style.icon;
    return (
      <span
        className={`px-2.5 py-1 rounded-full text-xs font-medium flex items-center gap-1 ${style.bg} ${style.text}`}
      >
        <Icon className="w-3 h-3" />
        {status.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())}
      </span>
    );
  };

  const getTypeBadge = (type: string) => {
    const colors: Record<string, string> = {
      rate_table: "bg-blue-100 text-blue-700",
      rating_factor: "bg-purple-100 text-purple-700",
      pricing_model: "bg-cyan-100 text-cyan-700",
    };
    return (
      <span
        className={`px-2 py-0.5 rounded text-xs font-medium ${colors[type] || "bg-gray-100 text-gray-700"}`}
      >
        {type.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())}
      </span>
    );
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <div className="flex-1 lg:ml-0">
        <div className="lg:hidden bg-white border-b border-gray-200 p-4">
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
                <History className="w-4 h-4 text-white" />
              </div>
              <h1 className="text-lg font-bold text-gray-900">InsureCore</h1>
            </div>
          </div>
        </div>
        <div className="p-4 lg:p-6">
          <div className="mb-8">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
              <div>
                <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">
                  Versioning & Approvals
                </h1>
                <p className="text-gray-600 mt-1">
                  Manage pricing versions, approvals, and release scheduling
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-3">
                <button className="px-4 py-2.5 bg-white border border-gray-200 rounded-lg text-gray-700 font-medium hover:bg-gray-50 flex items-center gap-2">
                  <Filter className="w-4 h-4" />
                  <span>Filter</span>
                </button>
                <button className="px-4 py-2.5 bg-white border border-gray-200 rounded-lg text-gray-700 font-medium hover:bg-gray-50 flex items-center gap-2">
                  <Download className="w-4 h-4" />
                  <span>Export</span>
                </button>
                <button className="px-4 py-2.5 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 flex items-center gap-2">
                  <Plus className="w-4 h-4" />
                  <span>New Version</span>
                </button>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              <div className="bg-white rounded-xl border border-gray-200 p-5 hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm font-medium text-gray-600">
                    Pending Approval
                  </span>
                  <div className="w-10 h-10 bg-amber-50 rounded-lg flex items-center justify-center">
                    <Clock className="w-5 h-5 text-amber-600" />
                  </div>
                </div>
                <span className="text-3xl font-bold text-gray-900">
                  {stats.pendingApproval}
                </span>
                <p className="text-xs text-gray-500 mt-1">Awaiting review</p>
              </div>
              <div className="bg-white rounded-xl border border-gray-200 p-5 hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm font-medium text-gray-600">
                    Published (MTD)
                  </span>
                  <div className="w-10 h-10 bg-green-50 rounded-lg flex items-center justify-center">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                  </div>
                </div>
                <span className="text-3xl font-bold text-gray-900">
                  {stats.publishedThisMonth}
                </span>
                <p className="text-xs text-gray-500 mt-1">This month</p>
              </div>
              <div className="bg-white rounded-xl border border-gray-200 p-5 hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm font-medium text-gray-600">
                    Drafts
                  </span>
                  <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
                    <FileText className="w-5 h-5 text-blue-600" />
                  </div>
                </div>
                <span className="text-3xl font-bold text-gray-900">
                  {stats.drafts}
                </span>
                <p className="text-xs text-gray-500 mt-1">In progress</p>
              </div>
              <div className="bg-white rounded-xl border border-gray-200 p-5 hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm font-medium text-gray-600">
                    Total Versions
                  </span>
                  <div className="w-10 h-10 bg-purple-50 rounded-lg flex items-center justify-center">
                    <History className="w-5 h-5 text-purple-600" />
                  </div>
                </div>
                <span className="text-3xl font-bold text-gray-900">
                  {stats.totalVersions}
                </span>
                <p className="text-xs text-gray-500 mt-1">All time</p>
              </div>
            </div>
            <div className="bg-white rounded-xl border border-gray-200 p-4 mb-6">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search versions..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="flex gap-3">
                  <select
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                    className="px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                  >
                    <option value="all">All Status</option>
                    <option value="draft">Draft</option>
                    <option value="pending_approval">Pending Approval</option>
                    <option value="approved">Approved</option>
                    <option value="rejected">Rejected</option>
                    <option value="published">Published</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Version
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Type
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Created By
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Created Date
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Effective Date
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Changes
                      </th>
                      <th className="px-6 py-4 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {filteredVersions.map((version) => (
                      <tr
                        key={version.id}
                        className="hover:bg-gray-50 transition-colors"
                      >
                        <td className="px-6 py-4">
                          <div>
                            <span className="text-sm font-medium text-gray-900 block">
                              {version.name}
                            </span>
                            <span className="text-xs text-gray-500">
                              v{version.version} • {version.id}
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          {getTypeBadge(version.type)}
                        </td>
                        <td className="px-6 py-4">
                          {getStatusBadge(version.status)}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-600">
                          {version.createdBy}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-600">
                          {version.createdDate}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-600">
                          {version.effectiveDate || "-"}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-600">
                          {version.changes} changes
                        </td>
                        <td className="px-6 py-4 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <button
                              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                              title="View"
                            >
                              <Eye className="w-4 h-4 text-gray-500" />
                            </button>
                            {version.status === "draft" && (
                              <button
                                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                                title="Submit for Approval"
                              >
                                <Send className="w-4 h-4 text-blue-500" />
                              </button>
                            )}
                            <button
                              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                              title="Edit"
                            >
                              <Edit className="w-4 h-4 text-gray-500" />
                            </button>
                            <button
                              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                              title="History"
                            >
                              <History className="w-4 h-4 text-gray-500" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
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

export default PricingVersioning;
