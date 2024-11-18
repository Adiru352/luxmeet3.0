import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { format } from 'date-fns';

interface ClicksChartProps {
  data: {
    date: string;
    clicks: number;
  }[];
  timeframe: 'day' | 'week' | 'month' | 'year';
}

export function ClicksChart({ data, timeframe }: ClicksChartProps) {
  const formatDate = (date: string) => {
    switch (timeframe) {
      case 'day':
        return format(new Date(date), 'HH:mm');
      case 'week':
        return format(new Date(date), 'EEE');
      case 'month':
        return format(new Date(date), 'd MMM');
      case 'year':
        return format(new Date(date), 'MMM');
      default:
        return date;
    }
  };

  return (
    <div className="h-72 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="colorClicks" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="date"
            tickFormatter={formatDate}
            tick={{ fontSize: 12 }}
            stroke="#9ca3af"
          />
          <YAxis tick={{ fontSize: 12 }} stroke="#9ca3af" />
          <Tooltip
            contentStyle={{
              backgroundColor: 'white',
              border: '1px solid #e5e7eb',
              borderRadius: '0.375rem',
            }}
            labelFormatter={(value) => format(new Date(value), 'PPP')}
          />
          <Area
            type="monotone"
            dataKey="clicks"
            stroke="#3b82f6"
            fillOpacity={1}
            fill="url(#colorClicks)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}