import React, { useState } from "react";
import {
  Search,
  Filter,
  CheckCircle,
  XCircle,
  Clock,
  Eye,
  User,
  FileText,
  Calendar,
  Phone,
  Mail,
} from "lucide-react";

// Define types for our data
interface Claim {
  id: string;
  patientName: string;
  policyNumber: string;
  claimAmount: string;
  submissionDate: string;
  type: string;
  status: "pending" | "verified" | "rejected";
  priority: "high" | "medium" | "low";
  email: string;
  phone: string;
  documents: number;
}

const VerificationQueue: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState<
    "pending" | "verified" | "rejected"
  >("pending");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedClaim, setSelectedClaim] = useState<Claim | null>(null);

  const claims: Claim[] = [
    {
      id: "CLM-2024-001",
      patientName: "John Anderson",
      policyNumber: "POL-85623",
      claimAmount: "$2,450.00",
      submissionDate: "2024-10-15",
      type: "Medical",
      status: "pending",
      priority: "high",
      email: "john.anderson@email.com",
      phone: "+1 (555) 123-4567",
      documents: 3,
    },
    {
      id: "CLM-2024-002",
      patientName: "Sarah Williams",
      policyNumber: "POL-92341",
      claimAmount: "$1,850.00",
      submissionDate: "2024-10-16",
      type: "Dental",
      status: "pending",
      priority: "medium",
      email: "sarah.w@email.com",
      phone: "+1 (555) 234-5678",
      documents: 2,
    },
    {
      id: "CLM-2024-003",
      patientName: "Michael Chen",
      policyNumber: "POL-74129",
      claimAmount: "$3,200.00",
      submissionDate: "2024-10-14",
      type: "Surgery",
      status: "pending",
      priority: "high",
      email: "mchen@email.com",
      phone: "+1 (555) 345-6789",
      documents: 5,
    },
    {
      id: "CLM-2024-004",
      patientName: "Emily Rodriguez",
      policyNumber: "POL-63847",
      claimAmount: "$950.00",
      submissionDate: "2024-10-17",
      type: "Prescription",
      status: "verified",
      priority: "low",
      email: "emily.r@email.com",
      phone: "+1 (555) 456-7890",
      documents: 1,
    },
    {
      id: "CLM-2024-005",
      patientName: "David Thompson",
      policyNumber: "POL-51923",
      claimAmount: "$4,100.00",
      submissionDate: "2024-10-13",
      type: "Emergency",
      status: "rejected",
      priority: "high",
      email: "dthompson@email.com",
      phone: "+1 (555) 567-8901",
      documents: 4,
    },
  ];

  const filteredClaims = claims.filter(
    (claim) =>
      claim.status === selectedTab &&
      (claim.patientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        claim.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        claim.policyNumber.toLowerCase().includes(searchQuery.toLowerCase())),
  );

  const getStatusCount = (
    status: "pending" | "verified" | "rejected",
  ): number => claims.filter((c) => c.status === status).length;

  const getPriorityColor = (priority: "high" | "medium" | "low"): string => {
    switch (priority) {
      case "high":
        return "text-red-600 bg-red-50";
      case "medium":
        return "text-yellow-600 bg-yellow-50";
      case "low":
        return "text-green-600 bg-green-50";
      default:
        return "text-gray-600 bg-gray-50";
    }
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-white via-blue-50 to-blue-100">
      {/* Header */}
      <div className="bg-white border-b border-blue-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl sm:text-2xl font-bold text-blue-900">
                Verification Queue
              </h1>
              <p className="text-xs sm:text-sm text-blue-600 mt-1">
                Insurance Claims Management System
              </p>
            </div>
            <div className="flex items-center gap-3">
              <button className="px-3 sm:px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2 text-sm sm:text-base">
                <Filter className="w-4 h-4" />
                <span className="hidden sm:inline">Filters</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 mb-6">
          <div className="bg-white rounded-xl p-4 sm:p-5 border border-blue-100 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs sm:text-sm text-gray-600">
                  Pending Review
                </p>
                <p className="text-2xl sm:text-3xl font-bold text-blue-900 mt-1">
                  {getStatusCount("pending")}
                </p>
              </div>
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <Clock className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-4 sm:p-5 border border-blue-100 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs sm:text-sm text-gray-600">Verified</p>
                <p className="text-2xl sm:text-3xl font-bold text-green-600 mt-1">
                  {getStatusCount("verified")}
                </p>
              </div>
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-green-100 rounded-full flex items-center justify-center">
                <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6 text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-4 sm:p-5 border border-blue-100 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs sm:text-sm text-gray-600">Rejected</p>
                <p className="text-2xl sm:text-3xl font-bold text-red-600 mt-1">
                  {getStatusCount("rejected")}
                </p>
              </div>
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-red-100 rounded-full flex items-center justify-center">
                <XCircle className="w-5 h-5 sm:w-6 sm:h-6 text-red-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="bg-white rounded-xl border border-blue-100 shadow-sm">
          {/* Tabs */}
          <div className="border-b border-blue-100">
            <div className="flex gap-1 p-1">
              <button
                onClick={() => setSelectedTab("pending")}
                className={`flex-1 py-2 sm:py-3 px-2 sm:px-4 rounded-lg font-medium transition-colors text-xs sm:text-base ${
                  selectedTab === "pending"
                    ? "bg-blue-600 text-white"
                    : "text-gray-600 hover:bg-blue-50"
                }`}
              >
                Pending ({getStatusCount("pending")})
              </button>
              <button
                onClick={() => setSelectedTab("verified")}
                className={`flex-1 py-2 sm:py-3 px-2 sm:px-4 rounded-lg font-medium transition-colors text-xs sm:text-base ${
                  selectedTab === "verified"
                    ? "bg-blue-600 text-white"
                    : "text-gray-600 hover:bg-blue-50"
                }`}
              >
                Verified ({getStatusCount("verified")})
              </button>
              <button
                onClick={() => setSelectedTab("rejected")}
                className={`flex-1 py-2 sm:py-3 px-2 sm:px-4 transition-colors text-xs sm:text-base rounded-lg font-medium ${
                  selectedTab === "rejected"
                    ? "bg-blue-600 text-white"
                    : "text-gray-600 hover:bg-blue-50"
                }`}
              >
                Rejected ({getStatusCount("rejected")})
              </button>
            </div>
          </div>

          {/* Search Bar */}
          <div className="p-4 border-b border-blue-100">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 sm:w-5 sm:h-5" />
              <input
                type="text"
                placeholder="Search by patient name, claim ID, or policy number..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 sm:pl-10 pr-4 py-2 sm:py-3 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
              />
            </div>
          </div>

          {/* Claims List */}
          <div className="divide-y divide-blue-100">
            {filteredClaims.length === 0 ? (
              <div className="p-8 sm:p-12 text-center">
                <FileText className="w-12 h-12 sm:w-16 sm:h-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500 text-base sm:text-lg">
                  No claims found
                </p>
              </div>
            ) : (
              filteredClaims.map((claim) => (
                <div
                  key={claim.id}
                  className="p-4 sm:p-5 hover:bg-blue-50 transition-colors cursor-pointer"
                  onClick={() => setSelectedClaim(claim)}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 mb-2">
                        <h3 className="text-base sm:text-lg font-semibold text-blue-900">
                          {claim.patientName}
                        </h3>
                        <span
                          className={`px-2 sm:px-3 py-1 rounded-full text-xs font-medium ${getPriorityColor(claim.priority)} self-start`}
                        >
                          {claim.priority.toUpperCase()}
                        </span>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 text-sm">
                        <div>
                          <p className="text-gray-500 text-xs sm:text-sm">
                            Claim ID
                          </p>
                          <p className="font-medium text-gray-900 text-sm sm:text-base">
                            {claim.id}
                          </p>
                        </div>
                        <div>
                          <p className="text-gray-500 text-xs sm:text-sm">
                            Policy Number
                          </p>
                          <p className="font-medium text-gray-900 text-sm sm:text-base">
                            {claim.policyNumber}
                          </p>
                        </div>
                        <div>
                          <p className="text-gray-500 text-xs sm:text-sm">
                            Claim Amount
                          </p>
                          <p className="font-medium text-blue-600 text-sm sm:text-base">
                            {claim.claimAmount}
                          </p>
                        </div>
                        <div>
                          <p className="text-gray-500 text-xs sm:text-sm">
                            Type
                          </p>
                          <p className="font-medium text-gray-900 text-sm sm:text-base">
                            {claim.type}
                          </p>
                        </div>
                      </div>

                      <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 mt-3 text-xs text-gray-500">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3 h-3 sm:w-4 sm:h-4" />
                          {claim.submissionDate}
                        </span>
                        <span className="flex items-center gap-1">
                          <FileText className="w-3 h-3 sm:w-4 sm:h-4" />
                          {claim.documents} documents
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-1 sm:gap-2 ml-2 sm:ml-4">
                      {selectedTab === "pending" && (
                        <>
                          <button
                            className="p-1 sm:p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                            onClick={(e) => {
                              e.stopPropagation();
                            }}
                          >
                            <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5" />
                          </button>
                          <button
                            className="p-1 sm:p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                            onClick={(e) => {
                              e.stopPropagation();
                            }}
                          >
                            <XCircle className="w-4 h-4 sm:w-5 sm:h-5" />
                          </button>
                        </>
                      )}
                      <button
                        className="p-1 sm:p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedClaim(claim);
                        }}
                      >
                        <Eye className="w-4 h-4 sm:w-5 sm:h-5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Modal for Claim Details */}
      {selectedClaim && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
          onClick={() => setSelectedClaim(null)}
        >
          <div
            className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-4 sm:p-6">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold text-blue-900">
                    {selectedClaim.patientName}
                  </h2>
                  <p className="text-gray-600 text-sm sm:text-base">
                    {selectedClaim.id}
                  </p>
                </div>
                <button
                  onClick={() => setSelectedClaim(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <XCircle className="w-6 h-6" />
                </button>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex items-center gap-3">
                    <User className="w-5 h-5 text-blue-600" />
                    <div>
                      <p className="text-xs text-gray-500">Policy Number</p>
                      <p className="font-medium text-sm sm:text-base">
                        {selectedClaim.policyNumber}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <FileText className="w-5 h-5 text-blue-600" />
                    <div>
                      <p className="text-xs text-gray-500">Claim Type</p>
                      <p className="font-medium text-sm sm:text-base">
                        {selectedClaim.type}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Mail className="w-5 h-5 text-blue-600" />
                    <div>
                      <p className="text-xs text-gray-500">Email</p>
                      <p className="font-medium text-sm">
                        {selectedClaim.email}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="w-5 h-5 text-blue-600" />
                    <div>
                      <p className="text-xs text-gray-500">Phone</p>
                      <p className="font-medium text-sm sm:text-base">
                        {selectedClaim.phone}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-blue-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-600 mb-1">Claim Amount</p>
                  <p className="text-2xl sm:text-3xl font-bold text-blue-900">
                    {selectedClaim.claimAmount}
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 pt-4">
                  <button className="flex-1 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center gap-2 text-sm sm:text-base">
                    <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5" />
                    Approve
                  </button>
                  <button className="flex-1 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors flex items-center justify-center gap-2 text-sm sm:text-base">
                    <XCircle className="w-4 h-4 sm:w-5 sm:h-5" />
                    Reject
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VerificationQueue;
