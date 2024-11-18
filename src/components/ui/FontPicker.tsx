import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check } from 'lucide-react';

interface FontPickerProps {
  value: string;
  onChange: (font: string) => void;
}

const fonts = [
  { name: 'Inter', className: 'font-sans' },
  { name: 'Roboto', className: 'font-roboto' },
  { name: 'Playfair Display', className: 'font-playfair' },
  { name: 'Montserrat', className: 'font-montserrat' },
  { name: 'Open Sans', className: 'font-opensans' },
  { name: 'Lato', className: 'font-lato' },
];

export function FontPicker({ value, onChange }: FontPickerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div ref={containerRef} className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between rounded-md border border-gray-300 px-4 py-2 text-left hover:bg-gray-50"
      >
        <span className={`text-base ${fonts.find((f) => f.name === value)?.className}`}>
          {value}
        </span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="absolute left-0 right-0 top-full z-10 mt-2 rounded-lg border border-gray-200 bg-white p-2 shadow-lg"
          >
            <div className="space-y-1">
              {fonts.map((font) => (
                <button
                  key={font.name}
                  onClick={() => {
                    onChange(font.name);
                    setIsOpen(false);
                  }}
                  className={`flex w-full items-center justify-between rounded-md px-4 py-2 text-left hover:bg-gray-100 ${
                    value === font.name ? 'bg-blue-50 text-blue-600' : ''
                  }`}
                >
                  <span className={`text-base ${font.className}`}>{font.name}</span>
                  {value === font.name && <Check className="h-4 w-4" />}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}