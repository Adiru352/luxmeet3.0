import type { BusinessCard } from '../../types';

export async function createCard(card: Partial<BusinessCard>) {
  const response = await fetch('/api/cards', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(card),
  });

  if (!response.ok) {
    throw new Error('Failed to create card');
  }

  return response.json();
}

export async function updateCard(id: string, card: Partial<BusinessCard>) {
  const response = await fetch(`/api/cards/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(card),
  });

  if (!response.ok) {
    throw new Error('Failed to update card');
  }

  return response.json();
}

export async function deleteCard(id: string) {
  const response = await fetch(`/api/cards/${id}`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    throw new Error('Failed to delete card');
  }
}

export async function getCard(id: string) {
  const response = await fetch(`/api/cards/${id}`);

  if (!response.ok) {
    throw new Error('Failed to fetch card');
  }

  return response.json();
}

export async function getTeamCards(teamId: string) {
  const response = await fetch(`/api/teams/${teamId}/cards`);

  if (!response.ok) {
    throw new Error('Failed to fetch team cards');
  }

  return response.json();
}