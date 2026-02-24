import { useState } from "react";
import { Search, Menu, Shield } from "lucide-react";

interface QueueClaim {
  id: string;
  claimNumber: string;
  policyholder: string;
  type: string;
  daysInQueue: number;
  amount: number;
  assignedTo: string | null;
  priority: string;
}

const ClaimsQueuesScreen = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const claims: QueueClaim[] = [
    {
      id: "1",
      claimNumber: "CLM384756",
      policyholder: "John Doe",
      type: "Auto Collision",
      daysInQueue: 1,
      amount: 3500,
      assignedTo: null,
      priority: "medium",
    },
    {
      id: "2",
      claimNumber: "CLM492831",
      policyholder: "Emily Smith",
      type: "Property Damage",
      daysInQueue: 3,
      amount: 8500,
      assignedTo: "Sarah Johnson",
      priority: "high",
    },
    {
      id: "3",
      claimNumber: "CLM583947",
      policyholder: "Michael Johnson",
      type: "Theft",
      daysInQueue: 5,
      amount: 5200,
      assignedTo: null,
      priority: "urgent",
    },
    {
      id: "4",
      claimNumber: "CLM672345",
      policyholder: "Sarah Williams",
      type: "Auto Fire",
      daysInQueue: 2,
      amount: 12500,
      assignedTo: "Michael Chen",
      priority: "urgent",
    },
    {
      id: "5",
      claimNumber: "CLM783456",
      policyholder: "Robert Brown",
      type: "Medical",
      daysInQueue: 7,
      amount: 2800,
      assignedTo: null,
      priority: "high",
    },
    {
      id: "6",
      claimNumber: "CLM894567",
      policyholder: "Jennifer Davis",
      type: "Auto Collision",
      daysInQueue: 1,
      amount: 4200,
      assignedTo: null,
      priority: "low",
    },
  ];

  const getPriorityColor = (p: string) =>
    ({
      low: "text-gray-500",
      medium: "text-blue-500",
      high: "text-orange-500",
      urgent: "text-red-500",
    })[p] || "text-gray-500";
  const getDaysColor = (d: number) =>
    d <= 2 ? "text-green-600" : d <= 5 ? "text-yellow-600" : "text-red-600";

  const filteredClaims = claims.filter(
    (c) =>
      c.claimNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.policyholder.toLowerCase().includes(searchTerm.toLowerCase()),
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
            <h1 className="text-3xl font-bold text-gray-900 mb-1">
              Claims Queues
            </h1>
            <p className="text-gray-600">
              Manage and route claims through processing queues
            </p>
          </div>
        </div>
        <div className="bg-white border-b border-gray-200 p-4">
          <div className="max-w-7xl mx-auto">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search claims..."
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
                      Days
                    </th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">
                      Amount
                    </th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">
                      Priority
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
                      className="border-b border-gray-100 hover:bg-gray-50"
                    >
                      <td className="py-4 px-4 text-blue-600 font-medium">
                        {claim.claimNumber}
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center font-semibold">
                            {claim.policyholder
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </div>
                          <span>{claim.policyholder}</span>
                        </div>
                      </td>
                      <td className="py-4 px-4 text-gray-600">{claim.type}</td>
                      <td className="py-4 px-4">
                        <span className={getDaysColor(claim.daysInQueue)}>
                          {claim.daysInQueue} days
                        </span>
                      </td>
                      <td className="py-4 px-4 font-semibold">
                        ${claim.amount.toLocaleString()}
                      </td>
                      <td className="py-4 px-4">
                        <span className={getPriorityColor(claim.priority)}>
                          {claim.priority}
                        </span>
                      </td>
                      <td className="py-4 px-4">
                        <button className="px-3 py-1 text-sm font-medium text-blue-600 hover:bg-blue-50 rounded-lg">
                          Assign
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

export default ClaimsQueuesScreen;
