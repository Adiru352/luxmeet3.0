export interface CRMProvider {
  name: 'salesforce' | 'hubspot' | 'zapier';
  isConnected: boolean;
  settings: Record<string, any>;
}

export interface CRMContact {
  id: string;
  email: string;
  firstName?: string;
  lastName?: string;
  company?: string;
  phone?: string;
  title?: string;
  source?: string;
  leadScore?: number;
  customFields?: Record<string, any>;
}

export interface CRMIntegrationConfig {
  provider: CRMProvider['name'];
  apiKey?: string;
  webhookUrl?: string;
  mappings: {
    fields: Record<string, string>;
    lists?: string[];
    pipelines?: string[];
  };
}