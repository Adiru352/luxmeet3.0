import type { CRMContact, CRMIntegrationConfig } from '../types';

export async function syncContactToSalesforce(contact: CRMContact, config: CRMIntegrationConfig) {
  const response = await fetch('/api/crm/salesforce/leads', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${config.apiKey}`,
    },
    body: JSON.stringify({
      Email: contact.email,
      FirstName: contact.firstName,
      LastName: contact.lastName,
      Company: contact.company,
      Phone: contact.phone,
      Title: contact.title,
      LeadSource: contact.source,
      Status: 'Open - Not Contacted',
      Rating: contact.leadScore ? contact.leadScore.toString() : undefined,
      ...contact.customFields,
    }),
  });

  if (!response.ok) {
    throw new Error('Failed to sync contact to Salesforce');
  }

  return response.json();
}

export async function getSalesforceCampaigns(config: CRMIntegrationConfig) {
  const response = await fetch('/api/crm/salesforce/campaigns', {
    headers: {
      'Authorization': `Bearer ${config.apiKey}`,
    },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch Salesforce campaigns');
  }

  return response.json();
}

export async function addContactToCampaign(
  contactId: string,
  campaignId: string,
  config: CRMIntegrationConfig
) {
  const response = await fetch(`/api/crm/salesforce/campaigns/${campaignId}/members`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${config.apiKey}`,
    },
    body: JSON.stringify({
      LeadId: contactId,
      Status: 'Sent',
    }),
  });

  if (!response.ok) {
    throw new Error('Failed to add contact to Salesforce campaign');
  }

  return response.json();
}