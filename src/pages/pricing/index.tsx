import { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, CreditCard, Users, BarChart2, Share2, Shield } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { createCheckoutSession } from '../../lib/stripe';
import { useAuthStore } from '../../store/useAuthStore';

const features = {
  free: [
    '1 Digital Business Card',
    'Basic Analytics',
    'QR Code Sharing',
    'Email Support',
  ],
  pro: [
    'Unlimited Business Cards',
    'Advanced Analytics',
    'NFC Card Support',
    'CRM Integrations',
    'Priority Support',
    'Custom Branding',
  ],
  enterprise: [
    'Everything in Pro',
    'Team Management',
    'API Access',
    'SSO Integration',
    'Dedicated Account Manager',
    'Custom Contract',
  ],
};

export function PricingPage() {
  const [isYearly, setIsYearly] = useState(false);
  const [loading, setLoading] = useState<string | null>(null);
  const { user } = useAuthStore();

  const handleSubscribe = async (priceId: string) => {
    if (!user?.teamId) return;
    
    try {
      setLoading(priceId);
      await createCheckoutSession(priceId, user.teamId);
    } catch (error) {
      console.error('Subscription error:', error);
    } finally {
      setLoading(null);
    }
  };

  return (
    <div className="bg-white py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900">
            Simple, Transparent Pricing
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-500">
            Choose the perfect plan for your business needs
          </p>
        </div>

        <div className="mt-8 flex justify-center">
          <div className="relative inline-flex rounded-full bg-gray-100 p-1">
            <button
              onClick={() => setIsYearly(false)}
              className={`relative rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                !isYearly ? 'bg-white text-gray-900 shadow' : 'text-gray-500'
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setIsYearly(true)}
              className={`relative rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                isYearly ? 'bg-white text-gray-900 shadow' : 'text-gray-500'
              }`}
            >
              Yearly
              <span className="absolute -right-2 -top-2 rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-800">
                Save 20%
              </span>
            </button>
          </div>
        </div>

        <div className="mt-16 grid gap-8 lg:grid-cols-3">
          {[
            {
              name: 'Free',
              price: 0,
              features: features.free,
              icon: CreditCard,
              priceId: '',
            },
            {
              name: 'Pro',
              price: isYearly ? 95.88 : 9.99,
              features: features.pro,
              icon: Users,
              priceId: isYearly ? 'price_pro_yearly' : 'price_pro_monthly',
              popular: true,
            },
            {
              name: 'Enterprise',
              price: isYearly ? 479.88 : 49.99,
              features: features.enterprise,
              icon: Shield,
              priceId: isYearly ? 'price_enterprise_yearly' : 'price_enterprise_monthly',
            },
          ].map((plan) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className={`relative rounded-2xl border bg-white p-8 shadow-sm ${
                plan.popular ? 'border-blue-200 ring-1 ring-blue-500' : 'border-gray-200'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 rounded-full bg-blue-500 px-4 py-1 text-sm font-medium text-white">
                  Most Popular
                </div>
              )}

              <div className="text-center">
                <plan.icon className="mx-auto h-12 w-12 text-gray-400" />
                <h3 className="mt-4 text-lg font-medium text-gray-900">{plan.name}</h3>
                <div className="mt-4">
                  <span className="text-4xl font-bold text-gray-900">
                    ${plan.price}
                  </span>
                  <span className="text-gray-500">/{isYearly ? 'year' : 'month'}</span>
                </div>
              </div>

              <ul className="mt-8 space-y-4">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center">
                    <Check className="h-5 w-5 text-green-500" />
                    <span className="ml-3 text-gray-600">{feature}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-8">
                <Button
                  onClick={() => handleSubscribe(plan.priceId)}
                  className="w-full"
                  disabled={loading === plan.priceId}
                  isLoading={loading === plan.priceId}
                >
                  {plan.price === 0 ? 'Get Started' : 'Subscribe'}
                </Button>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-16 rounded-2xl bg-gray-50 p-8">
          <div className="grid gap-8 lg:grid-cols-2">
            <div>
              <h3 className="text-lg font-medium text-gray-900">
                Frequently Asked Questions
              </h3>
              <div className="mt-6 space-y-6">
                <div>
                  <h4 className="font-medium text-gray-900">
                    Can I change plans later?
                  </h4>
                  <p className="mt-2 text-gray-500">
                    Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">
                    What payment methods do you accept?
                  </h4>
                  <p className="mt-2 text-gray-500">
                    We accept all major credit cards and process payments securely through Stripe.
                  </p>
                </div>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-medium text-gray-900">
                Enterprise Features
              </h3>
              <div className="mt-6 grid gap-6">
                {[
                  {
                    icon: Users,
                    title: 'Team Management',
                    description: 'Manage multiple teams and control access permissions.',
                  },
                  {
                    icon: Shield,
                    title: 'Advanced Security',
                    description: 'SSO, audit logs, and enterprise-grade security features.',
                  },
                  {
                    icon: BarChart2,
                    title: 'Advanced Analytics',
                    description: 'Detailed insights and custom reporting capabilities.',
                  },
                ].map((feature) => (
                  <div key={feature.title} className="flex">
                    <feature.icon className="h-6 w-6 flex-shrink-0 text-blue-500" />
                    <div className="ml-4">
                      <h4 className="font-medium text-gray-900">{feature.title}</h4>
                      <p className="mt-1 text-gray-500">{feature.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}