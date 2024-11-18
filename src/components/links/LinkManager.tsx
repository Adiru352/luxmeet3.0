import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import ShortUniqueId from 'short-unique-id';
import { Link, ExternalLink, Copy, BarChart2 } from 'lucide-react';
import { Button } from '../ui/Button';
import { QRCodeGenerator } from './QRCodeGenerator';

const uid = new ShortUniqueId({ length: 8 });

const linkSchema = z.object({
  originalUrl: z.string().url('Please enter a valid URL'),
  title: z.string().min(1, 'Title is required'),
  customSlug: z.string().optional(),
  password: z.string().optional(),
  expiresAt: z.string().optional(),
});

type LinkFormData = z.infer<typeof linkSchema>;

interface LinkData {
  id: string;
  originalUrl: string;
  shortUrl: string;
  title: string;
  clicks: number;
  createdAt: Date;
  expiresAt?: Date;
  password?: string;
}

export function LinkManager() {
  const [links, setLinks] = useState<LinkData[]>([]);
  const [selectedLink, setSelectedLink] = useState<LinkData | null>(null);
  const [showQR, setShowQR] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<LinkFormData>({
    resolver: zodResolver(linkSchema),
  });

  const createLink = async (data: LinkFormData) => {
    const shortUrl = data.customSlug || uid();
    const newLink: LinkData = {
      id: uid(),
      originalUrl: data.originalUrl,
      shortUrl,
      title: data.title,
      clicks: 0,
      createdAt: new Date(),
      ...(data.expiresAt && { expiresAt: new Date(data.expiresAt) }),
      ...(data.password && { password: data.password }),
    };

    setLinks((prev) => [...prev, newLink]);
    reset();
  };

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      // Show success toast
    } catch (err) {
      // Show error toast
    }
  };

  return (
    <div className="space-y-8">
      <form onSubmit={handleSubmit(createLink)} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Original URL</label>
          <input
            type="url"
            {...register('originalUrl')}
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500"
            placeholder="https://example.com"
          />
          {errors.originalUrl && (
            <p className="mt-1 text-sm text-red-600">{errors.originalUrl.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Title</label>
          <input
            type="text"
            {...register('title')}
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500"
            placeholder="Link title"
          />
          {errors.title && <p className="mt-1 text-sm text-red-600">{errors.title.message}</p>}
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="block text-sm font-medium text-gray-700">Custom Slug (Optional)</label>
            <input
              type="text"
              {...register('customSlug')}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500"
              placeholder="custom-slug"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Password (Optional)</label>
            <input
              type="password"
              {...register('password')}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500"
              placeholder="Set access password"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Expiry Date (Optional)</label>
          <input
            type="datetime-local"
            {...register('expiresAt')}
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500"
          />
        </div>

        <Button type="submit" className="w-full">
          Create Short Link
        </Button>
      </form>

      <div className="space-y-4">
        <h3 className="text-lg font-medium text-gray-900">Your Links</h3>
        <div className="divide-y divide-gray-200 rounded-lg border border-gray-200">
          {links.map((link) => (
            <div key={link.id} className="flex items-center justify-between p-4">
              <div className="flex-1">
                <h4 className="font-medium text-gray-900">{link.title}</h4>
                <p className="mt-1 text-sm text-gray-500">{link.originalUrl}</p>
                <div className="mt-2 flex items-center space-x-4 text-sm text-gray-500">
                  <span>{link.clicks} clicks</span>
                  {link.expiresAt && (
                    <span>Expires: {link.expiresAt.toLocaleDateString()}</span>
                  )}
                  {link.password && <span>Password protected</span>}
                </div>
              </div>
              <div className="ml-4 flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => copyToClipboard(link.shortUrl)}
                >
                  <Copy className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setSelectedLink(link);
                    setShowQR(true);
                  }}
                >
                  <Link className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="sm">
                  <BarChart2 className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => window.open(link.originalUrl, '_blank')}
                >
                  <ExternalLink className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {showQR && selectedLink && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="w-full max-w-md rounded-lg bg-white p-6">
            <h3 className="mb-4 text-lg font-medium text-gray-900">QR Code for {selectedLink.title}</h3>
            <QRCodeGenerator url={selectedLink.shortUrl} />
            <Button
              variant="outline"
              className="mt-4 w-full"
              onClick={() => setShowQR(false)}
            >
              Close
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}