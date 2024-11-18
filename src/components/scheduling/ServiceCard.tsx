import { motion } from 'framer-motion';
import { Clock, Check } from 'lucide-react';

interface ServiceCardProps {
  service: {
    id: number;
    name: string;
    duration: number;
    price: number;
    description: string;
    icon: any;
  };
  isSelected: boolean;
  onSelect: () => void;
}

export function ServiceCard({ service, isSelected, onSelect }: ServiceCardProps) {
  const Icon = service.icon;

  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onSelect}
      className={`relative w-full rounded-lg border p-4 text-left transition-all ${
        isSelected
          ? 'border-blue-500 bg-blue-50 ring-2 ring-blue-500'
          : 'border-gray-200 hover:border-gray-300'
      }`}
    >
      {isSelected && (
        <div className="absolute right-4 top-4">
          <Check className="h-5 w-5 text-blue-600" />
        </div>
      )}
      
      <div className="flex items-start space-x-4">
        <div
          className={`rounded-lg p-2 ${
            isSelected ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-600'
          }`}
        >
          <Icon className="h-6 w-6" />
        </div>
        
        <div className="flex-1">
          <h3 className="font-medium text-gray-900">{service.name}</h3>
          <p className="mt-1 text-sm text-gray-500">{service.description}</p>
          
          <div className="mt-2 flex items-center justify-between">
            <div className="flex items-center space-x-1 text-sm text-gray-500">
              <Clock className="h-4 w-4" />
              <span>{service.duration} min</span>
            </div>
            <span className="font-medium text-gray-900">${service.price}</span>
          </div>
        </div>
      </div>
    </motion.button>
  );
}