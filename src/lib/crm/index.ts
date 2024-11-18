import type { CRMContact, CRMIntegrationConfig, CRMProvider } from './types';
import { syncContactToHubspot } from './providers/hubspot';
import { syncContactToSalesforce } from './providers/salesforce';
import { sendContactToZapier } from './providers/zapier';

export async function syncContact(
  contact: CRMContact,
  providers: CRMIntegrationConfig[]
) {
  const results = await Promise.allSettled(
    providers.map(async (config) => {
      switch (config.provider) {
        case 'hubspot':
          return syncContactToHubspot(contact, config);
        case 'salesforce':
          return syncContactToSalesforce(contact, config);
        case 'zapier':
          return sendContactToZapier(contact, config);
        default:
          throw new Error(`Unsupported CRM provider: ${config.provider}`);
      }
    })
  );

  return results.map((result, index) => ({
    provider: providers[index].provider,
    success: result.status === 'fulfilled',
    error: result.status === 'rejected' ? result.reason : null,
  }));
}

export async function validateCRMConfig(config: CRMIntegrationConfig): Promise<boolean> {
  try {
    const response = await fetch(`/api/crm/${config.provider}/validate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(config),
    });

    return response.ok;
  } catch (error) {
    console.error('Error validating CRM config:', error);
    return false;
  }
}