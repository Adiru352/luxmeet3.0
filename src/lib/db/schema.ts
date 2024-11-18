import { z } from 'zod';

export const userSchema = z.object({
  id: z.string(),
  email: z.string().email(),
  name: z.string(),
  role: z.enum(['admin', 'user']),
  teamId: z.string().optional(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export const teamSchema = z.object({
  id: z.string(),
  name: z.string(),
  ownerId: z.string(),
  plan: z.enum(['free', 'pro', 'enterprise']),
  settings: z.object({
    allowNFC: z.boolean(),
    maxCards: z.number(),
    customBranding: z.boolean(),
    analyticsEnabled: z.boolean(),
  }),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export const subscriptionSchema = z.object({
  id: z.string(),
  teamId: z.string(),
  plan: z.enum(['free', 'pro', 'enterprise']),
  status: z.enum(['active', 'canceled', 'past_due']),
  currentPeriodEnd: z.date(),
  cancelAtPeriodEnd: z.boolean(),
});

export const cardSchema = z.object({
  id: z.string(),
  userId: z.string(),
  teamId: z.string().optional(),
  name: z.string(),
  title: z.string(),
  company: z.string().optional(),
  email: z.string().email(),
  phone: z.string().optional(),
  website: z.string().url().optional(),
  bio: z.string().optional(),
  profileImage: z.string().optional(),
  socialLinks: z.array(z.string()),
  nfcId: z.string().optional(),
  theme: z.object({
    primaryColor: z.string(),
    secondaryColor: z.string(),
    fontFamily: z.string(),
    layout: z.enum(['modern', 'classic', 'minimal']),
  }),
  badges: z.array(z.string()),
  privacy: z.object({
    showEmail: z.boolean(),
    showPhone: z.boolean(),
    allowIndexing: z.boolean(),
  }),
  createdAt: z.date(),
  updatedAt: z.date(),
});