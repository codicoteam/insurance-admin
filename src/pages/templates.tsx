import { useState } from "react";
import {
  FileText,
  Shield,
  AlertCircle,
  CheckCircle,
  Database,
  Download,
  Mail,
  Clock,
  Lock,
  Code,
  Zap,
  Target,
  Settings,
  Search,
  Layers,
} from "lucide-react";

export default function DocumentTemplatesPage() {
  const [selectedTab, setSelectedTab] = useState("overview");
  const [searchTerm, setSearchTerm] = useState("");

  const whyTemplatesMatter = [
    {
      icon: Shield,
      text: "Ensure legal and regulatory compliance",
      color: "text-blue-600",
    },
    {
      icon: CheckCircle,
      text: "Maintain consistent language",
      color: "text-green-600",
    },
    { icon: Target, text: "Protect brand standards", color: "text-purple-600" },
    { icon: AlertCircle, text: "Reduce manual errors", color: "text-red-600" },
    {
      icon: Zap,
      text: "Enable automated document generation",
      color: "text-orange-600",
    },
    {
      icon: Lock,
      text: "Support auditing and traceability",
      color: "text-teal-600",
    },
  ];

  const commonDocuments = [
    {
      name: "Policy contract",
      icon: Shield,
      color: "from-blue-500 to-blue-600",
    },
    {
      name: "Welcome letter",
      icon: Mail,
      color: "from-green-500 to-green-600",
    },
    {
      name: "Renewal notice",
      icon: Clock,
      color: "from-purple-500 to-purple-600",
    },
    {
      name: "Cancellation notice",
      icon: AlertCircle,
      color: "from-red-500 to-red-600",
    },
    {
      name: "Claim acknowledgement",
      icon: CheckCircle,
      color: "from-orange-500 to-orange-600",
    },
    {
      name: "Billing statement",
      icon: FileText,
      color: "from-teal-500 to-teal-600",
    },
  ];

  const workflowSteps = [
    {
      step: 1,
      title: "Select template",
      description: "Choose approved template for document type",
      icon: FileText,
      color: "from-blue-500 to-blue-600",
    },
    {
      step: 2,
      title: "Pull policy & customer data",
      description: "Retrieve relevant information from database",
      icon: Database,
      color: "from-purple-500 to-purple-600",
    },
    {
      step: 3,
      title: "Merge placeholders",
      description: "Replace template variables with actual data",
      icon: Code,
      color: "from-pink-500 to-pink-600",
    },
    {
      step: 4,
      title: "Generate PDF or email",
      description: "Create final formatted document",
      icon: Download,
      color: "from-green-500 to-green-600",
    },
    {
      step: 5,
      title: "Deliver to customer",
      description: "Send via mail, email, or customer portal",
      icon: Mail,
      color: "from-orange-500 to-orange-600",
    },
  ];

  const stats = [
    {
      label: "Templates",
      value: commonDocuments.length,
      icon: Layers,
      color: "blue",
    },
    {
      label: "Workflow Steps",
      value: workflowSteps.length,
      icon: Settings,
      color: "green",
    },
    {
      label: "Compliance Points",
      value: whyTemplatesMatter.length,
      icon: Shield,
      color: "indigo",
    },
    {
      label: "Ready for Use",
      value: "All",
      icon: CheckCircle,
      color: "purple",
    },
  ];

  // Filtered documents for search
  const filteredDocs = commonDocuments.filter((doc) =>
    doc.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-white via-blue-50 to-white">
      {/* Header */}
      <div className="bg-white border-b border-blue-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Document Templates
            </h1>
            <p className="text-sm text-gray-600 mt-1">
              Manage and generate standardized insurance documents
            </p>
          </div>
          <div className="relative w-64">
            <Search
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={18}
            />
            <input
              type="text"
              placeholder="Search documents..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-6 space-y-6">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat, idx) => (
            <div
              key={idx}
              className="bg-white rounded-xl p-5 shadow-sm border border-blue-100 hover:shadow-md transition-shadow flex items-center justify-between"
            >
              <div>
                <p className="text-sm text-gray-600 mb-1">{stat.label}</p>
                <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
              </div>
              <div
                className={`p-3 rounded-lg ${
                  stat.color === "blue"
                    ? "bg-blue-50 text-blue-600"
                    : stat.color === "green"
                      ? "bg-green-50 text-green-600"
                      : stat.color === "indigo"
                        ? "bg-indigo-50 text-indigo-600"
                        : "bg-purple-50 text-purple-600"
                }`}
              >
                <stat.icon size={24} />
              </div>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-xl shadow-sm border border-blue-100">
          <div className="p-4 border-b border-blue-100 flex gap-2">
            <button
              onClick={() => setSelectedTab("overview")}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${selectedTab === "overview" ? "bg-blue-600 text-white" : "bg-blue-50 text-blue-700 hover:bg-blue-100"}`}
            >
              Overview
            </button>
            <button
              onClick={() => setSelectedTab("common")}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${selectedTab === "common" ? "bg-blue-600 text-white" : "bg-blue-50 text-blue-700 hover:bg-blue-100"}`}
            >
              Common Documents
            </button>
            <button
              onClick={() => setSelectedTab("workflow")}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${selectedTab === "workflow" ? "bg-blue-600 text-white" : "bg-blue-50 text-blue-700 hover:bg-blue-100"}`}
            >
              Workflow
            </button>
            <button
              onClick={() => setSelectedTab("compliance")}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${selectedTab === "compliance" ? "bg-blue-600 text-white" : "bg-blue-50 text-blue-700 hover:bg-blue-100"}`}
            >
              Compliance
            </button>
          </div>

          <div className="p-6 space-y-6">
            {selectedTab === "overview" && (
              <div>
                <p className="text-gray-700">
                  A document template is a pre-approved structure for generating
                  customer documents automatically.
                </p>
              </div>
            )}

            {selectedTab === "common" && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredDocs.length === 0 ? (
                  <p className="text-gray-500 col-span-full">
                    No documents match your search.
                  </p>
                ) : (
                  filteredDocs.map((doc, idx) => {
                    const Icon = doc.icon;
                    return (
                      <div
                        key={idx}
                        className="group relative overflow-hidden bg-white rounded-xl border-2 border-gray-200 hover:border-gray-300 transition-all shadow-sm hover:shadow-md p-5 flex items-center gap-3"
                      >
                        <div
                          className={`p-2.5 bg-gradient-to-br ${doc.color} rounded-lg shadow-sm flex-shrink-0`}
                        >
                          <Icon className="w-5 h-5 text-white" />
                        </div>
                        <span className="text-gray-900 font-semibold">
                          {doc.name}
                        </span>
                      </div>
                    );
                  })
                )}
              </div>
            )}

            {selectedTab === "workflow" && (
              <div className="space-y-4">
                {workflowSteps.map((step, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl border border-gray-200 shadow-sm"
                  >
                    <div
                      className={`flex-shrink-0 w-12 h-12 bg-gradient-to-br ${step.color} rounded-xl flex items-center justify-center text-white font-bold`}
                    >
                      {step.step}
                    </div>
                    <div>
                      <h3 className="text-lg font-bold">{step.title}</h3>
                      <p className="text-gray-600">{step.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {selectedTab === "compliance" && (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {whyTemplatesMatter.map((item, idx) => {
                  const Icon = item.icon;
                  return (
                    <div
                      key={idx}
                      className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg border border-gray-200 shadow-sm"
                    >
                      <div className="p-2 bg-white rounded-lg shadow-sm flex-shrink-0">
                        <Icon className={`w-5 h-5 ${item.color}`} />
                      </div>
                      <span className="text-gray-800 font-medium">
                        {item.text}
                      </span>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
