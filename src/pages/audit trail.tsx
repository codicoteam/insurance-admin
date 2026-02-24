import { useState } from "react";
import {
  Search,
  Filter,
  Download,
  Calendar,
  User,
  FileText,
  Clock,
  ChevronDown,
  Menu,
  Shield,
} from "lucide-react";

const AuditTrailScreen = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterUser, setFilterUser] = useState("all");
  const [filterAction, setFilterAction] = useState("all");
  const [dateRange, setDateRange] = useState("7days");

  const auditLogs = [
    {
      id: 1,
      timestamp: "2024-10-19 14:32:15",
      user: "John Smith",
      userId: "JS001",
      action: "Policy Updated",
      module: "Policy Management",
      details:
        "Updated policy #POL-2024-5678 - Premium changed from $450 to $520",
      ipAddress: "192.168.1.105",
      status: "success",
    },
    {
      id: 2,
      timestamp: "2024-10-19 13:45:22",
      user: "Sarah Johnson",
      userId: "SJ002",
      action: "Claim Approved",
      module: "Claims Processing",
      details: "Approved claim #CLM-2024-9876 for amount $2,500",
      ipAddress: "192.168.1.112",
      status: "success",
    },
    {
      id: 3,
      timestamp: "2024-10-19 12:18:44",
      user: "Mike Davis",
      userId: "MD003",
      action: "User Access Modified",
      module: "User Management",
      details: "Changed role for user Emma Wilson from Agent to Senior Agent",
      ipAddress: "192.168.1.89",
      status: "success",
    },
    {
      id: 4,
      timestamp: "2024-10-19 11:05:33",
      user: "Admin System",
      userId: "SYS000",
      action: "Login Failed",
      module: "Authentication",
      details:
        "Failed login attempt for user account: robert.brown@insurance.com",
      ipAddress: "192.168.1.156",
      status: "warning",
    },
    {
      id: 5,
      timestamp: "2024-10-19 10:22:11",
      user: "Lisa Anderson",
      userId: "LA004",
      action: "Document Uploaded",
      module: "Document Management",
      details: "Uploaded claim document: medical_report_2024.pdf (2.3 MB)",
      ipAddress: "192.168.1.98",
      status: "success",
    },
    {
      id: 6,
      timestamp: "2024-10-19 09:47:58",
      user: "John Smith",
      userId: "JS001",
      action: "Report Generated",
      module: "Reports",
      details: "Generated monthly premium collection report for September 2024",
      ipAddress: "192.168.1.105",
      status: "success",
    },
    {
      id: 7,
      timestamp: "2024-10-19 09:12:05",
      user: "Admin System",
      userId: "SYS000",
      action: "Data Export",
      module: "Data Management",
      details: "Exported customer database backup (encryption enabled)",
      ipAddress: "192.168.1.1",
      status: "success",
    },
    {
      id: 8,
      timestamp: "2024-10-18 16:55:42",
      user: "Sarah Johnson",
      userId: "SJ002",
      action: "Policy Cancelled",
      module: "Policy Management",
      details: "Cancelled policy #POL-2024-4321 - Customer request",
      ipAddress: "192.168.1.112",
      status: "warning",
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "success":
        return "bg-green-100 text-green-800 border-green-200";
      case "warning":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "error":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-blue-100 text-blue-800 border-blue-200";
    }
  };

  const filteredLogs = auditLogs.filter((log) => {
    const matchesSearch =
      log.details.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.action.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSearch;
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

        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50">
          <div className="max-w-7xl mx-auto p-4 sm:p-6">
            {/* Header */}
            <div className="mb-6 sm:mb-8">
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2">
                Audit Trail
              </h1>
              <p className="text-sm sm:text-base text-gray-600">
                Track and monitor all system activities and changes
              </p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6">
              <div className="bg-white rounded-lg shadow-sm border border-blue-100 p-3 sm:p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs sm:text-sm text-gray-600 mb-1">
                      Total Activities
                    </p>
                    <p className="text-lg sm:text-2xl font-bold text-blue-600">
                      1,247
                    </p>
                  </div>
                  <div className="bg-blue-100 p-2 sm:p-3 rounded-lg">
                    <FileText className="w-4 h-4 sm:w-6 sm:h-6 text-blue-600" />
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-sm border border-blue-100 p-3 sm:p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs sm:text-sm text-gray-600 mb-1">
                      Active Users
                    </p>
                    <p className="text-lg sm:text-2xl font-bold text-blue-600">
                      34
                    </p>
                  </div>
                  <div className="bg-green-100 p-2 sm:p-3 rounded-lg">
                    <User className="w-4 h-4 sm:w-6 sm:h-6 text-green-600" />
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-sm border border-blue-100 p-3 sm:p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs sm:text-sm text-gray-600 mb-1">
                      Today's Events
                    </p>
                    <p className="text-lg sm:text-2xl font-bold text-blue-600">
                      87
                    </p>
                  </div>
                  <div className="bg-purple-100 p-2 sm:p-3 rounded-lg">
                    <Clock className="w-4 h-4 sm:w-6 sm:h-6 text-purple-600" />
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-sm border border-blue-100 p-3 sm:p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs sm:text-sm text-gray-600 mb-1">
                      Warnings
                    </p>
                    <p className="text-lg sm:text-2xl font-bold text-blue-600">
                      3
                    </p>
                  </div>
                  <div className="bg-yellow-100 p-2 sm:p-3 rounded-lg">
                    <Filter className="w-4 h-4 sm:w-6 sm:h-6 text-yellow-600" />
                  </div>
                </div>
              </div>
            </div>

            {/* Filters and Search */}
            <div className="bg-white rounded-lg shadow-sm border border-blue-100 p-4 sm:p-6 mb-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 sm:w-5 sm:h-5" />
                  <input
                    type="text"
                    placeholder="Search activities..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-9 sm:pl-10 pr-4 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
                  />
                </div>

                <div className="relative">
                  <select
                    value={filterUser}
                    onChange={(e) => setFilterUser(e.target.value)}
                    className="w-full px-4 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none text-sm sm:text-base"
                  >
                    <option value="all">All Users</option>
                    <option value="john">John Smith</option>
                    <option value="sarah">Sarah Johnson</option>
                    <option value="mike">Mike Davis</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 sm:w-5 sm:h-5 pointer-events-none" />
                </div>

                <div className="relative">
                  <select
                    value={filterAction}
                    onChange={(e) => setFilterAction(e.target.value)}
                    className="w-full px-4 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none text-sm sm:text-base"
                  >
                    <option value="all">All Actions</option>
                    <option value="policy">Policy Changes</option>
                    <option value="claim">Claim Activities</option>
                    <option value="user">User Management</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 sm:w-5 sm:h-5 pointer-events-none" />
                </div>

                <div className="relative">
                  <select
                    value={dateRange}
                    onChange={(e) => setDateRange(e.target.value)}
                    className="w-full px-4 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none text-sm sm:text-base"
                  >
                    <option value="today">Today</option>
                    <option value="7days">Last 7 Days</option>
                    <option value="30days">Last 30 Days</option>
                    <option value="custom">Custom Range</option>
                  </select>
                  <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 sm:w-5 sm:h-5 pointer-events-none" />
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 mt-4">
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 text-sm sm:text-base">
                  <Filter className="w-4 h-4" />
                  Apply Filters
                </button>
                <button className="px-4 py-2 bg-white border border-blue-200 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors flex items-center justify-center gap-2 text-sm sm:text-base">
                  <Download className="w-4 h-4" />
                  Export
                </button>
              </div>
            </div>

            {/* Audit Log Table */}
            <div className="bg-white rounded-lg shadow-sm border border-blue-100 overflow-hidden">
              {/* Desktop Table */}
              <div className="hidden lg:block overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gradient-to-r from-blue-50 to-blue-100">
                    <tr>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                        Timestamp
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                        User
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                        Action
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                        Module
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                        Details
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                        IP Address
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {filteredLogs.map((log) => (
                      <tr
                        key={log.id}
                        className="hover:bg-blue-50 transition-colors"
                      >
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                          {log.timestamp}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                              <User className="w-4 h-4 text-blue-600" />
                            </div>
                            <div>
                              <div className="text-sm font-medium text-gray-900">
                                {log.user}
                              </div>
                              <div className="text-xs text-gray-500">
                                {log.userId}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="text-sm font-medium text-gray-900">
                            {log.action}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="px-3 py-1 bg-blue-100 text-blue-800 text-xs rounded-full font-medium">
                            {log.module}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-600 max-w-md">
                          {log.details}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                          {log.ipAddress}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span
                            className={`px-3 py-1 text-xs rounded-full font-medium border ${getStatusColor(log.status)}`}
                          >
                            {log.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Mobile Cards */}
              <div className="lg:hidden">
                {filteredLogs.map((log) => (
                  <div
                    key={log.id}
                    className="border-b border-gray-200 last:border-b-0 p-4 hover:bg-blue-50 transition-colors"
                  >
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex items-center">
                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                          <User className="w-4 h-4 text-blue-600" />
                        </div>
                        <div>
                          <div className="text-sm font-medium text-gray-900">
                            {log.user}
                          </div>
                          <div className="text-xs text-gray-500">
                            {log.userId}
                          </div>
                        </div>
                      </div>
                      <span
                        className={`px-2 py-1 text-xs rounded-full font-medium border ${getStatusColor(log.status)}`}
                      >
                        {log.status}
                      </span>
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-xs text-gray-500">Action:</span>
                        <span className="text-sm font-medium text-gray-900">
                          {log.action}
                        </span>
                      </div>

                      <div className="flex justify-between">
                        <span className="text-xs text-gray-500">Module:</span>
                        <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full font-medium">
                          {log.module}
                        </span>
                      </div>

                      <div className="flex justify-between">
                        <span className="text-xs text-gray-500">Time:</span>
                        <span className="text-xs text-gray-600">
                          {log.timestamp}
                        </span>
                      </div>

                      <div className="flex justify-between">
                        <span className="text-xs text-gray-500">IP:</span>
                        <span className="text-xs text-gray-600 font-mono">
                          {log.ipAddress}
                        </span>
                      </div>

                      <div>
                        <span className="text-xs text-gray-500 block mb-1">
                          Details:
                        </span>
                        <p className="text-sm text-gray-600 bg-gray-50 p-2 rounded text-xs">
                          {log.details}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Pagination */}
              <div className="bg-gradient-to-r from-blue-50 to-white px-4 sm:px-6 py-4 border-t border-blue-100">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="text-sm text-gray-600">
                    Showing <span className="font-medium">1</span> to{" "}
                    <span className="font-medium">8</span> of{" "}
                    <span className="font-medium">1,247</span> results
                  </div>
                  <div className="flex gap-2 flex-wrap justify-center">
                    <button className="px-3 py-2 border border-blue-200 rounded-lg text-sm text-gray-600 hover:bg-blue-50 transition-colors">
                      Previous
                    </button>
                    <button className="px-3 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700 transition-colors">
                      1
                    </button>
                    <button className="px-3 py-2 border border-blue-200 rounded-lg text-sm text-gray-600 hover:bg-blue-50 transition-colors">
                      2
                    </button>
                    <button className="px-3 py-2 border border-blue-200 rounded-lg text-sm text-gray-600 hover:bg-blue-50 transition-colors">
                      3
                    </button>
                    <button className="px-3 py-2 border border-blue-200 rounded-lg text-sm text-gray-600 hover:bg-blue-50 transition-colors">
                      Next
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuditTrailScreen;
