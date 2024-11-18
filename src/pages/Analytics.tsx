import { useState } from 'react';
import { BarChart, Calendar, Users, Share2, TrendingUp } from 'lucide-react';
import { motion } from 'framer-motion';
import { format } from 'date-fns';

const mockData = {
  totalViews: 1234,
  totalLeads: 89,
  conversionRate: 7.2,
  shareCount: 156,
  viewsOverTime: [
    { date: '2024-02-01', views: 45 },
    { date: '2024-02-02', views: 52 },
    { date: '2024-02-03', views: 38 },
    { date: '2024-02-04', views: 65 },
    { date: '2024-02-05', views: 41 },
    { date: '2024-02-06', views: 58 },
    { date: '2024-02-07', views: 71 },
  ],
  topSources: [
    { source: 'NFC Tap', count: 45, percentage: 36 },
    { source: 'QR Code', count: 38, percentage: 31 },
    { source: 'Direct Link', count: 25, percentage: 20 },
    { source: 'Email Signature', count: 16, percentage: 13 },
  ],
};

export function Analytics() {
  const [timeframe, setTimeframe] = useState('7d');

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Analytics Dashboard</h1>
          <p className="mt-1 text-sm text-gray-500">
            Track your business card performance and lead generation
          </p>
        </div>
        <select
          value={timeframe}
          onChange={(e) => setTimeframe(e.target.value)}
          className="rounded-md border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none focus:ring-blue-500"
        >
          <option value="7d">Last 7 days</option>
          <option value="30d">Last 30 days</option>
          <option value="90d">Last 90 days</option>
        </select>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {[
          {
            title: 'Total Views',
            value: mockData.totalViews,
            icon: Users,
            trend: '+12.3%',
            color: 'blue',
          },
          {
            title: 'Leads Generated',
            value: mockData.totalLeads,
            icon: TrendingUp,
            trend: '+5.7%',
            color: 'green',
          },
          {
            title: 'Conversion Rate',
            value: `${mockData.conversionRate}%`,
            icon: BarChart,
            trend: '+2.1%',
            color: 'purple',
          },
          {
            title: 'Total Shares',
            value: mockData.shareCount,
            icon: Share2,
            trend: '+8.4%',
            color: 'orange',
          },
        ].map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="rounded-lg bg-white p-6 shadow-sm"
          >
            <div className="flex items-center justify-between">
              <stat.icon
                className={`h-12 w-12 rounded-full bg-${stat.color}-100 p-2 text-${stat.color}-600`}
              />
              <span
                className={`text-sm font-medium text-${
                  stat.trend.startsWith('+') ? 'green' : 'red'
                }-600`}
              >
                {stat.trend}
              </span>
            </div>
            <p className="mt-4 text-sm font-medium text-gray-600">{stat.title}</p>
            <p className="mt-1 text-3xl font-semibold text-gray-900">{stat.value}</p>
          </motion.div>
        ))}
      </div>

      {/* Views Over Time Chart */}
      <div className="rounded-lg bg-white p-6 shadow-sm">
        <h3 className="text-lg font-medium text-gray-900">Views Over Time</h3>
        <div className="mt-4 h-64">
          <div className="flex h-full items-end space-x-2">
            {mockData.viewsOverTime.map((day) => (
              <div
                key={day.date}
                className="group relative flex-1"
                style={{ height: `${(day.views / 80) * 100}%` }}
              >
                <div className="relative h-full w-full">
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: '100%' }}
                    transition={{ duration: 0.5 }}
                    className="w-full rounded-t bg-blue-500 transition-all group-hover:bg-blue-600"
                  />
                </div>
                <div className="absolute -bottom-6 left-1/2 hidden -translate-x-1/2 transform whitespace-nowrap text-xs text-gray-600 group-hover:block">
                  {format(new Date(day.date), 'MMM d')}
                  <br />
                  {day.views} views
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Top Sources */}
      <div className="rounded-lg bg-white p-6 shadow-sm">
        <h3 className="text-lg font-medium text-gray-900">Top Sources</h3>
        <div className="mt-4 space-y-4">
          {mockData.topSources.map((source) => (
            <div key={source.source}>
              <div className="flex items-center justify-between text-sm">
                <span className="font-medium text-gray-600">{source.source}</span>
                <span className="text-gray-500">{source.count} views</span>
              </div>
              <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-gray-100">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${source.percentage}%` }}
                  transition={{ duration: 0.5 }}
                  className="h-full rounded-full bg-blue-500"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}