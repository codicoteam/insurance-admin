import { useState } from 'react';
import { 
  FileText, Clock, User, Shield, DollarSign, XCircle, Plus, Calendar, AlertCircle, CheckCircle, Menu, Search, Filter, Download
} from 'lucide-react';
import InsuranceSidebar from '../Components/sidebar';

export default function InsurancePolicyDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const detailsItems = [
    { icon: User, title: 'Policyholder Information', description: 'Name, age, contact info', color: 'text-blue-600', bgColor: 'bg-blue-50' },
    { icon: Shield, title: 'Insurer Information', description: 'Name and contact', color: 'text-purple-600', bgColor: 'bg-purple-50' },
    { icon: FileText, title: 'Type of Policy', description: 'Life, health, auto, property', color: 'text-green-600', bgColor: 'bg-green-50' },
    { icon: CheckCircle, title: 'Coverage Specifics', description: 'Risks covered, limits, deductibles', color: 'text-teal-600', bgColor: 'bg-teal-50' },
    { icon: DollarSign, title: 'Premium Information', description: 'Amount, frequency, method', color: 'text-orange-600', bgColor: 'bg-orange-50' },
    { icon: XCircle, title: 'Exclusions', description: 'What is not covered', color: 'text-red-600', bgColor: 'bg-red-50' },
    { icon: Plus, title: 'Additional Options', description: 'Riders or add-ons', color: 'text-pink-600', bgColor: 'bg-pink-50' }
  ];

  const timelineItems = [
    { icon: Calendar, title: 'Policy Start Date', description: 'When coverage begins', color: 'text-blue-600', bgColor: 'bg-blue-50' },
    { icon: Clock, title: 'Policy End Date / Renewal Date', description: 'When coverage ends or must be renewed', color: 'text-purple-600', bgColor: 'bg-purple-50' },
    { icon: DollarSign, title: 'Premium Due Dates', description: 'When payments must be made', color: 'text-green-600', bgColor: 'bg-green-50' },
    { icon: AlertCircle, title: 'Claim Submission Deadlines', description: 'How long after an event you can file a claim', color: 'text-orange-600', bgColor: 'bg-orange-50' },
    { icon: CheckCircle, title: 'Maturity Date', description: 'When benefits are paid if no claim occurs', color: 'text-teal-600', bgColor: 'bg-teal-50' }
  ];

  return (
    <div className="flex min-h-screen bg-white">
      {/* Sidebar */}
      <InsuranceSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Main Content */}
      <div className="flex-1 lg:ml-0">
        {/* Mobile Header */}
        <div className="lg:hidden bg-white border-b border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <button onClick={() => setSidebarOpen(true)} className="p-2 rounded-lg hover:bg-gray-100" aria-label="Open sidebar">
              <Menu className="w-6 h-6 text-gray-600" />
            </button>
            <h1 className="text-lg font-bold text-gray-900">Insurance Dashboard</h1>
          </div>
        </div>

        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
          {/* Header */}
          <div className="bg-white border-b border-blue-100 shadow-sm">
            <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
              <h1 className="text-2xl font-bold text-gray-900">Insurance Policy Overview</h1>
              <div className="flex gap-3">
                <button className="flex items-center gap-2 px-4 py-2 bg-white border border-blue-200 text-blue-700 rounded-lg hover:bg-blue-50">
                  <Download size={18} /> Export
                </button>
                <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                  <Filter size={18} /> Filter
                </button>
              </div>
            </div>
          </div>

          <div className="max-w-7xl mx-auto px-6 py-6">
            {/* Search Bar */}
            <div className="mb-6 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <input type="text" placeholder="Search details or timeline..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} className="w-full pl-10 pr-4 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>

            {/* Stats Grid for Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              {detailsItems.map((item, idx) => {
                const Icon = item.icon;
                return (
                  <div key={idx} className={`flex items-start gap-3 p-4 ${item.bgColor} rounded-lg border border-gray-200 hover:border-blue-300 transition-colors`}>
                    <div className={`p-3 rounded-lg ${item.bgColor}`}>
                      <Icon className={`w-6 h-6 ${item.color}`} />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">{item.title}</h3>
                      <p className="text-sm text-gray-600">{item.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Timeline Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
              {timelineItems.map((item, idx) => {
                const Icon = item.icon;
                return (
                  <div key={idx} className={`bg-white p-5 rounded-xl border border-gray-200 shadow-sm hover:shadow-md ${item.bgColor}`}>
                    <div className="flex items-center gap-3 mb-2">
                      <div className={`p-3 rounded-lg ${item.bgColor}`}>
                        <Icon className={`w-6 h-6 ${item.color}`} />
                      </div>
                      <h3 className="text-lg font-bold text-gray-900">{item.title}</h3>
                    </div>
                    <p className="text-sm text-gray-600 ml-10">{item.description}</p>
                  </div>
                );
              })}
            </div>

            {/* Footer */}
            <div className="text-center mt-12 text-gray-500 text-sm">
              <p>Understanding your insurance policy made simple</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
