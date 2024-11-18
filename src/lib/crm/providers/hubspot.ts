import type { CRMContact, CRMIntegrationConfig } from '../types';

export async function syncContactToHubspot(contact: CRMContact, config: CRMIntegrationConfig) {
  const response = await fetch('/api/crm/hubspot/contacts', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${config.apiKey}`,
    },
    body: JSON.stringify({
      properties: {
        email: contact.email,
        firstname: contact.firstName,
        lastname: contact.lastName,
        company: contact.company,
        phone: contact.phone,
        jobtitle: contact.title,
        lead_source: contact.source,
        hs_lead_status: 'NEW',
        luxmeet_lead_score: contact.leadScore?.toString(),
        ...contact.customFields,
      },
    }),
  });

  if (!response.ok) {
    throw new Error('Failed to sync contact to HubSpot');
  }

  return response.json();
}

export async function getHubspotLists(config: CRMIntegrationConfig) {
  const response = await fetch('/api/crm/hubspot/lists', {
    headers: {
      'Authorization': `Bearer ${config.apiKey}`,
    },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch HubSpot lists');
  }

  return response.json();
}

export async function addContactToList(
  contactId: string,
  listId: string,
  config: CRMIntegrationConfig
) {
  const response = await fetch(`/api/crm/hubspot/lists/${listId}/add`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${config.apiKey}`,
    },
    body: JSON.stringify({
      vids: [contactId],
    }),
  });

  if (!response.ok) {
    throw new Error('Failed to add contact to HubSpot list');
  }

  return response.json();
}