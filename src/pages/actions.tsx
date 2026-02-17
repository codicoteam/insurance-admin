import React, { useState } from 'react';
import {
  FileText,
  Clock,
  User,
  Shield,
  DollarSign,
  XCircle,
  Plus,
  Calendar,
  AlertCircle,
  CheckCircle,
  Info,
  Eye,
  CreditCard,
  FileSignature,
  Download,
  Edit,
  RefreshCw,
  PlusCircle,
  Zap,
  Filter
} from 'lucide-react';
import InsuranceSidebar from '../Components/sidebar';

const InsurancePolicyFullOverview: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const detailsItems = [
    { icon: User, title: 'Policyholder Information', description: 'Name, age, contact info' },
    { icon: Shield, title: 'Insurer Information', description: 'Name and contact' },
    { icon: FileText, title: 'Type of Policy', description: 'Life, health, auto, property' },
    { icon: CheckCircle, title: 'Coverage Specifics', description: 'Risks covered, limits, deductibles' },
    { icon: DollarSign, title: 'Premium Information', description: 'Amount, frequency, method' },
    { icon: XCircle, title: 'Exclusions', description: 'What is not covered' },
    { icon: Plus, title: 'Additional Options', description: 'Riders or add-ons' }
  ];

  const timelineItems = [
    { icon: Calendar, title: 'Policy Start Date', description: 'When coverage begins' },
    { icon: Clock, title: 'Renewal Date', description: 'When coverage must be renewed' },
    { icon: DollarSign, title: 'Premium Due Dates', description: 'Payment schedule' },
    { icon: AlertCircle, title: 'Claim Deadlines', description: 'Filing time limits' },
    { icon: CheckCircle, title: 'Maturity Date', description: 'Benefit payout date' }
  ];

  const actionButtons = [
    { icon: Eye, label: 'View Details' },
    { icon: CreditCard, label: 'Pay Premium' },
    { icon: FileSignature, label: 'Submit Claim' },
    { icon: Download, label: 'Documents' },
    { icon: Edit, label: 'Update Info' },
    { icon: RefreshCw, label: 'Renew' },
    { icon: PlusCircle, label: 'Add Rider' }
  ];

  const stats = [
    { label: 'Details Items', value: detailsItems.length, icon: FileText, color: 'blue' },
    { label: 'Timeline Events', value: timelineItems.length, icon: Clock, color: 'purple' },
    { label: 'Available Actions', value: actionButtons.length, icon: Zap, color: 'green' }
  ];

  return (
    <div className="flex min-h-screen bg-white">
      {/* Sidebar */}
      <InsuranceSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="flex-1">
        {/* Mobile Header */}
        <div className="lg:hidden bg-white border-b border-gray-200 p-4">
          <button onClick={() => setSidebarOpen(true)} className="p-2 rounded-lg hover:bg-gray-100">
            <Filter className="w-6 h-6 text-gray-600" />
          </button>
        </div>

        <div className="min-h-screen bg-gradient-to-br from-white via-blue-50 to-white">
          {/* Header */}
          <div className="bg-white border-b border-blue-100 shadow-sm">
            <div className="max-w-7xl mx-auto px-6 py-4">
              <h1 className="text-2xl font-bold text-gray-900">Policy Overview</h1>
              <p className="text-sm text-gray-600">Manage coverage, timelines and actions</p>
            </div>
          </div>

          <div className="max-w-7xl mx-auto px-6 py-6">
            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              {stats.map((stat, idx) => (
                <div key={idx} className="bg-white rounded-xl p-5 shadow-sm border border-blue-100">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600 mb-1">{stat.label}</p>
                      <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                    </div>
                    <div className={`p-3 rounded-lg ${
                      stat.color === 'blue' ? 'bg-blue-50' :
                      stat.color === 'purple' ? 'bg-purple-50' :
                      'bg-green-50'
                    }`}>
                      <stat.icon className={`${
                        stat.color === 'blue' ? 'text-blue-600' :
                        stat.color === 'purple' ? 'text-purple-600' :
                        'text-green-600'
                      }`} size={24} />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Details */}
            <div className="mb-10">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Policy Details</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {detailsItems.map((item, idx) => {
                  const Icon = item.icon;
                  return (
                    <div key={idx} className="flex items-start gap-3 p-4 bg-white rounded-lg border border-gray-200 hover:border-blue-300">
                      <div className="p-2 bg-blue-50 rounded-lg">
                        <Icon className="w-5 h-5 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">{item.title}</h3>
                        <p className="text-sm text-gray-600">{item.description}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Timeline */}
            <div className="mb-10">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Timeline</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {timelineItems.map((item, idx) => {
                  const Icon = item.icon;
                  return (
                    <div key={idx} className="flex items-start gap-3 p-4 bg-white rounded-lg border border-gray-200 hover:border-purple-300">
                      <div className="p-2 bg-purple-50 rounded-lg">
                        <Icon className="w-5 h-5 text-purple-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">{item.title}</h3>
                        <p className="text-sm text-gray-600">{item.description}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Actions */}
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-4">Actions</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {actionButtons.map((action, idx) => {
                  const Icon = action.icon;
                  return (
                    <button
                      key={idx}
                      className="flex flex-col items-center justify-center gap-2 p-4 bg-gradient-to-br from-green-500 to-green-600 text-white rounded-xl shadow hover:shadow-lg"
                    >
                      <Icon className="w-5 h-5" />
                      <span className="text-sm font-semibold">{action.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Info */}
            <div className="mt-10 flex items-start gap-3 p-4 bg-blue-50 rounded-lg border border-blue-200">
              <Info className="w-5 h-5 text-blue-600 mt-1" />
              <p className="text-blue-900 text-sm">
                This dashboard gives you a complete picture of your coverage, key dates, and the tools
                needed to manage your policy efficiently.
              </p>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default InsurancePolicyFullOverview;
