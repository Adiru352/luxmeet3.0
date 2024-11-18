import { motion } from 'framer-motion';
import { format } from 'date-fns';

interface TimeSlotPickerProps {
  date: Date;
  duration: number;
  selectedTime: string | null;
  onTimeSelect: (time: string) => void;
  availableSlots: string[];
}

export function TimeSlotPicker({
  date,
  duration,
  selectedTime,
  onTimeSelect,
  availableSlots,
}: TimeSlotPickerProps) {
  // Mock time slots for demonstration
  const mockTimeSlots = [
    '09:00',
    '09:30',
    '10:00',
    '10:30',
    '11:00',
    '14:00',
    '14:30',
    '15:00',
    '15:30',
    '16:00',
  ];

  return (
    <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
      <h3 className="text-lg font-medium text-gray-900">
        Available Times for {format(date, 'MMMM d, yyyy')}
      </h3>
      <p className="mt-1 text-sm text-gray-500">All times are in your local timezone</p>

      <div className="mt-6 grid grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-5">
        {mockTimeSlots.map((time) => (
          <motion.button
            key={time}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onTimeSelect(time)}
            className={`rounded-md border px-4 py-2 text-sm font-medium transition-colors ${
              selectedTime === time
                ? 'border-blue-500 bg-blue-50 text-blue-700'
                : 'border-gray-200 text-gray-700 hover:border-gray-300 hover:bg-gray-50'
            }`}
          >
            {time}
          </motion.button>
        ))}
      </div>
    </div>
  );
}