import { useState } from "react";
import {
  User,
  FileText,
  Calendar,
  DollarSign,
  Building2,
  Phone,
  Mail,
  AlertCircle,
  CheckCircle,
  Download,
  Send,
  MessageSquare,
  Menu,
  Shield,
} from "lucide-react";

interface ClaimData {
  claimNumber: string;
  patientName: string;
  policyNumber: string;
  dateOfBirth: string;
  claimAmount: number;
  dateSubmitted: string;
  dateOfService: string;
  diagnosis: string;
  provider: string;
  providerContact: string;
  procedureCode: string;
  procedureDescription: string;
  documentationStatus: string;
  patientEmail: string;
  patientPhone: string;
  priority: "high" | "medium" | "low";
}

export default function ManualReviewScreen() {
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);
  const [claimData] = useState<ClaimData>({
    claimNumber: "CLM-2025-1847",
    patientName: "Sarah Johnson",
    policyNumber: "POL-458962",
    dateOfBirth: "1985-03-15",
    claimAmount: 4500.0,
    dateSubmitted: "2025-10-15",
    dateOfService: "2025-10-10",
    diagnosis: "Acute appendicitis requiring emergency surgery",
    provider: "City General Hospital",
    providerContact: "+1 (555) 234-5678",
    procedureCode: "CPT-44950",
    procedureDescription: "Appendectomy - Laparoscopic",
    documentationStatus: "Complete - All documents received",
    patientEmail: "sarah.johnson@email.com",
    patientPhone: "+1 (555) 123-4567",
    priority: "high",
  });

  const [reviewDecision, setReviewDecision] = useState<string>("");
  const [approvalAmount, setApprovalAmount] = useState<string>(
    claimData.claimAmount.toString(),
  );
  const [reviewNotes, setReviewNotes] = useState<string>("");
  const [internalComments, setInternalComments] = useState<string>("");

  const handleSubmitReview = () => {
    if (reviewDecision) {
      alert(
        `Review Submitted!\nClaim: ${claimData.claimNumber}\nDecision: ${reviewDecision}\nAmount: $${approvalAmount}\nNotes: ${reviewNotes}`,
      );
    }
  };

  return (
    <div className="flex min-h-screen bg-white">
      {/* Main Content */}
      <div className="flex-1 lg:ml-0">
        {/* Mobile Header */}
        <div className="lg:hidden bg-white border-b border-blue-100 shadow-sm p-4">
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

        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 p-4 sm:p-6 lg:p-8">
          {/* Header */}
          <div className="bg-white rounded-xl shadow-lg border border-blue-100 overflow-hidden mb-4 sm:mb-6">
            <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div className="flex-1">
                  <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">
                    Manual Claim Review
                  </h1>
                  <p className="text-blue-100 text-sm sm:text-base">
                    Review and process insurance claim
                  </p>
                </div>
                <div
                  className={`px-4 sm:px-6 py-2 sm:py-3 rounded-full text-white font-bold text-base sm:text-lg shadow-lg ${
                    claimData.priority === "high"
                      ? "bg-red-500"
                      : claimData.priority === "medium"
                        ? "bg-yellow-500"
                        : "bg-green-500"
                  }`}
                >
                  {claimData.priority.toUpperCase()} PRIORITY
                </div>
              </div>
            </div>

            <div className="px-4 sm:px-6 lg:px-8 py-4 sm:py-6 bg-gradient-to-r from-blue-50 to-white border-b border-blue-100">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Claim Number</p>
                  <p className="text-xl sm:text-2xl font-bold text-blue-700">
                    {claimData.claimNumber}
                  </p>
                </div>
                <div className="text-left sm:text-right">
                  <p className="text-sm text-gray-600 mb-1">Claim Amount</p>
                  <p className="text-xl sm:text-2xl font-bold text-blue-700">
                    ${claimData.claimAmount.toLocaleString()}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 mb-4 sm:mb-6">
              {/* Patient Information */}
              <div className="bg-white rounded-xl shadow-lg border border-blue-100 overflow-hidden">
                <div className="bg-gradient-to-r from-blue-500 to-blue-600 px-4 sm:px-6 py-3 sm:py-4">
                  <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
                    <User className="w-5 h-5 sm:w-6 sm:h-6" />
                    Patient Information
                  </h2>
                </div>
                <div className="p-4 sm:p-6 space-y-3 sm:space-y-4">
                  <div className="bg-gradient-to-br from-blue-50 to-white p-3 sm:p-4 rounded-lg border border-blue-100">
                    <p className="text-sm font-medium text-gray-600 mb-1">
                      Full Name
                    </p>
                    <p className="text-base sm:text-lg font-bold text-gray-900">
                      {claimData.patientName}
                    </p>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                    <div className="bg-gradient-to-br from-blue-50 to-white p-3 sm:p-4 rounded-lg border border-blue-100">
                      <p className="text-sm font-medium text-gray-600 mb-1">
                        Date of Birth
                      </p>
                      <p className="font-semibold text-gray-900 text-sm sm:text-base">
                        {claimData.dateOfBirth}
                      </p>
                    </div>
                    <div className="bg-gradient-to-br from-blue-50 to-white p-3 sm:p-4 rounded-lg border border-blue-100">
                      <p className="text-sm font-medium text-gray-600 mb-1">
                        Policy Number
                      </p>
                      <p className="font-semibold text-gray-900 text-sm sm:text-base">
                        {claimData.policyNumber}
                      </p>
                    </div>
                  </div>
                  <div className="bg-gradient-to-br from-blue-50 to-white p-3 sm:p-4 rounded-lg border border-blue-100">
                    <div className="flex items-center gap-2 mb-2">
                      <Mail className="w-4 h-4 text-blue-600" />
                      <p className="text-sm font-medium text-gray-600">Email</p>
                    </div>
                    <p className="text-gray-900 text-sm sm:text-base">
                      {claimData.patientEmail}
                    </p>
                  </div>
                  <div className="bg-gradient-to-br from-blue-50 to-white p-3 sm:p-4 rounded-lg border border-blue-100">
                    <div className="flex items-center gap-2 mb-2">
                      <Phone className="w-4 h-4 text-blue-600" />
                      <p className="text-sm font-medium text-gray-600">Phone</p>
                    </div>
                    <p className="text-gray-900 text-sm sm:text-base">
                      {claimData.patientPhone}
                    </p>
                  </div>
                </div>
              </div>

              {/* Claim Details */}
              <div className="bg-white rounded-xl shadow-lg border border-blue-100 overflow-hidden">
                <div className="bg-gradient-to-r from-blue-500 to-blue-600 px-4 sm:px-6 py-3 sm:py-4">
                  <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
                    <FileText className="w-5 h-5 sm:w-6 sm:h-6" />
                    Claim Details
                  </h2>
                </div>
                <div className="p-4 sm:p-6 space-y-3 sm:space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                    <div className="bg-gradient-to-br from-blue-50 to-white p-3 sm:p-4 rounded-lg border border-blue-100">
                      <div className="flex items-center gap-2 mb-2">
                        <Calendar className="w-4 h-4 text-blue-600" />
                        <p className="text-sm font-medium text-gray-600">
                          Date Submitted
                        </p>
                      </div>
                      <p className="font-semibold text-gray-900 text-sm sm:text-base">
                        {claimData.dateSubmitted}
                      </p>
                    </div>
                    <div className="bg-gradient-to-br from-blue-50 to-white p-3 sm:p-4 rounded-lg border border-blue-100">
                      <div className="flex items-center gap-2 mb-2">
                        <Calendar className="w-4 h-4 text-blue-600" />
                        <p className="text-sm font-medium text-gray-600">
                          Date of Service
                        </p>
                      </div>
                      <p className="font-semibold text-gray-900 text-sm sm:text-base">
                        {claimData.dateOfService}
                      </p>
                    </div>
                  </div>
                  <div className="bg-gradient-to-br from-blue-50 to-white p-3 sm:p-4 rounded-lg border border-blue-100">
                    <p className="text-sm font-medium text-gray-600 mb-2">
                      Diagnosis
                    </p>
                    <p className="text-gray-900 text-sm sm:text-base">
                      {claimData.diagnosis}
                    </p>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                    <div className="bg-gradient-to-br from-blue-50 to-white p-3 sm:p-4 rounded-lg border border-blue-100">
                      <p className="text-sm font-medium text-gray-600 mb-1">
                        Procedure Code
                      </p>
                      <p className="font-semibold text-blue-700 text-sm sm:text-base">
                        {claimData.procedureCode}
                      </p>
                    </div>
                    <div className="bg-gradient-to-br from-blue-50 to-white p-3 sm:p-4 rounded-lg border border-blue-100">
                      <p className="text-sm font-medium text-gray-600 mb-1">
                        Amount
                      </p>
                      <p className="font-bold text-blue-700 text-base sm:text-lg">
                        ${claimData.claimAmount.toLocaleString()}
                      </p>
                    </div>
                  </div>
                  <div className="bg-gradient-to-br from-blue-50 to-white p-3 sm:p-4 rounded-lg border border-blue-100">
                    <p className="text-sm font-medium text-gray-600 mb-2">
                      Procedure Description
                    </p>
                    <p className="text-gray-900 text-sm sm:text-base">
                      {claimData.procedureDescription}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Provider Information */}
            <div className="bg-white rounded-xl shadow-lg border border-blue-100 overflow-hidden mb-4 sm:mb-6">
              <div className="bg-gradient-to-r from-blue-500 to-blue-600 px-4 sm:px-6 py-3 sm:py-4">
                <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
                  <Building2 className="w-5 h-5 sm:w-6 sm:h-6" />
                  Healthcare Provider Information
                </h2>
              </div>
              <div className="p-4 sm:p-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4">
                  <div className="bg-gradient-to-br from-blue-50 to-white p-3 sm:p-4 rounded-lg border border-blue-100">
                    <p className="text-sm font-medium text-gray-600 mb-2">
                      Provider Name
                    </p>
                    <p className="text-base sm:text-lg font-bold text-gray-900">
                      {claimData.provider}
                    </p>
                  </div>
                  <div className="bg-gradient-to-br from-blue-50 to-white p-3 sm:p-4 rounded-lg border border-blue-100">
                    <p className="text-sm font-medium text-gray-600 mb-2">
                      Contact Number
                    </p>
                    <p className="text-base sm:text-lg font-semibold text-gray-900">
                      {claimData.providerContact}
                    </p>
                  </div>
                  <div className="bg-gradient-to-br from-blue-50 to-white p-3 sm:p-4 rounded-lg border border-blue-100">
                    <p className="text-sm font-medium text-gray-600 mb-2">
                      Documentation Status
                    </p>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-600" />
                      <p className="font-semibold text-green-700 text-sm sm:text-base">
                        {claimData.documentationStatus}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Review Section */}
            <div className="bg-white rounded-xl shadow-lg border-2 border-blue-200 overflow-hidden">
              <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-4 sm:px-6 py-3 sm:py-4">
                <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
                  <AlertCircle className="w-5 h-5 sm:w-6 sm:h-6" />
                  Review Decision
                </h2>
              </div>
              <div className="p-4 sm:p-6 space-y-4 sm:space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2 sm:mb-3">
                      Decision <span className="text-red-500">*</span>
                    </label>
                    <select
                      value={reviewDecision}
                      onChange={(e) => setReviewDecision(e.target.value)}
                      className="w-full px-3 sm:px-4 py-2 sm:py-3 border-2 border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-gray-900 font-medium text-sm sm:text-base"
                    >
                      <option value="">Select review decision...</option>
                      <option value="approve">✓ Approve Claim</option>
                      <option value="partial">⚠ Partial Approval</option>
                      <option value="reject">✗ Reject Claim</option>
                      <option value="request_info">
                        📋 Request More Information
                      </option>
                      <option value="escalate">
                        ⬆ Escalate to Senior Reviewer
                      </option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2 sm:mb-3">
                      Approved Amount <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-500" />
                      <input
                        type="number"
                        value={approvalAmount}
                        onChange={(e) => setApprovalAmount(e.target.value)}
                        className="w-full pl-9 sm:pl-10 pr-3 sm:pr-4 py-2 sm:py-3 border-2 border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent font-bold text-gray-900 text-sm sm:text-base"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2 sm:mb-3">
                    Review Notes (Patient-Facing)
                  </label>
                  <textarea
                    value={reviewNotes}
                    onChange={(e) => setReviewNotes(e.target.value)}
                    rows={3}
                    placeholder="Enter notes that will be shared with the patient..."
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 border-2 border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none text-sm sm:text-base"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2 sm:mb-3">
                    <MessageSquare className="inline w-4 h-4 mr-1" />
                    Internal Comments (Admin Only)
                  </label>
                  <textarea
                    value={internalComments}
                    onChange={(e) => setInternalComments(e.target.value)}
                    rows={2}
                    placeholder="Enter internal notes for administrative records..."
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent resize-none bg-gray-50 text-sm sm:text-base"
                  />
                </div>

                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-4">
                  <button
                    onClick={handleSubmitReview}
                    disabled={!reviewDecision}
                    className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 sm:py-4 px-4 sm:px-6 rounded-lg font-bold text-base sm:text-lg hover:from-blue-700 hover:to-blue-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2 sm:gap-3"
                  >
                    <Send className="w-5 h-5 sm:w-6 sm:h-6" />
                    Submit Review Decision
                  </button>
                  <button className="bg-white border-2 border-blue-300 text-blue-700 py-3 sm:py-4 px-4 sm:px-6 rounded-lg font-bold text-base sm:text-lg hover:bg-blue-50 transition-colors shadow-md hover:shadow-lg flex items-center justify-center gap-2">
                    <Download className="w-5 h-5 sm:w-6 sm:h-6" />
                    Export
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
