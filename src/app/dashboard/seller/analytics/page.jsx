"use client";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from 'recharts';

const data = [
  { name: 'Jan', Sales: 4000, Listings: 24 },
  { name: 'Feb', Sales: 3000, Listings: 18 },
  { name: 'Mar', Sales: 5000, Listings: 29 },
  { name: 'Apr', Sales: 2780, Listings: 20 },
  { name: 'May', Sales: 6890, Listings: 35 },
  { name: 'Jun', Sales: 8390, Listings: 42 },
];

const Analytics = () => {
  const isDark = document.documentElement.getAttribute('data-theme') !== 'light';
  const gridColor = isDark ? '#1e293b' : '#e2e8f0';
  const labelColor = isDark ? '#94a3b8' : '#64748b';
  const tooltipBg = isDark ? '#0f172a' : '#ffffff';
  const tooltipBorder = isDark ? '#1e293b' : '#cbd5e1';
  const tooltipText = isDark ? '#ffffff' : '#0f172a';

  return (
    <div className="space-y-8 text-base-content">
      <h1 className="text-3xl font-extrabold">Sales Analytics</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Earnings Chart */}
        <div className="bg-base-200 border border-base-300 p-6 rounded-3xl shadow-xl space-y-4">
          <h3 className="text-lg font-bold text-primary font-sans">Monthly Earnings ($)</h3>
          <div className="w-full h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
                <XAxis dataKey="name" stroke={labelColor} />
                <YAxis stroke={labelColor} />
                <Tooltip contentStyle={{ backgroundColor: tooltipBg, borderColor: tooltipBorder, color: tooltipText }} />
                <Legend />
                <Bar dataKey="Sales" fill="var(--fallback-p, hsl(var(--p)))" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Listings Chart */}
        <div className="bg-base-200 border border-base-300 p-6 rounded-3xl shadow-xl space-y-4">
          <h3 className="text-lg font-bold text-secondary font-sans">Listings Created</h3>
          <div className="w-full h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
                <XAxis dataKey="name" stroke={labelColor} />
                <YAxis stroke={labelColor} />
                <Tooltip contentStyle={{ backgroundColor: tooltipBg, borderColor: tooltipBorder, color: tooltipText }} />
                <Legend />
                <Line type="monotone" dataKey="Listings" stroke="var(--fallback-s, hsl(var(--s)))" strokeWidth={3} activeDot={{ r: 8 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
