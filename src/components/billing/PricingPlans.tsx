import { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, Loader2 } from 'lucide-react';
import { Button } from '../ui/Button';
import { createCheckoutSession } from '../../lib/stripe';

const plans = [
  {
    name: 'Free',
    price: 0,
    interval: 'month',
    features: [
      '1 Digital Business Card',
      'Basic Analytics',
      'QR Code Sharing',
      'Email Support',
    ],
    priceId: '',
    popular: false,
  },
  {
    name: 'Pro',
    price: 9.99,
    interval: 'month',
    features: [
      'Unlimited Business Cards',
      'Advanced Analytics',
      'NFC Card Support',
      'CRM Integrations',
      'Priority Support',
      'Custom Branding',
    ],
    priceId: 'price_pro_monthly',
    popular: true,
  },
  {
    name: 'Enterprise',
    price: 49.99,
    interval: 'month',
    features: [
      'Everything in Pro',
      'Team Management',
      'API Access',
      'SSO Integration',
      'Dedicated Account Manager',
      'Custom Contract',
    ],
    priceId: 'price_enterprise_monthly',
    popular: false,
  },
];

interface PricingPlansProps {
  teamId: string;
  currentPlan?: string;
}

export function PricingPlans({ teamId, currentPlan }: PricingPlansProps) {
  const [isYearly, setIsYearly] = useState(false);
  const [loading, setLoading] = useState<string | null>(null);

  const handleSubscribe = async (priceId: string) => {
    if (!priceId) return; // Free plan
    
    try {
      setLoading(priceId);
      await createCheckoutSession(priceId, teamId);
    } catch (error) {
      console.error('Subscription error:', error);
      // Show error toast
    } finally {
      setLoading(null);
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-center">
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

      <div className="grid gap-8 lg:grid-cols-3">
        {plans.map((plan) => (
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
              <h3 className="text-lg font-medium text-gray-900">{plan.name}</h3>
              <div className="mt-4">
                <span className="text-4xl font-bold text-gray-900">
                  ${isYearly ? (plan.price * 0.8).toFixed(2) : plan.price}
                </span>
                <span className="text-gray-500">/{plan.interval}</span>
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
                disabled={loading === plan.priceId || currentPlan === plan.name.toLowerCase()}
              >
                {loading === plan.priceId ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : null}
                {currentPlan === plan.name.toLowerCase()
                  ? 'Current Plan'
                  : plan.price === 0
                  ? 'Get Started'
                  : 'Subscribe'}
              </Button>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="mt-8 text-center text-sm text-gray-500">
        All plans include a 14-day free trial. No credit card required for free plan.
      </div>
    </div>
  );
}