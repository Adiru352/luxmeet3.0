import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useDropzone } from 'react-dropzone';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Calendar,
  Image as ImageIcon,
  Video,
  Hash,
  Globe,
  Facebook,
  Instagram,
  Linkedin,
  Twitter,
  Clock,
  Plus,
  X,
} from 'lucide-react';
import type { SocialPost, SocialPlatform } from '../../types/social';
import { Button } from '../ui/Button';

const postSchema = z.object({
  content: z.string().min(1, 'Content is required'),
  platforms: z.array(z.string()).min(1, 'Select at least one platform'),
  scheduledFor: z.string().optional(),
  category: z.string().optional(),
  campaign: z.string().optional(),
});

type PostFormData = z.infer<typeof postSchema>;

interface PostEditorProps {
  initialPost?: Partial<SocialPost>;
  onSave: (post: Partial<SocialPost>) => void;
}

export function PostEditor({ initialPost, onSave }: PostEditorProps) {
  const [selectedPlatforms, setSelectedPlatforms] = useState<SocialPlatform[]>(
    initialPost?.platforms || []
  );
  const [mediaFiles, setMediaFiles] = useState<File[]>([]);
  const [showPlatformCustomization, setShowPlatformCustomization] = useState(false);

  const editor = useEditor({
    extensions: [StarterKit],
    content: initialPost?.content || '',
  });

  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      'image/*': ['.png', '.jpg', '.jpeg', '.gif'],
      'video/*': ['.mp4', '.mov', '.avi'],
    },
    onDrop: (acceptedFiles) => {
      setMediaFiles((prev) => [...prev, ...acceptedFiles]);
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PostFormData>({
    resolver: zodResolver(postSchema),
    defaultValues: {
      content: initialPost?.content || '',
      platforms: initialPost?.platforms || [],
      scheduledFor: initialPost?.scheduledFor
        ? new Date(initialPost.scheduledFor).toISOString().slice(0, 16)
        : undefined,
      category: initialPost?.category,
      campaign: initialPost?.campaign,
    },
  });

  const platforms: { id: SocialPlatform; icon: any; label: string }[] = [
    { id: 'facebook', icon: Facebook, label: 'Facebook' },
    { id: 'instagram', icon: Instagram, label: 'Instagram' },
    { id: 'linkedin', icon: Linkedin, label: 'LinkedIn' },
    { id: 'twitter', icon: Twitter, label: 'Twitter' },
  ];

  const handlePlatformToggle = (platform: SocialPlatform) => {
    setSelectedPlatforms((prev) =>
      prev.includes(platform)
        ? prev.filter((p) => p !== platform)
        : [...prev, platform]
    );
  };

  const onSubmit = async (data: PostFormData) => {
    const post: Partial<SocialPost> = {
      ...initialPost,
      content: editor?.getHTML() || '',
      platforms: selectedPlatforms,
      scheduledFor: data.scheduledFor ? new Date(data.scheduledFor) : new Date(),
      status: 'draft',
      category: data.category,
      campaign: data.campaign,
      approvalStatus: 'pending',
    };

    onSave(post);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-lg font-medium text-gray-900">Create Post</h3>
          <div className="flex space-x-2">
            <Button type="submit" variant="outline">
              Save as Draft
            </Button>
            <Button type="submit">Schedule Post</Button>
          </div>
        </div>

        <div className="space-y-6">
          {/* Platform Selection */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Select Platforms
            </label>
            <div className="flex flex-wrap gap-2">
              {platforms.map(({ id, icon: Icon, label }) => (
                <button
                  key={id}
                  type="button"
                  onClick={() => handlePlatformToggle(id)}
                  className={`flex items-center space-x-2 rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                    selectedPlatforms.includes(id)
                      ? 'bg-blue-100 text-blue-700'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span>{label}</span>
                </button>
              ))}
            </div>
            {errors.platforms && (
              <p className="mt-1 text-sm text-red-600">{errors.platforms.message}</p>
            )}
          </div>

          {/* Content Editor */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Post Content
            </label>
            <EditorContent editor={editor} className="prose max-w-none" />
          </div>

          {/* Media Upload */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Media
            </label>
            <div
              {...getRootProps()}
              className="cursor-pointer rounded-lg border-2 border-dashed border-gray-300 p-6 text-center hover:border-gray-400"
            >
              <input {...getInputProps()} />
              <div className="flex flex-col items-center">
                <ImageIcon className="mb-2 h-8 w-8 text-gray-400" />
                <p className="text-sm text-gray-600">
                  Drag and drop media files here, or click to select files
                </p>
                <p className="mt-1 text-xs text-gray-500">
                  Supports images and videos
                </p>
              </div>
            </div>
            {mediaFiles.length > 0 && (
              <div className="mt-4 grid grid-cols-4 gap-4">
                {mediaFiles.map((file, index) => (
                  <div key={index} className="relative">
                    <img
                      src={URL.createObjectURL(file)}
                      alt={`Upload ${index + 1}`}
                      className="rounded-lg"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        setMediaFiles((prev) =>
                          prev.filter((_, i) => i !== index)
                        );
                      }}
                      className="absolute -right-2 -top-2 rounded-full bg-white p-1 shadow-md hover:bg-gray-100"
                    >
                      <X className="h-4 w-4 text-gray-500" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Scheduling */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Schedule
            </label>
            <input
              type="datetime-local"
              {...register('scheduledFor')}
              className="block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500"
            />
          </div>

          {/* Categories and Campaign */}
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Category
              </label>
              <input
                type="text"
                {...register('category')}
                className="block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500"
                placeholder="e.g., Marketing, News"
              />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Campaign
              </label>
              <input
                type="text"
                {...register('campaign')}
                className="block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500"
                placeholder="e.g., Summer Sale 2024"
              />
            </div>
          </div>

          {/* Platform Customization */}
          <div>
            <button
              type="button"
              onClick={() => setShowPlatformCustomization(!showPlatformCustomization)}
              className="flex items-center space-x-2 text-sm text-blue-600 hover:text-blue-700"
            >
              <Globe className="h-4 w-4" />
              <span>Customize for each platform</span>
            </button>

            <AnimatePresence>
              {showPlatformCustomization && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="mt-4 space-y-4"
                >
                  {selectedPlatforms.map((platform) => (
                    <div key={platform} className="rounded-lg border p-4">
                      <h4 className="mb-2 font-medium capitalize">{platform}</h4>
                      <textarea
                        placeholder={`Customize content for ${platform}...`}
                        className="mt-2 w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500"
                        rows={3}
                      />
                      {platform === 'instagram' && (
                        <div className="mt-2">
                          <label className="mb-1 block text-sm text-gray-600">
                            First Comment (Hashtags)
                          </label>
                          <textarea
                            placeholder="#digital #business #networking"
                            className="w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500"
                            rows={2}
                          />
                        </div>
                      )}
                    </div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </form>
  );
}