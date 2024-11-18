import { create } from 'zustand';
import type { BusinessCard } from '../types';
import { getCardById, updateCard as updateCardInDb } from '../lib/db/cards';

interface CardState {
  currentCard: Partial<BusinessCard>;
  isLoading: boolean;
  error: string | null;
  updateCard: (card: Partial<BusinessCard>) => Promise<void>;
  loadCard: (id: string) => Promise<void>;
}

export const useCardStore = create<CardState>((set) => ({
  currentCard: {
    theme: {
      primaryColor: '#0ea5e9',
      secondaryColor: '#e0f2fe',
      fontFamily: 'Inter',
      layout: 'modern',
    },
  },
  isLoading: false,
  error: null,
  updateCard: async (card) => {
    try {
      set({ isLoading: true, error: null });
      if (card.id) {
        await updateCardInDb(card.id, card);
      }
      set({ currentCard: card });
    } catch (error) {
      set({ error: 'Failed to update card' });
    } finally {
      set({ isLoading: false });
    }
  },
  loadCard: async (id) => {
    try {
      set({ isLoading: true, error: null });
      const card = await getCardById(id);
      if (card) {
        set({ currentCard: card });
      }
    } catch (error) {
      set({ error: 'Failed to load card' });
    } finally {
      set({ isLoading: false });
    }
  },
}));