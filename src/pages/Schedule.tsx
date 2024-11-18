import { useState } from 'react';
import { Calendar, Clock, Users, CreditCard } from 'lucide-react';
import { motion } from 'framer-motion';
import { ServiceCard } from '../components/scheduling/ServiceCard';
import { TimeSlotPicker } from '../components/scheduling/TimeSlotPicker';
import { BookingCalendar } from '../components/scheduling/BookingCalendar';

export function Schedule() {
  const [selectedService, setSelectedService] = useState(null);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  const services = [
    {
      id: 1,
      name: 'Consultation Call',
      duration: 30,
      price: 50,
      description: '30-minute video consultation to discuss your needs',
      icon: Users,
    },
    {
      id: 2,
      name: 'Strategy Session',
      duration: 60,
      price: 100,
      description: 'In-depth strategy planning and analysis',
      icon: Clock,
    },
  ];

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Book a Meeting</h1>
        <p className="mt-2 text-gray-600">
          Select a service and choose your preferred time slot
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        {/* Services Selection */}
        <div className="lg:col-span-1">
          <h2 className="mb-4 text-xl font-semibold text-gray-900">Available Services</h2>
          <div className="space-y-4">
            {services.map((service) => (
              <ServiceCard
                key={service.id}
                service={service}
                isSelected={selectedService?.id === service.id}
                onSelect={() => setSelectedService(service)}
              />
            ))}
          </div>
        </div>

        {/* Calendar */}
        <div className="lg:col-span-2">
          {selectedService ? (
            <div className="space-y-6">
              <BookingCalendar
                selectedDate={selectedDate}
                onDateSelect={setSelectedDate}
                availableDates={[]} // TODO: Fetch available dates
              />

              {selectedDate && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <TimeSlotPicker
                    date={selectedDate}
                    duration={selectedService.duration}
                    selectedTime={selectedTime}
                    onTimeSelect={setSelectedTime}
                    availableSlots={[]} // TODO: Fetch available slots
                  />
                </motion.div>
              )}

              {selectedTime && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm"
                >
                  <h3 className="text-lg font-medium text-gray-900">Booking Summary</h3>
                  <div className="mt-4 space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Users className="h-5 w-5 text-gray-400" />
                        <span className="text-gray-600">{selectedService.name}</span>
                      </div>
                      <span className="font-medium">${selectedService.price}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Calendar className="h-5 w-5 text-gray-400" />
                        <span className="text-gray-600">
                          {selectedDate.toLocaleDateString()}
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Clock className="h-5 w-5 text-gray-400" />
                        <span className="text-gray-600">{selectedTime}</span>
                      </div>
                    </div>
                  </div>
                  <button
                    className="mt-6 flex w-full items-center justify-center space-x-2 rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
                  >
                    <CreditCard className="h-5 w-5" />
                    <span>Proceed to Payment</span>
                  </button>
                </motion.div>
              )}
            </div>
          ) : (
            <div className="flex h-full items-center justify-center rounded-lg border-2 border-dashed border-gray-300 p-12 text-center">
              <div className="space-y-2">
                <Users className="mx-auto h-12 w-12 text-gray-400" />
                <h3 className="text-lg font-medium text-gray-900">No Service Selected</h3>
                <p className="text-gray-500">Please select a service to view available time slots</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}