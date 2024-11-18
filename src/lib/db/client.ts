import { createClient } from 'libsql';

const dbUrl = import.meta.env.VITE_DATABASE_URL || 'file:local.db';

export const db = createClient({
  url: dbUrl,
});

export async function initializeDatabase() {
  await db.execute(`
    CREATE TABLE IF NOT EXISTS users (
      id TEXT PRIMARY KEY,
      email TEXT UNIQUE NOT NULL,
      name TEXT NOT NULL,
      role TEXT CHECK(role IN ('admin', 'user')) NOT NULL,
      team_id TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS teams (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      owner_id TEXT NOT NULL,
      plan TEXT CHECK(plan IN ('free', 'pro', 'enterprise')) NOT NULL,
      settings TEXT NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY(owner_id) REFERENCES users(id)
    );

    CREATE TABLE IF NOT EXISTS business_cards (
      id TEXT PRIMARY KEY,
      user_id TEXT NOT NULL,
      team_id TEXT,
      name TEXT NOT NULL,
      title TEXT NOT NULL,
      company TEXT,
      email TEXT NOT NULL,
      phone TEXT,
      website TEXT,
      bio TEXT,
      profile_image TEXT,
      social_links TEXT,
      nfc_id TEXT UNIQUE,
      theme TEXT NOT NULL,
      badges TEXT,
      privacy TEXT NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY(user_id) REFERENCES users(id),
      FOREIGN KEY(team_id) REFERENCES teams(id)
    );

    CREATE TABLE IF NOT EXISTS leads (
      id TEXT PRIMARY KEY,
      card_id TEXT NOT NULL,
      name TEXT NOT NULL,
      email TEXT NOT NULL,
      source TEXT CHECK(source IN ('nfc', 'qr', 'share', 'direct')) NOT NULL,
      score INTEGER,
      notes TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY(card_id) REFERENCES business_cards(id)
    );

    CREATE TABLE IF NOT EXISTS subscriptions (
      id TEXT PRIMARY KEY,
      team_id TEXT UNIQUE NOT NULL,
      plan TEXT CHECK(plan IN ('free', 'pro', 'enterprise')) NOT NULL,
      status TEXT CHECK(status IN ('active', 'canceled', 'past_due')) NOT NULL,
      current_period_end DATETIME NOT NULL,
      cancel_at_period_end BOOLEAN NOT NULL DEFAULT FALSE,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY(team_id) REFERENCES teams(id)
    );
  `);
}