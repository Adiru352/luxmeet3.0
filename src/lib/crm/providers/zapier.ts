import type { CRMContact, CRMIntegrationConfig } from '../types';

export async function sendContactToZapier(contact: CRMContact, config: CRMIntegrationConfig) {
  if (!config.webhookUrl) {
    throw new Error('Zapier webhook URL is required');
  }

  const response = await fetch(config.webhookUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      contact,
      timestamp: new Date().toISOString(),
      source: 'luxmeet',
    }),
  });

  if (!response.ok) {
    throw new Error('Failed to send contact to Zapier');
  }

  return response.json();
}