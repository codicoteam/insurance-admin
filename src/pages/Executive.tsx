import { useState, useEffect } from "react";
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  Shield,
  Users,
  Award,
  Target,
  AlertCircle,
  Download,
  Filter,
  RefreshCw,
  Menu,
  ChevronRight,
  Activity,
  BarChart3,
  type LucideIcon,
} from "lucide-react";
import InsuranceSidebar from "../Components/sidebar";

interface Metric {
  title: string;
  value: string;
  change: string;
  trend: "up" | "down";
  icon: LucideIcon;
  color: string;
  bgColor: string;
  target: string;
  progress: number;
  sparkline: number[];
}

const ExecutiveOverview = () => {
  const [timeframe, setTimeframe] = useState("Q4 2024");
  const [animateIn, setAnimateIn] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    setAnimateIn(true);
  }, []);

  const metrics: Metric[] = [
    {
      title: "Gross Written Premium",
      value: "$2.4B",
      change: "+12.3%",
      trend: "up",
      icon: DollarSign,
      color: "from-blue-500 to-cyan-600",
      bgColor: "bg-gradient-to-br from-blue-50 to-cyan-50",
      target: "Target: $2.2B",
      progress: 109,
      sparkline: [2.0, 2.1, 2.15, 2.25, 2.3, 2.4],
    },
    {
      title: "Loss Ratio",
      value: "58.2%",
      change: "-3.1%",
      trend: "up",
      icon: Shield,
      color: "from-emerald-500 to-teal-600",
      bgColor: "bg-gradient-to-br from-emerald-50 to-teal-50",
      target: "Target: <60%",
      progress: 97,
      sparkline: [62, 61, 60.5, 59.8, 59, 58.2],
    },
    {
      title: "Combined Ratio",
      value: "94.5%",
      change: "-2.8%",
      trend: "up",
      icon: Activity,
      color: "from-purple-500 to-pink-600",
      bgColor: "bg-gradient-to-br from-purple-50 to-pink-50",
      target: "Target: <95%",
      progress: 99,
      sparkline: [98, 97.5, 96.8, 96, 95, 94.5],
    },
    {
      title: "Retention Rate",
      value: "89.7%",
      change: "+4.2%",
      trend: "up",
      icon: Users,
      color: "from-amber-500 to-orange-600",
      bgColor: "bg-gradient-to-br from-amber-50 to-orange-50",
      target: "Target: >85%",
      progress: 106,
      sparkline: [84, 85.5, 86.8, 87.5, 88.8, 89.7],
    },
    {
      title: "Net Promoter Score",
      value: "72",
      change: "+8 pts",
      trend: "up",
      icon: Award,
      color: "from-rose-500 to-red-600",
      bgColor: "bg-gradient-to-br from-rose-50 to-red-50",
      target: "Target: >70",
      progress: 103,
      sparkline: [60, 64, 66, 68, 70, 72],
    },
  ];

  interface SparklineProps {
    data: number[];
    color?: string;
  }

  const Sparkline = ({ data }: SparklineProps) => {
    const max = Math.max(...data);
    const min = Math.min(...data);
    const range = max - min;
    const width = 80;
    const height = 24;

    const points = data
      .map((val: number, i: number) => {
        const x = (i / (data.length - 1)) * width;
        const y = height - ((val - min) / range) * height;
        return `${x},${y}`;
      })
      .join(" ");

    return (
      <svg width={width} height={height} className="opacity-60">
        <polyline
          points={points}
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <InsuranceSidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      {/* Main Content */}
      <div className="flex-1 lg:ml-0">
        {/* Mobile Header */}
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
                <Shield className="w-4 h-4 text-white" />
              </div>
              <div>
                <h1 className="text-lg font-bold text-gray-900">InsureCore</h1>
              </div>
            </div>
          </div>
        </div>

        {/* Dashboard Content */}
        <div className="p-4 lg:p-6">
          {/* Enhanced Header with Admin Controls */}
          <div className="mb-8">
            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 mb-6">
              <div
                className={`transition-all duration-1000 ${animateIn ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"}`}
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-sm font-semibold text-gray-500 uppercase tracking-wider">
                    Real-Time Updates
                  </span>
                  <span className="text-xs text-gray-400">
                    Last updated: 2 min ago
                  </span>
                </div>
                <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
                  Executive Overview
                </h1>
                <p className="text-gray-600 text-base lg:text-lg">
                  Comprehensive performance metrics and strategic insights
                </p>
              </div>

              <div
                className={`flex flex-wrap items-center gap-3 transition-all duration-1000 delay-200 ${animateIn ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"}`}
              >
                <button className="px-4 py-2.5 bg-white border border-gray-200 rounded-lg text-gray-700 font-medium hover:bg-gray-50 hover:border-gray-300 transition-all flex items-center gap-2 shadow-sm hover:shadow">
                  <Filter className="w-4 h-4" />
                  <span className="hidden sm:inline">Filters</span>
                </button>
                <button className="px-4 py-2.5 bg-white border border-gray-200 rounded-lg text-gray-700 font-medium hover:bg-gray-50 hover:border-gray-300 transition-all flex items-center gap-2 shadow-sm hover:shadow">
                  <RefreshCw className="w-4 h-4" />
                  <span className="hidden sm:inline">Refresh</span>
                </button>
                <button className="px-4 py-2.5 bg-white border border-gray-200 rounded-lg text-gray-700 font-medium hover:bg-gray-50 hover:border-gray-300 transition-all flex items-center gap-2 shadow-sm hover:shadow">
                  <Download className="w-4 h-4" />
                  <span className="hidden sm:inline">Export</span>
                </button>
                <select
                  value={timeframe}
                  onChange={(e) => setTimeframe(e.target.value)}
                  className="px-4 py-2.5 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-medium focus:outline-none hover:from-blue-700 hover:to-purple-700 transition-all shadow-lg hover:shadow-xl cursor-pointer"
                >
                  <option>Q4 2024</option>
                  <option>Q3 2024</option>
                  <option>Q2 2024</option>
                  <option>Q1 2024</option>
                  <option>FY 2024</option>
                  <option>YTD 2024</option>
                </select>
              </div>
            </div>
          </div>

          {/* Key Metrics Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-4 lg:gap-5 mb-8">
            {metrics.map((metric, idx) => {
              const Icon = metric.icon;
              return (
                <div
                  key={idx}
                  className={`relative group transition-all duration-700 ${animateIn ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
                  style={{ transitionDelay: `${idx * 100}ms` }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 rounded-2xl blur-xl opacity-0 group-hover:opacity-30 transition-opacity duration-500"></div>
                  <div
                    className={`relative bg-white border border-gray-200 rounded-2xl p-4 lg:p-5 hover:border-gray-300 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 h-full`}
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div
                        className={`bg-gradient-to-br ${metric.color} p-3 rounded-xl shadow-md transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-300`}
                      >
                        <Icon className="w-5 h-5 text-white" />
                      </div>
                      <div
                        className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold shadow-sm ${
                          metric.trend === "up"
                            ? "bg-gradient-to-r from-green-500 to-emerald-500 text-white"
                            : "bg-gradient-to-r from-red-500 to-rose-500 text-white"
                        }`}
                      >
                        {metric.trend === "up" ? (
                          <TrendingUp className="w-3 h-3" />
                        ) : (
                          <TrendingDown className="w-3 h-3" />
                        )}
                        <span>{metric.change}</span>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-gray-600 text-xs font-semibold mb-2 uppercase tracking-wide">
                        {metric.title}
                      </h3>
                      <p className="text-2xl lg:text-3xl font-bold text-gray-900 mb-3">
                        {metric.value}
                      </p>

                      <div className="mb-3">
                        <div className="flex items-center justify-between mb-1.5">
                          <span className="text-xs text-gray-500 font-medium">
                            {metric.target}
                          </span>
                          <span
                            className={`text-xs font-bold ${metric.progress >= 100 ? "text-green-600" : "text-amber-600"}`}
                          >
                            {metric.progress}%
                          </span>
                        </div>
                        <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                          <div
                            className={`h-full bg-gradient-to-r ${metric.color} rounded-full transition-all duration-1000 ease-out`}
                            style={{
                              width: `${Math.min(metric.progress, 100)}%`,
                            }}
                          ></div>
                        </div>
                      </div>

                      <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                        <span className="text-xs text-gray-500 font-medium">
                          6M Trend
                        </span>
                        <div className={`text-gray-700`}>
                          <Sparkline
                            data={metric.sparkline}
                            color={metric.color}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Bottom Section */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
            {/* Performance Summary */}
            <div className="xl:col-span-2 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-2xl p-6 lg:p-8 shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
              <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>

              <div className="relative z-10">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
                  <div>
                    <h3 className="text-2xl font-bold text-white flex items-center gap-2 mb-1">
                      <Target className="w-6 h-6 text-blue-400" />
                      Financial Performance
                    </h3>
                    <p className="text-gray-400 text-sm">
                      Detailed breakdown of key financial metrics
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="px-4 py-2 bg-white/10 backdrop-blur rounded-lg border border-white/20">
                      <span className="text-white text-sm font-semibold">
                        Q4 2024
                      </span>
                    </div>
                    <button className="p-2 bg-white/10 hover:bg-white/20 backdrop-blur rounded-lg border border-white/20 transition-colors">
                      <BarChart3 className="w-4 h-4 text-white" />
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="bg-white/5 backdrop-blur border border-white/10 rounded-xl p-5 hover:bg-white/10 transition-all group">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-gray-400 text-sm font-medium">
                        Underwriting Profit
                      </span>
                      <div className="p-1.5 bg-green-500/20 rounded-lg">
                        <TrendingUp className="w-4 h-4 text-green-400" />
                      </div>
                    </div>
                    <span className="text-3xl font-bold text-white block mb-2">
                      $132M
                    </span>
                    <div className="flex items-center gap-2">
                      <span className="text-green-400 text-sm font-semibold">
                        +15.2%
                      </span>
                      <span className="text-gray-500 text-xs">
                        vs last quarter
                      </span>
                    </div>
                  </div>

                  <div className="bg-white/5 backdrop-blur border border-white/10 rounded-xl p-5 hover:bg-white/10 transition-all group">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-gray-400 text-sm font-medium">
                        Expense Ratio
                      </span>
                      <div className="p-1.5 bg-blue-500/20 rounded-lg">
                        <Activity className="w-4 h-4 text-blue-400" />
                      </div>
                    </div>
                    <span className="text-3xl font-bold text-white block mb-2">
                      36.3%
                    </span>
                    <div className="flex items-center gap-2">
                      <span className="text-green-400 text-sm font-semibold">
                        -1.4%
                      </span>
                      <span className="text-gray-500 text-xs">improvement</span>
                    </div>
                  </div>

                  <div className="bg-white/5 backdrop-blur border border-white/10 rounded-xl p-5 hover:bg-white/10 transition-all group">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-gray-400 text-sm font-medium">
                        Investment Income
                      </span>
                      <div className="p-1.5 bg-purple-500/20 rounded-lg">
                        <DollarSign className="w-4 h-4 text-purple-400" />
                      </div>
                    </div>
                    <span className="text-3xl font-bold text-white block mb-2">
                      $84M
                    </span>
                    <div className="flex items-center gap-2">
                      <span className="text-green-400 text-sm font-semibold">
                        +8.7%
                      </span>
                      <span className="text-gray-500 text-xs">
                        vs last quarter
                      </span>
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-green-500/20 to-emerald-500/20 backdrop-blur border-2 border-green-500/40 rounded-xl p-5 shadow-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-green-300 text-sm font-semibold">
                        Net Income
                      </span>
                      <div className="p-1.5 bg-green-500/30 rounded-lg">
                        <Award className="w-4 h-4 text-green-300" />
                      </div>
                    </div>
                    <span className="text-3xl font-bold text-white block mb-2">
                      $216M
                    </span>
                    <div className="flex items-center gap-2">
                      <span className="text-green-300 text-sm font-semibold">
                        +18.3%
                      </span>
                      <span className="text-green-200 text-xs">
                        strong growth
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Key Insights & Alerts */}
            <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all">
              <div className="flex items-center justify-between mb-5">
                <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                  <AlertCircle className="w-5 h-5 text-blue-600" />
                  Key Insights
                </h3>
                <button className="text-xs text-blue-600 font-semibold hover:text-blue-700">
                  View All
                </button>
              </div>

              <div className="space-y-3">
                <div className="group">
                  <div className="flex items-start gap-3 p-3 rounded-xl hover:bg-gradient-to-br hover:from-green-50 hover:to-emerald-50 transition-all border border-transparent hover:border-green-200">
                    <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-emerald-500 rounded-lg flex items-center justify-center flex-shrink-0 shadow-md">
                      <ChevronRight className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1">
                      <span className="text-gray-900 font-semibold text-sm leading-relaxed block mb-1">
                        Premium Growth Exceeds Target
                      </span>
                      <p className="text-xs text-gray-600 leading-relaxed">
                        Commercial lines expansion driving 9% over-performance
                        against quarterly targets
                      </p>
                      <span className="text-xs text-green-600 font-medium mt-1 inline-block">
                        +$187M increase
                      </span>
                    </div>
                  </div>
                </div>

                <div className="group">
                  <div className="flex items-start gap-3 p-3 rounded-xl hover:bg-gradient-to-br hover:from-blue-50 hover:to-cyan-50 transition-all border border-transparent hover:border-blue-200">
                    <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center flex-shrink-0 shadow-md">
                      <ChevronRight className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1">
                      <span className="text-gray-900 font-semibold text-sm leading-relaxed block mb-1">
                        Enhanced Risk Selection
                      </span>
                      <p className="text-xs text-gray-600 leading-relaxed">
                        Loss ratio improvements reflect stronger underwriting
                        discipline and risk management
                      </p>
                      <span className="text-xs text-blue-600 font-medium mt-1 inline-block">
                        -3.1% reduction
                      </span>
                    </div>
                  </div>
                </div>

                <div className="group">
                  <div className="flex items-start gap-3 p-3 rounded-xl hover:bg-gradient-to-br hover:from-purple-50 hover:to-pink-50 transition-all border border-transparent hover:border-purple-200">
                    <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center flex-shrink-0 shadow-md">
                      <ChevronRight className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1">
                      <span className="text-gray-900 font-semibold text-sm leading-relaxed block mb-1">
                        Customer Satisfaction Peak
                      </span>
                      <p className="text-xs text-gray-600 leading-relaxed">
                        Retention at 5-year high with NPS trending positive
                        across all segments
                      </p>
                      <span className="text-xs text-purple-600 font-medium mt-1 inline-block">
                        89.7% retention
                      </span>
                    </div>
                  </div>
                </div>

                <div className="group">
                  <div className="flex items-start gap-3 p-3 rounded-xl hover:bg-gradient-to-br hover:from-amber-50 hover:to-orange-50 transition-all border border-transparent hover:border-amber-200">
                    <div className="w-8 h-8 bg-gradient-to-br from-amber-500 to-orange-500 rounded-lg flex items-center justify-center flex-shrink-0 shadow-md">
                      <AlertCircle className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1">
                      <span className="text-gray-900 font-semibold text-sm leading-relaxed block mb-1">
                        Action Required
                      </span>
                      <p className="text-xs text-gray-600 leading-relaxed">
                        Quarterly board report due in 5 days - review pending
                        approvals
                      </p>
                      <span className="text-xs text-amber-600 font-medium mt-1 inline-block">
                        Due: Oct 14
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExecutiveOverview;
