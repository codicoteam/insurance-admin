import { useState } from 'react';
import { Menu, Shield, FileText, Download, TrendingUp, DollarSign, Clock, AlertTriangle, CheckCircle } from 'lucide-react';
import InsuranceSidebar from '../Components/sidebar';

const ClaimsReportScreen = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [dateRange, setDateRange] = useState('month');

  const stats = {
    totalClaims: 1247,
    totalPaid: 4567890,
    avgProcessingTime: 12.4,
    pendingReview: 89,
    approved: 1134,
    denied: 24,
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <InsuranceSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="flex-1 lg:ml-0">
        <div className="lg:hidden bg-white border-b border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <button onClick={() => setSidebarOpen(true)} className="p-2 rounded-lg hover:bg-gray-100"><Menu className="w-6 h-6 text-gray-600" /></button>
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-blue-800 rounded-lg flex items-center justify-center"><Shield className="w-4 h-4 text-white" /></div>
              <h1 className="text-lg font-bold text-gray-900">InsureCore</h1>
            </div>
          </div>
        </div>
        <div className="bg-white border-b border-gray-200 p-6">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-1">Claims Report</h1>
                <p className="text-gray-600">Comprehensive claims analytics and reporting</p>
              </div>
              <div className="flex items-center gap-3">
                <select value={dateRange} onChange={(e) => setDateRange(e.target.value)} className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
                  <option value="week">Last 7 Days</option>
                  <option value="month">Last 30 Days</option>
                  <option value="quarter">Last Quarter</option>
                  <option value="year">Last Year</option>
                </select>
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium flex items-center gap-2"><Download className="w-4 h-4" />Export Report</button>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-gray-600 text-sm">Total Claims</span>
                  <FileText className="w-5 h-5 text-blue-600" />
                </div>
                <p className="text-3xl font-bold text-gray-900">{stats.totalClaims.toLocaleString()}</p>
                <div className="flex items-center gap-1 mt-2 text-green-600 text-sm"><TrendingUp className="w-4 h-4" />+12% from last month</div>
              </div>
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-green-600 text-sm">Total Paid</span>
                  <DollarSign className="w-5 h-5 text-green-600" />
                </div>
                <p className="text-3xl font-bold text-green-700">${(stats.totalPaid / 1000000).toFixed(2)}M</p>
                <div className="flex items-center gap-1 mt-2 text-green-600 text-sm"><TrendingUp className="w-4 h-4" />+8% from last month</div>
              </div>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-blue-600 text-sm">Avg Processing</span>
                  <Clock className="w-5 h-5 text-blue-600" />
                </div>
                <p className="text-3xl font-bold text-blue-700">{stats.avgProcessingTime} days</p>
                <div className="flex items-center gap-1 mt-2 text-green-600 text-sm"><TrendingUp className="w-4 h-4" />-2 days improvement</div>
              </div>
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-yellow-600 text-sm">Pending Review</span>
                  <AlertTriangle className="w-5 h-5 text-yellow-600" />
                </div>
                <p className="text-3xl font-bold text-yellow-700">{stats.pendingReview}</p>
                <div className="flex items-center gap-1 mt-2 text-gray-500 text-sm">Requires attention</div>
              </div>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Claims by Type</h3>
              <div className="space-y-4">
                {[
                  { type: 'Auto Collision', count: 456, percent: 37, color: 'bg-blue-500' },
                  { type: 'Property Damage', count: 312, percent: 25, color: 'bg-green-500' },
                  { type: 'Theft', count: 234, percent: 19, color: 'bg-purple-500' },
                  { type: 'Medical', count: 156, percent: 13, color: 'bg-orange-500' },
                  { type: 'Other', count: 89, percent: 7, color: 'bg-gray-500' },
                ].map((item) => (
                  <div key={item.type}>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-gray-700">{item.type}</span>
                      <span className="text-gray-500 text-sm">{item.count} ({item.percent}%)</span>
                    </div>
                    <div className="w-full h-2 bg-gray-200 rounded-full">
                      <div className={`h-2 ${item.color} rounded-full`} style={{ width: `${item.percent}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Claims Status</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <span className="text-green-700 font-medium">Approved</span>
                  </div>
                  <span className="text-green-700 font-bold">{stats.approved}</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <Clock className="w-5 h-5 text-yellow-600" />
                    <span className="text-yellow-700 font-medium">Pending</span>
                  </div>
                  <span className="text-yellow-700 font-bold">{stats.pendingReview}</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <AlertTriangle className="w-5 h-5 text-red-600" />
                    <span className="text-red-700 font-medium">Denied</span>
                  </div>
                  <span className="text-red-700 font-bold">{stats.denied}</span>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Monthly Trend</h3>
              <div className="flex items-end gap-2 h-40">
                {[65, 78, 82, 75, 88, 92, 85, 90, 95, 89, 96, 100].map((value, i) => (
                  <div key={i} className="flex-1 flex flex-col items-center">
                    <div className="w-full bg-blue-500 rounded-t" style={{ height: `${value}%` }} />
                    <span className="text-xs text-gray-500 mt-1">{['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'][i]}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Quick Reports</h3>
              <div className="grid grid-cols-1 gap-3">
                {[
                  { name: 'Claims Summary Report', desc: 'Overview of all claims activity' },
                  { name: 'Payment Summary Report', desc: 'Detailed payment analysis' },
                  { name: 'Adjuster Performance', desc: 'Claims handler metrics' },
                  { name: 'Fraud Detection Report', desc: 'Suspicious claims flagged' },
                ].map((report, i) => (
                  <button key={i} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 text-left">
                    <div>
                      <p className="font-medium text-gray-900">{report.name}</p>
                      <p className="text-sm text-gray-500">{report.desc}</p>
                    </div>
                    <Download className="w-5 h-5 text-gray-400" />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClaimsReportScreen;
