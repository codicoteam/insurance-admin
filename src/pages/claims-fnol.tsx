import { useState } from "react";
import { Search, Filter, Download, Plus, Menu, Shield } from "lucide-react";
import InsuranceSidebar from "../Components/sidebar";

interface Claim {
  id: string;
  claimNumber: string;
  policyNumber: string;
  policyholder: string;
  email: string;
  type: string;
  incidentDate: string;
  reportedDate: string;
  amountClaimed: number;
  status: "new" | "assigned" | "in_review" | "pending_info";
  priority: "low" | "medium" | "high" | "urgent";
}

const FNOLIntakeScreen = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const claims: Claim[] = [
    {
      id: "1",
      claimNumber: "CLM384756",
      policyNumber: "POL-2024-001",
      policyholder: "John Doe",
      email: "john.doe@example.com",
      type: "Auto Collision",
      incidentDate: "2024-10-01",
      reportedDate: "2024-10-02",
      amountClaimed: 3500,
      status: "new",
      priority: "medium",
    },
    {
      id: "2",
      claimNumber: "CLM492831",
      policyNumber: "POL-2024-087",
      policyholder: "Emily Smith",
      email: "emily.smith@example.com",
      type: "Property Damage",
      incidentDate: "2024-10-08",
      reportedDate: "2024-10-08",
      amountClaimed: 8500,
      status: "assigned",
      priority: "high",
    },
    {
      id: "3",
      claimNumber: "CLM583947",
      policyNumber: "POL-2024-156",
      policyholder: "Michael Johnson",
      email: "michael.j@example.com",
      type: "Theft",
      incidentDate: "2024-10-10",
      reportedDate: "2024-10-11",
      amountClaimed: 5200,
      status: "in_review",
      priority: "urgent",
    },
    {
      id: "4",
      claimNumber: "CLM672345",
      policyNumber: "POL-2024-234",
      policyholder: "Sarah Williams",
      email: "sarah.w@example.com",
      type: "Auto Fire",
      incidentDate: "2024-10-12",
      reportedDate: "2024-10-12",
      amountClaimed: 12500,
      status: "pending_info",
      priority: "urgent",
    },
  ];

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      new: "bg-blue-100 text-blue-700",
      assigned: "bg-purple-100 text-purple-700",
      in_review: "bg-yellow-100 text-yellow-700",
      pending_info: "bg-orange-100 text-orange-700",
    };
    return colors[status] || "bg-gray-100 text-gray-700";
  };

  const getPriorityColor = (priority: string) => {
    const colors: Record<string, string> = {
      low: "text-gray-500",
      medium: "text-blue-500",
      high: "text-orange-500",
      urgent: "text-red-500",
    };
    return colors[priority] || "text-gray-500";
  };

  const stats = {
    total: claims.length,
    new: claims.filter((c) => c.status === "new").length,
    assigned: claims.filter((c) => c.status === "assigned").length,
    urgent: claims.filter((c) => c.priority === "urgent").length,
  };

  const filteredClaims = claims.filter((claim) => {
    const matchesSearch =
      claim.claimNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      claim.policyholder.toLowerCase().includes(searchTerm.toLowerCase()) ||
      claim.policyNumber.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || claim.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="flex min-h-screen bg-gray-50">
      <InsuranceSidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />
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
                <Shield className="w-4 h-4 text-white" />
              </div>
              <div>
                <h1 className="text-lg font-bold text-gray-900">InsureCore</h1>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-white border-b border-gray-200 p-6">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-1">
                  FNOL Intake
                </h1>
                <p className="text-gray-600">
                  First Notice of Loss - New claim intake and registration
                </p>
              </div>
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center gap-2">
                <Plus className="w-4 h-4" />
                New Claim
              </button>
            </div>
            <div className="grid grid-cols-4 gap-4">
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                <p className="text-gray-600 text-sm mb-1">Total New Claims</p>
                <p className="text-3xl font-bold text-gray-900">
                  {stats.total}
                </p>
              </div>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <p className="text-blue-600 text-sm mb-1">New (Unassigned)</p>
                <p className="text-3xl font-bold text-blue-700">{stats.new}</p>
              </div>
              <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                <p className="text-purple-600 text-sm mb-1">Assigned</p>
                <p className="text-3xl font-bold text-purple-700">
                  {stats.assigned}
                </p>
              </div>
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <p className="text-red-600 text-sm mb-1">Urgent Priority</p>
                <p className="text-3xl font-bold text-red-700">
                  {stats.urgent}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-white border-b border-gray-200 p-4">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                />
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <Filter className="w-4 h-4 text-gray-500" />
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none bg-white"
                  >
                    <option value="all">All Status</option>
                    <option value="new">New</option>
                    <option value="assigned">Assigned</option>
                    <option value="in_review">In Review</option>
                    <option value="pending_info">Pending Info</option>
                  </select>
                </div>
                <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2">
                  <Download className="w-4 h-4" />
                  Export
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto p-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-200">
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">
                      Claim #
                    </th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">
                      Policyholder
                    </th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">
                      Type
                    </th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">
                      Amount
                    </th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">
                      Priority
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
                  {filteredClaims.map((claim) => (
                    <tr
                      key={claim.id}
                      className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
                    >
                      <td className="py-4 px-4">
                        <span className="text-blue-600 font-medium">
                          {claim.claimNumber}
                        </span>
                        <p className="text-xs text-gray-500">
                          {claim.policyNumber}
                        </p>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-700 font-semibold">
                            {claim.policyholder
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </div>
                          <div>
                            <p className="font-medium text-gray-900">
                              {claim.policyholder}
                            </p>
                            <p className="text-xs text-gray-500">
                              {claim.email}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-4 text-gray-600">{claim.type}</td>
                      <td className="py-4 px-4 font-semibold text-gray-900">
                        ${claim.amountClaimed.toLocaleString()}
                      </td>
                      <td className="py-4 px-4">
                        <span
                          className={`font-medium capitalize ${getPriorityColor(claim.priority)}`}
                        >
                          {claim.priority}
                        </span>
                      </td>
                      <td className="py-4 px-4">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium capitalize ${getStatusColor(claim.status)}`}
                        >
                          {claim.status.replace("_", " ")}
                        </span>
                      </td>
                      <td className="py-4 px-4">
                        <button className="px-3 py-1 text-sm font-medium text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                          Process
                        </button>
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
  );
};

export default FNOLIntakeScreen;
