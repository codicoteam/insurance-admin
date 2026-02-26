import React, { useState } from "react";
import {
  TrendingUp,
  TrendingDown,
  FileText,
  Shield,
  CheckCircle,
  Clock,
  AlertCircle,
  DollarSign,
  Activity,
} from "lucide-react";
import {
  ResponsiveContainer,
  BarChart,
  AreaChart,
  PieChart,
  LineChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Bar,
  Area,
  Pie,
  Cell,
  Line,
} from "recharts";

const Operations = () => {
  const [timeRange, setTimeRange] = useState("7d");

  // Quotes to Bind Funnel Data
  const funnelData = [
    { stage: "Quotes", count: 1250, percentage: 100, color: "#3b82f6" },
    { stage: "Proposals", count: 875, percentage: 70, color: "#8b5cf6" },
    { stage: "Applications", count: 525, percentage: 42, color: "#ec4899" },
    { stage: "Underwriting", count: 350, percentage: 28, color: "#f59e0b" },
    { stage: "Bound", count: 245, percentage: 19.6, color: "#10b981" },
  ];

  const conversionTrend = [
    { date: "Mon", quotes: 180, bound: 35, rate: 19.4 },
    { date: "Tue", quotes: 195, bound: 38, rate: 19.5 },
    { date: "Wed", quotes: 172, bound: 34, rate: 19.8 },
    { date: "Thu", quotes: 188, bound: 37, rate: 19.7 },
    { date: "Fri", quotes: 210, bound: 42, rate: 20.0 },
    { date: "Sat", quotes: 145, bound: 28, rate: 19.3 },
    { date: "Sun", quotes: 160, bound: 31, rate: 19.4 },
  ];

  // Claims SLA Data
  const claimsData = {
    total: 342,
    withinSLA: 298,
    breached: 44,
    slaRate: 87.1,
  };

  const claimsByStatus = [
    { name: "Within SLA", value: 298, color: "#10b981" },
    { name: "At Risk", value: 28, color: "#f59e0b" },
    { name: "Breached", value: 16, color: "#ef4444" },
  ];

  const claimsTrend = [
    { day: "Mon", fnol: 48, assessed: 45, approved: 38, paid: 35 },
    { day: "Tue", fnol: 52, assessed: 48, approved: 42, paid: 38 },
    { day: "Wed", fnol: 45, assessed: 50, approved: 45, paid: 40 },
    { day: "Thu", fnol: 50, assessed: 46, approved: 48, paid: 42 },
    { day: "Fri", fnol: 55, assessed: 52, approved: 46, paid: 45 },
    { day: "Sat", fnol: 38, assessed: 40, approved: 38, paid: 35 },
    { day: "Sun", fnol: 42, assessed: 38, approved: 40, paid: 36 },
  ];

  // Payments Health Data
  const paymentsData = {
    totalProcessed: 1847,
    totalAmount: 2847650,
    successRate: 96.8,
    avgProcessingTime: 2.3,
  };

  const paymentsTrend = [
    { date: "Mon", successful: 265, failed: 8, pending: 12 },
    { date: "Tue", successful: 278, failed: 6, pending: 9 },
    { date: "Wed", successful: 252, failed: 10, pending: 15 },
    { date: "Thu", successful: 270, failed: 7, pending: 11 },
    { date: "Fri", successful: 295, failed: 9, pending: 14 },
    { date: "Sat", successful: 198, failed: 5, pending: 8 },
    { date: "Sun", successful: 210, failed: 4, pending: 10 },
  ];

  const paymentMethods = [
    { method: "Credit Card", count: 890, percentage: 48.2 },
    { method: "ACH", count: 645, percentage: 34.9 },
    { method: "Wire Transfer", count: 215, percentage: 11.6 },
    { method: "Check", count: 97, percentage: 5.3 },
  ];

  interface StatCardProps {
    title: string;
    value: string | number;
    subtitle: string;
    icon: React.ComponentType<{ className?: string }>;
    trend?: "up" | "down";
    trendValue?: string;
    color: string;
  }

  const StatCard: React.FC<StatCardProps> = ({
    title,
    value,
    subtitle,
    trend,
    trendValue,
    color,
  }) => (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <h3 className="text-3xl font-bold mt-2" style={{ color }}>
            {value}
          </h3>
          <p className="text-sm text-gray-500 mt-1">{subtitle}</p>
        </div>
        <div
          className={`p-3 rounded-lg`}
          style={{ backgroundColor: `${color}15` }}
        ></div>
      </div>
      {trend && (
        <div className="flex items-center mt-4 pt-4 border-t border-gray-100">
          {trend === "up" ? (
            <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
          ) : (
            <TrendingDown className="w-4 h-4 text-red-500 mr-1" />
          )}
          <span
            className={`text-sm font-medium ${trend === "up" ? "text-green-600" : "text-red-600"}`}
          >
            {trendValue}
          </span>
          <span className="text-sm text-gray-500 ml-1">vs last period</span>
        </div>
      )}
    </div>
  );

  return (
    <div className="p-4 lg:p-6">
      {/* Header */}
      <div className="mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">
              Operational Operations
            </h1>
            <p className="text-gray-600 mt-1">
              Real-time insurance operations monitoring
            </p>
          </div>
          <div className="flex gap-2">
            {["24h", "7d", "30d", "90d"].map((range) => (
              <button
                key={range}
                onClick={() => setTimeRange(range)}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                  timeRange === range
                    ? "bg-blue-600 text-white shadow-sm"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {range}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Quotes to Bind Funnel Section */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-4">
          <FileText className="w-5 h-5 text-blue-600" />
          <h2 className="text-xl font-bold text-gray-900">
            Quotes to Bind Funnel
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
          {funnelData.map((item, idx) => (
            <StatCard
              key={item.stage}
              title={item.stage}
              value={item.count.toLocaleString()}
              subtitle={`${item.percentage}% of total`}
              icon={FileText}
              color={item.color}
              trend={idx === funnelData.length - 1 ? "up" : undefined}
              trendValue={idx === funnelData.length - 1 ? "+5.2%" : undefined}
            />
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 lg:p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Conversion Funnel
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={funnelData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="stage" stroke="#6b7280" />
                <YAxis stroke="#6b7280" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#fff",
                    border: "1px solid #e5e7eb",
                    borderRadius: "8px",
                  }}
                />
                <Bar dataKey="count" radius={[8, 8, 0, 0]}>
                  {funnelData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 lg:p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Weekly Conversion Trend
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={conversionTrend}>
                <defs>
                  <linearGradient
                    id="quotesGradient"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient
                    id="boundGradient"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="date" stroke="#6b7280" />
                <YAxis stroke="#6b7280" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#fff",
                    border: "1px solid #e5e7eb",
                    borderRadius: "8px",
                  }}
                />
                <Legend />
                <Area
                  type="monotone"
                  dataKey="quotes"
                  stroke="#3b82f6"
                  fill="url(#quotesGradient)"
                  strokeWidth={2}
                />
                <Area
                  type="monotone"
                  dataKey="bound"
                  stroke="#10b981"
                  fill="url(#boundGradient)"
                  strokeWidth={2}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Claims SLA Section */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-4">
          <Shield className="w-5 h-5 text-purple-600" />
          <h2 className="text-xl font-bold text-gray-900">
            Claims SLA Performance
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <StatCard
            title="Total Claims"
            value={claimsData.total}
            subtitle="Active claims"
            icon={FileText}
            color="#8b5cf6"
            trend="up"
            trendValue="+12.3%"
          />
          <StatCard
            title="Within SLA"
            value={claimsData.withinSLA}
            subtitle={`${claimsData.slaRate}% compliance`}
            icon={CheckCircle}
            color="#10b981"
            trend="up"
            trendValue="+2.1%"
          />
          <StatCard
            title="At Risk"
            value={claimsByStatus[1].value}
            subtitle="Approaching deadline"
            icon={Clock}
            color="#f59e0b"
          />
          <StatCard
            title="Breached"
            value={claimsByStatus[2].value}
            subtitle="Requires attention"
            icon={AlertCircle}
            color="#ef4444"
            trend="down"
            trendValue="-3.5%"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 lg:p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              SLA Distribution
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={claimsByStatus}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {claimsByStatus.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#fff",
                    border: "1px solid #e5e7eb",
                    borderRadius: "8px",
                  }}
                />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 lg:p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Claims Processing Flow
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={claimsTrend}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="day" stroke="#6b7280" />
                <YAxis stroke="#6b7280" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#fff",
                    border: "1px solid #e5e7eb",
                    borderRadius: "8px",
                  }}
                />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="fnol"
                  stroke="#3b82f6"
                  strokeWidth={2}
                  dot={{ r: 4 }}
                  name="FNOL"
                />
                <Line
                  type="monotone"
                  dataKey="assessed"
                  stroke="#8b5cf6"
                  strokeWidth={2}
                  dot={{ r: 4 }}
                  name="Assessed"
                />
                <Line
                  type="monotone"
                  dataKey="approved"
                  stroke="#ec4899"
                  strokeWidth={2}
                  dot={{ r: 4 }}
                  name="Approved"
                />
                <Line
                  type="monotone"
                  dataKey="paid"
                  stroke="#10b981"
                  strokeWidth={2}
                  dot={{ r: 4 }}
                  name="Paid"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Payments Health Section */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <DollarSign className="w-5 h-5 text-green-600" />
          <h2 className="text-xl font-bold text-gray-900">Payments Health</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <StatCard
            title="Total Processed"
            value={paymentsData.totalProcessed.toLocaleString()}
            subtitle="Transactions"
            icon={Activity}
            color="#10b981"
            trend="up"
            trendValue="+8.7%"
          />
          <StatCard
            title="Total Amount"
            value={`$${(paymentsData.totalAmount / 1000000).toFixed(1)}M`}
            subtitle="Payment volume"
            icon={DollarSign}
            color="#3b82f6"
            trend="up"
            trendValue="+15.2%"
          />
          <StatCard
            title="Success Rate"
            value={`${paymentsData.successRate}%`}
            subtitle="Transaction success"
            icon={CheckCircle}
            color="#10b981"
            trend="up"
            trendValue="+0.3%"
          />
          <StatCard
            title="Avg Processing"
            value={`${paymentsData.avgProcessingTime}s`}
            subtitle="Processing time"
            icon={Clock}
            color="#8b5cf6"
            trend="down"
            trendValue="-0.5s"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 lg:p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Payment Status Trend
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={paymentsTrend}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="date" stroke="#6b7280" />
                <YAxis stroke="#6b7280" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#fff",
                    border: "1px solid #e5e7eb",
                    borderRadius: "8px",
                  }}
                />
                <Legend />
                <Bar
                  dataKey="successful"
                  fill="#10b981"
                  radius={[8, 8, 0, 0]}
                  name="Successful"
                />
                <Bar
                  dataKey="pending"
                  fill="#f59e0b"
                  radius={[8, 8, 0, 0]}
                  name="Pending"
                />
                <Bar
                  dataKey="failed"
                  fill="#ef4444"
                  radius={[8, 8, 0, 0]}
                  name="Failed"
                />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 lg:p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Payment Methods
            </h3>
            <div className="space-y-4">
              {paymentMethods.map((method, idx) => (
                <div key={idx}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700">
                      {method.method}
                    </span>
                    <span className="text-sm font-semibold text-gray-900">
                      {method.count} ({method.percentage}%)
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div
                      className="bg-gradient-to-r from-blue-500 to-purple-500 h-2.5 rounded-full transition-all duration-500"
                      style={{ width: `${method.percentage}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-6 p-4 bg-green-50 rounded-lg border border-green-200">
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-green-900 text-sm">
                    Payment Gateway Healthy
                  </h4>
                  <p className="text-xs text-green-700 mt-1">
                    All payment processors operational. No downtime in last 7
                    days.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Operations;
