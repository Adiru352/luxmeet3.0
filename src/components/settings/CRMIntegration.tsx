import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { AlertCircle, Check } from 'lucide-react';
import { Button } from '../ui/Button';
import type { CRMProvider, CRMIntegrationConfig } from '../../lib/crm/types';
import { validateCRMConfig } from '../../lib/crm';

const crmConfigSchema = z.object({
  provider: z.enum(['salesforce', 'hubspot', 'zapier']),
  apiKey: z.string().optional(),
  webhookUrl: z.string().url().optional(),
  mappings: z.object({
    fields: z.record(z.string()),
    lists: z.array(z.string()).optional(),
    pipelines: z.array(z.string()).optional(),
  }),
});

type CRMConfigFormData = z.infer<typeof crmConfigSchema>;

interface CRMIntegrationProps {
  provider: CRMProvider;
  onSave: (config: CRMIntegrationConfig) => void;
}

export function CRMIntegration({ provider, onSave }: CRMIntegrationProps) {
  const [isValidating, setIsValidating] = useState(false);
  const [validationError, setValidationError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CRMConfigFormData>({
    resolver: zodResolver(crmConfigSchema),
    defaultValues: {
      provider: provider.name,
      mappings: {
        fields: {},
      },
    },
  });

  const onSubmit = async (data: CRMConfigFormData) => {
    setIsValidating(true);
    setValidationError(null);

    try {
      const isValid = await validateCRMConfig(data);
      if (isValid) {
        onSave(data);
      } else {
        setValidationError('Invalid configuration');
      }
    } catch (error) {
      setValidationError('Failed to validate configuration');
    } finally {
      setIsValidating(false);
    }
  };

  return (
    <div className="space-y-6 rounded-lg border border-gray-200 bg-white p-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-medium text-gray-900">
            {provider.name.charAt(0).toUpperCase() + provider.name.slice(1)} Integration
          </h3>
          <p className="mt-1 text-sm text-gray-500">
            Configure your {provider.name} integration settings
          </p>
        </div>
        {provider.isConnected && (
          <span className="inline-flex items-center rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-800">
            <Check className="mr-1.5 h-4 w-4" />
            Connected
          </span>
        )}
      </div>

      {validationError && (
        <div className="rounded-md bg-red-50 p-4">
          <div className="flex">
            <AlertCircle className="h-5 w-5 text-red-400" />
            <div className="ml-3">
              <p className="text-sm text-red-800">{validationError}</p>
            </div>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {provider.name !== 'zapier' && (
          <div>
            <label className="block text-sm font-medium text-gray-700">
              API Key
            </label>
            <input
              type="password"
              {...register('apiKey')}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500"
            />
            {errors.apiKey && (
              <p className="mt-1 text-sm text-red-600">{errors.apiKey.message}</p>
            )}
          </div>
        )}

        {provider.name === 'zapier' && (
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Webhook URL
            </label>
            <input
              type="url"
              {...register('webhookUrl')}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500"
            />
            {errors.webhookUrl && (
              <p className="mt-1 text-sm text-red-600">
                {errors.webhookUrl.message}
              </p>
            )}
          </div>
        )}

        <div>
          <h4 className="text-sm font-medium text-gray-900">Field Mappings</h4>
          <div className="mt-2 space-y-2">
            {['email', 'name', 'company', 'phone'].map((field) => (
              <div key={field} className="grid grid-cols-2 gap-4">
                <div className="text-sm text-gray-500">
                  {field.charAt(0).toUpperCase() + field.slice(1)}
                </div>
                <input
                  type="text"
                  {...register(`mappings.fields.${field}`)}
                  placeholder={`${provider.name} field name`}
                  className="rounded-md border border-gray-300 px-3 py-1 text-sm shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500"
                />
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-end">
          <Button type="submit" isLoading={isValidating}>
            Save Configuration
          </Button>
        </div>
      </form>
    </div>
  );
}