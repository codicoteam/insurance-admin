import { useState } from "react";
import {
  Search,
  Menu,
  Shield,
  DollarSign,
  CreditCard,
  CheckCircle,
  Clock,
  Calculator,
} from "lucide-react";

interface Payment {
  id: string;
  claimNumber: string;
  policyholder: string;
  type: "initial" | "supplemental" | "final" | "medical";
  amount: number;
  status: "pending" | "approved" | "processed" | "rejected";
  dateSubmitted: string;
  method: "check" | "ach" | "wire";
  payee: string;
}

const ClaimsPaymentsScreen = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const payments: Payment[] = [
    {
      id: "1",
      claimNumber: "CLM384756",
      policyholder: "John Doe",
      type: "initial",
      amount: 3500,
      status: "approved",
      dateSubmitted: "2024-10-05",
      method: "ach",
      payee: "John Doe",
    },
    {
      id: "2",
      claimNumber: "CLM492831",
      policyholder: "Emily Smith",
      type: "medical",
      amount: 1250,
      status: "pending",
      dateSubmitted: "2024-10-07",
      method: "check",
      payee: "MedCenter Clinic",
    },
    {
      id: "3",
      claimNumber: "CLM583947",
      policyholder: "Michael Johnson",
      type: "supplemental",
      amount: 800,
      status: "processed",
      dateSubmitted: "2024-10-03",
      method: "ach",
      payee: "Michael Johnson",
    },
    {
      id: "4",
      claimNumber: "CLM672345",
      policyholder: "Sarah Williams",
      type: "final",
      amount: 8500,
      status: "approved",
      dateSubmitted: "2024-10-06",
      method: "wire",
      payee: "Sarah Williams",
    },
    {
      id: "5",
      claimNumber: "CLM783456",
      policyholder: "Robert Brown",
      type: "initial",
      amount: 2800,
      status: "rejected",
      dateSubmitted: "2024-10-04",
      method: "ach",
      payee: "Robert Brown",
    },
  ];

  const getStatusColor = (s: string) =>
    ({
      pending: "bg-yellow-100 text-yellow-700",
      approved: "bg-blue-100 text-blue-700",
      processed: "bg-green-100 text-green-700",
      rejected: "bg-red-100 text-red-700",
    })[s] || "bg-gray-100 text-gray-700";
  const getTypeColor = (t: string) =>
    ({
      initial: "bg-blue-100 text-blue-700",
      supplemental: "bg-purple-100 text-purple-700",
      final: "bg-green-100 text-green-700",
      medical: "bg-orange-100 text-orange-700",
    })[t] || "bg-gray-100 text-gray-700";

  const filteredPayments = payments.filter(
    (p) =>
      p.claimNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.policyholder.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const totalPending = payments
    .filter((p) => p.status === "pending")
    .reduce((sum, p) => sum + p.amount, 0);
  const totalApproved = payments
    .filter((p) => p.status === "approved")
    .reduce((sum, p) => sum + p.amount, 0);
  const totalProcessed = payments
    .filter((p) => p.status === "processed")
    .reduce((sum, p) => sum + p.amount, 0);

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
              Claims Payments
            </h1>
            <p className="text-gray-600">Manage and track claim payments</p>
          </div>
        </div>
        <div className="bg-white border-b border-gray-200 p-6">
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <Clock className="w-5 h-5 text-yellow-600" />
                <span className="text-yellow-600 font-medium">Pending</span>
              </div>
              <p className="text-3xl font-bold text-yellow-700">
                ${totalPending.toLocaleString()}
              </p>
            </div>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle className="w-5 h-5 text-blue-600" />
                <span className="text-blue-600 font-medium">Approved</span>
              </div>
              <p className="text-3xl font-bold text-blue-700">
                ${totalApproved.toLocaleString()}
              </p>
            </div>
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <DollarSign className="w-5 h-5 text-green-600" />
                <span className="text-green-600 font-medium">Processed</span>
              </div>
              <p className="text-3xl font-bold text-green-700">
                ${totalProcessed.toLocaleString()}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white border-b border-gray-200 p-4">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-4 justify-between">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search payments..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="flex gap-2">
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium flex items-center gap-2">
                <Calculator className="w-4 h-4" />
                Calculate Payment
              </button>
              <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 font-medium flex items-center gap-2">
                <CreditCard className="w-4 h-4" />
                Process Payment
              </button>
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
                      Payee
                    </th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">
                      Method
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
                  {filteredPayments.map((payment) => (
                    <tr
                      key={payment.id}
                      className="border-b border-gray-100 hover:bg-gray-50"
                    >
                      <td className="py-4 px-4 text-blue-600 font-medium">
                        {payment.claimNumber}
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-sm font-semibold">
                            {payment.policyholder
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </div>
                          <span>{payment.policyholder}</span>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium capitalize ${getTypeColor(payment.type)}`}
                        >
                          {payment.type}
                        </span>
                      </td>
                      <td className="py-4 px-4 font-semibold">
                        ${payment.amount.toLocaleString()}
                      </td>
                      <td className="py-4 px-4 text-gray-600">
                        {payment.payee}
                      </td>
                      <td className="py-4 px-4">
                        <span className="capitalize text-gray-600">
                          {payment.method}
                        </span>
                      </td>
                      <td className="py-4 px-4">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium capitalize ${getStatusColor(payment.status)}`}
                        >
                          {payment.status}
                        </span>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex gap-2">
                          <button className="px-3 py-1 text-sm font-medium text-blue-600 hover:bg-blue-50 rounded-lg">
                            View
                          </button>
                          <button className="px-3 py-1 text-sm font-medium text-green-600 hover:bg-green-50 rounded-lg">
                            Approve
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
  );
};

export default ClaimsPaymentsScreen;
