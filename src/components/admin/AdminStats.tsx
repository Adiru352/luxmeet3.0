import { Users, CreditCard, AlertTriangle, TrendingUp } from 'lucide-react';
import { motion } from 'framer-motion';

const stats = [
  {
    name: 'Total Users',
    value: '1,234',
    change: '+12.3%',
    trend: 'up',
    icon: Users,
  },
  {
    name: 'Active Subscriptions',
    value: '856',
    change: '+5.7%',
    trend: 'up',
    icon: CreditCard,
  },
  {
    name: 'Overdue Payments',
    value: '23',
    change: '-2.1%',
    trend: 'down',
    icon: AlertTriangle,
  },
  {
    name: 'Monthly Revenue',
    value: '$12,345',
    change: '+8.4%',
    trend: 'up',
    icon: TrendingUp,
  },
];

export function AdminStats() {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat, index) => (
        <motion.div
          key={stat.name}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="rounded-lg border border-gray-200 bg-white p-6"
        >
          <div className="flex items-center justify-between">
            <stat.icon
              className={`h-8 w-8 rounded-full p-1.5 ${
                stat.name === 'Overdue Payments'
                  ? 'bg-red-100 text-red-600'
                  : 'bg-blue-100 text-blue-600'
              }`}
            />
            <span
              className={`text-sm font-medium ${
                stat.trend === 'up' ? 'text-green-600' : 'text-red-600'
              }`}
            >
              {stat.change}
            </span>
          </div>
          <p className="mt-4 text-sm font-medium text-gray-500">{stat.name}</p>
          <p className="mt-1 text-2xl font-semibold text-gray-900">{stat.value}</p>
        </motion.div>
      ))}
    </div>
  );
}