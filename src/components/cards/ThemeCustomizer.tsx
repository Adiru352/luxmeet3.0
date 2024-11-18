import { useState } from 'react';
import { motion } from 'framer-motion';
import { ColorPicker } from '../ui/ColorPicker';
import { Button } from '../ui/Button';
import type { CardTheme } from '../../types';

interface ThemeCustomizerProps {
  theme: CardTheme;
  onChange: (theme: CardTheme) => void;
}

const brandPresets = {
  primary: [
    '#0ea5e9', // Blue
    '#8b5cf6', // Purple
    '#ec4899', // Pink
    '#f43f5e', // Red
    '#f97316', // Orange
    '#eab308', // Yellow
    '#22c55e', // Green
    '#06b6d4', // Cyan
  ],
  secondary: [
    '#e0f2fe', // Light Blue
    '#f3e8ff', // Light Purple
    '#fce7f3', // Light Pink
    '#fee2e2', // Light Red
    '#fff7ed', // Light Orange
    '#fef9c3', // Light Yellow
    '#dcfce7', // Light Green
    '#cffafe', // Light Cyan
  ],
};

export function ThemeCustomizer({ theme, onChange }: ThemeCustomizerProps) {
  const [brandCode, setBrandCode] = useState('');

  const handleBrandCodeApply = () => {
    // Here you would typically make an API call to fetch brand colors
    // For demo, we'll just set some preset colors
    if (brandCode.toLowerCase() === 'facebook') {
      onChange({
        ...theme,
        primaryColor: '#1877f2',
        secondaryColor: '#e7f3ff',
      });
    }
    setBrandCode('');
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6 rounded-lg border border-gray-200 bg-white p-6 shadow-sm"
    >
      <div>
        <h3 className="text-lg font-medium text-gray-900">Theme Customization</h3>
        <p className="mt-1 text-sm text-gray-500">
          Customize your card's colors and appearance
        </p>
      </div>

      <div className="space-y-4">
        <ColorPicker
          label="Primary Color"
          color={theme.primaryColor}
          onChange={(color) => onChange({ ...theme, primaryColor: color })}
          presetColors={brandPresets.primary}
        />

        <ColorPicker
          label="Secondary Color"
          color={theme.secondaryColor}
          onChange={(color) => onChange({ ...theme, secondaryColor: color })}
          presetColors={brandPresets.secondary}
        />
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">
          Brand Code
        </label>
        <div className="flex space-x-2">
          <input
            type="text"
            value={brandCode}
            onChange={(e) => setBrandCode(e.target.value)}
            placeholder="Enter your brand code"
            className="flex-1 rounded-lg border border-gray-200 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500"
          />
          <Button onClick={handleBrandCodeApply}>
            Apply
          </Button>
        </div>
        <p className="text-xs text-gray-500">
          Enter your brand code to automatically apply your brand colors
        </p>
      </div>
    </motion.div>
  );
}