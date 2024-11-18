import { db } from './client';
import type { User } from '../../types';
import { userSchema } from './schema';

export async function createUser(user: Omit<User, 'id' | 'businessCards' | 'leads'>) {
  const result = await db.execute({
    sql: `
      INSERT INTO users (id, email, name, role, team_id)
      VALUES (?, ?, ?, ?, ?)
    `,
    args: [
      crypto.randomUUID(),
      user.email,
      user.name,
      user.role,
      user.teamId || null,
    ],
  });

  return result.lastInsertRowid;
}

export async function getUserById(id: string) {
  const result = await db.execute({
    sql: 'SELECT * FROM users WHERE id = ?',
    args: [id],
  });

  const user = result.rows[0];
  return user ? userSchema.parse(user) : null;
}

export async function getUserByEmail(email: string) {
  const result = await db.execute({
    sql: 'SELECT * FROM users WHERE email = ?',
    args: [email],
  });

  const user = result.rows[0];
  return user ? userSchema.parse(user) : null;
}

export async function updateUser(id: string, updates: Partial<User>) {
  const result = await db.execute({
    sql: `
      UPDATE users
      SET name = COALESCE(?, name),
          email = COALESCE(?, email),
          role = COALESCE(?, role),
          team_id = COALESCE(?, team_id),
          updated_at = CURRENT_TIMESTAMP
      WHERE id = ?
    `,
    args: [
      updates.name || null,
      updates.email || null,
      updates.role || null,
      updates.teamId || null,
      id,
    ],
  });

  return result.rowsAffected > 0;
}