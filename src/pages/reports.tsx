import React, { useState } from "react";
import {
  Send,
  FileText,
  Download,
  Eye,
  Calendar,
  Mail,
  Phone,
  Filter,
  Search,
  X,
  CheckCircle,
  Clock,
  Upload,
} from "lucide-react";

interface Report {
  id: string;
  title: string;
  type: string;
  createdDate: string;
  status: "draft" | "sent" | "pending";
  description: string;
}

interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  policyNumber: string;
}

const KYCReportsScreen = () => {
  const [activeTab, setActiveTab] = useState<"view" | "send">("view");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedReport, setSelectedReport] = useState<Report | null>(null);
  const [showSendModal, setShowSendModal] = useState(false);
  const [selectedCustomers, setSelectedCustomers] = useState<string[]>([]);
  const [filterType, setFilterType] = useState("all");
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);

  const reports: Report[] = [
    {
      id: "RPT-001",
      title: "KYC Verification Status Report",
      type: "Verification",
      createdDate: "2024-10-15",
      status: "sent",
      description: "Monthly KYC verification status for all customers",
    },
    {
      id: "RPT-002",
      title: "Incomplete Documentation Report",
      type: "Documentation",
      createdDate: "2024-10-17",
      status: "draft",
      description: "List of customers with incomplete KYC documents",
    },
    {
      id: "RPT-003",
      title: "Expired Documents Alert",
      type: "Alert",
      createdDate: "2024-10-18",
      status: "pending",
      description: "Customers with expired identification documents",
    },
    {
      id: "RPT-004",
      title: "Risk Assessment Report",
      type: "Assessment",
      createdDate: "2024-10-16",
      status: "sent",
      description: "Quarterly risk assessment for all policyholders",
    },
    {
      id: "RPT-005",
      title: "New Customer KYC Summary",
      type: "Summary",
      createdDate: "2024-10-19",
      status: "draft",
      description: "KYC summary for new customers this month",
    },
  ];

  const customers: Customer[] = [
    {
      id: "1",
      name: "John Anderson",
      email: "john.anderson@email.com",
      phone: "+1 234-567-8901",
      policyNumber: "POL-2024-1001",
    },
    {
      id: "2",
      name: "Maria Rodriguez",
      email: "maria.rodriguez@email.com",
      phone: "+1 234-567-8902",
      policyNumber: "POL-2024-1002",
    },
    {
      id: "3",
      name: "David Chen",
      email: "david.chen@email.com",
      phone: "+1 234-567-8903",
      policyNumber: "POL-2024-1003",
    },
    {
      id: "4",
      name: "Emily Watson",
      email: "emily.watson@email.com",
      phone: "+1 234-567-8904",
      policyNumber: "POL-2024-1004",
    },
    {
      id: "5",
      name: "Ahmed Hassan",
      email: "ahmed.hassan@email.com",
      phone: "+1 234-567-8905",
      policyNumber: "POL-2024-1005",
    },
  ];

  const getStatusBadge = (status: string) => {
    const styles = {
      sent: "bg-green-100 text-green-700 border-green-200",
      draft: "bg-gray-100 text-gray-700 border-gray-200",
      pending: "bg-yellow-100 text-yellow-700 border-yellow-200",
    };
    const icons = {
      sent: <CheckCircle className="w-3 h-3" />,
      draft: <FileText className="w-3 h-3" />,
      pending: <Clock className="w-3 h-3" />,
    };
    return (
      <span
        className={`px-3 py-1 rounded-full text-xs font-medium border flex items-center gap-1 ${styles[status as keyof typeof styles]}`}
      >
        {icons[status as keyof typeof icons]}
        {status.toUpperCase()}
      </span>
    );
  };

  const filteredReports = reports.filter((report) => {
    const matchesSearch =
      report.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      report.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter =
      filterType === "all" ||
      report.type.toLowerCase() === filterType.toLowerCase();
    return matchesSearch && matchesFilter;
  });

  const toggleCustomerSelection = (customerId: string) => {
    setSelectedCustomers((prev) =>
      prev.includes(customerId)
        ? prev.filter((id) => id !== customerId)
        : [...prev, customerId],
    );
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const allowedTypes = [
        "application/pdf",
        "application/vnd.ms-excel",
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        "text/csv",
      ];
      if (!allowedTypes.includes(file.type)) {
        alert("Please upload a valid file type (PDF, Excel, CSV)");
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        alert("File size must be less than 5MB");
        return;
      }
      setUploadedFile(file);
    }
  };

  const handleSendReport = () => {
    if (!uploadedFile && !selectedReport) {
      alert("Please either select an existing report or upload a file");
      return;
    }
    if (selectedCustomers.length === 0) {
      alert("Please select at least one customer");
      return;
    }
    const reportType = uploadedFile ? "Uploaded File" : selectedReport?.title;
    alert(
      `Report "${reportType}" sent to ${selectedCustomers.length} customer(s)`,
    );
    setShowSendModal(false);
    setSelectedCustomers([]);
    setUploadedFile(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            KYC Reports Management
          </h1>
          <p className="text-gray-600">
            View reports and send them to customers
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="bg-white rounded-xl shadow-sm border border-blue-100 mb-6">
          <div className="flex border-b border-gray-200">
            <button
              onClick={() => setActiveTab("view")}
              className={`flex-1 px-6 py-4 font-medium transition-colors ${
                activeTab === "view"
                  ? "text-blue-600 border-b-2 border-blue-600 bg-blue-50"
                  : "text-gray-600 hover:text-gray-800 hover:bg-gray-50"
              }`}
            >
              <div className="flex items-center justify-center gap-2">
                <Eye className="w-5 h-5" />
                View Reports
              </div>
            </button>
            <button
              onClick={() => setActiveTab("send")}
              className={`flex-1 px-6 py-4 font-medium transition-colors ${
                activeTab === "send"
                  ? "text-blue-600 border-b-2 border-blue-600 bg-blue-50"
                  : "text-gray-600 hover:text-gray-800 hover:bg-gray-50"
              }`}
            >
              <div className="flex items-center justify-center gap-2">
                <Send className="w-5 h-5" />
                Send Reports
              </div>
            </button>
          </div>
        </div>

        {/* View Reports Tab */}
        {activeTab === "view" && (
          <div>
            {/* Search and Filter */}
            <div className="bg-white rounded-xl shadow-sm border border-blue-100 p-6 mb-6">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Search reports by title or ID..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  />
                </div>
                <div className="relative">
                  <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <select
                    value={filterType}
                    onChange={(e) => setFilterType(e.target.value)}
                    className="pl-10 pr-8 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none bg-white appearance-none cursor-pointer"
                  >
                    <option value="all">All Types</option>
                    <option value="verification">Verification</option>
                    <option value="documentation">Documentation</option>
                    <option value="alert">Alert</option>
                    <option value="assessment">Assessment</option>
                    <option value="summary">Summary</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Reports List */}
            <div className="space-y-4">
              {filteredReports.map((report) => (
                <div
                  key={report.id}
                  className="bg-white rounded-xl shadow-sm border border-blue-100 p-6 hover:shadow-md transition-all"
                >
                  <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-blue-600 rounded-lg flex items-center justify-center">
                          <FileText className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-gray-800">
                            {report.title}
                          </h3>
                          <p className="text-sm text-gray-500">{report.id}</p>
                        </div>
                      </div>
                      <p className="text-gray-600 mb-4">{report.description}</p>
                      <div className="flex flex-col sm:flex-row sm:items-center gap-4 text-sm">
                        <div className="flex items-center gap-2 text-gray-600">
                          <Calendar className="w-4 h-4" />
                          Created: {report.createdDate}
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-gray-500">Type:</span>
                          <span className="px-2 py-1 bg-blue-50 text-blue-700 rounded text-xs font-medium">
                            {report.type}
                          </span>
                        </div>
                        {getStatusBadge(report.status)}
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => setSelectedReport(report)}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2 text-sm font-medium"
                      >
                        <Eye className="w-4 h-4" />
                        View
                      </button>
                      <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2 text-sm font-medium">
                        <Download className="w-4 h-4" />
                        Download
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Send Reports Tab */}
        {activeTab === "send" && (
          <div>
            <div className="bg-white rounded-xl shadow-sm border border-blue-100 p-6 mb-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                Select Report to Send
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {reports.map((report) => (
                  <button
                    key={report.id}
                    onClick={() => {
                      setSelectedReport(report);
                      setShowSendModal(true);
                    }}
                    className="text-left p-4 border-2 border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-all"
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <FileText className="w-5 h-5 text-blue-600" />
                      <h4 className="font-semibold text-gray-800">
                        {report.title}
                      </h4>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">
                      {report.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-500">{report.id}</span>
                      {getStatusBadge(report.status)}
                    </div>
                  </button>
                ))}
              </div>

              {/* Upload Section */}
              <div className="mt-8 pt-6 border-t border-gray-200">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">
                  Or Upload Custom Report
                </h3>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-500 transition-colors">
                  <input
                    type="file"
                    id="file-upload"
                    className="hidden"
                    accept=".pdf,.xlsx,.xls,.csv"
                    onChange={handleFileUpload}
                  />
                  <label htmlFor="file-upload" className="cursor-pointer">
                    <Upload className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                    <p className="text-gray-600 mb-2">
                      {uploadedFile
                        ? uploadedFile.name
                        : "Click to upload report file"}
                    </p>
                    <p className="text-sm text-gray-500">
                      Supports PDF, Excel, CSV files (max 5MB)
                    </p>
                    {uploadedFile && (
                      <button
                        onClick={() => setShowSendModal(true)}
                        className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2 mx-auto"
                      >
                        <Send className="w-4 h-4" />
                        Send Uploaded File
                      </button>
                    )}
                  </label>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Report Detail Modal */}
        {selectedReport && !showSendModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
              <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-6 rounded-t-xl">
                <div className="flex justify-between items-start">
                  <div>
                    <h2 className="text-2xl font-bold mb-2">
                      {selectedReport.title}
                    </h2>
                    <p className="text-blue-100">{selectedReport.id}</p>
                  </div>
                  <button
                    onClick={() => setSelectedReport(null)}
                    className="text-white hover:bg-blue-800 p-2 rounded-lg transition-colors"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>
              </div>

              <div className="p-6 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="text-sm text-gray-600 mb-1 block">
                      Report Type
                    </label>
                    <p className="font-semibold text-gray-800">
                      {selectedReport.type}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-600 mb-1 block">
                      Status
                    </label>
                    <div>{getStatusBadge(selectedReport.status)}</div>
                  </div>
                  <div>
                    <label className="text-sm text-gray-600 mb-1 block">
                      Created Date
                    </label>
                    <p className="font-semibold text-gray-800">
                      {selectedReport.createdDate}
                    </p>
                  </div>
                </div>
                <div>
                  <label className="text-sm text-gray-600 mb-1 block">
                    Description
                  </label>
                  <p className="text-gray-800">{selectedReport.description}</p>
                </div>
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <p className="text-sm text-blue-800">
                    This is a preview of the report content. Full report details
                    would be displayed here.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Send Report Modal */}
        {showSendModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-6 rounded-t-xl">
                <div className="flex justify-between items-start">
                  <div>
                    <h2 className="text-2xl font-bold mb-2">
                      Send Report to Customers
                    </h2>
                    <p className="text-blue-100">
                      {uploadedFile ? uploadedFile.name : selectedReport?.title}
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      setShowSendModal(false);
                      setSelectedCustomers([]);
                    }}
                    className="text-white hover:bg-blue-800 p-2 rounded-lg transition-colors"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>
              </div>

              <div className="p-6">
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">
                    Select Customers ({selectedCustomers.length} selected)
                  </h3>
                  <div className="space-y-3">
                    {customers.map((customer) => (
                      <div
                        key={customer.id}
                        className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                          selectedCustomers.includes(customer.id)
                            ? "border-blue-500 bg-blue-50"
                            : "border-gray-200 hover:border-blue-300"
                        }`}
                        onClick={() => toggleCustomerSelection(customer.id)}
                      >
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center text-white font-semibold">
                            {customer.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </div>
                          <div className="flex-1">
                            <h4 className="font-semibold text-gray-800">
                              {customer.name}
                            </h4>
                            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-sm text-gray-600 mt-1">
                              <div className="flex items-center gap-1">
                                <Mail className="w-3 h-3" />
                                {customer.email}
                              </div>
                              <div className="flex items-center gap-1">
                                <Phone className="w-3 h-3" />
                                {customer.phone}
                              </div>
                            </div>
                          </div>
                          <div className="text-sm">
                            <span className="px-3 py-1 bg-gray-100 rounded-full text-gray-700 font-medium">
                              {customer.policyNumber}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-gray-200">
                  <button
                    onClick={() => {
                      setShowSendModal(false);
                      setSelectedCustomers([]);
                    }}
                    className="flex-1 px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSendReport}
                    disabled={selectedCustomers.length === 0}
                    className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Send className="w-5 h-5" />
                    Send Report ({selectedCustomers.length})
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default KYCReportsScreen;
