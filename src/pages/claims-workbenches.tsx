import { useState } from "react";
import {
  Search,
  Menu,
  Shield,
  Clock,
  CheckCircle,
  AlertTriangle,
  Briefcase,
} from "lucide-react";

interface WorkbenchClaim {
  id: string;
  claimNumber: string;
  policyholder: string;
  type: string;
  amount: number;
  status: "in_progress" | "pending_review" | "ready_for_decision" | "on_hold";
  daysInWorkbench: number;
  adjuster: string;
  lastAction: string;
  nextAction: string;
}

const ClaimsWorkbenchesScreen = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const claims: WorkbenchClaim[] = [
    {
      id: "1",
      claimNumber: "CLM384756",
      policyholder: "John Doe",
      type: "Auto Collision",
      amount: 3500,
      status: "in_progress",
      daysInWorkbench: 3,
      adjuster: "Sarah Johnson",
      lastAction: "Document review completed",
      nextAction: "Contact repair shop",
    },
    {
      id: "2",
      claimNumber: "CLM492831",
      policyholder: "Emily Smith",
      type: "Property Damage",
      amount: 8500,
      status: "pending_review",
      daysInWorkbench: 5,
      adjuster: "Michael Chen",
      lastAction: "Inspection report received",
      nextAction: "Review findings",
    },
    {
      id: "3",
      claimNumber: "CLM583947",
      policyholder: "Michael Johnson",
      type: "Theft",
      amount: 5200,
      status: "ready_for_decision",
      daysInWorkbench: 7,
      adjuster: "David Williams",
      lastAction: "Police report verified",
      nextAction: "Make payment decision",
    },
    {
      id: "4",
      claimNumber: "CLM672345",
      policyholder: "Sarah Williams",
      type: "Auto Fire",
      amount: 12500,
      status: "on_hold",
      daysInWorkbench: 10,
      adjuster: "Jennifer Davis",
      lastAction: "Waiting for docs",
      nextAction: "Follow up",
    },
  ];

  const getStatusColor = (s: string) =>
    ({
      in_progress: "bg-blue-100 text-blue-700",
      pending_review: "bg-yellow-100 text-yellow-700",
      ready_for_decision: "bg-green-100 text-green-700",
      on_hold: "bg-gray-100 text-gray-700",
    })[s] || "bg-gray-100 text-gray-700";
  const getStatusIcon = (s: string) =>
    ({
      in_progress: Clock,
      pending_review: AlertTriangle,
      ready_for_decision: CheckCircle,
      on_hold: Briefcase,
    })[s] || Clock;

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
              Claims Workbenches
            </h1>
            <p className="text-gray-600">
              Active claim processing and adjuster work areas
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
          {filteredClaims.map((claim) => {
            const StatusIcon = getStatusIcon(claim.status);
            return (
              <div
                key={claim.id}
                className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-4 hover:shadow-md"
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="text-blue-600 font-bold text-lg">
                        {claim.claimNumber}
                      </span>
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1 ${getStatusColor(claim.status)}`}
                      >
                        <StatusIcon className="w-4 h-4" />
                        {claim.status.replace(/_/g, " ")}
                      </span>
                      <span className="text-gray-500 text-sm flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {claim.daysInWorkbench} days
                      </span>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2">
                        <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center font-semibold">
                          {claim.policyholder
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </div>
                        <div>
                          <p className="font-medium">{claim.policyholder}</p>
                          <p className="text-sm text-gray-500">{claim.type}</p>
                        </div>
                      </div>
                      <div className="h-8 w-px bg-gray-200" />
                      <div>
                        <p className="text-sm text-gray-500">Amount</p>
                        <p className="font-semibold">
                          ${claim.amount.toLocaleString()}
                        </p>
                      </div>
                      <div className="h-8 w-px bg-gray-200" />
                      <div>
                        <p className="text-sm text-gray-500">Adjuster</p>
                        <p className="font-medium">{claim.adjuster}</p>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium">
                      Open Workbench
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ClaimsWorkbenchesScreen;
