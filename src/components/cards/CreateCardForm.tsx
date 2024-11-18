import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { CardPreview } from './CardPreview';
import { ThemeCustomizer } from './ThemeCustomizer';
import type { BusinessCard } from '../../types';

const createCardSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  title: z.string().min(2, 'Title must be at least 2 characters'),
  company: z.string().optional(),
  email: z.string().email('Invalid email address'),
  phone: z.string().optional(),
  website: z.string().url('Invalid URL').optional(),
});

type CreateCardFormData = z.infer<typeof createCardSchema>;

export function CreateCardForm() {
  const [previewData, setPreviewData] = useState<Partial<BusinessCard>>({
    theme: {
      primaryColor: '#0ea5e9',
      secondaryColor: '#e0f2fe',
      fontFamily: 'Inter',
      layout: 'modern',
    },
  });

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<CreateCardFormData>({
    resolver: zodResolver(createCardSchema),
  });

  const formValues = watch();

  const handleThemeChange = (newTheme: BusinessCard['theme']) => {
    setPreviewData((prev) => ({
      ...prev,
      theme: newTheme,
    }));
  };

  return (
    <div className="grid gap-8 lg:grid-cols-2">
      {/* Form Section */}
      <div className="space-y-6">
        <form className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Full Name *
            </label>
            <input
              type="text"
              {...register('name')}
              className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500"
            />
            {errors.name && (
              <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Title *
            </label>
            <input
              type="text"
              {...register('title')}
              className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500"
            />
            {errors.title && (
              <p className="mt-1 text-sm text-red-600">{errors.title.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Company
            </label>
            <input
              type="text"
              {...register('company')}
              className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email *
            </label>
            <input
              type="email"
              {...register('email')}
              className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500"
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
            )}
          </div>

          <ThemeCustomizer
            theme={previewData.theme!}
            onChange={handleThemeChange}
          />
        </form>
      </div>

      {/* Preview Section */}
      <div className="lg:sticky lg:top-6">
        <h3 className="mb-4 text-lg font-medium text-gray-900">Live Preview</h3>
        <div className="transform transition-all duration-200 ease-in-out">
          <CardPreview card={{ ...previewData, ...formValues }} />
        </div>
      </div>
    </div>
  );
}