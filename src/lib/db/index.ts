export * from './client';
export * from './users';
export * from './cards';
export * from './leads';

// Initialize database on app start
import { initializeDatabase } from './client';
initializeDatabase().catch(console.error);