interface CreateSubscriptionData {
  teamId: string;
  plan: 'pro' | 'enterprise';
  paymentMethodId: string;
}

export async function createSubscription(data: CreateSubscriptionData) {
  const response = await fetch('/api/subscriptions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error('Failed to create subscription');
  }

  return response.json();
}

export async function cancelSubscription(teamId: string) {
  const response = await fetch(`/api/subscriptions/${teamId}`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    throw new Error('Failed to cancel subscription');
  }

  return response.json();
}

export async function updateSubscription(teamId: string, plan: 'pro' | 'enterprise') {
  const response = await fetch(`/api/subscriptions/${teamId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ plan }),
  });

  if (!response.ok) {
    throw new Error('Failed to update subscription');
  }

  return response.json();
}

export async function getSubscription(teamId: string) {
  const response = await fetch(`/api/subscriptions/${teamId}`);

  if (!response.ok) {
    throw new Error('Failed to fetch subscription');
  }

  return response.json();
}