import { create } from 'zustand';

interface ScheduleState {
  services: any[];
  bookings: any[];
  addService: (service: any) => void;
  removeService: (serviceId: string) => void;
  updateService: (serviceId: string, updates: any) => void;
  addBooking: (booking: any) => void;
  cancelBooking: (bookingId: string) => void;
}

export const useScheduleStore = create<ScheduleState>((set) => ({
  services: [],
  bookings: [],
  addService: (service) =>
    set((state) => ({ services: [...state.services, service] })),
  removeService: (serviceId) =>
    set((state) => ({
      services: state.services.filter((s) => s.id !== serviceId),
    })),
  updateService: (serviceId, updates) =>
    set((state) => ({
      services: state.services.map((s) =>
        s.id === serviceId ? { ...s, ...updates } : s
      ),
    })),
  addBooking: (booking) =>
    set((state) => ({ bookings: [...state.bookings, booking] })),
  cancelBooking: (bookingId) =>
    set((state) => ({
      bookings: state.bookings.filter((b) => b.id !== bookingId),
    })),
}));