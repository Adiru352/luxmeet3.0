import { useNavigate } from 'react-router-dom';
import {
  UserCircle,
  Link as LinkIcon,
  QrCode,
  Mail,
  Image,
  Settings,
  BarChart2,
  Tags,
  Share2,
} from 'lucide-react';
import { cn } from '../../utils/cn';

interface SidebarProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
}

const sections = [
  { id: 'about', label: 'About', icon: UserCircle },
  { id: 'links', label: 'Links', icon: LinkIcon },
  { id: 'sharing', label: 'Sharing', icon: Share2 },
  { id: 'leadCapture', label: 'Lead Capture', icon: Mail },
  { id: 'design', label: 'Design', icon: Image },
  { id: 'settings', label: 'Settings', icon: Settings },
];

const bottomNavItems = [
  { id: 'analytics', label: 'Analytics', icon: BarChart2, path: '/analytics' },
  { id: 'tags', label: 'Tags', icon: Tags, path: '/tags' },
  { id: 'qr', label: 'QR Codes', icon: QrCode, path: '/qr-codes' },
];

export function Sidebar({ activeSection, onSectionChange }: SidebarProps) {
  const navigate = useNavigate();

  return (
    <div className="flex w-64 flex-col border-r border-gray-200 bg-white">
      <div className="flex h-16 items-center border-b border-gray-200 px-4">
        <img src="/logo.svg" alt="Logo" className="h-8 w-8" />
        <span className="ml-2 text-lg font-semibold">Card Editor</span>
      </div>

      <div className="flex flex-1 flex-col justify-between p-4">
        <nav className="space-y-1">
          {sections.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => onSectionChange(id)}
              className={cn(
                'flex w-full items-center rounded-md px-3 py-2 text-sm font-medium',
                activeSection === id
                  ? 'bg-blue-50 text-blue-700'
                  : 'text-gray-700 hover:bg-gray-50'
              )}
            >
              <Icon
                className={cn(
                  'mr-3 h-5 w-5',
                  activeSection === id ? 'text-blue-700' : 'text-gray-400'
                )}
              />
              {label}
            </button>
          ))}
        </nav>

        <nav className="space-y-1">
          {bottomNavItems.map(({ id, label, icon: Icon, path }) => (
            <button
              key={id}
              onClick={() => navigate(path)}
              className="flex w-full items-center rounded-md px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              <Icon className="mr-3 h-5 w-5 text-gray-400" />
              {label}
            </button>
          ))}
        </nav>
      </div>

      <div className="border-t border-gray-200 p-4">
        <div className="flex items-center">
          <img
            src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix"
            alt="Avatar"
            className="h-8 w-8 rounded-full"
          />
          <div className="ml-3">
            <p className="text-sm font-medium text-gray-700">John Doe</p>
            <p className="text-xs text-gray-500">Pro Plan</p>
          </div>
        </div>
      </div>
    </div>
  );
}