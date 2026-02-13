import { useState } from "react";
import {
  Search,
  Filter,
  Download,
  Plus,
  Edit,
  Trash2,
  Beaker,
  Menu,
  CheckCircle,
  TrendingUp,
} from "lucide-react";
import InsuranceSidebar from "../Components/sidebar";

interface Experiment {
  id: string;
  name: string;
  type: string;
  status: "running" | "completed" | "draft" | "paused";
  startDate: string | null;
  endDate: string | null;
  sampleSize: number;
  conversionRate: number;
  uplift: number | null;
  participants: number;
  confidence: number | null;
}

const PricingExperiments = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  const experiments: Experiment[] = [
    {
      id: "EXP-001",
      name: "Auto Premium - Dynamic Pricing",
      type: "A/B Test",
      status: "running",
      startDate: "2024-10-01",
      endDate: null,
      sampleSize: 5000,
      conversionRate: 12.5,
      uplift: 8.2,
      participants: 2500,
      confidence: 95,
    },
    {
      id: "EXP-002",
      name: "Homeowners - Tiered Discounts",
      type: "Multivariate",
      status: "running",
      startDate: "2024-09-15",
      endDate: null,
      sampleSize: 3000,
      conversionRate: 14.2,
      uplift: 12.5,
      participants: 1800,
      confidence: 92,
    },
    {
      id: "EXP-003",
      name: "Commercial - Risk Score Pricing",
      type: "A/B Test",
      status: "completed",
      startDate: "2024-07-01",
      endDate: "2024-09-30",
      sampleSize: 2000,
      conversionRate: 18.5,
      uplift: 15.3,
      participants: 2000,
      confidence: 98,
    },
    {
      id: "EXP-004",
      name: "Umbrella - Bundle Discount",
      type: "A/B Test",
      status: "paused",
      startDate: "2024-08-01",
      endDate: null,
      sampleSize: 1500,
      conversionRate: 9.8,
      uplift: -2.1,
      participants: 750,
      confidence: 78,
    },
    {
      id: "EXP-005",
      name: "Cyber - Usage-Based Pricing",
      type: "Pilot",
      status: "draft",
      startDate: null,
      endDate: null,
      sampleSize: 1000,
      conversionRate: 0,
      uplift: null,
      participants: 0,
      confidence: null,
    },
  ];

  const stats = {
    activeExperiments: 2,
    completedTests: 1,
    avgUplift: 11.5,
    totalParticipants: 7050,
  };

  const filteredExperiments = experiments.filter((exp) => {
    const matchesSearch = exp.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === "all" || exp.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status: string) => {
    const styles: Record<string, string> = {
      running: "bg-green-100 text-green-700",
      completed: "bg-blue-100 text-blue-700",
      draft: "bg-gray-100 text-gray-700",
      paused: "bg-amber-100 text-amber-700",
    };
    return (
      <span
        className={`px-2.5 py-1 rounded-full text-xs font-medium ${styles[status] || styles.draft}`}
      >
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  const getUpliftBadge = (uplift: number | null) => {
    if (uplift === null) return <span className="text-gray-400">-</span>;
    if (uplift > 0)
      return <span className="text-green-600 font-semibold">+{uplift}%</span>;
    return <span className="text-red-600 font-semibold">{uplift}%</span>;
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <InsuranceSidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />
      <div className="flex-1 lg:ml-0">
        <div className="lg:hidden bg-white border-b border-gray-200 p-4">
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
                <Beaker className="w-4 h-4 text-white" />
              </div>
              <h1 className="text-lg font-bold text-gray-900">InsureCore</h1>
            </div>
          </div>
        </div>
        <div className="p-4 lg:p-6">
          <div className="mb-8">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
              <div>
                <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">
                  Pricing Experiments
                </h1>
                <p className="text-gray-600 mt-1">
                  A/B tests and multivariate experiments for pricing
                  optimization
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-3">
                <button className="px-4 py-2.5 bg-white border border-gray-200 rounded-lg text-gray-700 font-medium hover:bg-gray-50 flex items-center gap-2">
                  <Filter className="w-4 h-4" />
                  <span>Filter</span>
                </button>
                <button className="px-4 py-2.5 bg-white border border-gray-200 rounded-lg text-gray-700 font-medium hover:bg-gray-50 flex items-center gap-2">
                  <Download className="w-4 h-4" />
                  <span>Export</span>
                </button>
                <button className="px-4 py-2.5 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 flex items-center gap-2">
                  <Plus className="w-4 h-4" />
                  <span>New Experiment</span>
                </button>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              <div className="bg-white rounded-xl border border-gray-200 p-5 hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm font-medium text-gray-600">
                    Active Experiments
                  </span>
                  <div className="w-10 h-10 bg-green-50 rounded-lg flex items-center justify-center">
                    <TrendingUp className="w-5 h-5 text-green-600" />
                  </div>
                </div>
                <span className="text-3xl font-bold text-gray-900">
                  {stats.activeExperiments}
                </span>
                <p className="text-xs text-gray-500 mt-1">Currently running</p>
              </div>
              <div className="bg-white rounded-xl border border-gray-200 p-5 hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm font-medium text-gray-600">
                    Completed Tests
                  </span>
                  <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
                    <CheckCircle className="w-5 h-5 text-blue-600" />
                  </div>
                </div>
                <span className="text-3xl font-bold text-gray-900">
                  {stats.completedTests}
                </span>
                <p className="text-xs text-gray-500 mt-1">
                  Finished this quarter
                </p>
              </div>
              <div className="bg-white rounded-xl border border-gray-200 p-5 hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm font-medium text-gray-600">
                    Avg Uplift
                  </span>
                  <div className="w-10 h-10 bg-purple-50 rounded-lg flex items-center justify-center">
                    <TrendingUp className="w-5 h-5 text-purple-600" />
                  </div>
                </div>
                <span className="text-3xl font-bold text-gray-900">
                  +{stats.avgUplift}%
                </span>
                <p className="text-xs text-gray-500 mt-1">Across all tests</p>
              </div>
              <div className="bg-white rounded-xl border border-gray-200 p-5 hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm font-medium text-gray-600">
                    Total Participants
                  </span>
                  <div className="w-10 h-10 bg-amber-50 rounded-lg flex items-center justify-center">
                    <Beaker className="w-5 h-5 text-amber-600" />
                  </div>
                </div>
                <span className="text-3xl font-bold text-gray-900">
                  {stats.totalParticipants.toLocaleString()}
                </span>
                <p className="text-xs text-gray-500 mt-1">In experiments</p>
              </div>
            </div>
            <div className="bg-white rounded-xl border border-gray-200 p-4 mb-6">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search experiments..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="flex gap-3">
                  <select
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                    className="px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                  >
                    <option value="all">All Status</option>
                    <option value="running">Running</option>
                    <option value="completed">Completed</option>
                    <option value="paused">Paused</option>
                    <option value="draft">Draft</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Experiment
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Type
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Duration
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Sample Size
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Conversion
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Uplift
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Confidence
                      </th>
                      <th className="px-6 py-4 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {filteredExperiments.map((exp) => (
                      <tr
                        key={exp.id}
                        className="hover:bg-gray-50 transition-colors"
                      >
                        <td className="px-6 py-4">
                          <div>
                            <span className="text-sm font-medium text-gray-900 block">
                              {exp.name}
                            </span>
                            <span className="text-xs text-gray-500">
                              {exp.id}
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-600">
                          {exp.type}
                        </td>
                        <td className="px-6 py-4">
                          {getStatusBadge(exp.status)}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-600">
                          {exp.startDate
                            ? `${exp.startDate} - ${exp.endDate || "Ongoing"}`
                            : "Not started"}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-600">
                          {exp.sampleSize.toLocaleString()}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-600">
                          {exp.conversionRate > 0
                            ? `${exp.conversionRate}%`
                            : "-"}
                        </td>
                        <td className="px-6 py-4">
                          {getUpliftBadge(exp.uplift)}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-600">
                          {exp.confidence ? `${exp.confidence}%` : "-"}
                        </td>
                        <td className="px-6 py-4 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <button
                              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                              title="View"
                            >
                              <TrendingUp className="w-4 h-4 text-gray-500" />
                            </button>
                            <button
                              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                              title="Edit"
                            >
                              <Edit className="w-4 h-4 text-gray-500" />
                            </button>
                            <button
                              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                              title="Delete"
                            >
                              <Trash2 className="w-4 h-4 text-red-500" />
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
    </div>
  );
};

export default PricingExperiments;
