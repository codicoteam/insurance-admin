import { useState } from "react";
import {
  Search,
  Filter,
  Download,
  Plus,
  Edit,
  Trash2,
  Sliders,
  Menu,
  CheckCircle,
  Clock,
  RefreshCw,
  Eye,
} from "lucide-react";

interface RatingFactor {
  id: string;
  name: string;
  category: string;
  impact: string;
  status: string;
  lastModified: string;
}

const PricingFactors = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("all");

  const ratingFactors: RatingFactor[] = [
    {
      id: "RF-001",
      name: "Age Factor - Tier 1 (16-25)",
      category: "Age",
      impact: "+15%",
      status: "Active",
      lastModified: "2024-10-15",
    },
    {
      id: "RF-002",
      name: "Age Factor - Tier 2 (26-40)",
      category: "Age",
      impact: "+5%",
      status: "Active",
      lastModified: "2024-10-15",
    },
    {
      id: "RF-003",
      name: "Age Factor - Tier 3 (41-65)",
      category: "Age",
      impact: "0%",
      status: "Active",
      lastModified: "2024-10-15",
    },
    {
      id: "RF-004",
      name: "Vehicle Type - Sports",
      category: "Vehicle",
      impact: "+25%",
      status: "Active",
      lastModified: "2024-10-18",
    },
    {
      id: "RF-005",
      name: "Vehicle Type - Sedan",
      category: "Vehicle",
      impact: "0%",
      status: "Active",
      lastModified: "2024-10-18",
    },
    {
      id: "RF-006",
      name: "Location - Urban",
      category: "Location",
      impact: "+10%",
      status: "Active",
      lastModified: "2024-10-20",
    },
    {
      id: "RF-007",
      name: "Location - Rural",
      category: "Location",
      impact: "-5%",
      status: "Active",
      lastModified: "2024-10-20",
    },
    {
      id: "RF-008",
      name: "Claims History - None",
      category: "Claims",
      impact: "-10%",
      status: "Active",
      lastModified: "2024-10-22",
    },
  ];

  const stats = {
    totalFactors: 42,
    activeFactors: 38,
    underReview: 4,
    categories: 8,
  };

  const filteredFactors = ratingFactors.filter((factor) => {
    const matchesSearch = factor.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesCategory =
      filterCategory === "all" || factor.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  const getImpactColor = (impact: string) => {
    if (impact.startsWith("+")) return "text-red-600 bg-red-50";
    if (impact.includes("-")) return "text-green-600 bg-green-50";
    return "text-gray-600 bg-gray-50";
  };

  const getStatusBadge = (status: string) => (
    <span
      className={`px-2.5 py-1 rounded-full text-xs font-medium ${status === "Active" ? "bg-green-100 text-green-700" : "bg-amber-100 text-amber-700"}`}
    >
      {status}
    </span>
  );

  return (
    <div className="flex min-h-screen bg-gray-50">
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
                <Sliders className="w-4 h-4 text-white" />
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
                  Rating Factors
                </h1>
                <p className="text-gray-600 mt-1">
                  Configure pricing factors that affect premium calculations
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
                  <span>New Factor</span>
                </button>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              <div className="bg-white rounded-xl border border-gray-200 p-5 hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm font-medium text-gray-600">
                    Total Factors
                  </span>
                  <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
                    <Sliders className="w-5 h-5 text-blue-600" />
                  </div>
                </div>
                <span className="text-3xl font-bold text-gray-900">
                  {stats.totalFactors}
                </span>
                <p className="text-xs text-gray-500 mt-1">Configured factors</p>
              </div>
              <div className="bg-white rounded-xl border border-gray-200 p-5 hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm font-medium text-gray-600">
                    Active Factors
                  </span>
                  <div className="w-10 h-10 bg-green-50 rounded-lg flex items-center justify-center">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                  </div>
                </div>
                <span className="text-3xl font-bold text-gray-900">
                  {stats.activeFactors}
                </span>
                <p className="text-xs text-gray-500 mt-1">Currently applied</p>
              </div>
              <div className="bg-white rounded-xl border border-gray-200 p-5 hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm font-medium text-gray-600">
                    Under Review
                  </span>
                  <div className="w-10 h-10 bg-amber-50 rounded-lg flex items-center justify-center">
                    <Clock className="w-5 h-5 text-amber-600" />
                  </div>
                </div>
                <span className="text-3xl font-bold text-gray-900">
                  {stats.underReview}
                </span>
                <p className="text-xs text-gray-500 mt-1">Pending approval</p>
              </div>
              <div className="bg-white rounded-xl border border-gray-200 p-5 hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm font-medium text-gray-600">
                    Categories
                  </span>
                  <div className="w-10 h-10 bg-purple-50 rounded-lg flex items-center justify-center">
                    <RefreshCw className="w-5 h-5 text-purple-600" />
                  </div>
                </div>
                <span className="text-3xl font-bold text-gray-900">
                  {stats.categories}
                </span>
                <p className="text-xs text-gray-500 mt-1">Factor categories</p>
              </div>
            </div>
            <div className="bg-white rounded-xl border border-gray-200 p-4 mb-6">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search rating factors..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="flex gap-3">
                  <select
                    value={filterCategory}
                    onChange={(e) => setFilterCategory(e.target.value)}
                    className="px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                  >
                    <option value="all">All Categories</option>
                    <option value="Age">Age</option>
                    <option value="Vehicle">Vehicle</option>
                    <option value="Location">Location</option>
                    <option value="Claims">Claims</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredFactors.map((factor) => (
                <div
                  key={factor.id}
                  className="bg-white rounded-xl border border-gray-200 p-5 hover:shadow-lg transition-all duration-200"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-lg flex items-center justify-center">
                        <Sliders className="w-5 h-5 text-blue-600" />
                      </div>
                      <div>
                        <h4 className="text-sm font-semibold text-gray-900">
                          {factor.name}
                        </h4>
                        <p className="text-xs text-gray-500">
                          {factor.category}
                        </p>
                      </div>
                    </div>
                    {getStatusBadge(factor.status)}
                  </div>
                  <div className="grid grid-cols-2 gap-3 mb-3">
                    <div>
                      <p className="text-xs text-gray-500">Impact</p>
                      <p
                        className={`text-sm font-semibold px-2 py-0.5 rounded ${getImpactColor(factor.impact)}`}
                      >
                        {factor.impact}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Modified</p>
                      <p className="text-sm font-medium text-gray-900">
                        {factor.lastModified}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                    <span className="text-xs text-gray-500">
                      ID: {factor.id}
                    </span>
                    <div className="flex items-center gap-1">
                      <button className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors">
                        <Eye className="w-4 h-4 text-gray-500" />
                      </button>
                      <button className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors">
                        <Edit className="w-4 h-4 text-gray-500" />
                      </button>
                      <button className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors">
                        <Trash2 className="w-4 h-4 text-red-500" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PricingFactors;
