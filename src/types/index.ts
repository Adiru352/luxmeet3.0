export interface BusinessCard {
  id: string;
  name: string;
  title: string;
  company: string;
  email: string;
  phone: string;
  website: string;
  bio?: string;
  profileImage: string;
  socialLinks: string[];
  qrCode: string;
  nfcId: string;
  theme: CardTheme;
  badges: string[];
  createdAt: Date;
  updatedAt: Date;
}

export interface CardTheme {
  primaryColor: string;
  secondaryColor: string;
  fontFamily: string;
  logo?: string;
  layout: 'modern' | 'classic' | 'minimal';
}

export interface Lead {
  id: string;
  name: string;
  email: string;
  source: 'nfc' | 'qr' | 'share' | 'direct';
  businessCardId: string;
  createdAt: Date;
  score: number;
  notes?: string;
}

export interface User {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'user';
  businessCards: BusinessCard[];
  leads: Lead[];
  teamId?: string;
}