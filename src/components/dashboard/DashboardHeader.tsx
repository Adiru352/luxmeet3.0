import { Share2, Plus } from 'lucide-react';
import { Button } from '../ui/Button';

export function DashboardHeader() {
  return (
    <header className="border-b border-gray-200 bg-white px-8 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <h1 className="text-xl font-semibold text-gray-900">Card Editor</h1>
          <span className="text-sm text-gray-500">Last saved 2 minutes ago</span>
        </div>

        <div className="flex items-center space-x-4">
          <Button variant="outline" size="sm">
            <Share2 className="mr-2 h-4 w-4" />
            Share Card
          </Button>
          <Button size="sm">
            <Plus className="mr-2 h-4 w-4" />
            New Card
          </Button>
        </div>
      </div>
    </header>
  );
}