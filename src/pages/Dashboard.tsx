import { useState } from 'react';
import { motion } from 'framer-motion';
import { Sidebar } from '../components/dashboard/Sidebar';
import { CardEditor } from '../components/cards/CardEditor';
import { CardPreview } from '../components/cards/CardPreview';
import { DashboardHeader } from '../components/dashboard/DashboardHeader';
import { useCardStore } from '../store/useCardStore';
import { LoadingState } from '../components/ui/LoadingState';

export function Dashboard() {
  const [activeSection, setActiveSection] = useState('about');
  const { currentCard, isLoading, updateCard } = useCardStore();

  const handleCardUpdate = (field: string, value: any) => {
    updateCard({ ...currentCard, [field]: value });
  };

  if (isLoading) {
    return <LoadingState />;
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar activeSection={activeSection} onSectionChange={setActiveSection} />
      
      <div className="flex-1">
        <DashboardHeader />
        
        <main className="p-8">
          <div className="flex gap-8">
            {/* Editor Section */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex-1"
            >
              <div className="rounded-xl bg-white p-6 shadow-sm">
                <CardEditor
                  card={currentCard}
                  onUpdate={handleCardUpdate}
                  activeSection={activeSection}
                />
              </div>
            </motion.div>

            {/* Preview Section */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="sticky top-8 w-[380px]"
            >
              <div className="rounded-xl bg-white p-6 shadow-sm">
                <div className="mb-4 flex items-center justify-between">
                  <h3 className="text-lg font-medium text-gray-900">Live Preview</h3>
                  <button className="text-sm text-blue-600 hover:text-blue-700">
                    View card →
                  </button>
                </div>
                <div className="overflow-hidden rounded-lg border border-gray-100">
                  <CardPreview card={currentCard} />
                </div>
              </div>
            </motion.div>
          </div>
        </main>
      </div>
    </div>
  );
}