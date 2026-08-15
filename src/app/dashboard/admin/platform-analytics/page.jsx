"use client";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Jan', Volume: 24000, Users: 120 },
  { name: 'Feb', Volume: 22100, Users: 190 },
  { name: 'Mar', Volume: 32900, Users: 240 },
  { name: 'Apr', Volume: 28000, Users: 300 },
  { name: 'May', Volume: 48900, Users: 450 },
  { name: 'Jun', Volume: 61900, Users: 680 },
];

const PlatformAnalytics = () => {
  const isDark = document.documentElement.getAttribute('data-theme') !== 'light';
  const gridColor = isDark ? '#1e293b' : '#e2e8f0';
  const labelColor = isDark ? '#94a3b8' : '#64748b';
  const tooltipBg = isDark ? '#0f172a' : '#ffffff';
  const tooltipBorder = isDark ? '#1e293b' : '#cbd5e1';
  const tooltipText = isDark ? '#ffffff' : '#0f172a';

  return (
    <div className="space-y-8 text-base-content">
      <h1 className="text-3xl font-extrabold">Platform Growth</h1>

      <div className="bg-base-200 border border-base-300 p-6 rounded-3xl shadow-xl space-y-4">
        <h3 className="text-lg font-bold text-primary font-sans">Monthly Trade Volume ($)</h3>
        <div className="w-full h-80">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data}>
              <defs>
                <linearGradient id="colorVolume" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="var(--fallback-p, hsl(var(--p)))" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="var(--fallback-p, hsl(var(--p)))" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
              <XAxis dataKey="name" stroke={labelColor} />
              <YAxis stroke={labelColor} />
              <Tooltip contentStyle={{ backgroundColor: tooltipBg, borderColor: tooltipBorder, color: tooltipText }} />
              <Area type="monotone" dataKey="Volume" stroke="var(--fallback-p, hsl(var(--p)))" fillOpacity={1} fill="url(#colorVolume)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-base-200 border border-base-300 p-6 rounded-3xl shadow-xl space-y-4">
        <h3 className="text-lg font-bold text-secondary font-sans">Total Registered Traders</h3>
        <div className="w-full h-80">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data}>
              <defs>
                <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="var(--fallback-s, hsl(var(--s)))" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="var(--fallback-s, hsl(var(--s)))" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
              <XAxis dataKey="name" stroke={labelColor} />
              <YAxis stroke={labelColor} />
              <Tooltip contentStyle={{ backgroundColor: tooltipBg, borderColor: tooltipBorder, color: tooltipText }} />
              <Area type="monotone" dataKey="Users" stroke="var(--fallback-s, hsl(var(--s)))" fillOpacity={1} fill="url(#colorUsers)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default PlatformAnalytics;
