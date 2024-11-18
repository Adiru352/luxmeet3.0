import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, Plus, X } from 'lucide-react';
import { Button } from '../ui/Button';
import { ColorPicker } from '../ui/ColorPicker';
import { FontPicker } from '../ui/FontPicker';
import type { BusinessCard } from '../../types';

interface CardEditorProps {
  card: Partial<BusinessCard>;
  onUpdate: (field: string, value: any) => void;
  activeSection: string;
}

export function CardEditor({ card, onUpdate, activeSection }: CardEditorProps) {
  const [dragActive, setDragActive] = useState(false);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      if (!file.type.startsWith('image/')) {
        alert('Please upload an image file');
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        onUpdate('profileImage', e.target?.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="space-y-8">
      <AnimatePresence mode="wait">
        {activeSection === 'about' && (
          <motion.div
            key="about"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-6"
          >
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Card Name
              </label>
              <input
                type="text"
                value={card.name || ''}
                onChange={(e) => onUpdate('name', e.target.value)}
                className="block w-full rounded-md border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none focus:ring-blue-500"
                placeholder="Enter card name"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Profile Picture
              </label>
              <div
                className={`relative flex h-32 w-32 cursor-pointer items-center justify-center rounded-full border-2 border-dashed transition-colors ${
                  dragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
                }`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
                onClick={() => document.getElementById('profile-upload')?.click()}
              >
                <input
                  id="profile-upload"
                  type="file"
                  className="hidden"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      const reader = new FileReader();
                      reader.onload = (e) => {
                        onUpdate('profileImage', e.target?.result);
                      };
                      reader.readAsDataURL(file);
                    }
                  }}
                />
                {card.profileImage ? (
                  <div className="relative h-full w-full">
                    <img
                      src={card.profileImage}
                      alt="Profile"
                      className="h-full w-full rounded-full object-cover"
                    />
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onUpdate('profileImage', null);
                      }}
                      className="absolute -right-2 -top-2 rounded-full bg-white p-1 shadow-md hover:bg-gray-100"
                    >
                      <X className="h-4 w-4 text-gray-500" />
                    </button>
                  </div>
                ) : (
                  <div className="text-center">
                    <Upload className="mx-auto h-6 w-6 text-gray-400" />
                    <span className="mt-1 block text-xs text-gray-500">
                      Drop image here or click to upload
                    </span>
                  </div>
                )}
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Title
                </label>
                <input
                  type="text"
                  value={card.title || ''}
                  onChange={(e) => onUpdate('title', e.target.value)}
                  className="block w-full rounded-md border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none focus:ring-blue-500"
                  placeholder="Enter your job title"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Company
                </label>
                <input
                  type="text"
                  value={card.company || ''}
                  onChange={(e) => onUpdate('company', e.target.value)}
                  className="block w-full rounded-md border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none focus:ring-blue-500"
                  placeholder="Enter your company name"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Bio
                </label>
                <textarea
                  value={card.bio || ''}
                  onChange={(e) => onUpdate('bio', e.target.value)}
                  rows={3}
                  className="block w-full rounded-md border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none focus:ring-blue-500"
                  placeholder="Write a short bio"
                />
              </div>
            </div>
          </motion.div>
        )}

        {activeSection === 'design' && (
          <motion.div
            key="design"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-6"
          >
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Theme Color
              </label>
              <ColorPicker
                color={card.theme?.primaryColor || '#0ea5e9'}
                onChange={(color) =>
                  onUpdate('theme', { ...card.theme, primaryColor: color })
                }
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Font
              </label>
              <FontPicker
                value={card.theme?.fontFamily || 'Inter'}
                onChange={(font) =>
                  onUpdate('theme', { ...card.theme, fontFamily: font })
                }
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex justify-end space-x-4">
        <Button variant="outline">Cancel</Button>
        <Button>Save Changes</Button>
      </div>
    </div>
  );
}