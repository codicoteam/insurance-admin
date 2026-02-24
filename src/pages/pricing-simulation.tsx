import { useState } from "react";
import {
  Play,
  Save,
  RotateCcw,
  Calculator,
  Menu,
  CheckCircle,
  Clock,
  TrendingUp,
} from "lucide-react";

interface SimulationResult {
  scenario: string;
  basePremium: number;
  adjustedPremium: number;
  change: number;
  lossRatio: number;
  profitMargin: number;
}

const PricingSimulation = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState("auto");
  const [selectedFactor, setSelectedFactor] = useState("");
  const [adjustment, setAdjustment] = useState(0);

  const products = [
    { id: "auto", name: "Auto Insurance", baseRate: 1200 },
    { id: "home", name: "Homeowners", baseRate: 950 },
    { id: "commercial", name: "Commercial", baseRate: 2500 },
    { id: "umbrella", name: "Umbrella", baseRate: 450 },
  ];

  const factors = [
    { id: "age", name: "Age Factor", min: -20, max: 30, step: 5 },
    { id: "location", name: "Location Factor", min: -15, max: 25, step: 5 },
    { id: "vehicle", name: "Vehicle Factor", min: -10, max: 40, step: 5 },
    { id: "claims", name: "Claims History", min: -20, max: 50, step: 5 },
  ];

  const simulationResults: SimulationResult[] = [
    {
      scenario: "Base Scenario",
      basePremium: 1200,
      adjustedPremium: 1200,
      change: 0,
      lossRatio: 62.5,
      profitMargin: 18.5,
    },
    {
      scenario: "High-Risk Profile",
      basePremium: 1200,
      adjustedPremium: 1380,
      change: 15,
      lossRatio: 68.2,
      profitMargin: 12.3,
    },
    {
      scenario: "Low-Risk Profile",
      basePremium: 1200,
      adjustedPremium: 1020,
      change: -15,
      lossRatio: 55.8,
      profitMargin: 22.1,
    },
    {
      scenario: "Urban Location",
      basePremium: 1200,
      adjustedPremium: 1260,
      change: 5,
      lossRatio: 65.1,
      profitMargin: 15.2,
    },
    {
      scenario: "Rural Location",
      basePremium: 1200,
      adjustedPremium: 1140,
      change: -5,
      lossRatio: 58.9,
      profitMargin: 20.8,
    },
  ];

  const stats = {
    simulationsRun: 156,
    avgAdjustment: 8.5,
    scenariosTested: 24,
    lastRun: "15 min ago",
  };

  const selectedProductData = products.find((p) => p.id === selectedProduct);

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
                <Calculator className="w-4 h-4 text-white" />
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
                  Pricing Simulation
                </h1>
                <p className="text-gray-600 mt-1">
                  Test pricing scenarios and analyze impact on premiums
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-3">
                <button className="px-4 py-2.5 bg-white border border-gray-200 rounded-lg text-gray-700 font-medium hover:bg-gray-50 flex items-center gap-2">
                  <RotateCcw className="w-4 h-4" />
                  <span>Reset</span>
                </button>
                <button className="px-4 py-2.5 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 flex items-center gap-2">
                  <Play className="w-4 h-4" />
                  <span>Run Simulation</span>
                </button>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              <div className="bg-white rounded-xl border border-gray-200 p-5 hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm font-medium text-gray-600">
                    Simulations Run
                  </span>
                  <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
                    <Calculator className="w-5 h-5 text-blue-600" />
                  </div>
                </div>
                <span className="text-3xl font-bold text-gray-900">
                  {stats.simulationsRun}
                </span>
                <p className="text-xs text-gray-500 mt-1">Total runs</p>
              </div>
              <div className="bg-white rounded-xl border border-gray-200 p-5 hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm font-medium text-gray-600">
                    Avg Adjustment
                  </span>
                  <div className="w-10 h-10 bg-green-50 rounded-lg flex items-center justify-center">
                    <TrendingUp className="w-5 h-5 text-green-600" />
                  </div>
                </div>
                <span className="text-3xl font-bold text-gray-900">
                  +{stats.avgAdjustment}%
                </span>
                <p className="text-xs text-gray-500 mt-1">Average change</p>
              </div>
              <div className="bg-white rounded-xl border border-gray-200 p-5 hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm font-medium text-gray-600">
                    Scenarios Tested
                  </span>
                  <div className="w-10 h-10 bg-purple-50 rounded-lg flex items-center justify-center">
                    <CheckCircle className="w-5 h-5 text-purple-600" />
                  </div>
                </div>
                <span className="text-3xl font-bold text-gray-900">
                  {stats.scenariosTested}
                </span>
                <p className="text-xs text-gray-500 mt-1">Unique scenarios</p>
              </div>
              <div className="bg-white rounded-xl border border-gray-200 p-5 hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm font-medium text-gray-600">
                    Last Run
                  </span>
                  <div className="w-10 h-10 bg-amber-50 rounded-lg flex items-center justify-center">
                    <Clock className="w-5 h-5 text-amber-600" />
                  </div>
                </div>
                <span className="text-3xl font-bold text-gray-900">
                  {stats.lastRun}
                </span>
                <p className="text-xs text-gray-500 mt-1">
                  Simulation completed
                </p>
              </div>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
              <div className="bg-white rounded-xl border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Simulation Parameters
                </h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Product
                    </label>
                    <select
                      value={selectedProduct}
                      onChange={(e) => setSelectedProduct(e.target.value)}
                      className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                    >
                      {products.map((p) => (
                        <option key={p.id} value={p.id}>
                          {p.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Rating Factor
                    </label>
                    <select
                      value={selectedFactor}
                      onChange={(e) => setSelectedFactor(e.target.value)}
                      className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                    >
                      <option value="">Select a factor</option>
                      {factors.map((f) => (
                        <option key={f.id} value={f.id}>
                          {f.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Adjustment: {adjustment > 0 ? "+" : ""}
                      {adjustment}%
                    </label>
                    <input
                      type="range"
                      min="-50"
                      max="50"
                      value={adjustment}
                      onChange={(e) => setAdjustment(parseInt(e.target.value))}
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                    />
                    <div className="flex justify-between text-xs text-gray-500 mt-1">
                      <span>-50%</span>
                      <span>0%</span>
                      <span>+50%</span>
                    </div>
                  </div>
                  <div className="pt-4 border-t border-gray-100">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-700">
                        Base Premium:
                      </span>
                      <span className="text-lg font-bold text-gray-900">
                        ${selectedProductData?.baseRate.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-sm font-medium text-gray-700">
                        Adjusted Premium:
                      </span>
                      <span className="text-lg font-bold text-blue-600">
                        $
                        {(selectedProductData?.baseRate || 0) *
                          (1 + adjustment / 100)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-xl border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Saved Scenarios
                </h3>
                <div className="space-y-3">
                  {[
                    {
                      name: "Winter Season Adjustment",
                      product: "Auto Insurance",
                      lastModified: "2024-10-20",
                    },
                    {
                      name: "High-Risk Areas",
                      product: "Homeowners",
                      lastModified: "2024-10-18",
                    },
                    {
                      name: "Commercial Renewal",
                      product: "Commercial",
                      lastModified: "2024-10-15",
                    },
                    {
                      name: "New Driver Discount",
                      product: "Auto Insurance",
                      lastModified: "2024-10-10",
                    },
                  ].map((scenario, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
                    >
                      <div>
                        <p className="text-sm font-medium text-gray-900">
                          {scenario.name}
                        </p>
                        <p className="text-xs text-gray-500">
                          {scenario.product} • {scenario.lastModified}
                        </p>
                      </div>
                      <button className="p-2 hover:bg-white rounded-lg transition-colors">
                        <Play className="w-4 h-4 text-blue-600" />
                      </button>
                    </div>
                  ))}
                </div>
                <button className="w-full mt-4 px-4 py-2.5 border border-gray-200 rounded-lg text-gray-700 font-medium hover:bg-gray-50 flex items-center justify-center gap-2">
                  <Save className="w-4 h-4" />
                  <span>Save Current Scenario</span>
                </button>
              </div>
            </div>
            <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900">
                  Simulation Results
                </h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Scenario
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Base Premium
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Adjusted Premium
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Change
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Est. Loss Ratio
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Profit Margin
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {simulationResults.map((result, idx) => (
                      <tr
                        key={idx}
                        className="hover:bg-gray-50 transition-colors"
                      >
                        <td className="px-6 py-4 text-sm font-medium text-gray-900">
                          {result.scenario}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-600">
                          ${result.basePremium.toLocaleString()}
                        </td>
                        <td className="px-6 py-4 text-sm font-semibold text-gray-900">
                          ${result.adjustedPremium.toLocaleString()}
                        </td>
                        <td className="px-6 py-4">
                          <span
                            className={`text-sm font-semibold ${result.change >= 0 ? "text-green-600" : "text-red-600"}`}
                          >
                            {result.change >= 0 ? "+" : ""}
                            {result.change}%
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-600">
                          {result.lossRatio}%
                        </td>
                        <td className="px-6 py-4 text-sm font-semibold text-blue-600">
                          {result.profitMargin}%
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

export default PricingSimulation;
