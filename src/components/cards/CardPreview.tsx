import { BusinessCard } from '../../types';
import { UserCircle, Mail, Phone, Globe, Twitter, Linkedin } from 'lucide-react';

interface CardPreviewProps {
  card: Partial<BusinessCard>;
}

export function CardPreview({ card }: CardPreviewProps) {
  return (
    <div className="w-full max-w-md overflow-hidden rounded-xl bg-white shadow-lg">
      <div
        className="h-24"
        style={{ backgroundColor: card.theme?.primaryColor || '#0ea5e9' }}
      />
      <div className="relative px-6 pb-6">
        <div className="relative -mt-12 flex justify-center">
          {card.profileImage ? (
            <img
              src={card.profileImage}
              alt={card.name}
              className="h-24 w-24 rounded-full border-4 border-white object-cover"
            />
          ) : (
            <div className="flex h-24 w-24 items-center justify-center rounded-full border-4 border-white bg-gray-100">
              <UserCircle className="h-16 w-16 text-gray-400" />
            </div>
          )}
        </div>
        <div className="mt-4 text-center">
          <h2 className="text-xl font-bold text-gray-900">{card.name || 'Your Name'}</h2>
          <p className="text-sm text-gray-600">
            {card.title || 'Title'} {card.company ? `at ${card.company}` : ''}
          </p>
        </div>
        <div className="mt-6 space-y-4">
          {card.email && (
            <div className="flex items-center space-x-3 text-gray-600">
              <Mail className="h-5 w-5" />
              <span>{card.email}</span>
            </div>
          )}
          {card.phone && (
            <div className="flex items-center space-x-3 text-gray-600">
              <Phone className="h-5 w-5" />
              <span>{card.phone}</span>
            </div>
          )}
          {card.website && (
            <div className="flex items-center space-x-3 text-gray-600">
              <Globe className="h-5 w-5" />
              <span>{card.website}</span>
            </div>
          )}
        </div>
        {card.badges && card.badges.length > 0 && (
          <div className="mt-6 flex flex-wrap gap-2">
            {card.badges.map((badge) => (
              <span
                key={badge}
                className="rounded-full bg-blue-100 px-3 py-1 text-sm text-blue-800"
              >
                {badge}
              </span>
            ))}
          </div>
        )}
        <div className="mt-6 flex justify-center space-x-4">
          <Twitter className="h-6 w-6 text-gray-400 hover:text-[#1DA1F2] cursor-pointer" />
          <Linkedin className="h-6 w-6 text-gray-400 hover:text-[#0A66C2] cursor-pointer" />
        </div>
      </div>
    </div>
  );
}