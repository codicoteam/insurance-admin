import { useState } from "react";
import { Search, Menu, Shield, DollarSign, ArrowRightLeft } from "lucide-react";

interface Recovery {
  id: string;
  claimNumber: string;
  policyholder: string;
  type: "subrogation" | "deductible" | "overpayment" | "third_party";
  amount: number;
  status: "identified" | "pending" | "recovered" | "denied";
  probability: number;
  responsibleParty: string;
}

const ClaimsRecoveriesScreen = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const recoveries: Recovery[] = [
    {
      id: "1",
      claimNumber: "CLM384756",
      policyholder: "John Doe",
      type: "subrogation",
      amount: 3500,
      status: "pending",
      probability: 75,
      responsibleParty: "At-Fault Driver Insurance",
    },
    {
      id: "2",
      claimNumber: "CLM492831",
      policyholder: "Emily Smith",
      type: "deductible",
      amount: 500,
      status: "identified",
      probability: 95,
      responsibleParty: "Policyholder",
    },
    {
      id: "3",
      claimNumber: "CLM583947",
      policyholder: "Michael Johnson",
      type: "overpayment",
      amount: 1200,
      status: "recovered",
      probability: 100,
      responsibleParty: "Policyholder",
    },
    {
      id: "4",
      claimNumber: "CLM672345",
      policyholder: "Sarah Williams",
      type: "third_party",
      amount: 8500,
      status: "pending",
      probability: 60,
      responsibleParty: "Construction Company",
    },
    {
      id: "5",
      claimNumber: "CLM783456",
      policyholder: "Robert Brown",
      type: "subrogation",
      amount: 2800,
      status: "identified",
      probability: 80,
      responsibleParty: "At-Fault Driver Insurance",
    },
  ];

  const getStatusColor = (s: string) =>
    ({
      identified: "bg-yellow-100 text-yellow-700",
      pending: "bg-blue-100 text-blue-700",
      recovered: "bg-green-100 text-green-700",
      denied: "bg-red-100 text-red-700",
    })[s] || "bg-gray-100 text-gray-700";
  const getTypeColor = (t: string) =>
    ({
      subrogation: "bg-purple-100 text-purple-700",
      deductible: "bg-blue-100 text-blue-700",
      overpayment: "bg-green-100 text-green-700",
      third_party: "bg-orange-100 text-orange-700",
    })[t] || "bg-gray-100 text-gray-700";

  const filteredRecoveries = recoveries.filter(
    (r) =>
      r.claimNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.policyholder.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const totalIdentified = recoveries
    .filter((r) => r.status === "identified")
    .reduce((sum, r) => sum + r.amount, 0);
  const totalPending = recoveries
    .filter((r) => r.status === "pending")
    .reduce((sum, r) => sum + r.amount, 0);
  const totalRecovered = recoveries
    .filter((r) => r.status === "recovered")
    .reduce((sum, r) => sum + r.amount, 0);

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
              Recoveries & Subrogation
            </h1>
            <p className="text-gray-600">
              Track subrogation, deductible, and overpayment recoveries
            </p>
          </div>
        </div>
        <div className="bg-white border-b border-gray-200 p-6">
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <DollarSign className="w-5 h-5 text-yellow-600" />
                <span className="text-yellow-600 font-medium">Identified</span>
              </div>
              <p className="text-3xl font-bold text-yellow-700">
                ${totalIdentified.toLocaleString()}
              </p>
            </div>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <ArrowRightLeft className="w-5 h-5 text-blue-600" />
                <span className="text-blue-600 font-medium">Pending</span>
              </div>
              <p className="text-3xl font-bold text-blue-700">
                ${totalPending.toLocaleString()}
              </p>
            </div>
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <DollarSign className="w-5 h-5 text-green-600" />
                <span className="text-green-600 font-medium">Recovered</span>
              </div>
              <p className="text-3xl font-bold text-green-700">
                ${totalRecovered.toLocaleString()}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white border-b border-gray-200 p-4">
          <div className="max-w-7xl mx-auto">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search recoveries..."
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
                      Responsible Party
                    </th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">
                      Probability
                    </th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredRecoveries.map((recovery) => (
                    <tr
                      key={recovery.id}
                      className="border-b border-gray-100 hover:bg-gray-50"
                    >
                      <td className="py-4 px-4 text-blue-600 font-medium">
                        {recovery.claimNumber}
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-sm font-semibold">
                            {recovery.policyholder
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </div>
                          <span>{recovery.policyholder}</span>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium capitalize ${getTypeColor(recovery.type)}`}
                        >
                          {recovery.type.replace(/_/g, " ")}
                        </span>
                      </td>
                      <td className="py-4 px-4 font-semibold">
                        ${recovery.amount.toLocaleString()}
                      </td>
                      <td className="py-4 px-4 text-gray-600">
                        {recovery.responsibleParty}
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-2">
                          <div className="w-16 h-2 bg-gray-200 rounded-full">
                            <div
                              className={`h-2 rounded-full ${recovery.probability >= 80 ? "bg-green-500" : recovery.probability >= 60 ? "bg-yellow-500" : "bg-red-500"}`}
                              style={{ width: `${recovery.probability}%` }}
                            />
                          </div>
                          <span className="text-sm">
                            {recovery.probability}%
                          </span>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium capitalize ${getStatusColor(recovery.status)}`}
                        >
                          {recovery.status}
                        </span>
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

export default ClaimsRecoveriesScreen;
