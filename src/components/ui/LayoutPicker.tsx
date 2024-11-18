import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

interface LayoutPickerProps {
  value: string;
  onChange: (layout: string) => void;
}

const layouts = [
  {
    id: 'modern',
    name: 'Modern',
    description: 'Clean and minimal design with focus on visuals',
    preview: (
      <div className="flex aspect-video w-full items-center justify-center rounded bg-gray-100">
        <div className="h-4 w-16 rounded bg-gray-300" />
      </div>
    ),
  },
  {
    id: 'classic',
    name: 'Classic',
    description: 'Traditional business card layout with elegant typography',
    preview: (
      <div className="flex aspect-video w-full items-center justify-center rounded bg-gray-100">
        <div className="space-y-2">
          <div className="h-2 w-20 rounded bg-gray-300" />
          <div className="h-2 w-16 rounded bg-gray-300" />
        </div>
      </div>
    ),
  },
  {
    id: 'minimal',
    name: 'Minimal',
    description: 'Simplified design focusing on essential information',
    preview: (
      <div className="flex aspect-video w-full items-center justify-center rounded bg-gray-100">
        <div className="h-6 w-6 rounded-full bg-gray-300" />
      </div>
    ),
  },
];

export function LayoutPicker({ value, onChange }: LayoutPickerProps) {
  return (
    <div className="grid gap-4 sm:grid-cols-3">
      {layouts.map((layout) => (
        <motion.button
          key={layout.id}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => onChange(layout.id)}
          className={`relative overflow-hidden rounded-lg border p-4 text-left transition-colors ${
            value === layout.id
              ? 'border-blue-500 bg-blue-50'
              : 'border-gray-200 hover:border-gray-300'
          }`}
        >
          {value === layout.id && (
            <div className="absolute right-2 top-2">
              <Check className="h-4 w-4 text-blue-600" />
            </div>
          )}
          <div className="mb-3">{layout.preview}</div>
          <h3 className="text-sm font-medium text-gray-900">{layout.name}</h3>
          <p className="mt-1 text-xs text-gray-500">{layout.description}</p>
        </motion.button>
      ))}
    </div>
  );
}