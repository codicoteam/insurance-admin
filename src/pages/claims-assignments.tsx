import { useState } from "react";
import { UserPlus, Search, Menu, Shield } from "lucide-react";

interface Assignment {
  id: string;
  claimNumber: string;
  policyholder: string;
  type: string;
  amount: number;
  assignedTo: string;
  assignedDate: string;
  status: "active" | "completed" | "overdue";
  dueDate: string;
}

const ClaimsAssignmentsScreen = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const assignments: Assignment[] = [
    {
      id: "1",
      claimNumber: "CLM384756",
      policyholder: "John Doe",
      type: "Auto Collision",
      amount: 3500,
      assignedTo: "Sarah Johnson",
      assignedDate: "2024-10-02",
      status: "active",
      dueDate: "2024-10-09",
    },
    {
      id: "2",
      claimNumber: "CLM492831",
      policyholder: "Emily Smith",
      type: "Property Damage",
      amount: 8500,
      assignedTo: "Michael Chen",
      assignedDate: "2024-10-03",
      status: "overdue",
      dueDate: "2024-10-07",
    },
    {
      id: "3",
      claimNumber: "CLM583947",
      policyholder: "Michael Johnson",
      type: "Theft",
      amount: 5200,
      assignedTo: "David Williams",
      assignedDate: "2024-10-05",
      status: "active",
      dueDate: "2024-10-12",
    },
    {
      id: "4",
      claimNumber: "CLM672345",
      policyholder: "Sarah Williams",
      type: "Auto Fire",
      amount: 12500,
      assignedTo: "Jennifer Davis",
      assignedDate: "2024-10-04",
      status: "completed",
      dueDate: "2024-10-08",
    },
    {
      id: "5",
      claimNumber: "CLM783456",
      policyholder: "Robert Brown",
      type: "Medical",
      amount: 2800,
      assignedTo: "Sarah Johnson",
      assignedDate: "2024-10-06",
      status: "active",
      dueDate: "2024-10-13",
    },
    {
      id: "6",
      claimNumber: "CLM894567",
      policyholder: "Jennifer Davis",
      type: "Auto Collision",
      amount: 4200,
      assignedTo: "Michael Chen",
      assignedDate: "2024-10-07",
      status: "active",
      dueDate: "2024-10-14",
    },
  ];

  const getStatusColor = (s: string) =>
    ({
      active: "bg-green-100 text-green-700",
      completed: "bg-blue-100 text-blue-700",
      overdue: "bg-red-100 text-red-700",
    })[s] || "bg-gray-100 text-gray-700";

  const filteredAssignments = assignments.filter(
    (a) =>
      a.claimNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      a.policyholder.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div className="flex min-h-screen bg-gray-50">
      <div className="flex-1 lg:ml-0">
        <div className="lg:hidden bg-white border-b border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => setSidebarOpen(true)}
              className="p-2 rounded-lg hover:bg-gray-100"
            >
              <Menu className="w-6 h-6 text-gray-600" />
            </button>
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-blue-800 rounded-lg flex items-center justify-center">
                <Shield className="w-4 h-4 text-white" />
              </div>
              <h1 className="text-lg font-bold text-gray-900">InsureCore</h1>
            </div>
          </div>
        </div>
        <div className="bg-white border-b border-gray-200 p-6">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-1">
                  Claims Assignments
                </h1>
                <p className="text-gray-600">
                  Assign and manage claims to adjusters
                </p>
              </div>
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium flex items-center gap-2">
                <UserPlus className="w-4 h-4" />
                Assign Claims
              </button>
            </div>
            <div className="grid grid-cols-4 gap-4">
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                <p className="text-gray-600 text-sm mb-1">Total Assigned</p>
                <p className="text-3xl font-bold text-gray-900">
                  {assignments.length}
                </p>
              </div>
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <p className="text-green-600 text-sm mb-1">Active</p>
                <p className="text-3xl font-bold text-green-700">
                  {assignments.filter((a) => a.status === "active").length}
                </p>
              </div>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <p className="text-blue-600 text-sm mb-1">Completed</p>
                <p className="text-3xl font-bold text-blue-700">
                  {assignments.filter((a) => a.status === "completed").length}
                </p>
              </div>
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <p className="text-red-600 text-sm mb-1">Overdue</p>
                <p className="text-3xl font-bold text-red-700">
                  {assignments.filter((a) => a.status === "overdue").length}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-white border-b border-gray-200 p-4">
          <div className="max-w-7xl mx-auto">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
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
                      Assigned To
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
                  {filteredAssignments.map((assignment) => (
                    <tr
                      key={assignment.id}
                      className="border-b border-gray-100 hover:bg-gray-50"
                    >
                      <td className="py-4 px-4 text-blue-600 font-medium">
                        {assignment.claimNumber}
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center font-semibold">
                            {assignment.policyholder
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </div>
                          <span>{assignment.policyholder}</span>
                        </div>
                      </td>
                      <td className="py-4 px-4 text-gray-600">
                        {assignment.type}
                      </td>
                      <td className="py-4 px-4 font-semibold">
                        ${assignment.amount.toLocaleString()}
                      </td>
                      <td className="py-4 px-4">{assignment.assignedTo}</td>
                      <td className="py-4 px-4">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium capitalize ${getStatusColor(assignment.status)}`}
                        >
                          {assignment.status}
                        </span>
                      </td>
                      <td className="py-4 px-4">
                        <button className="px-3 py-1 text-sm font-medium text-blue-600 hover:bg-blue-50 rounded-lg">
                          Reassign
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

export default ClaimsAssignmentsScreen;
