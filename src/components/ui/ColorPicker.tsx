import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HexColorPicker } from 'react-colorful';
import { Check, Copy } from 'lucide-react';

interface ColorPickerProps {
  label: string;
  color: string;
  onChange: (color: string) => void;
  presetColors?: string[];
}

export function ColorPicker({ label, color, onChange, presetColors = [] }: ColorPickerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState(color);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setInputValue(color);
  }, [color]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
    if (/^#[0-9A-F]{6}$/i.test(value)) {
      onChange(value);
    }
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(color);
      // Could add a toast notification here
    } catch (err) {
      console.error('Failed to copy color code');
    }
  };

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      <div ref={containerRef} className="relative">
        <div className="flex space-x-2">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex h-10 w-10 items-center justify-center rounded-lg border border-gray-200"
            style={{ backgroundColor: color }}
          />
          <div className="flex flex-1 items-center rounded-lg border border-gray-200">
            <input
              type="text"
              value={inputValue}
              onChange={handleInputChange}
              className="w-full rounded-l-lg border-0 px-3 py-2 text-sm focus:outline-none focus:ring-0"
              placeholder="#000000"
            />
            <button
              onClick={copyToClipboard}
              className="rounded-r-lg border-l border-gray-200 px-3 py-2 hover:bg-gray-50"
            >
              <Copy className="h-4 w-4 text-gray-400" />
            </button>
          </div>
        </div>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 8 }}
              className="absolute left-0 top-full z-10 mt-2 rounded-lg border border-gray-200 bg-white p-4 shadow-lg"
            >
              <HexColorPicker color={color} onChange={onChange} />
              
              {presetColors.length > 0 && (
                <div className="mt-4">
                  <div className="mb-2 text-xs font-medium text-gray-500">Presets</div>
                  <div className="grid grid-cols-8 gap-2">
                    {presetColors.map((presetColor) => (
                      <button
                        key={presetColor}
                        onClick={() => onChange(presetColor)}
                        className="relative h-6 w-6 rounded-md"
                        style={{ backgroundColor: presetColor }}
                      >
                        {color === presetColor && (
                          <Check className="absolute left-1/2 top-1/2 h-4 w-4 -translate-x-1/2 -translate-y-1/2 text-white" />
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}