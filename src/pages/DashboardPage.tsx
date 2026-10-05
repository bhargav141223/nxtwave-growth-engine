import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSimulation } from '../SimulationContext';
import { 
  AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, 
  PieChart, Pie, Cell, BarChart, Bar, CartesianGrid, Legend,
  ComposedChart, Line
} from 'recharts';
import { Users, Link, Activity, DollarSign, TrendingUp, Zap } from 'lucide-react';
import { motion } from 'framer-motion';

const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#8b5cf6'];

export default function DashboardPage() {
  const { metrics, liveFeed, isAdminAuthenticated } = useSimulation();

  if (!isAdminAuthenticated) {
    return <Navigate to="/admin" replace />;
  }

  return (
    <div className="min-h-screen bg-slate-900 text-slate-200 p-4 md:p-8 font-sans">
      <div className="max-w-7xl mx-auto">
        <header className="mb-8 flex flex-col md:flex-row md:items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white flex items-center gap-2">
              <Activity className="text-blue-500" />
              AI Workshop Growth Engine
            </h1>
            <p className="text-slate-400 mt-1">Real-time campaign performance tracking.</p>
          </div>
          <div className="mt-4 md:mt-0 flex items-center gap-3 bg-slate-800 py-2 px-4 rounded-lg border border-slate-700">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-blue-500"></span>
            </span>
            <span className="text-sm font-medium text-blue-400">Live Tracking Active</span>
          </div>
        </header>

        {/* Top KPIs */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <motion.div 
            key={metrics.totalRegistrations}
            initial={{ scale: 0.95 }}
            animate={{ scale: 1 }}
            className="bg-slate-800 p-6 rounded-2xl border border-slate-700 shadow-lg relative overflow-hidden"
          >
            <div className="absolute -right-4 -top-4 opacity-10 text-blue-500">
              <Users size={100} />
            </div>
            <h3 className="text-slate-400 font-medium mb-1">Total Registrations</h3>
            <div className="text-4xl font-bold text-white mb-2">
              {metrics.totalRegistrations}
            </div>
            <div className="text-sm text-slate-400 mb-4 flex flex-col gap-1">
              <span>Verified registrations</span>
              <span>Target: 500 | Projected: 500</span>
            </div>
            <div className="w-full bg-slate-700 h-1.5 rounded-full mt-4">
              <div 
                className="bg-blue-500 h-full rounded-full transition-all duration-500" 
                style={{ width: `${(metrics.totalRegistrations / 500) * 100}%` }} 
              />
            </div>
          </motion.div>

          <div className="bg-slate-800 p-6 rounded-2xl border border-slate-700 shadow-lg">
            <h3 className="text-slate-400 font-medium mb-1">Referral Impact</h3>
            <div className="text-4xl font-bold text-green-400 mb-2">{metrics.referralRegistrations}</div>
            <div className="flex items-center gap-1 text-sm text-green-500">
              <TrendingUp size={16} />
              <span>{Math.round((metrics.referralRegistrations / metrics.totalRegistrations) * 100)}% of total volume</span>
            </div>
          </div>

          <div className="bg-slate-800 p-6 rounded-2xl border border-slate-700 shadow-lg">
            <h3 className="text-slate-400 font-medium mb-1">Blended CAC</h3>
            <div className="text-4xl font-bold text-purple-400 mb-2">₹{metrics.costPerRegistration}</div>
            <div className="flex items-center gap-1 text-sm text-purple-400">
              <span>₹2,000 Total Budget</span>
            </div>
          </div>

          <div className="bg-slate-800 p-6 rounded-2xl border border-slate-700 shadow-lg">
            <h3 className="text-slate-400 font-medium mb-1">Conversion Rate</h3>
            <div className="text-4xl font-bold text-amber-400 mb-2">{metrics.conversionRate}%</div>
            <div className="flex items-center gap-1 text-sm text-amber-400">
              <span>Landing Page to Registration</span>
            </div>
          </div>
        </div>

        {/* Main Charts Area */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          
          {/* Trend Chart - Spans 2 columns */}
          <div className="bg-slate-800 p-6 rounded-2xl border border-slate-700 shadow-lg lg:col-span-2">
            <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
              <TrendingUp size={20} className="text-blue-500" />
              Registration Velocity (7 Days)
            </h3>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <ComposedChart data={metrics.timeSeriesData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorReg" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
                  <XAxis dataKey="date" stroke="#94a3b8" tick={{fill: '#94a3b8'}} />
                  <YAxis stroke="#94a3b8" tick={{fill: '#94a3b8'}} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#1e293b', borderColor: '#334155', color: '#fff' }}
                    itemStyle={{ color: '#e2e8f0' }}
                  />
                  <Legend />
                  <Area type="monotone" dataKey="registrations" name="Actual Regs" stroke="#3b82f6" strokeWidth={3} fillOpacity={1} fill="url(#colorReg)" />
                  <Line type="monotone" dataKey="target" name="Target Trajectory" stroke="#94a3b8" strokeDasharray="5 5" strokeWidth={2} dot={false} />
                </ComposedChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Live Feed Sidebar */}
          <div className="bg-slate-800 p-6 rounded-2xl border border-slate-700 shadow-lg flex flex-col">
            <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
              <Zap size={20} className="text-amber-500" />
              Live Activity
            </h3>
            <div className="flex-1 overflow-hidden">
              <div className="space-y-4">
                {liveFeed.map((activity, idx) => (
                  <motion.div 
                    key={activity.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="flex gap-3 border-l-2 border-slate-600 pl-3 py-1"
                  >
                    <div>
                      <p className="text-sm text-slate-300">{activity.message}</p>
                      <p className="text-xs text-slate-500 mt-1">{activity.time}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          {/* Funnel Chart */}
          <div className="bg-slate-800 p-6 rounded-2xl border border-slate-700 shadow-lg">
            <h3 className="text-lg font-bold text-white mb-6">User Journey Funnel</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={metrics.funnelData} layout="vertical" margin={{ top: 0, right: 30, left: 40, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#334155" horizontal={true} vertical={false} />
                  <XAxis type="number" stroke="#94a3b8" />
                  <YAxis dataKey="name" type="category" stroke="#94a3b8" width={120} />
                  <Tooltip 
                    cursor={{fill: '#334155', opacity: 0.4}}
                    contentStyle={{ backgroundColor: '#1e293b', borderColor: '#334155' }}
                  />
                  <Bar dataKey="value" radius={[0, 4, 4, 0]}>
                    {metrics.funnelData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.fill} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Acquisition Channels */}
          <div className="bg-slate-800 p-6 rounded-2xl border border-slate-700 shadow-lg flex flex-col md:flex-row items-center justify-between">
            <div className="w-full md:w-1/2 mb-6 md:mb-0">
              <h3 className="text-lg font-bold text-white mb-6">Acquisition Channels</h3>
              <div className="space-y-4">
                {metrics.registrationsByChannel.map((channel, i) => (
                  <div key={channel.name} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[i % COLORS.length] }}></div>
                      <span className="text-slate-300">{channel.name}</span>
                    </div>
                    <span className="font-bold text-white">{channel.value}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="w-full md:w-1/2 h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={metrics.registrationsByChannel}
                    innerRadius={70}
                    outerRadius={90}
                    paddingAngle={5}
                    dataKey="value"
                    stroke="none"
                  >
                    {metrics.registrationsByChannel.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#1e293b', borderColor: '#334155', color: '#fff' }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
