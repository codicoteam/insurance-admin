import { useState } from "react";
import {
  Server,
  Cloud,
  Database,
  Shield,
  Menu,
  Save,
  Eye,
  EyeOff,
  Globe,
  Lock,
  Zap,
  Settings,
} from "lucide-react";
import InsuranceSidebar from "../Components/sidebar";

interface ConfigItem {
  id: string;
  key: string;
  value: string;
  description: string;
  category: "general" | "database" | "security" | "integrations" | "features";
  isSecret: boolean;
  environment: "all" | "production" | "staging" | "development";
}

interface Environment {
  id: string;
  name: string;
  status: "active" | "maintenance" | "offline";
  region: string;
  url: string;
  lastDeployed: string;
  healthScore: number;
}

const SystemConfigScreen = () => {
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<"config" | "environments" | "secrets">(
    "config",
  );
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [showSecrets, setShowSecrets] = useState(false);
  const [editingConfig, setEditingConfig] = useState<string | null>(null);

  const configItems: ConfigItem[] = [
    {
      id: "CFG-001",
      key: "APP_NAME",
      value: "InsureCore",
      description: "Application display name",
      category: "general",
      isSecret: false,
      environment: "all",
    },
    {
      id: "CFG-002",
      key: "API_RATE_LIMIT",
      value: "1000",
      description: "Maximum API requests per minute",
      category: "general",
      isSecret: false,
      environment: "all",
    },
    {
      id: "CFG-003",
      key: "DB_CONNECTION_STRING",
      value: "postgresql://***:***@localhost:5432/insurecore",
      description: "Primary database connection string",
      category: "database",
      isSecret: true,
      environment: "all",
    },
    {
      id: "CFG-004",
      key: "DB_POOL_SIZE",
      value: "20",
      description: "Database connection pool size",
      category: "database",
      isSecret: false,
      environment: "all",
    },
    {
      id: "CFG-005",
      key: "JWT_SECRET",
      value: "********************************",
      description: "JWT signing secret key",
      category: "security",
      isSecret: true,
      environment: "all",
    },
    {
      id: "CFG-006",
      key: "ENABLE_MFA",
      value: "true",
      description: "Enable multi-factor authentication",
      category: "security",
      isSecret: false,
      environment: "all",
    },
    {
      id: "CFG-007",
      key: "PAYMENT_GATEWAY_API_KEY",
      value: "********************************",
      description: "Payment gateway API key",
      category: "integrations",
      isSecret: true,
      environment: "production",
    },
    {
      id: "CFG-008",
      key: "SENDGRID_API_KEY",
      value: "********************************",
      description: "SendGrid email service API key",
      category: "integrations",
      isSecret: true,
      environment: "all",
    },
    {
      id: "CFG-009",
      key: "FEATURE_FLAG_NEW_CLAIMS_UI",
      value: "true",
      description: "Enable new claims processing UI",
      category: "features",
      isSecret: false,
      environment: "staging",
    },
    {
      id: "CFG-010",
      key: "FEATURE_FLAG_BETA_ANALYTICS",
      value: "false",
      description: "Enable beta analytics dashboard",
      category: "features",
      isSecret: false,
      environment: "development",
    },
  ];

  const environments: Environment[] = [
    {
      id: "ENV-001",
      name: "Production",
      status: "active",
      region: "US-East-1",
      url: "https://api.insurecore.com",
      lastDeployed: "2024-01-15 08:30:00",
      healthScore: 99.9,
    },
    {
      id: "ENV-002",
      name: "Staging",
      status: "active",
      region: "US-East-1",
      url: "https://staging-api.insurecore.com",
      lastDeployed: "2024-01-15 10:00:00",
      healthScore: 98.5,
    },
    {
      id: "ENV-003",
      name: "Development",
      status: "active",
      region: "US-West-2",
      url: "https://dev-api.insurecore.com",
      lastDeployed: "2024-01-15 09:45:00",
      healthScore: 95.2,
    },
    {
      id: "ENV-004",
      name: "DR Site",
      status: "maintenance",
      region: "EU-West-1",
      url: "https://dr-api.insurecore.com",
      lastDeployed: "2024-01-10 14:00:00",
      healthScore: 100,
    },
  ];

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "general":
        return <Settings className="w-5 h-5 text-gray-500" />;
      case "database":
        return <Database className="w-5 h-5 text-blue-500" />;
      case "security":
        return <Lock className="w-5 h-5 text-red-500" />;
      case "integrations":
        return <Globe className="w-5 h-5 text-green-500" />;
      case "features":
        return <Zap className="w-5 h-5 text-purple-500" />;
      default:
        return <Settings className="w-5 h-5 text-gray-500" />;
    }
  };

  const getCategoryBadge = (category: string) => {
    const baseClasses = "px-2 py-0.5 text-xs font-medium rounded";
    switch (category) {
      case "general":
        return <span className={`${baseClasses} bg-gray-100 text-gray-700`}>General</span>;
      case "database":
        return <span className={`${baseClasses} bg-blue-100 text-blue-700`}>Database</span>;
      case "security":
        return <span className={`${baseClasses} bg-red-100 text-red-700`}>Security</span>;
      case "integrations":
        return <span className={`${baseClasses} bg-green-100 text-green-700`}>Integrations</span>;
      case "features":
        return <span className={`${baseClasses} bg-purple-100 text-purple-700`}>Features</span>;
      default:
        return null;
    }
  };

  const getStatusBadge = (status: string) => {
    const baseClasses = "px-3 py-1 text-xs font-medium rounded-full";
    switch (status) {
      case "active":
        return <span className={`${baseClasses} bg-green-100 text-green-700`}>Active</span>;
      case "maintenance":
        return <span className={`${baseClasses} bg-yellow-100 text-yellow-700`}>Maintenance</span>;
      case "offline":
        return <span className={`${baseClasses} bg-red-100 text-red-700`}>Offline</span>;
      default:
        return null;
    }
  };

  const filteredConfig = configItems.filter((item) => {
    return categoryFilter === "all" || item.category === categoryFilter;
  });

  const generalCount = configItems.filter((c) => c.category === "general").length;
  const databaseCount = configItems.filter((c) => c.category === "database").length;
  const securityCount = configItems.filter((c) => c.category === "security").length;
  const integrationsCount = configItems.filter((c) => c.category === "integrations").length;
  const featuresCount = configItems.filter((c) => c.category === "features").length;

  return (
    <div className="flex min-h-screen bg-white">
      <InsuranceSidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

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

        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 p-6">
          <div className="max-w-7xl mx-auto">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
              <div>
                <h1 className="text-3xl font-bold text-gray-800 mb-2">
                  Environment Config
                </h1>
                <p className="text-gray-600">
                  Manage application configuration and environment settings
                </p>
              </div>
              <div className="mt-4 md:mt-0 flex gap-3">
                <button
                  onClick={() => setShowSecrets(!showSecrets)}
                  className="px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors flex items-center gap-2 font-medium"
                >
                  {showSecrets ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  {showSecrets ? "Hide Secrets" : "Show Secrets"}
                </button>
                <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2 font-medium">
                  <Save className="w-5 h-5" />
                  Save Changes
                </button>
              </div>
            </div>

            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8">
              <div
                onClick={() => setCategoryFilter("general")}
                className={`bg-white rounded-xl shadow-sm border p-6 cursor-pointer transition-all ${
                  categoryFilter === "general"
                    ? "border-blue-500 ring-2 ring-blue-100"
                    : "border-blue-100 hover:shadow-md"
                }`}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-600 text-sm font-medium">General</p>
                    <p className="text-2xl font-bold text-gray-800 mt-1">{generalCount}</p>
                  </div>
                  <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                    <Settings className="w-6 h-6 text-gray-600" />
                  </div>
                </div>
              </div>
              <div
                onClick={() => setCategoryFilter("database")}
                className={`bg-white rounded-xl shadow-sm border p-6 cursor-pointer transition-all ${
                  categoryFilter === "database"
                    ? "border-blue-500 ring-2 ring-blue-100"
                    : "border-blue-100 hover:shadow-md"
                }`}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-600 text-sm font-medium">Database</p>
                    <p className="text-2xl font-bold text-gray-800 mt-1">{databaseCount}</p>
                  </div>
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Database className="w-6 h-6 text-blue-600" />
                  </div>
                </div>
              </div>
              <div
                onClick={() => setCategoryFilter("security")}
                className={`bg-white rounded-xl shadow-sm border p-6 cursor-pointer transition-all ${
                  categoryFilter === "security"
                    ? "border-blue-500 ring-2 ring-blue-100"
                    : "border-blue-100 hover:shadow-md"
                }`}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-600 text-sm font-medium">Security</p>
                    <p className="text-2xl font-bold text-gray-800 mt-1">{securityCount}</p>
                  </div>
                  <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                    <Lock className="w-6 h-6 text-red-600" />
                  </div>
                </div>
              </div>
              <div
                onClick={() => setCategoryFilter("integrations")}
                className={`bg-white rounded-xl shadow-sm border p-6 cursor-pointer transition-all ${
                  categoryFilter === "integrations"
                    ? "border-blue-500 ring-2 ring-blue-100"
                    : "border-blue-100 hover:shadow-md"
                }`}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-600 text-sm font-medium">Integrations</p>
                    <p className="text-2xl font-bold text-gray-800 mt-1">{integrationsCount}</p>
                  </div>
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                    <Globe className="w-6 h-6 text-green-600" />
                  </div>
                </div>
              </div>
              <div
                onClick={() => setCategoryFilter("features")}
                className={`bg-white rounded-xl shadow-sm border p-6 cursor-pointer transition-all ${
                  categoryFilter === "features"
                    ? "border-blue-500 ring-2 ring-blue-100"
                    : "border-blue-100 hover:shadow-md"
                }`}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-600 text-sm font-medium">Features</p>
                    <p className="text-2xl font-bold text-gray-800 mt-1">{featuresCount}</p>
                  </div>
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                    <Zap className="w-6 h-6 text-purple-600" />
                  </div>
                </div>
              </div>
            </div>

            {/* Tab Navigation */}
            <div className="bg-white rounded-xl shadow-sm border border-blue-100 mb-6">
              <div className="flex border-b border-gray-200">
                <button
                  onClick={() => setActiveTab("config")}
                  className={`flex-1 px-6 py-4 font-medium transition-colors ${
                    activeTab === "config"
                      ? "text-blue-600 border-b-2 border-blue-600 bg-blue-50"
                      : "text-gray-600 hover:text-gray-800 hover:bg-gray-50"
                  }`}
                >
                  <div className="flex items-center justify-center gap-2">
                    <Settings className="w-5 h-5" />
                    Configuration
                  </div>
                </button>
                <button
                  onClick={() => setActiveTab("environments")}
                  className={`flex-1 px-6 py-4 font-medium transition-colors ${
                    activeTab === "environments"
                      ? "text-blue-600 border-b-2 border-blue-600 bg-blue-50"
                      : "text-gray-600 hover:text-gray-800 hover:bg-gray-50"
                  }`}
                >
                  <div className="flex items-center justify-center gap-2">
                    <Cloud className="w-5 h-5" />
                    Environments
                  </div>
                </button>
                <button
                  onClick={() => setActiveTab("secrets")}
                  className={`flex-1 px-6 py-4 font-medium transition-colors ${
                    activeTab === "secrets"
                      ? "text-blue-600 border-b-2 border-blue-600 bg-blue-50"
                      : "text-gray-600 hover:text-gray-800 hover:bg-gray-50"
                  }`}
                >
                  <div className="flex items-center justify-center gap-2">
                    <Lock className="w-5 h-5" />
                    Secrets
                  </div>
                </button>
              </div>
            </div>

            {activeTab === "config" && (
              <div className="bg-white rounded-xl shadow-sm border border-blue-100 overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50 border-b border-gray-200">
                      <tr>
                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                          Key
                        </th>
                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                          Value
                        </th>
                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                          Description
                        </th>
                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                          Category
                        </th>
                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                          Environment
                        </th>
                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {filteredConfig.map((item) => (
                        <tr
                          key={item.id}
                          className="hover:bg-gray-50 transition-colors"
                        >
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-3">
                              {getCategoryIcon(item.category)}
                              <span className="text-gray-800 font-medium">
                                {item.key}
                              </span>
                              {item.isSecret && (
                                <Lock className="w-4 h-4 text-gray-400" />
                              )}
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-2">
                              {item.isSecret && !showSecrets ? (
                                <span className="text-gray-400 font-mono">
                                  *********************************
                                </span>
                              ) : (
                                <span className="text-gray-800 font-mono">
                                  {item.value}
                                </span>
                              )}
                            </div>
                          </td>
                          <td className="px-6 py-4 text-gray-600">
                            {item.description}
                          </td>
                          <td className="px-6 py-4">
                            {getCategoryBadge(item.category)}
                          </td>
                          <td className="px-6 py-4">
                            <span className="px-2 py-0.5 bg-gray-100 text-gray-700 text-xs font-medium rounded">
                              {item.environment}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <button
                              onClick={() =>
                                setEditingConfig(editingConfig === item.id ? null : item.id)
                              }
                              className="px-4 py-2 bg-blue-50 text-blue-700 text-sm rounded-lg hover:bg-blue-100 transition-colors"
                            >
                              {editingConfig === item.id ? "Cancel" : "Edit"}
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {activeTab === "environments" && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {environments.map((env) => (
                  <div
                    key={env.id}
                    className="bg-white rounded-xl shadow-sm border border-blue-100 p-6"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                          <Server className="w-6 h-6 text-blue-600" />
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-gray-800">
                            {env.name}
                          </h3>
                          <p className="text-sm text-gray-500">{env.region}</p>
                        </div>
                      </div>
                      {getStatusBadge(env.status)}
                    </div>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <span className="text-gray-600 text-sm">URL</span>
                        <span className="text-gray-800 font-medium">{env.url}</span>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <span className="text-gray-600 text-sm">Last Deployed</span>
                        <span className="text-gray-800 font-medium">{env.lastDeployed}</span>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <span className="text-gray-600 text-sm">Health Score</span>
                        <span
                          className={`font-medium ${
                            env.healthScore >= 99
                              ? "text-green-600"
                              : env.healthScore >= 95
                              ? "text-yellow-600"
                              : "text-red-600"
                          }`}
                        >
                          {env.healthScore}%
                        </span>
                      </div>
                    </div>
                    <div className="mt-4 pt-4 border-t border-gray-200">
                      <div className="flex gap-2">
                        <button className="flex-1 px-4 py-2 bg-blue-50 text-blue-700 text-sm rounded-lg hover:bg-blue-100 transition-colors">
                          Configure
                        </button>
                        <button className="flex-1 px-4 py-2 bg-gray-100 text-gray-700 text-sm rounded-lg hover:bg-gray-200 transition-colors">
                          View Logs
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === "secrets" && (
              <div className="bg-white rounded-xl shadow-sm border border-blue-100 overflow-hidden">
                <div className="p-6 border-b border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-800">
                    Secret Management
                  </h3>
                  <p className="text-sm text-gray-500 mt-1">
                    Sensitive configuration values are encrypted and masked
                  </p>
                </div>
                <div className="divide-y divide-gray-200">
                  {configItems
                    .filter((item) => item.isSecret)
                    .map((item) => (
                      <div
                        key={item.id}
                        className="p-6 hover:bg-gray-50 transition-colors"
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex items-start gap-4">
                            <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                              <Lock className="w-5 h-5 text-red-600" />
                            </div>
                            <div>
                              <h4 className="text-gray-800 font-medium">{item.key}</h4>
                              <p className="text-sm text-gray-500 mt-1">
                                {item.description}
                              </p>
                              <div className="flex items-center gap-2 mt-2">
                                <span className="text-xs text-gray-400">
                                  Category: {item.category}
                                </span>
                                <span className="text-xs text-gray-400">•</span>
                                <span className="text-xs text-gray-400">
                                  Environment: {item.environment}
                                </span>
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            {showSecrets ? (
                              <span className="text-gray-800 font-mono text-sm">
                                {item.value}
                              </span>
                            ) : (
                              <span className="text-gray-400 font-mono">
                                *********************************
                              </span>
                            )}
                            <button className="px-3 py-1 bg-blue-50 text-blue-700 text-sm rounded-lg hover:bg-blue-100 transition-colors">
                              Rotate
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SystemConfigScreen;
