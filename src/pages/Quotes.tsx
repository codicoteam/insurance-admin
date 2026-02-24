import { useState } from "react";
import {
  Search,
  Eye,
  Download,
  CheckCircle,
  Clock,
  FileText,
  User,
  DollarSign,
  TrendingUp,
  Shield,
  Car,
  Heart,
  Home,
  Building,
} from "lucide-react";

// Define types
interface User {
  name: string;
  email: string;
  phone: string;
}

interface PremiumBreakdown {
  basePremium: number;
  tax: number;
  fees: number;
  totalPremium: number;
}

interface RiskData {
  [key: string]: string | number | boolean | string[];
}

interface ConversionData {
  convertedToPolicy: boolean;
  policyId: string;
  convertedAt: Date;
}

interface Quote {
  _id: string;
  user: User;
  productType:
    | "funeral"
    | "life"
    | "vehicle"
    | "health"
    | "property"
    | "business";
  riskData: RiskData;
  premiumBreakdown: PremiumBreakdown;
  status: "draft" | "calculated" | "accepted" | "expired" | "converted";
  validityPeriod: Date;
  createdAt: Date;
  conversionData?: ConversionData;
}

const AdminQuotes = () => {
  const [selectedQuote, setSelectedQuote] = useState<Quote | null>(null);
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterProduct, setFilterProduct] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  // Sample quotes data
  const [quotes] = useState<Quote[]>([
    {
      _id: "QT001",
      user: {
        name: "John Doe",
        email: "john@example.com",
        phone: "+263 77 123 4567",
      },
      productType: "life",
      riskData: {
        age: 35,
        coverageAmount: 50000,
        duration: 20,
        occupation: "Software Engineer",
        smokingStatus: false,
      },
      premiumBreakdown: {
        basePremium: 2500,
        tax: 375,
        fees: 50,
        totalPremium: 2925,
      },
      status: "calculated",
      validityPeriod: new Date("2025-11-12"),
      createdAt: new Date("2025-10-10"),
    },
    {
      _id: "QT002",
      user: {
        name: "Sarah Smith",
        email: "sarah@example.com",
        phone: "+263 71 234 5678",
      },
      productType: "vehicle",
      riskData: {
        vehicleMake: "Toyota",
        vehicleModel: "Camry",
        vehicleYear: 2020,
        drivingExperience: 10,
      },
      premiumBreakdown: {
        basePremium: 1800,
        tax: 270,
        fees: 50,
        totalPremium: 2120,
      },
      status: "accepted",
      validityPeriod: new Date("2025-11-05"),
      createdAt: new Date("2025-10-05"),
    },
    {
      _id: "QT003",
      user: {
        name: "Michael Chen",
        email: "michael@example.com",
        phone: "+263 78 345 6789",
      },
      productType: "property",
      riskData: {
        propertyValue: 250000,
        propertyType: "house",
        location: "Harare, Zimbabwe",
      },
      premiumBreakdown: {
        basePremium: 3200,
        tax: 480,
        fees: 50,
        totalPremium: 3730,
      },
      status: "converted",
      validityPeriod: new Date("2025-11-08"),
      createdAt: new Date("2025-10-08"),
      conversionData: {
        convertedToPolicy: true,
        policyId: "POL12345",
        convertedAt: new Date("2025-10-09"),
      },
    },
    {
      _id: "QT004",
      user: {
        name: "Emma Wilson",
        email: "emma@example.com",
        phone: "+263 77 456 7890",
      },
      productType: "health",
      riskData: {
        age: 42,
        coverageAmount: 100000,
        preExistingConditions: ["Diabetes", "Hypertension"],
      },
      premiumBreakdown: {
        basePremium: 4500,
        tax: 675,
        fees: 50,
        totalPremium: 5225,
      },
      status: "draft",
      validityPeriod: new Date("2025-11-10"),
      createdAt: new Date("2025-10-09"),
    },
    {
      _id: "QT005",
      user: {
        name: "David Brown",
        email: "david@example.com",
        phone: "+263 71 567 8901",
      },
      productType: "funeral",
      riskData: {
        age: 55,
        coverageAmount: 20000,
        duration: 15,
      },
      premiumBreakdown: {
        basePremium: 1200,
        tax: 180,
        fees: 50,
        totalPremium: 1430,
      },
      status: "expired",
      validityPeriod: new Date("2025-09-15"),
      createdAt: new Date("2025-08-15"),
    },
  ]);

  const productIcons = {
    funeral: Shield,
    life: Heart,
    vehicle: Car,
    health: Heart,
    property: Home,
    business: Building,
  };

  const statusColors: { [key: string]: string } = {
    draft: "bg-gray-100 text-gray-700 border-gray-300",
    calculated: "bg-blue-100 text-blue-700 border-blue-300",
    accepted: "bg-green-100 text-green-700 border-green-300",
    expired: "bg-red-100 text-red-700 border-red-300",
    converted: "bg-purple-100 text-purple-700 border-purple-300",
  };

  const stats = [
    {
      label: "Total Quotes",
      value: quotes.length,
      icon: FileText,
      color: "bg-blue-500",
    },
    {
      label: "Accepted",
      value: quotes.filter((q) => q.status === "accepted").length,
      icon: CheckCircle,
      color: "bg-green-500",
    },
    {
      label: "Converted",
      value: quotes.filter((q) => q.status === "converted").length,
      icon: TrendingUp,
      color: "bg-purple-500",
    },
    {
      label: "Pending",
      value: quotes.filter(
        (q) => q.status === "calculated" || q.status === "draft",
      ).length,
      icon: Clock,
      color: "bg-yellow-500",
    },
  ];

  const filteredQuotes = quotes.filter((quote) => {
    const matchesStatus =
      filterStatus === "all" || quote.status === filterStatus;
    const matchesProduct =
      filterProduct === "all" || quote.productType === filterProduct;
    const matchesSearch =
      quote.user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      quote._id.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesProduct && matchesSearch;
  });

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const formatRiskDataValue = (
    value: string | number | boolean | string[],
  ): string => {
    if (Array.isArray(value)) {
      return value.join(", ");
    }
    if (typeof value === "boolean") {
      return value ? "Yes" : "No";
    }
    return value.toString();
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      {/* Main Content */}
      <div className="flex-1">
        {/* Dashboard Content */}
        <div className="p-4 lg:p-6">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Quote Management
            </h1>
            <p className="text-gray-600">
              Manage and track all insurance quotes
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat, idx) => (
              <div
                key={idx}
                className="bg-white border-2 border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 font-medium">
                      {stat.label}
                    </p>
                    <p className="text-3xl font-bold text-gray-900 mt-1">
                      {stat.value}
                    </p>
                  </div>
                  <div
                    className={`${stat.color} w-12 h-12 rounded-lg flex items-center justify-center`}
                  >
                    <stat.icon className="w-6 h-6 text-white" />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Filters and Search */}
          <div className="bg-white border-2 border-gray-200 rounded-xl p-6 mb-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="md:col-span-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Search by name or quote ID..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
              <div>
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="all">All Statuses</option>
                  <option value="draft">Draft</option>
                  <option value="calculated">Calculated</option>
                  <option value="accepted">Accepted</option>
                  <option value="expired">Expired</option>
                  <option value="converted">Converted</option>
                </select>
              </div>
              <div>
                <select
                  value={filterProduct}
                  onChange={(e) => setFilterProduct(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="all">All Products</option>
                  <option value="funeral">Funeral</option>
                  <option value="life">Life</option>
                  <option value="vehicle">Vehicle</option>
                  <option value="health">Health</option>
                  <option value="property">Property</option>
                  <option value="business">Business</option>
                </select>
              </div>
            </div>
          </div>

          {/* Quotes Table - Mobile Cards & Desktop Table */}
          <div className="bg-white border-2 border-gray-200 rounded-xl overflow-hidden">
            {/* Desktop Table */}
            <div className="hidden lg:block overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b-2 border-gray-200">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Quote ID
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Customer
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Product
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Premium
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Valid Until
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredQuotes.map((quote) => {
                    const Icon = productIcons[quote.productType];
                    return (
                      <tr
                        key={quote._id}
                        className="hover:bg-gray-50 transition-colors"
                      >
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="font-mono text-sm font-medium text-gray-900">
                            {quote._id}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white font-semibold">
                              {quote.user.name.charAt(0)}
                            </div>
                            <div className="ml-3">
                              <p className="text-sm font-medium text-gray-900">
                                {quote.user.name}
                              </p>
                              <p className="text-xs text-gray-500">
                                {quote.user.email}
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center">
                            <Icon className="w-5 h-5 text-gray-600 mr-2" />
                            <span className="text-sm font-medium text-gray-900 capitalize">
                              {quote.productType}
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="text-sm font-bold text-gray-900">
                            $
                            {quote.premiumBreakdown.totalPremium.toLocaleString()}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span
                            className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full border ${statusColors[quote.status]}`}
                          >
                            {quote.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                          {formatDate(quote.validityPeriod)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <button
                            onClick={() => setSelectedQuote(quote)}
                            className="text-blue-600 hover:text-blue-800 font-medium text-sm flex items-center gap-1"
                          >
                            <Eye className="w-4 h-4" />
                            View
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Mobile Cards */}
            <div className="lg:hidden p-4 space-y-4">
              {filteredQuotes.map((quote) => {
                const Icon = productIcons[quote.productType];
                return (
                  <div
                    key={quote._id}
                    className="bg-white border-2 border-gray-200 rounded-xl p-4 hover:shadow-lg transition-shadow"
                  >
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <span className="font-mono text-sm font-bold text-gray-900">
                          {quote._id}
                        </span>
                        <span
                          className={`ml-2 px-2 py-1 inline-flex text-xs leading-4 font-semibold rounded-full border ${statusColors[quote.status]}`}
                        >
                          {quote.status}
                        </span>
                      </div>
                      <button
                        onClick={() => setSelectedQuote(quote)}
                        className="text-blue-600 hover:text-blue-800 font-medium text-sm flex items-center gap-1"
                      >
                        <Eye className="w-4 h-4" />
                        View
                      </button>
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-center">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white font-semibold text-xs">
                          {quote.user.name.charAt(0)}
                        </div>
                        <div className="ml-3">
                          <p className="text-sm font-medium text-gray-900">
                            {quote.user.name}
                          </p>
                          <p className="text-xs text-gray-500">
                            {quote.user.email}
                          </p>
                        </div>
                      </div>

                      <div className="flex justify-between items-center">
                        <div className="flex items-center">
                          <Icon className="w-4 h-4 text-gray-600 mr-2" />
                          <span className="text-sm font-medium text-gray-900 capitalize">
                            {quote.productType}
                          </span>
                        </div>
                        <span className="text-sm font-bold text-gray-900">
                          $
                          {quote.premiumBreakdown.totalPremium.toLocaleString()}
                        </span>
                      </div>

                      <div className="flex justify-between text-xs text-gray-600">
                        <span>Valid until:</span>
                        <span>{formatDate(quote.validityPeriod)}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Quote Details Modal */}
          {selectedQuote && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
              <div className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
                <div className="sticky top-0 bg-white border-b-2 border-gray-200 px-6 py-4 flex items-center justify-between">
                  <h2 className="text-2xl font-bold text-gray-900">
                    Quote Details
                  </h2>
                  <button
                    onClick={() => setSelectedQuote(null)}
                    className="text-gray-400 hover:text-gray-600 text-2xl font-bold"
                  >
                    ×
                  </button>
                </div>

                <div className="p-6 space-y-6">
                  {/* Quote Info */}
                  <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <p className="text-xs text-gray-600 font-medium mb-1">
                          Quote ID
                        </p>
                        <p className="text-sm font-mono font-bold text-gray-900">
                          {selectedQuote._id}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-600 font-medium mb-1">
                          Status
                        </p>
                        <span
                          className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full border ${statusColors[selectedQuote.status]}`}
                        >
                          {selectedQuote.status}
                        </span>
                      </div>
                      <div>
                        <p className="text-xs text-gray-600 font-medium mb-1">
                          Created
                        </p>
                        <p className="text-sm font-medium text-gray-900">
                          {formatDate(selectedQuote.createdAt)}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-600 font-medium mb-1">
                          Valid Until
                        </p>
                        <p className="text-sm font-medium text-gray-900">
                          {formatDate(selectedQuote.validityPeriod)}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Customer Info */}
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
                      <User className="w-5 h-5" />
                      Customer Information
                    </h3>
                    <div className="bg-blue-50 rounded-xl p-4 border border-blue-200 space-y-2">
                      <p className="text-sm">
                        <span className="font-semibold">Name:</span>{" "}
                        {selectedQuote.user.name}
                      </p>
                      <p className="text-sm">
                        <span className="font-semibold">Email:</span>{" "}
                        {selectedQuote.user.email}
                      </p>
                      <p className="text-sm">
                        <span className="font-semibold">Phone:</span>{" "}
                        {selectedQuote.user.phone}
                      </p>
                    </div>
                  </div>

                  {/* Risk Data */}
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
                      <Shield className="w-5 h-5" />
                      Risk Assessment Data
                    </h3>
                    <div className="bg-yellow-50 rounded-xl p-4 border border-yellow-200 grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {Object.entries(selectedQuote.riskData).map(
                        ([key, value]) => (
                          <div key={key}>
                            <p className="text-xs text-gray-600 font-medium capitalize">
                              {key.replace(/([A-Z])/g, " $1").trim()}
                            </p>
                            <p className="text-sm font-semibold text-gray-900">
                              {formatRiskDataValue(value)}
                            </p>
                          </div>
                        ),
                      )}
                    </div>
                  </div>

                  {/* Premium Breakdown */}
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
                      <DollarSign className="w-5 h-5" />
                      Premium Breakdown
                    </h3>
                    <div className="bg-green-50 rounded-xl p-4 border border-green-200 space-y-3">
                      <div className="flex justify-between py-2 border-b border-green-200">
                        <span className="text-sm font-medium text-gray-700">
                          Base Premium
                        </span>
                        <span className="text-sm font-bold text-gray-900">
                          $
                          {selectedQuote.premiumBreakdown.basePremium.toLocaleString()}
                        </span>
                      </div>
                      <div className="flex justify-between py-2 border-b border-green-200">
                        <span className="text-sm font-medium text-gray-700">
                          Tax (15%)
                        </span>
                        <span className="text-sm font-bold text-gray-900">
                          ${selectedQuote.premiumBreakdown.tax.toLocaleString()}
                        </span>
                      </div>
                      <div className="flex justify-between py-2 border-b border-green-200">
                        <span className="text-sm font-medium text-gray-700">
                          Processing Fees
                        </span>
                        <span className="text-sm font-bold text-gray-900">
                          $
                          {selectedQuote.premiumBreakdown.fees.toLocaleString()}
                        </span>
                      </div>
                      <div className="flex justify-between py-3 mt-2">
                        <span className="text-base font-bold text-gray-900">
                          Total Premium
                        </span>
                        <span className="text-2xl font-bold text-green-600">
                          $
                          {selectedQuote.premiumBreakdown.totalPremium.toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Conversion Info */}
                  {selectedQuote.conversionData?.convertedToPolicy && (
                    <div>
                      <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
                        <TrendingUp className="w-5 h-5" />
                        Conversion Details
                      </h3>
                      <div className="bg-purple-50 rounded-xl p-4 border border-purple-200">
                        <p className="text-sm mb-2">
                          <span className="font-semibold">Policy ID:</span>{" "}
                          {selectedQuote.conversionData.policyId}
                        </p>
                        <p className="text-sm">
                          <span className="font-semibold">Converted At:</span>{" "}
                          {formatDate(selectedQuote.conversionData.convertedAt)}
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div className="flex gap-3 pt-4">
                    <button className="flex-1 bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-all flex items-center justify-center gap-2">
                      <Download className="w-4 h-4" />
                      Export PDF
                    </button>
                    <button className="flex-1 bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition-all">
                      Convert to Policy
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminQuotes;
