import { useState } from "react";
import {
  Search,
  Menu,
  Shield,
  Star,
  Phone,
  Mail,
  MapPin,
  Wrench,
  Stethoscope,
  Search as SearchIcon,
} from "lucide-react";
import InsuranceSidebar from "../Components/sidebar";

interface Provider {
  id: string;
  name: string;
  type: "repair" | "medical" | "inspection";
  specialty: string;
  rating: number;
  contact: string;
  email: string;
  address: string;
  performance: number;
  claimsHandled: number;
}

const ClaimsProvidersScreen = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState<string>("all");

  const providers: Provider[] = [
    {
      id: "1",
      name: "AutoFix Repair Center",
      type: "repair",
      specialty: "Collision Repair",
      rating: 4.8,
      contact: "555-0101",
      email: "service@autofix.com",
      address: "123 Main St, Springfield",
      performance: 95,
      claimsHandled: 234,
    },
    {
      id: "2",
      name: "Dr. Sarah Williams",
      type: "medical",
      specialty: "Orthopedic",
      rating: 4.9,
      contact: "555-0102",
      email: "sarah.w@medclinic.com",
      address: "456 Health Ave, Springfield",
      performance: 98,
      claimsHandled: 156,
    },
    {
      id: "3",
      name: "SafeHome Inspections",
      type: "inspection",
      specialty: "Property Inspection",
      rating: 4.6,
      contact: "555-0103",
      email: "inspect@safehome.com",
      address: "789 Safety Blvd, Springfield",
      performance: 92,
      claimsHandled: 89,
    },
    {
      id: "4",
      name: "Premium Auto Body",
      type: "repair",
      specialty: "Luxury Vehicles",
      rating: 4.7,
      contact: "555-0104",
      email: "info@premiumbody.com",
      address: "321 Luxury Ln, Springfield",
      performance: 94,
      claimsHandled: 167,
    },
  ];

  const getTypeIcon = (type: string) =>
    ({ repair: Wrench, medical: Stethoscope, inspection: SearchIcon })[type] ||
    Wrench;
  const getTypeColor = (type: string) =>
    ({
      repair: "bg-blue-100 text-blue-700",
      medical: "bg-green-100 text-green-700",
      inspection: "bg-purple-100 text-purple-700",
    })[type] || "bg-gray-100 text-gray-700";

  const filteredProviders = providers.filter((p) => {
    const matchesType = selectedType === "all" || p.type === selectedType;
    const matchesSearch =
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.specialty.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesType && matchesSearch;
  });

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
              Provider Coordination
            </h1>
            <p className="text-gray-600">
              Manage repair shops, medical providers, and inspection services
            </p>
          </div>
        </div>
        <div className="bg-white border-b border-gray-200 p-4">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search providers..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="flex gap-2">
              {["all", "repair", "medical", "inspection"].map((type) => (
                <button
                  key={type}
                  onClick={() => setSelectedType(type)}
                  className={`px-4 py-2 rounded-lg font-medium capitalize ${selectedType === type ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"}`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredProviders.map((provider) => {
              const TypeIcon = getTypeIcon(provider.type);
              return (
                <div
                  key={provider.id}
                  className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-12 h-12 rounded-lg flex items-center justify-center ${getTypeColor(provider.type)}`}
                      >
                        <TypeIcon className="w-6 h-6" />
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-900">
                          {provider.name}
                        </h3>
                        <p className="text-sm text-gray-500">
                          {provider.specialty}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="w-5 h-5 text-yellow-400 fill-current" />
                      <span className="font-semibold">{provider.rating}</span>
                    </div>
                  </div>
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Phone className="w-4 h-4" />
                      {provider.contact}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Mail className="w-4 h-4" />
                      {provider.email}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <MapPin className="w-4 h-4" />
                      {provider.address}
                    </div>
                  </div>
                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <div>
                      <span className="text-sm text-gray-500">Performance</span>
                      <div className="flex items-center gap-2">
                        <div className="flex-1 h-2 bg-gray-200 rounded-full">
                          <div
                            className="h-2 bg-green-500 rounded-full"
                            style={{ width: `${provider.performance}%` }}
                          />
                        </div>
                        <span className="text-sm font-medium">
                          {provider.performance}%
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-sm text-gray-500">Claims</span>
                      <p className="font-semibold">{provider.claimsHandled}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClaimsProvidersScreen;
