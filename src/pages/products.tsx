import { useState } from 'react';
import { Package, GitBranch, FileText, Calendar, CheckCircle, TrendingUp, Users, Shield, Lightbulb, Menu } from 'lucide-react';
import InsuranceSidebar from '../Components/sidebar';

export default function ProductVersionExplainer() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const productExamples = [
    'Term Life Insurance',
    'Whole Life Insurance',
    'Auto Insurance',
    'Health Insurance'
  ];

  const versionReasons = [
    { text: 'Regulatory or legislative changes', icon: Shield },
    { text: 'Pricing or rate revisions', icon: TrendingUp },
    { text: 'Enhancement of benefits', icon: CheckCircle },
    { text: 'Strategic or market alignment', icon: Lightbulb }
  ];

  const versionTimeline = [
    { version: 'Version 1', detail: 'Initial release in 2018', year: '2018', color: 'from-blue-500 to-blue-600' },
    { version: 'Version 2', detail: 'Pricing revision implemented in 2021', year: '2021', color: 'from-purple-500 to-purple-600' },
    { version: 'Version 3', detail: 'Benefit enhancements introduced in 2024', year: '2024', color: 'from-green-500 to-green-600' }
  ];

  return (
    <div className="flex min-h-screen bg-white">
      {/* Sidebar */}
      <InsuranceSidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      {/* Main */}
      <div className="flex-1 lg:ml-0">
        {/* Mobile header */}
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

        <div className="min-h-screen bg-gradient-to-br from-white via-blue-50 to-white">
          {/* Page header */}
          <div className="bg-white border-b border-blue-100 shadow-sm">
            <div className="max-w-7xl mx-auto px-6 py-4">
              <h1 className="text-2xl font-bold text-gray-900">
                Insurance Products & Versions
              </h1>
              <p className="text-sm text-gray-600 mt-1">
                Understand how offerings evolve while protecting in-force policies
              </p>
            </div>
          </div>

          {/* Content */}
          <div className="max-w-7xl mx-auto px-6 py-6 space-y-6">
            {/* PRODUCT */}
            <div className="bg-white rounded-xl shadow-sm border border-blue-100 p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-blue-50 rounded-lg">
                  <Package className="w-6 h-6 text-blue-600" />
                </div>
                <h2 className="text-xl font-bold text-gray-900">Product</h2>
              </div>

              <p className="text-gray-700 mb-6">
                A <span className="font-semibold text-blue-600">product</span> represents a
                primary insurance offering within the company's portfolio.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
                {productExamples.map((product, idx) => (
                  <div key={idx} className="flex items-center gap-3 bg-blue-50 rounded-lg p-3">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <span className="font-medium text-gray-800">{product}</span>
                  </div>
                ))}
              </div>

              <div className="flex items-start gap-3 p-4 bg-amber-50 border border-amber-200 rounded-lg">
                <Lightbulb className="w-5 h-5 text-amber-600 mt-0.5" />
                <p className="text-sm text-amber-900">
                  Each product operates under defined rules, pricing methodologies,
                  underwriting criteria, and target segments.
                </p>
              </div>
            </div>

            {/* VERSION */}
            <div className="bg-white rounded-xl shadow-sm border border-blue-100 p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-purple-50 rounded-lg">
                  <GitBranch className="w-6 h-6 text-purple-600" />
                </div>
                <h2 className="text-xl font-bold text-gray-900">Version</h2>
              </div>

              <p className="text-gray-700 mb-6">
                A <span className="font-semibold text-purple-600">version</span> represents
                a release of a product at a specific time.
              </p>

              {/* reasons */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                {versionReasons.map((reason, idx) => {
                  const Icon = reason.icon;
                  return (
                    <div key={idx} className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg border border-gray-200">
                      <Icon className="w-5 h-5 text-purple-600" />
                      <span className="font-medium text-gray-800">{reason.text}</span>
                    </div>
                  );
                })}
              </div>

              {/* approach */}
              <div className="bg-purple-50 border border-purple-100 rounded-lg p-4 mb-8">
                <div className="flex gap-3">
                  <FileText className="w-5 h-5 text-purple-600 mt-0.5" />
                  <p className="text-gray-700">
                    Older versions remain active for existing policyholders while
                    new customers enroll in the latest release.
                  </p>
                </div>
              </div>

              {/* timeline */}
              <div className="border-t border-blue-100 pt-6">
                <div className="flex items-center gap-2 mb-4">
                  <Calendar className="w-5 h-5 text-green-600" />
                  <h3 className="font-semibold text-gray-900">
                    Example – Term Life
                  </h3>
                </div>

                <div className="space-y-4">
                  {versionTimeline.map((item, idx) => (
                    <div key={idx} className="flex items-center justify-between bg-white border border-gray-200 rounded-lg p-4">
                      <div>
                        <p className="font-semibold text-gray-900">{item.version}</p>
                        <p className="text-sm text-gray-600">{item.detail}</p>
                      </div>
                      <span className={`px-3 py-1 bg-gradient-to-r ${item.color} text-white text-sm rounded-full`}>
                        {item.year}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* customer */}
              <div className="mt-8 flex gap-3 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <Users className="w-5 h-5 text-blue-600 mt-0.5" />
                <p className="text-sm text-blue-900">
                  Customers typically remain on the version they purchased,
                  ensuring contractual stability.
                </p>
              </div>
            </div>

            {/* footer note */}
            <div className="text-center text-gray-500 text-sm pt-4">
              Clear product & version knowledge enables accurate administration and service.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
