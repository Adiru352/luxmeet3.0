import type { User } from '../../types';

export async function createTeam(name: string) {
  const response = await fetch('/api/teams', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name }),
  });

  if (!response.ok) {
    throw new Error('Failed to create team');
  }

  return response.json();
}

export async function inviteTeamMember(teamId: string, email: string, role: 'admin' | 'user') {
  const response = await fetch(`/api/teams/${teamId}/invite`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, role }),
  });

  if (!response.ok) {
    throw new Error('Failed to invite team member');
  }

  return response.json();
}

export async function removeTeamMember(teamId: string, userId: string) {
  const response = await fetch(`/api/teams/${teamId}/members/${userId}`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    throw new Error('Failed to remove team member');
  }
}

export async function updateTeamMemberRole(
  teamId: string,
  userId: string,
  role: 'admin' | 'user'
) {
  const response = await fetch(`/api/teams/${teamId}/members/${userId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ role }),
  });

  if (!response.ok) {
    throw new Error('Failed to update team member role');
  }

  return response.json();
}

export async function getTeamMembers(teamId: string): Promise<User[]> {
  const response = await fetch(`/api/teams/${teamId}/members`);

  if (!response.ok) {
    throw new Error('Failed to fetch team members');
  }

  return response.json();
}