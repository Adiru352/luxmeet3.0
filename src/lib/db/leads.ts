import { db } from './client';
import type { Lead } from '../../types';

export async function createLead(lead: Omit<Lead, 'id' | 'createdAt'>) {
  const result = await db.execute({
    sql: `
      INSERT INTO leads (id, card_id, name, email, source, score, notes)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `,
    args: [
      crypto.randomUUID(),
      lead.businessCardId,
      lead.name,
      lead.email,
      lead.source,
      lead.score || null,
      lead.notes || null,
    ],
  });

  return result.lastInsertRowid;
}

export async function getLeadsByCardId(cardId: string) {
  const result = await db.execute({
    sql: 'SELECT * FROM leads WHERE card_id = ? ORDER BY created_at DESC',
    args: [cardId],
  });

  return result.rows;
}

export async function updateLeadScore(id: string, score: number) {
  const result = await db.execute({
    sql: 'UPDATE leads SET score = ? WHERE id = ?',
    args: [score, id],
  });

  return result.rowsAffected > 0;
}