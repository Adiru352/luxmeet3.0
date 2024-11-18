import { useState } from 'react';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isToday, isSameDay } from 'date-fns';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface BookingCalendarProps {
  selectedDate: Date | null;
  onDateSelect: (date: Date) => void;
  availableDates: Date[];
}

export function BookingCalendar({ selectedDate, onDateSelect, availableDates }: BookingCalendarProps) {
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const days = eachDayOfInterval({
    start: startOfMonth(currentMonth),
    end: endOfMonth(currentMonth),
  });

  const previousMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1));
  };

  const nextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1));
  };

  return (
    <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-medium text-gray-900">
          {format(currentMonth, 'MMMM yyyy')}
        </h2>
        <div className="flex space-x-2">
          <button
            onClick={previousMonth}
            className="rounded-md p-2 hover:bg-gray-100"
          >
            <ChevronLeft className="h-5 w-5 text-gray-600" />
          </button>
          <button
            onClick={nextMonth}
            className="rounded-md p-2 hover:bg-gray-100"
          >
            <ChevronRight className="h-5 w-5 text-gray-600" />
          </button>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-7 gap-1 text-center text-xs leading-6 text-gray-500">
        <div>Sun</div>
        <div>Mon</div>
        <div>Tue</div>
        <div>Wed</div>
        <div>Thu</div>
        <div>Fri</div>
        <div>Sat</div>
      </div>

      <div className="mt-2 grid grid-cols-7 gap-1 text-sm">
        {days.map((day, dayIdx) => (
          <div
            key={day.toString()}
            className={`${
              dayIdx === 0 ? `col-start-${day.getDay() + 1}` : ''
            } py-2`}
          >
            <button
              onClick={() => onDateSelect(day)}
              className={`mx-auto flex h-8 w-8 items-center justify-center rounded-full ${
                isSameDay(day, selectedDate)
                  ? 'bg-blue-600 font-semibold text-white'
                  : isToday(day)
                  ? 'bg-blue-50 font-semibold text-blue-600'
                  : isSameMonth(day, currentMonth)
                  ? 'text-gray-900 hover:bg-gray-100'
                  : 'text-gray-400'
              }`}
            >
              <time dateTime={format(day, 'yyyy-MM-dd')}>
                {format(day, 'd')}
              </time>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}