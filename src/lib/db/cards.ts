import { db } from './client';
import type { BusinessCard } from '../../types';
import { cardSchema } from './schema';

export async function createCard(card: Omit<BusinessCard, 'id' | 'createdAt' | 'updatedAt'>) {
  const result = await db.execute({
    sql: `
      INSERT INTO business_cards (
        id, user_id, team_id, name, title, company, email,
        phone, website, bio, profile_image, social_links,
        nfc_id, theme, badges, privacy
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `,
    args: [
      crypto.randomUUID(),
      card.userId,
      card.teamId || null,
      card.name,
      card.title,
      card.company || null,
      card.email,
      card.phone || null,
      card.website || null,
      card.bio || null,
      card.profileImage || null,
      JSON.stringify(card.socialLinks),
      card.nfcId || null,
      JSON.stringify(card.theme),
      JSON.stringify(card.badges),
      JSON.stringify(card.privacy),
    ],
  });

  return result.lastInsertRowid;
}

export async function getCardById(id: string) {
  const result = await db.execute({
    sql: 'SELECT * FROM business_cards WHERE id = ?',
    args: [id],
  });

  const card = result.rows[0];
  if (!card) return null;

  return cardSchema.parse({
    ...card,
    socialLinks: JSON.parse(card.social_links as string),
    theme: JSON.parse(card.theme as string),
    badges: JSON.parse(card.badges as string),
    privacy: JSON.parse(card.privacy as string),
  });
}

export async function getCardsByUserId(userId: string) {
  const result = await db.execute({
    sql: 'SELECT * FROM business_cards WHERE user_id = ?',
    args: [userId],
  });

  return result.rows.map((card) =>
    cardSchema.parse({
      ...card,
      socialLinks: JSON.parse(card.social_links as string),
      theme: JSON.parse(card.theme as string),
      badges: JSON.parse(card.badges as string),
      privacy: JSON.parse(card.privacy as string),
    })
  );
}

export async function updateCard(id: string, updates: Partial<BusinessCard>) {
  const result = await db.execute({
    sql: `
      UPDATE business_cards
      SET name = COALESCE(?, name),
          title = COALESCE(?, title),
          company = COALESCE(?, company),
          email = COALESCE(?, email),
          phone = COALESCE(?, phone),
          website = COALESCE(?, website),
          bio = COALESCE(?, bio),
          profile_image = COALESCE(?, profile_image),
          social_links = COALESCE(?, social_links),
          theme = COALESCE(?, theme),
          badges = COALESCE(?, badges),
          privacy = COALESCE(?, privacy),
          updated_at = CURRENT_TIMESTAMP
      WHERE id = ?
    `,
    args: [
      updates.name || null,
      updates.title || null,
      updates.company || null,
      updates.email || null,
      updates.phone || null,
      updates.website || null,
      updates.bio || null,
      updates.profileImage || null,
      updates.socialLinks ? JSON.stringify(updates.socialLinks) : null,
      updates.theme ? JSON.stringify(updates.theme) : null,
      updates.badges ? JSON.stringify(updates.badges) : null,
      updates.privacy ? JSON.stringify(updates.privacy) : null,
      id,
    ],
  });

  return result.rowsAffected > 0;
}