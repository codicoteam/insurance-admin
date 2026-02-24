import { useState } from "react";
import {
  Search,
  Filter,
  Download,
  Plus,
  Edit,
  Trash2,
  BookOpen,
  Shield,
  CheckCircle,
  Clock,
  Eye,
  Lock,
} from "lucide-react";

interface Guideline {
  id: string;
  title: string;
  category: string;
  authorityLevel: string;
  version: string;
  status: "active" | "draft" | "archived";
  lastModified: string;
  approvedBy: string;
}

const UnderwritingGuidelines = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  const guidelines: Guideline[] = [
    {
      id: "UWG-001",
      title: "Life Insurance Underwriting Standards",
      category: "Life Insurance",
      authorityLevel: "Senior Underwriter",
      version: "v3.2",
      status: "active",
      lastModified: "2024-10-15",
      approvedBy: "John Smith",
    },
    {
      id: "UWG-002",
      title: "Auto Insurance Risk Assessment",
      category: "Auto Insurance",
      authorityLevel: "Lead Underwriter",
      version: "v2.1",
      status: "active",
      lastModified: "2024-10-18",
      approvedBy: "Sarah Johnson",
    },
    {
      id: "UWG-003",
      title: "Property Coverage Guidelines",
      category: "Property",
      authorityLevel: "Senior Underwriter",
      version: "v4.0",
      status: "active",
      lastModified: "2024-10-20",
      approvedBy: "Mike Davis",
    },
    {
      id: "UWG-004",
      title: "Commercial Liability Standards",
      category: "Commercial",
      authorityLevel: "Chief Underwriter",
      version: "v1.5",
      status: "draft",
      lastModified: "2024-10-22",
      approvedBy: "Pending",
    },
    {
      id: "UWG-005",
      title: "Health Insurance Medical Review",
      category: "Health",
      authorityLevel: "Lead Underwriter",
      version: "v2.8",
      status: "active",
      lastModified: "2024-10-19",
      approvedBy: "Lisa Anderson",
    },
    {
      id: "UWG-006",
      title: "Workers Comp Underwriting Manual",
      category: "Workers Comp",
      authorityLevel: "Senior Underwriter",
      version: "v3.0",
      status: "archived",
      lastModified: "2024-09-30",
      approvedBy: "Robert Brown",
    },
  ];

  const stats = {
    activeGuidelines: 4,
    draftGuidelines: 1,
    totalVersions: 18,
    lastUpdated: "2 days ago",
  };

  const filteredGuidelines = guidelines.filter((guideline) => {
    const matchesSearch =
      guideline.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      guideline.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      filterStatus === "all" || guideline.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status: string) => {
    const styles: Record<string, string> = {
      active: "bg-green-100 text-green-800 border-green-200",
      draft: "bg-amber-100 text-amber-800 border-amber-200",
      archived: "bg-gray-100 text-gray-800 border-gray-200",
    };
    return (
      <span
        className={`px-3 py-1 rounded-full text-xs font-medium border ${styles[status]}`}
      >
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  const getAuthorityBadge = (level: string) => {
    const styles: Record<string, string> = {
      "Chief Underwriter": "bg-purple-100 text-purple-800 border-purple-200",
      "Senior Underwriter": "bg-blue-100 text-blue-800 border-blue-200",
      "Lead Underwriter": "bg-indigo-100 text-indigo-800 border-indigo-200",
      Underwriter: "bg-gray-100 text-gray-800 border-gray-200",
    };
    return (
      <span
        className={`px-3 py-1 rounded-full text-xs font-medium border ${styles[level] || styles.Underwriter}`}
      >
        {level}
      </span>
    );
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <div className="flex-1">
        {/* Page Content */}
        <div className="p-4 lg:p-6">
          {/* Header */}
          <div className="mb-8">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
              <div>
                <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">
                  Guidelines & Authority
                </h1>
                <p className="text-gray-600 mt-1">
                  Manage underwriting guidelines and authority levels
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <button className="px-4 py-2.5 bg-white border border-gray-200 rounded-lg text-gray-700 font-medium hover:bg-gray-50 hover:border-gray-300 transition-all flex items-center gap-2 shadow-sm">
                  <Filter className="w-4 h-4" />
                  <span>Filter</span>
                </button>
                <button className="px-4 py-2.5 bg-white border border-gray-200 rounded-lg text-gray-700 font-medium hover:bg-gray-50 hover:border-gray-300 transition-all flex items-center gap-2 shadow-sm">
                  <Download className="w-4 h-4" />
                  <span>Export</span>
                </button>
                <button className="px-4 py-2.5 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 transition-all shadow-lg hover:shadow-xl flex items-center gap-2">
                  <Plus className="w-4 h-4" />
                  <span>New Guideline</span>
                </button>
              </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              <div className="bg-white rounded-xl border border-gray-200 p-5 hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm font-medium text-gray-600">
                    Active Guidelines
                  </span>
                  <div className="w-10 h-10 bg-green-50 rounded-lg flex items-center justify-center">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                  </div>
                </div>
                <span className="text-3xl font-bold text-gray-900">
                  {stats.activeGuidelines}
                </span>
                <p className="text-xs text-gray-500 mt-1">Currently in use</p>
              </div>

              <div className="bg-white rounded-xl border border-gray-200 p-5 hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm font-medium text-gray-600">
                    Draft Guidelines
                  </span>
                  <div className="w-10 h-10 bg-amber-50 rounded-lg flex items-center justify-center">
                    <Clock className="w-5 h-5 text-amber-600" />
                  </div>
                </div>
                <span className="text-3xl font-bold text-gray-900">
                  {stats.draftGuidelines}
                </span>
                <p className="text-xs text-gray-500 mt-1">Pending approval</p>
              </div>

              <div className="bg-white rounded-xl border border-gray-200 p-5 hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm font-medium text-gray-600">
                    Total Versions
                  </span>
                  <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
                    <BookOpen className="w-5 h-5 text-blue-600" />
                  </div>
                </div>
                <span className="text-3xl font-bold text-gray-900">
                  {stats.totalVersions}
                </span>
                <p className="text-xs text-gray-500 mt-1">
                  Across all guidelines
                </p>
              </div>

              <div className="bg-white rounded-xl border border-gray-200 p-5 hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm font-medium text-gray-600">
                    Last Updated
                  </span>
                  <div className="w-10 h-10 bg-purple-50 rounded-lg flex items-center justify-center">
                    <Shield className="w-5 h-5 text-purple-600" />
                  </div>
                </div>
                <span className="text-3xl font-bold text-gray-900">2d</span>
                <p className="text-xs text-gray-500 mt-1">
                  Guidelines modified
                </p>
              </div>
            </div>

            {/* Filters */}
            <div className="bg-white rounded-xl border border-gray-200 p-4 mb-6">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search guidelines..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div className="flex gap-3">
                  <select
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                    className="px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                  >
                    <option value="all">All Status</option>
                    <option value="active">Active</option>
                    <option value="draft">Draft</option>
                    <option value="archived">Archived</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Guidelines Table */}
            <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Guideline ID
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Title
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Category
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Authority Level
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Version
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Approved By
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Last Modified
                      </th>
                      <th className="px-6 py-4 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {filteredGuidelines.map((guideline) => (
                      <tr
                        key={guideline.id}
                        className="hover:bg-gray-50 transition-colors"
                      >
                        <td className="px-6 py-4 text-sm font-medium text-gray-900">
                          {guideline.id}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-900">
                          {guideline.title}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-600">
                          {guideline.category}
                        </td>
                        <td className="px-6 py-4">
                          {getAuthorityBadge(guideline.authorityLevel)}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-600">
                          {guideline.version}
                        </td>
                        <td className="px-6 py-4">
                          {getStatusBadge(guideline.status)}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-600">
                          {guideline.approvedBy}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-600">
                          {guideline.lastModified}
                        </td>
                        <td className="px-6 py-4 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <button
                              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                              title="View"
                            >
                              <Eye className="w-4 h-4 text-gray-500" />
                            </button>
                            <button
                              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                              title="Edit"
                            >
                              <Edit className="w-4 h-4 text-gray-500" />
                            </button>
                            <button
                              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                              title="Permissions"
                            >
                              <Lock className="w-4 h-4 text-gray-500" />
                            </button>
                            <button
                              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                              title="Delete"
                            >
                              <Trash2 className="w-4 h-4 text-red-500" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {filteredGuidelines.length === 0 && (
                <div className="p-12 text-center">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Search className="w-8 h-8 text-gray-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    No guidelines found
                  </h3>
                  <p className="text-gray-600">
                    Try adjusting your search or filter criteria
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UnderwritingGuidelines;
