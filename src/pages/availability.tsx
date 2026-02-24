import React, { useState } from "react";
import {
  FileText,
  Target,
  Settings,
} from "lucide-react";

const AvailabilityRulesPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const whyItMatters = [
    {
      text: "Enforce regulatory requirements",
      color: "text-blue-600",
    },
    {
      text: "Restrict sales by jurisdiction",
      color: "text-purple-600",
    },
    {
      text: "Apply underwriting guidelines",
      color: "text-green-600",
    },
    {
      text: "Control distribution channels",
      color: "text-orange-600",
    },
    {
      text: "Manage product lifecycle dates",
      color: "text-pink-600",
    },
    {
      text: "Reduce operational risk",
      color: "text-red-600",
    },
  ];

  const availabilityFactors = [
    {
      label: "State or region",
      color: "from-blue-500 to-blue-600",
    },
    {
      label: "Customer age",
      color: "from-purple-500 to-purple-600",
    },
    {
      label: "Risk characteristics",
      color: "from-red-500 to-red-600",
    },
    {
      label: "Agent vs direct channel",
      color: "from-green-500 to-green-600",
    },
    {
      label: "Effective date",
      color: "from-orange-500 to-orange-600",
    },
    {
      label: "Product eligibility rules",
      color: "from-teal-500 to-teal-600",
    },
  ];

  const examples = [
    {
      title: "Geographic Restrictions",
      description: "A rider is available only in approved states.",
      color: "from-blue-500 to-blue-600",
      badge: "State Restricted",
      badgeColor: "bg-blue-100 text-blue-700 border-blue-300",
    },
    {
      title: "Time-based Limitations",
      description:
        "A product version is no longer sellable after a specific date.",
      color: "from-purple-500 to-purple-600",
      badge: "Date Controlled",
      badgeColor: "bg-purple-100 text-purple-700 border-purple-300",
    },
    {
      title: "Demographic Eligibility",
      description: "Certain coverages are limited to defined age ranges.",
      color: "from-green-500 to-green-600",
      badge: "Age Restricted",
      badgeColor: "bg-green-100 text-green-700 border-green-300",
    },
    {
      title: "Channel Management",
      description: "Agents may see different offerings than online customers.",
      color: "from-orange-500 to-orange-600",
      badge: "Channel Specific",
      badgeColor: "bg-orange-100 text-orange-700 border-orange-300",
    },
  ];

  const stats = [
    {
      label: "Availability Factors",
      value: availabilityFactors.length,
      icon: Settings,
      color: "blue",
    },
    {
      label: "Examples",
      value: examples.length,
      icon: FileText,
      color: "green",
    },
    {
      label: "Rules Defined",
      value: whyItMatters.length,
      icon: Target,
      color: "indigo",
    },
  ];

  const filteredExamples = examples.filter((ex) =>
    ex.title.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div className="flex min-h-screen bg-white">
      <div className="flex-1">
        <div className="min-h-screen bg-gradient-to-br from-white via-blue-50 to-white">
          {/* Header */}
          <div className="bg-white border-b border-blue-100 shadow-sm">
            <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  Availability Rules Dashboard
                </h1>
                <p className="text-sm text-gray-600">
                  Overview of product availability and compliance rules
                </p>
              </div>
              <div className="flex gap-3">
                <button className="flex items-center gap-2 px-4 py-2 bg-white border border-blue-200 text-blue-700 rounded-lg hover:bg-blue-50">
                  Filter Rules
                </button>
              </div>
            </div>
          </div>

          <div className="max-w-7xl mx-auto px-6 py-6">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              {stats.map((stat, idx) => {
                const Icon = stat.icon;
                const colorClasses = {
                  blue: "bg-blue-50 text-blue-600",
                  green: "bg-green-50 text-green-600",
                  indigo: "bg-indigo-50 text-indigo-600",
                };
                return (
                  <div
                    key={idx}
                    className="bg-white rounded-xl p-5 shadow-sm border border-blue-100 hover:shadow-md"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600 mb-1">{stat.label}</p>
                        <p className="text-3xl font-bold text-gray-900">
                          {stat.value}
                        </p>
                      </div>
                      <div
                        className={`p-3 rounded-lg ${colorClasses[stat.color as keyof typeof colorClasses]}`}
                      >
                        <Icon size={24} />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Search Examples */}
            <div className="mb-6 flex gap-4 items-center">
              <div className="relative w-full sm:w-80">
                <input
                  type="text"
                  placeholder="Search examples..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-3 pr-4 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Examples Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {filteredExamples.length === 0 ? (
                <p className="text-center col-span-full text-gray-500">
                  No examples found
                </p>
              ) : (
                filteredExamples.map((example, idx) => {
                  return (
                    <div
                      key={idx}
                      className="relative bg-white rounded-xl border-2 border-gray-200 hover:border-gray-300 transition-all shadow-sm hover:shadow-md overflow-hidden"
                    >
                      <div
                        className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${example.color}`}
                      ></div>
                      <div className="p-6 pt-8">
                        <div className="flex items-start justify-between mb-4">
                          <div
                            className={`p-3 bg-gradient-to-br ${example.color} rounded-xl shadow-lg`}
                          >
                            <div className="w-6 h-6 text-white" />
                          </div>
                          <span
                            className={`px-3 py-1 text-xs font-bold rounded-full border ${example.badgeColor}`}
                          >
                            {example.badge}
                          </span>
                        </div>
                        <h3 className="text-lg font-bold text-gray-900 mb-2">
                          {example.title}
                        </h3>
                        <p className="text-gray-600 leading-relaxed">
                          {example.description}
                        </p>
                      </div>
                    </div>
                  );
                })
              )}
            </div>

            {/* Why It Matters Section */}
            <div className="mt-12">
              <h2 className="text-xl font-bold text-gray-900 mb-4">
                Why Availability Rules Matter
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {whyItMatters.map((item, idx) => {
                  return (
                    <div
                      key={idx}
                      className="flex items-start gap-3 p-4 bg-gradient-to-r from-gray-50 to-blue-50 rounded-lg border border-gray-200 hover:border-blue-300 transition-colors"
                    >
                      <div className="p-2 bg-white rounded-lg shadow-sm flex-shrink-0">
                        <div className={`w-5 h-5 ${item.color}`} />
                      </div>
                      <span className="text-gray-800 font-medium pt-0.5">
                        {item.text}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AvailabilityRulesPage;

