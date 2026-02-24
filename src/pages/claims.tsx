import { useState } from "react";
import {
  FileText,
  User,
  Calendar,
  DollarSign,
  AlertCircle,
  Check,
  X,
  Clock,
  Upload,
  Search,
  Filter,
  Download,
  UserCheck,
  CheckCircle,
  XCircle,
  Eye,
  Edit,
} from "lucide-react";

interface UserType {
  name: string;
  email: string;
}

interface Policy {
  policyNumber: string;
  type: string;
}

interface Evidence {
  type: string;
  url: string;
  description: string;
  uploadedAt: string;
}

interface Note {
  author: UserType;
  content: string;
  createdAt: string;
}

interface FraudScore {
  score: number;
  reasons: string[];
  checkedAt: string;
}

interface Claim {
  _id: string;
  claimNumber: string;
  policy: Policy;
  user: UserType;
  type: string;
  description: string;
  incidentDate: string;
  reportedDate: string;
  amountClaimed: number;
  amountApproved?: number;
  status: string;
  assignee?: UserType;
  evidence: Evidence[];
  notes: Note[];
  fraudScore: FraudScore;
}

const ClaimManagementScreen = () => {
  const [selectedClaim, setSelectedClaim] = useState<Claim | null>(null);
  const [activeTab, setActiveTab] = useState("details");
  const [filterStatus, setFilterStatus] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [showStatusMenu, setShowStatusMenu] = useState(false);
  const [showAssignMenu, setShowAssignMenu] = useState(false);

  const claims: Claim[] = [
    {
      _id: "1",
      claimNumber: "CLM384756",
      policy: { policyNumber: "POL-2024-001", type: "Auto Insurance" },
      user: { name: "John Doe", email: "john.doe@example.com" },
      type: "Vehicle Damage",
      description: "Front bumper damaged in parking lot collision",
      incidentDate: "2024-10-01",
      reportedDate: "2024-10-02",
      amountClaimed: 3500,
      amountApproved: 3200,
      status: "approved",
      assignee: { name: "Sarah Johnson", email: "sarah@example.com" },
      evidence: [
        {
          type: "image",
          url: "#",
          description: "Front damage photo",
          uploadedAt: "2024-10-02",
        },
        {
          type: "document",
          url: "#",
          description: "Police report",
          uploadedAt: "2024-10-02",
        },
      ],
      notes: [
        {
          author: { name: "Sarah Johnson", email: "sarah@example.com" },
          content: "Initial review completed. Damage assessment matches claim.",
          createdAt: "2024-10-03",
        },
      ],
      fraudScore: { score: 12, reasons: [], checkedAt: "2024-10-02" },
    },
    {
      _id: "2",
      claimNumber: "CLM492831",
      policy: { policyNumber: "POL-2024-087", type: "Home Insurance" },
      user: { name: "Emily Smith", email: "emily.smith@example.com" },
      type: "Water Damage",
      description: "Pipe burst causing water damage to living room",
      incidentDate: "2024-10-08",
      reportedDate: "2024-10-08",
      amountClaimed: 8500,
      status: "under_review",
      assignee: { name: "Michael Chen", email: "michael@example.com" },
      evidence: [
        {
          type: "image",
          url: "#",
          description: "Water damage photos",
          uploadedAt: "2024-10-08",
        },
      ],
      notes: [
        {
          author: { name: "Michael Chen", email: "michael@example.com" },
          content:
            "Scheduled inspection for Oct 15. Waiting for plumber report.",
          createdAt: "2024-10-09",
        },
      ],
      fraudScore: { score: 8, reasons: [], checkedAt: "2024-10-08" },
    },
  ];

  const admins: UserType[] = [
    { name: "Sarah Johnson", email: "sarah@example.com" },
    { name: "Michael Chen", email: "michael@example.com" },
    { name: "David Williams", email: "david@example.com" },
    { name: "Jennifer Davis", email: "jennifer@example.com" },
  ];

  const statuses = [
    "submitted",
    "under_review",
    "approved",
    "rejected",
    "paid",
    "closed",
  ];

  const filteredClaims = claims.filter((claim) => {
    const matchesStatus =
      filterStatus === "all" || claim.status === filterStatus;
    const matchesSearch =
      claim.claimNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      claim.user.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      submitted: "bg-blue-100 text-blue-800",
      under_review: "bg-yellow-100 text-yellow-800",
      approved: "bg-green-100 text-green-800",
      rejected: "bg-red-100 text-red-800",
      paid: "bg-purple-100 text-purple-800",
      closed: "bg-gray-100 text-gray-800",
    };
    return colors[status] || "bg-gray-100 text-gray-800";
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "approved":
        return <Check className="w-4 h-4" />;
      case "rejected":
        return <X className="w-4 h-4" />;
      case "under_review":
        return <Clock className="w-4 h-4" />;
      case "paid":
        return <DollarSign className="w-4 h-4" />;
      default:
        return <AlertCircle className="w-4 h-4" />;
    }
  };

  const getFraudRiskLevel = (score: number) => {
    if (score < 20)
      return { label: "Low", color: "text-green-600", bg: "bg-green-50" };
    if (score < 50)
      return { label: "Medium", color: "text-yellow-600", bg: "bg-yellow-50" };
    return { label: "High", color: "text-red-600", bg: "bg-red-50" };
  };

  const stats = {
    total: claims.length,
    pending: claims.filter((c) => c.status === "submitted").length,
    underReview: claims.filter((c) => c.status === "under_review").length,
    approved: claims.filter((c) => c.status === "approved").length,
    totalAmount: claims.reduce((sum, c) => sum + c.amountClaimed, 0),
  };

  const AdminActions = () => (
    <div className="flex flex-wrap gap-2 mb-4">
      <div className="relative">
        <button
          onClick={() => setShowStatusMenu(!showStatusMenu)}
          className="px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors font-medium flex items-center gap-2"
        >
          <Edit className="w-4 h-4" />
          Change Status
        </button>
        {showStatusMenu && (
          <div className="absolute top-full left-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-10 min-w-[200px]">
            {statuses.map((status) => (
              <button
                key={status}
                onClick={() => setShowStatusMenu(false)}
                className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50 first:rounded-t-lg last:rounded-b-lg flex items-center gap-2"
              >
                <span
                  className={`w-2 h-2 rounded-full ${getStatusColor(status).split(" ")[0]}`}
                />
                {status.replace("_", " ")}
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="relative">
        <button
          onClick={() => setShowAssignMenu(!showAssignMenu)}
          className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium flex items-center gap-2"
        >
          <UserCheck className="w-4 h-4" />
          Reassign
        </button>
        {showAssignMenu && (
          <div className="absolute top-full left-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-10 min-w-[200px]">
            {admins.map((admin, idx) => (
              <button
                key={idx}
                onClick={() => setShowAssignMenu(false)}
                className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50 first:rounded-t-lg last:rounded-b-lg"
              >
                {admin.name}
              </button>
            ))}
          </div>
        )}
      </div>

      <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium flex items-center gap-2">
        <CheckCircle className="w-4 h-4" />
        Approve
      </button>
      <button className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium flex items-center gap-2">
        <XCircle className="w-4 h-4" />
        Reject
      </button>
    </div>
  );

  const ClaimHeader = ({ claim }: { claim: Claim }) => (
    <div className="bg-white border-b border-gray-200 p-6">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-1">
            {claim.claimNumber}
          </h2>
          <p className="text-gray-600">{claim.type}</p>
        </div>
        <span
          className={`px-3 py-1.5 rounded-full text-sm font-medium flex items-center gap-2 ${getStatusColor(claim.status)}`}
        >
          {getStatusIcon(claim.status)}
          {claim.status.replace("_", " ").toUpperCase()}
        </span>
      </div>
      <AdminActions />
      <div className="grid grid-cols-2 gap-4 text-sm">
        <div className="flex items-center gap-2 text-gray-600">
          <User className="w-4 h-4" />
          <span className="font-medium">{claim.user.name}</span>
          <span className="text-gray-400">•</span>
          <span>{claim.user.email}</span>
        </div>
        <div className="flex items-center gap-2 text-gray-600">
          <FileText className="w-4 h-4" />
          <span>{claim.policy.policyNumber}</span>
          <span className="text-gray-400">•</span>
          <span>{claim.policy.type}</span>
        </div>
        <div className="flex items-center gap-2 text-gray-600">
          <Calendar className="w-4 h-4" />
          <span>
            Incident: {new Date(claim.incidentDate).toLocaleDateString()}
          </span>
        </div>
        <div className="flex items-center gap-2 text-gray-600">
          <Calendar className="w-4 h-4" />
          <span>
            Reported: {new Date(claim.reportedDate).toLocaleDateString()}
          </span>
        </div>
      </div>
    </div>
  );

  const DetailsTab = ({ claim }: { claim: Claim }) => (
    <div className="space-y-6">
      <div>
        <h3 className="text-sm font-semibold text-gray-900 mb-2">
          Description
        </h3>
        <p className="text-gray-700 bg-white p-4 rounded-lg border border-gray-200">
          {claim.description}
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <h3 className="text-sm font-semibold text-gray-900 mb-2">
            Amount Claimed
          </h3>
          <p className="text-3xl font-bold text-gray-900">
            ${claim.amountClaimed.toLocaleString()}
          </p>
        </div>
        {claim.amountApproved ? (
          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <h3 className="text-sm font-semibold text-gray-900 mb-2">
              Amount Approved
            </h3>
            <p className="text-3xl font-bold text-green-600">
              ${claim.amountApproved.toLocaleString()}
            </p>
          </div>
        ) : (
          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <h3 className="text-sm font-semibold text-gray-900 mb-3">
              Approve Amount
            </h3>
            <div className="flex gap-2">
              <input
                type="number"
                placeholder="Enter amount"
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900"
              />
              <button className="px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 font-medium">
                Set
              </button>
            </div>
          </div>
        )}
      </div>

      <div
        className={`p-4 rounded-lg border-2 ${claim.fraudScore.score >= 50 ? "border-red-200 bg-red-50" : claim.fraudScore.score >= 20 ? "border-yellow-200 bg-yellow-50" : "border-green-200 bg-green-50"}`}
      >
        <h3 className="text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2">
          <AlertCircle className="w-5 h-5" />
          Fraud Risk Assessment
        </h3>
        <div className="flex items-center justify-between mb-3">
          <div>
            <p className="text-sm text-gray-600 mb-1">Risk Score</p>
            <p
              className={`text-3xl font-bold ${getFraudRiskLevel(claim.fraudScore.score).color}`}
            >
              {claim.fraudScore.score}/100
            </p>
          </div>
          <div
            className={`px-4 py-2 rounded-lg font-semibold ${getFraudRiskLevel(claim.fraudScore.score).color} ${getFraudRiskLevel(claim.fraudScore.score).bg}`}
          >
            {getFraudRiskLevel(claim.fraudScore.score).label} Risk
          </div>
        </div>
        {claim.fraudScore.reasons.length > 0 && (
          <div className="bg-white p-3 rounded-lg">
            <p className="text-xs font-semibold text-gray-700 mb-2">
              Risk Factors:
            </p>
            <ul className="text-sm text-gray-600 space-y-1">
              {claim.fraudScore.reasons.map((reason, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-orange-500 mt-0.5">•</span>
                  {reason}
                </li>
              ))}
            </ul>
          </div>
        )}
        <p className="text-xs text-gray-500 mt-2">
          Last checked: {new Date(claim.fraudScore.checkedAt).toLocaleString()}
        </p>
      </div>

      {claim.assignee && (
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <h3 className="text-sm font-semibold text-gray-900 mb-2">
            Assigned To
          </h3>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-900 font-semibold">
              {claim.assignee.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </div>
            <div>
              <p className="font-medium text-gray-900">{claim.assignee.name}</p>
              <p className="text-xs text-gray-500">Claims Adjuster</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  const EvidenceTab = ({ claim }: { claim: Claim }) => (
    <div className="space-y-4">
      {claim.evidence.length > 0 ? (
        claim.evidence.map((item, idx) => (
          <div
            key={idx}
            className="bg-white p-4 rounded-lg border border-gray-200 flex items-start gap-3 hover:shadow-sm transition-shadow"
          >
            <div className="w-12 h-12 rounded-lg bg-gray-100 flex items-center justify-center flex-shrink-0">
              {item.type === "image" ? (
                <Eye className="w-6 h-6 text-gray-900" />
              ) : (
                <FileText className="w-6 h-6 text-gray-900" />
              )}
            </div>
            <div className="flex-1">
              <h4 className="font-medium text-gray-900 mb-1">
                {item.description}
              </h4>
              <p className="text-sm text-gray-600 mb-2">
                Type: <span className="font-medium">{item.type}</span>
              </p>
              <p className="text-xs text-gray-500">
                Uploaded: {new Date(item.uploadedAt).toLocaleDateString()}
              </p>
            </div>
            <button className="px-4 py-2 text-sm font-medium text-gray-900 hover:bg-gray-100 rounded-lg transition-colors">
              View
            </button>
          </div>
        ))
      ) : (
        <div className="text-center py-12 bg-white rounded-lg border border-gray-200">
          <Upload className="w-12 h-12 text-gray-300 mx-auto mb-3" />
          <p className="text-gray-500">No evidence uploaded yet</p>
        </div>
      )}
    </div>
  );

  const NotesTab = ({ claim }: { claim: Claim }) => (
    <div className="space-y-4">
      {claim.notes.map((note, idx) => (
        <div
          key={idx}
          className="bg-white p-4 rounded-lg border border-gray-200"
        >
          <div className="flex items-start gap-3 mb-2">
            <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-900 font-semibold text-sm flex-shrink-0">
              {note.author.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <span className="font-medium text-gray-900">
                  {note.author.name}
                </span>
                <span className="text-xs text-gray-500">
                  {new Date(note.createdAt).toLocaleString()}
                </span>
              </div>
              <p className="text-gray-700">{note.content}</p>
            </div>
          </div>
        </div>
      ))}

      <div className="bg-white p-4 rounded-lg border border-gray-200">
        <h4 className="text-sm font-semibold text-gray-900 mb-3">
          Add Internal Note
        </h4>
        <textarea
          placeholder="Add notes for internal review..."
          className="w-full p-3 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-gray-900 focus:border-transparent mb-3"
        />
        <button className="px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors font-medium">
          Add Note
        </button>
      </div>
    </div>
  );

  const TabContent = ({ claim }: { claim: Claim }) => {
    switch (activeTab) {
      case "details":
        return <DetailsTab claim={claim} />;
      case "evidence":
        return <EvidenceTab claim={claim} />;
      case "notes":
        return <NotesTab claim={claim} />;
      default:
        return <DetailsTab claim={claim} />;
    }
  };

  return (
    <div className="bg-white border-b border-gray-200 p-6 shadow-sm">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold mb-1 text-gray-900">Claims </h1>
            <p className="text-gray-600">Manage and review insurance claims</p>
          </div>
          <button className="px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors font-medium flex items-center gap-2">
            <Download className="w-4 h-4" />
            Export
          </button>
        </div>

        <div className="grid grid-cols-5 gap-4">
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
            <p className="text-gray-600 text-sm mb-1">Total Claims</p>
            <p className="text-3xl font-bold text-gray-900">{stats.total}</p>
          </div>
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
            <p className="text-gray-600 text-sm mb-1">Pending</p>
            <p className="text-3xl font-bold text-gray-900">{stats.pending}</p>
          </div>
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
            <p className="text-gray-600 text-sm mb-1">Under Review</p>
            <p className="text-3xl font-bold text-gray-900">
              {stats.underReview}
            </p>
          </div>
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
            <p className="text-gray-600 text-sm mb-1">Approved</p>
            <p className="text-3xl font-bold text-gray-900">{stats.approved}</p>
          </div>
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
            <p className="text-gray-600 text-sm mb-1">Total Amount</p>
            <p className="text-2xl font-bold text-gray-900">
              ${(stats.totalAmount / 1000).toFixed(1)}k
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1">
            <div className="bg-gray-50 rounded-lg border border-gray-200">
              <div className="p-4 border-b border-gray-200 space-y-3">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search claims..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                  />
                </div>
                <div className="flex items-center gap-2">
                  <Filter className="w-4 h-4 text-gray-500" />
                  <select
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent text-sm"
                  >
                    <option value="all">All Status</option>
                    {statuses.map((status) => (
                      <option key={status} value={status}>
                        {status.replace("_", " ")}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="overflow-y-auto max-h-[calc(100vh-400px)] p-4 space-y-3">
                {filteredClaims.map((claim) => (
                  <div
                    key={claim._id}
                    onClick={() => setSelectedClaim(claim)}
                    className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                      selectedClaim?._id === claim._id
                        ? "border-gray-900 bg-gray-50"
                        : "border-gray-200 bg-white hover:border-gray-300 hover:shadow-sm"
                    }`}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <span className="font-mono text-sm font-semibold text-gray-900">
                        {claim.claimNumber}
                      </span>
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1 ${getStatusColor(claim.status)}`}
                      >
                        {getStatusIcon(claim.status)}
                        {claim.status.replace("_", " ")}
                      </span>
                    </div>
                    <p className="text-sm font-medium text-gray-900 mb-1">
                      {claim.type}
                    </p>
                    <p className="text-xs text-gray-600 mb-2">
                      {claim.user.name}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-500">
                        {new Date(claim.reportedDate).toLocaleDateString()}
                      </span>
                      <span className="text-sm font-bold text-gray-900">
                        ${claim.amountClaimed.toLocaleString()}
                      </span>
                    </div>
                    {claim.fraudScore.score >= 20 && (
                      <div className="mt-2 pt-2 border-t border-gray-200">
                        <div className="flex items-center gap-1 text-xs">
                          <AlertCircle className="w-3 h-3 text-orange-500" />
                          <span className="text-orange-600 font-medium">
                            Requires attention
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:col-span-2">
            {selectedClaim ? (
              <div className="bg-gray-50 rounded-lg border border-gray-200 overflow-hidden">
                <ClaimHeader claim={selectedClaim} />

                <div className="bg-white border-b border-gray-200">
                  <div className="flex gap-1 px-6">
                    {["details", "evidence", "notes"].map((tab) => (
                      <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`px-4 py-3 text-sm font-medium capitalize transition-colors ${
                          activeTab === tab
                            ? "text-gray-900 border-b-2 border-gray-900"
                            : "text-gray-600 hover:text-gray-900"
                        }`}
                      >
                        {tab}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="p-6">
                  <TabContent claim={selectedClaim} />
                </div>
              </div>
            ) : (
              <div className="bg-gray-50 rounded-lg border border-gray-200 p-12 text-center">
                <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500 text-lg font-medium mb-2">
                  No Claim Selected
                </p>
                <p className="text-gray-400 text-sm">
                  Select a claim from the list to view and manage details
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClaimManagementScreen;
