import { motion } from 'framer-motion';
import { CreditCard, Users, BarChart2, Share2, Smartphone, Shield } from 'lucide-react';
import { Button } from '../../components/ui/Button';

const solutions = [
  {
    name: 'Digital Business Cards',
    description: 'Create and share professional digital business cards with customizable designs and instant updates.',
    icon: CreditCard,
    features: [
      'Multiple card designs',
      'Real-time updates',
      'Custom branding',
      'Social media integration',
    ],
  },
  {
    name: 'Team Management',
    description: 'Manage your team's digital business cards and maintain brand consistency across your organization.',
    icon: Users,
    features: [
      'Centralized management',
      'Role-based access',
      'Brand templates',
      'Bulk updates',
    ],
  },
  {
    name: 'Analytics & Insights',
    description: 'Track engagement metrics and understand how your digital business cards perform.',
    icon: BarChart2,
    features: [
      'Real-time analytics',
      'Engagement tracking',
      'Performance reports',
      'ROI measurement',
    ],
  },
  {
    name: 'Lead Generation',
    description: 'Convert card views into qualified leads with automated capture and scoring.',
    icon: Share2,
    features: [
      'Lead capture forms',
      'AI-powered scoring',
      'CRM integration',
      'Follow-up automation',
    ],
  },
  {
    name: 'Mobile Apps',
    description: 'Access and share your digital business cards on any device with our native mobile apps.',
    icon: Smartphone,
    features: [
      'iOS & Android apps',
      'Offline access',
      'NFC sharing',
      'Quick share options',
    ],
  },
  {
    name: 'Enterprise Security',
    description: 'Enterprise-grade security features to protect your business and customer data.',
    icon: Shield,
    features: [
      'SSO integration',
      'Data encryption',
      'Access controls',
      'Compliance tools',
    ],
  },
];

export function SolutionsPage() {
  return (
    <div className="bg-white py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900">
            Solutions for Every Business Need
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-500">
            Discover how Luxmeet can transform your networking and lead generation with our comprehensive suite of tools.
          </p>
        </div>

        <div className="mt-16 grid gap-8 lg:grid-cols-2">
          {solutions.map((solution, index) => (
            <motion.div
              key={solution.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="relative rounded-2xl border border-gray-200 bg-white p-8 shadow-sm hover:shadow-md"
            >
              <div className="flex items-center space-x-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-50">
                  <solution.icon className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="text-xl font-medium text-gray-900">{solution.name}</h3>
              </div>

              <p className="mt-4 text-gray-500">{solution.description}</p>

              <ul className="mt-6 space-y-3">
                {solution.features.map((feature) => (
                  <li key={feature} className="flex items-center text-sm text-gray-600">
                    <div className="mr-2 h-1.5 w-1.5 rounded-full bg-blue-600" />
                    {feature}
                  </li>
                ))}
              </ul>

              <div className="mt-8">
                <Button>Learn More</Button>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-16 rounded-2xl bg-blue-50 p-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900">Ready to get started?</h2>
          <p className="mx-auto mt-4 max-w-2xl text-gray-600">
            Join thousands of professionals already using Luxmeet to transform their networking experience.
          </p>
          <div className="mt-8 flex justify-center space-x-4">
            <Button size="lg">Start Free Trial</Button>
            <Button variant="outline" size="lg">Contact Sales</Button>
          </div>
        </div>
      </div>
    </div>
  );
}