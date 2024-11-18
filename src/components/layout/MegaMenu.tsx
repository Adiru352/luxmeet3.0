import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, CreditCard, Users, BarChart2, Share2, Smartphone, Shield } from 'lucide-react';
import { Button } from '../ui/Button';

const solutions = [
  {
    name: 'Digital Business Cards',
    description: 'Create and share professional digital business cards',
    href: '/solutions/digital-cards',
    icon: CreditCard,
  },
  {
    name: 'Team Management',
    description: 'Manage your team and control card distribution',
    href: '/solutions/teams',
    icon: Users,
  },
  {
    name: 'Analytics',
    description: 'Track engagement and measure ROI',
    href: '/solutions/analytics',
    icon: BarChart2,
  },
  {
    name: 'Lead Generation',
    description: 'Capture and qualify leads automatically',
    href: '/solutions/leads',
    icon: Share2,
  },
  {
    name: 'Mobile Apps',
    description: 'Access your cards on any device',
    href: '/solutions/mobile',
    icon: Smartphone,
  },
  {
    name: 'Enterprise Security',
    description: 'Advanced security and compliance features',
    href: '/solutions/security',
    icon: Shield,
  },
];

export function MegaMenu() {
  const [activeMenu, setActiveMenu] = useState<string | null>(null);

  return (
    <nav className="relative">
      <div className="flex items-center space-x-8">
        <div
          className="relative"
          onMouseEnter={() => setActiveMenu('solutions')}
          onMouseLeave={() => setActiveMenu(null)}
        >
          <button className="flex items-center space-x-1 text-gray-600 hover:text-gray-900">
            <span>Solutions</span>
            <ChevronDown className="h-4 w-4" />
          </button>

          <AnimatePresence>
            {activeMenu === 'solutions' && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="absolute left-0 top-full z-50 mt-2 w-screen max-w-6xl rounded-lg bg-white p-6 shadow-lg ring-1 ring-gray-200"
              >
                <div className="grid gap-8 p-4 lg:grid-cols-2">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">Solutions</h3>
                    <div className="mt-4 grid gap-4 sm:grid-cols-2">
                      {solutions.map((item) => (
                        <Link
                          key={item.name}
                          to={item.href}
                          className="group flex items-start rounded-lg p-3 hover:bg-gray-50"
                        >
                          <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-blue-50 group-hover:bg-blue-100">
                            <item.icon className="h-6 w-6 text-blue-600" />
                          </div>
                          <div className="ml-4">
                            <p className="text-base font-medium text-gray-900">{item.name}</p>
                            <p className="mt-1 text-sm text-gray-500">{item.description}</p>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                  <div className="bg-gray-50 p-8">
                    <div>
                      <h3 className="text-sm font-medium uppercase tracking-wide text-gray-500">
                        Latest Updates
                      </h3>
                      <ul className="mt-4 space-y-4">
                        <li className="relative flex items-start space-x-4">
                          <div className="flex-shrink-0">
                            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-100">
                              <Smartphone className="h-5 w-5 text-blue-600" />
                            </span>
                          </div>
                          <div>
                            <h4 className="text-base font-medium text-gray-900">
                              New Mobile App Features
                            </h4>
                            <p className="mt-1 text-sm text-gray-500">
                              Enhanced NFC capabilities and offline mode now available
                            </p>
                          </div>
                        </li>
                        <li className="relative flex items-start space-x-4">
                          <div className="flex-shrink-0">
                            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-green-100">
                              <BarChart2 className="h-5 w-5 text-green-600" />
                            </span>
                          </div>
                          <div>
                            <h4 className="text-base font-medium text-gray-900">
                              Advanced Analytics
                            </h4>
                            <p className="mt-1 text-sm text-gray-500">
                              New insights dashboard with AI-powered recommendations
                            </p>
                          </div>
                        </li>
                      </ul>
                    </div>
                    <div className="mt-6">
                      <Button className="w-full">Start Free Trial</Button>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <Link to="/pricing" className="text-gray-600 hover:text-gray-900">
          Pricing
        </Link>
        
        <Link to="/resources" className="text-gray-600 hover:text-gray-900">
          Resources
        </Link>
      </div>
    </nav>
  );
}