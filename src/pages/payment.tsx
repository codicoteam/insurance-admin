import React, { useState } from "react";
import {
  Search,
  Filter,
  Download,
  Eye,
  RefreshCw,
  DollarSign,
  CreditCard,
  Smartphone,
  Building2,
  MoreVertical,
  Shield,
  ChevronDown,
} from "lucide-react";

interface Payment {
  _id: string;
  paymentReference: string;
  user: {
    _id: string;
    name: string;
    email: string;
  };
  policy?: {
    _id: string;
    policyNumber: string;
  };
  amount: number;
  currency: string;
  paymentMethod: "paynow" | "credit_card" | "bank_transfer" | "mobile_money";
  status: "pending" | "completed" | "failed" | "refunded";
  paymentGatewayData?: {
    gateway: string;
    transactionId: string;
  };
  description?: string;
  dueDate: string;
  paidDate?: string;
  createdAt: string;
}

const AdminPaymentScreen: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [methodFilter, setMethodFilter] = useState<string>("all");
  const [selectedPayment, setSelectedPayment] = useState<Payment | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [filterOpen, setFilterOpen] = useState(false);

  // Mock data - replace with actual API call
  const [payments] = useState<Payment[]>([
    {
      _id: "1",
      paymentReference: "PAY123456",
      user: { _id: "u1", name: "John Doe", email: "john@example.com" },
      policy: { _id: "p1", policyNumber: "POL-2024-001" },
      amount: 1250.0,
      currency: "USD",
      paymentMethod: "credit_card",
      status: "completed",
      paymentGatewayData: { gateway: "Stripe", transactionId: "TXN789012" },
      description: "Monthly premium payment",
      dueDate: "2024-10-01",
      paidDate: "2024-10-01",
      createdAt: "2024-10-01",
    },
    {
      _id: "2",
      paymentReference: "PAY234567",
      user: { _id: "u2", name: "Jane Smith", email: "jane@example.com" },
      policy: { _id: "p2", policyNumber: "POL-2024-002" },
      amount: 850.0,
      currency: "USD",
      paymentMethod: "paynow",
      status: "pending",
      description: "Quarterly premium",
      dueDate: "2024-10-15",
      createdAt: "2024-10-10",
    },
    {
      _id: "3",
      paymentReference: "PAY345678",
      user: { _id: "u3", name: "Bob Johnson", email: "bob@example.com" },
      amount: 2100.0,
      currency: "USD",
      paymentMethod: "bank_transfer",
      status: "failed",
      description: "Annual premium payment",
      dueDate: "2024-09-30",
      createdAt: "2024-09-28",
    },
    {
      _id: "4",
      paymentReference: "PAY456789",
      user: { _id: "u4", name: "Alice Brown", email: "alice@example.com" },
      policy: { _id: "p4", policyNumber: "POL-2024-004" },
      amount: 450.0,
      currency: "USD",
      paymentMethod: "mobile_money",
      status: "completed",
      paymentGatewayData: { gateway: "EcoCash", transactionId: "ECO456123" },
      description: "Monthly premium",
      dueDate: "2024-10-05",
      paidDate: "2024-10-06",
      createdAt: "2024-10-05",
    },
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "failed":
        return "bg-red-100 text-red-800";
      case "refunded":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getPaymentMethodIcon = (method: string) => {
    switch (method) {
      case "credit_card":
        return <CreditCard className="w-4 h-4" />;
      case "paynow":
        return <Smartphone className="w-4 h-4" />;
      case "bank_transfer":
        return <Building2 className="w-4 h-4" />;
      case "mobile_money":
        return <Smartphone className="w-4 h-4" />;
      default:
        return <DollarSign className="w-4 h-4" />;
    }
  };

  const filteredPayments = payments.filter((payment) => {
    const matchesSearch =
      payment.paymentReference
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      payment.user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payment.user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || payment.status === statusFilter;
    const matchesMethod =
      methodFilter === "all" || payment.paymentMethod === methodFilter;
    return matchesSearch && matchesStatus && matchesMethod;
  });

  const stats = {
    total: payments.reduce((sum, p) => sum + p.amount, 0),
    completed: payments.filter((p) => p.status === "completed").length,
    pending: payments.filter((p) => p.status === "pending").length,
    failed: payments.filter((p) => p.status === "failed").length,
  };

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
              <MoreVertical className="w-6 h-6 text-gray-600" />
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

        <div className="p-4 lg:p-8">
          {/* Header */}
          <div className="mb-6 lg:mb-8">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-4">
              <div>
                <h1 className="text-2xl lg:text-4xl font-bold text-gray-900 mb-2">
                  Payment Management
                </h1>
                <p className="text-gray-600 text-sm lg:text-base">
                  Monitor and manage all payment transactions
                </p>
              </div>
              <div className="flex items-center gap-3">
                <button className="px-4 py-2 lg:px-6 lg:py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors font-medium text-sm lg:text-base shadow-lg shadow-blue-600/30 flex items-center gap-2">
                  <Download className="w-4 h-4 lg:w-5 lg:h-5" />
                  Export CSV
                </button>
              </div>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-6 lg:mb-8">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-4 lg:p-6 border border-blue-200 hover:shadow-lg transition-shadow">
              <div className="flex items-start justify-between mb-3 lg:mb-4">
                <div className="p-2 lg:p-3 rounded-xl bg-blue-100">
                  <DollarSign className="w-5 h-5 lg:w-6 lg:h-6 text-blue-600" />
                </div>
              </div>
              <div className="text-2xl lg:text-3xl font-bold text-gray-900 mb-1">
                ${stats.total.toFixed(2)}
              </div>
              <div className="text-xs lg:text-sm text-gray-600">
                Total Revenue
              </div>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-2xl p-4 lg:p-6 border border-green-200 hover:shadow-lg transition-shadow">
              <div className="flex items-start justify-between mb-3 lg:mb-4">
                <div className="p-2 lg:p-3 rounded-xl bg-green-100">
                  <div className="w-5 h-5 lg:w-6 lg:h-6 bg-green-600 rounded-full flex items-center justify-center text-white font-bold text-xs">
                    ✓
                  </div>
                </div>
              </div>
              <div className="text-2xl lg:text-3xl font-bold text-gray-900 mb-1">
                {stats.completed}
              </div>
              <div className="text-xs lg:text-sm text-gray-600">Completed</div>
            </div>

            <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-2xl p-4 lg:p-6 border border-yellow-200 hover:shadow-lg transition-shadow">
              <div className="flex items-start justify-between mb-3 lg:mb-4">
                <div className="p-2 lg:p-3 rounded-xl bg-yellow-100">
                  <RefreshCw className="w-5 h-5 lg:w-6 lg:h-6 text-yellow-600" />
                </div>
              </div>
              <div className="text-2xl lg:text-3xl font-bold text-gray-900 mb-1">
                {stats.pending}
              </div>
              <div className="text-xs lg:text-sm text-gray-600">Pending</div>
            </div>

            <div className="bg-gradient-to-br from-red-50 to-red-100 rounded-2xl p-4 lg:p-6 border border-red-200 hover:shadow-lg transition-shadow">
              <div className="flex items-start justify-between mb-3 lg:mb-4">
                <div className="p-2 lg:p-3 rounded-xl bg-red-100">
                  <div className="w-5 h-5 lg:w-6 lg:h-6 bg-red-600 rounded-full flex items-center justify-center text-white font-bold text-xs">
                    ✕
                  </div>
                </div>
              </div>
              <div className="text-2xl lg:text-3xl font-bold text-gray-900 mb-1">
                {stats.failed}
              </div>
              <div className="text-xs lg:text-sm text-gray-600">Failed</div>
            </div>
          </div>

          {/* Filters */}
          <div className="mb-6 flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
            <div className="relative flex-1 sm:flex-initial min-w-0 w-full sm:w-64 lg:w-96">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 lg:w-5 lg:h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search payments..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 lg:pl-11 pr-4 py-2 lg:py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm lg:text-base"
              />
            </div>

            <div className="flex gap-3 w-full sm:w-auto">
              <div className="relative flex-1 sm:flex-initial">
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm lg:text-base appearance-none bg-white"
                >
                  <option value="all">All Statuses</option>
                  <option value="completed">Completed</option>
                  <option value="pending">Pending</option>
                  <option value="failed">Failed</option>
                  <option value="refunded">Refunded</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
              </div>

              <div className="relative">
                <button
                  onClick={() => setFilterOpen(!filterOpen)}
                  className="px-3 py-2 lg:px-4 lg:py-2.5 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors flex items-center gap-2 text-sm lg:text-base"
                >
                  <Filter className="w-4 h-4 lg:w-5 lg:h-5 text-gray-600" />
                  <span className="font-medium text-gray-700 hidden sm:inline">
                    Filter
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 text-gray-600 transition-transform ${filterOpen ? "rotate-180" : ""}`}
                  />
                </button>

                {filterOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-xl border border-gray-200 py-2 z-10">
                    <div className="px-3 py-2 text-xs font-semibold text-gray-500 uppercase">
                      Payment Method
                    </div>
                    {[
                      "all",
                      "paynow",
                      "credit_card",
                      "bank_transfer",
                      "mobile_money",
                    ].map((method) => (
                      <button
                        key={method}
                        onClick={() => {
                          setMethodFilter(method);
                          setFilterOpen(false);
                        }}
                        className={`w-full px-4 py-2 text-left hover:bg-gray-50 text-sm capitalize ${
                          methodFilter === method
                            ? "bg-blue-50 text-blue-700"
                            : "text-gray-700"
                        }`}
                      >
                        {method.replace("_", " ")}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <button className="px-3 py-2 lg:px-4 lg:py-2.5 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-colors font-medium text-sm lg:text-base flex items-center gap-2">
                <RefreshCw className="w-4 h-4 lg:w-5 lg:h-5" />
                <span className="hidden sm:inline">Refresh</span>
              </button>
            </div>
          </div>

          {/* Payments List - Mobile Cards */}
          <div className="lg:hidden space-y-4">
            {filteredPayments.map((payment) => (
              <div
                key={payment._id}
                className="bg-white border border-gray-200 rounded-2xl p-4 hover:shadow-lg transition-all"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-blue-100 rounded-lg">
                      {getPaymentMethodIcon(payment.paymentMethod)}
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">
                        {payment.user.name}
                      </h3>
                      <p className="text-sm text-gray-500">
                        {payment.user.email}
                      </p>
                    </div>
                  </div>
                  <span
                    className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(payment.status)}`}
                  >
                    {payment.status.toUpperCase()}
                  </span>
                </div>

                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Reference:</span>
                    <span className="font-mono text-blue-600 font-semibold">
                      {payment.paymentReference}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Amount:</span>
                    <span className="font-semibold text-gray-900">
                      {payment.currency} ${payment.amount.toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Policy:</span>
                    <span className="text-gray-900">
                      {payment.policy?.policyNumber || "-"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Date:</span>
                    <span className="text-gray-900">
                      {new Date(payment.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>

                <div className="flex gap-2 mt-4">
                  <button
                    onClick={() => setSelectedPayment(payment)}
                    className="flex-1 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium text-sm text-center"
                  >
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Payments Table - Desktop */}
          <div className="hidden lg:block bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Reference
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      User
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Policy
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Amount
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Method
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredPayments.map((payment) => (
                    <tr
                      key={payment._id}
                      className="hover:bg-gray-50 transition"
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="font-mono text-sm text-blue-600 font-semibold">
                          {payment.paymentReference}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div>
                          <div className="text-sm font-medium text-gray-900">
                            {payment.user.name}
                          </div>
                          <div className="text-xs text-gray-500">
                            {payment.user.email}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="text-sm text-gray-700">
                          {payment.policy?.policyNumber || "-"}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="text-sm font-semibold text-gray-900">
                          {payment.currency} ${payment.amount.toFixed(2)}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          {getPaymentMethodIcon(payment.paymentMethod)}
                          <span className="text-sm text-gray-700 capitalize">
                            {payment.paymentMethod.replace("_", " ")}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`px-3 py-1 text-xs font-semibold rounded-full ${getStatusColor(payment.status)}`}
                        >
                          {payment.status.toUpperCase()}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-700">
                          {new Date(payment.createdAt).toLocaleDateString()}
                        </div>
                        {payment.paidDate && (
                          <div className="text-xs text-green-600">
                            Paid:{" "}
                            {new Date(payment.paidDate).toLocaleDateString()}
                          </div>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <button
                          onClick={() => setSelectedPayment(payment)}
                          className="text-blue-600 hover:text-blue-800 transition flex items-center gap-1 text-sm font-medium"
                        >
                          <Eye className="w-4 h-4" />
                          View
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Empty State */}
          {filteredPayments.length === 0 && (
            <div className="text-center py-12 lg:py-16">
              <div className="inline-block p-4 lg:p-6 bg-gray-100 rounded-full mb-4">
                <DollarSign className="w-8 h-8 lg:w-12 lg:h-12 text-gray-400" />
              </div>
              <h3 className="text-lg lg:text-xl font-bold text-gray-900 mb-2">
                No payments found
              </h3>
              <p className="text-gray-600 text-sm lg:text-base">
                No payments match your current filters
              </p>
            </div>
          )}

          {/* Payment Details Modal */}
          {selectedPayment && (
            <div
              className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
              onClick={() => setSelectedPayment(null)}
            >
              <div
                className="bg-white rounded-2xl max-w-2xl w-full p-6 max-h-[90vh] overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex justify-between items-start mb-6">
                  <h2 className="text-2xl font-bold text-gray-900">
                    Payment Details
                  </h2>
                  <button
                    onClick={() => setSelectedPayment(null)}
                    className="text-gray-500 hover:text-gray-700 text-2xl p-1"
                  >
                    ×
                  </button>
                </div>

                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm text-gray-600 font-medium">
                        Payment Reference
                      </label>
                      <p className="font-mono font-semibold text-blue-600 text-lg">
                        {selectedPayment.paymentReference}
                      </p>
                    </div>
                    <div>
                      <label className="text-sm text-gray-600 font-medium">
                        Status
                      </label>
                      <p>
                        <span
                          className={`px-3 py-1 text-xs font-semibold rounded-full ${getStatusColor(selectedPayment.status)}`}
                        >
                          {selectedPayment.status.toUpperCase()}
                        </span>
                      </p>
                    </div>
                    <div>
                      <label className="text-sm text-gray-600 font-medium">
                        Amount
                      </label>
                      <p className="font-semibold text-lg text-gray-900">
                        {selectedPayment.currency} $
                        {selectedPayment.amount.toFixed(2)}
                      </p>
                    </div>
                    <div>
                      <label className="text-sm text-gray-600 font-medium">
                        Payment Method
                      </label>
                      <div className="flex items-center gap-2 mt-1">
                        {getPaymentMethodIcon(selectedPayment.paymentMethod)}
                        <p className="capitalize text-gray-900">
                          {selectedPayment.paymentMethod.replace("_", " ")}
                        </p>
                      </div>
                    </div>
                    <div>
                      <label className="text-sm text-gray-600 font-medium">
                        User
                      </label>
                      <p className="font-medium text-gray-900">
                        {selectedPayment.user.name}
                      </p>
                      <p className="text-sm text-gray-500">
                        {selectedPayment.user.email}
                      </p>
                    </div>
                    <div>
                      <label className="text-sm text-gray-600 font-medium">
                        Policy Number
                      </label>
                      <p className="text-gray-900">
                        {selectedPayment.policy?.policyNumber || "N/A"}
                      </p>
                    </div>
                    <div>
                      <label className="text-sm text-gray-600 font-medium">
                        Due Date
                      </label>
                      <p className="text-gray-900">
                        {new Date(selectedPayment.dueDate).toLocaleDateString()}
                      </p>
                    </div>
                    {selectedPayment.paidDate && (
                      <div>
                        <label className="text-sm text-gray-600 font-medium">
                          Paid Date
                        </label>
                        <p className="text-green-600 font-medium">
                          {new Date(
                            selectedPayment.paidDate,
                          ).toLocaleDateString()}
                        </p>
                      </div>
                    )}
                  </div>

                  {selectedPayment.description && (
                    <div>
                      <label className="text-sm text-gray-600 font-medium">
                        Description
                      </label>
                      <p className="text-gray-800 mt-1 p-3 bg-gray-50 rounded-lg border border-gray-200">
                        {selectedPayment.description}
                      </p>
                    </div>
                  )}

                  {selectedPayment.paymentGatewayData && (
                    <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                      <label className="text-sm text-gray-600 font-semibold">
                        Gateway Information
                      </label>
                      <div className="mt-2 space-y-2">
                        <p className="text-sm">
                          <span className="text-gray-600 font-medium">
                            Gateway:
                          </span>{" "}
                          {selectedPayment.paymentGatewayData.gateway}
                        </p>
                        <p className="text-sm">
                          <span className="text-gray-600 font-medium">
                            Transaction ID:
                          </span>{" "}
                          {selectedPayment.paymentGatewayData.transactionId}
                        </p>
                      </div>
                    </div>
                  )}
                </div>

                <div className="flex gap-2 mt-6">
                  <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium">
                    Process Refund
                  </button>
                  <button
                    className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition font-medium"
                    onClick={() => setSelectedPayment(null)}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminPaymentScreen;
