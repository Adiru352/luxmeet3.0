import { useState } from 'react';
import { motion } from 'framer-motion';
import { CreditCard, Download, ExternalLink } from 'lucide-react';
import { Button } from '../ui/Button';
import { createPortalSession } from '../../lib/stripe';
import type { subscriptionSchema } from '../../lib/db/schema';
import { z } from 'zod';

type Subscription = z.infer<typeof subscriptionSchema>;

interface BillingOverviewProps {
  teamId: string;
  subscription: Subscription;
}

export function BillingOverview({ teamId, subscription }: BillingOverviewProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handleManageSubscription = async () => {
    try {
      setIsLoading(true);
      await createPortalSession(teamId);
    } catch (error) {
      console.error('Failed to open customer portal:', error);
      // Show error toast
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6 rounded-lg border border-gray-200 bg-white p-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-medium text-gray-900">Billing Overview</h3>
          <p className="mt-1 text-sm text-gray-500">
            Manage your subscription and billing details
          </p>
        </div>
        <Button onClick={handleManageSubscription} isLoading={isLoading}>
          Manage Subscription
        </Button>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-lg border border-gray-200 p-6"
        >
          <div className="flex items-center justify-between">
            <h4 className="font-medium text-gray-900">Current Plan</h4>
            <span className="rounded-full bg-blue-100 px-3 py-1 text-sm font-medium capitalize text-blue-800">
              {subscription.plan}
            </span>
          </div>
          <p className="mt-2 text-sm text-gray-500">
            Next billing date:{' '}
            {new Date(subscription.currentPeriodEnd).toLocaleDateString()}
          </p>
          {subscription.cancelAtPeriodEnd && (
            <p className="mt-2 text-sm font-medium text-red-600">
              Cancels at period end
            </p>
          )}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="rounded-lg border border-gray-200 p-6"
        >
          <h4 className="font-medium text-gray-900">Payment Method</h4>
          <div className="mt-4 flex items-center space-x-3">
            <CreditCard className="h-8 w-8 text-gray-400" />
            <div>
              <p className="font-medium text-gray-900">•••• 4242</p>
              <p className="text-sm text-gray-500">Expires 12/24</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="rounded-lg border border-gray-200 p-6"
        >
          <h4 className="font-medium text-gray-900">Billing History</h4>
          <div className="mt-4 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-500">Feb 1, 2024</span>
              <Button variant="ghost" size="sm">
                <Download className="mr-2 h-4 w-4" />
                Download
              </Button>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-500">Jan 1, 2024</span>
              <Button variant="ghost" size="sm">
                <Download className="mr-2 h-4 w-4" />
                Download
              </Button>
            </div>
          </div>
        </motion.div>
      </div>

      <div className="mt-6 flex items-center justify-between rounded-lg bg-gray-50 p-4">
        <div className="flex items-center space-x-2">
          <ExternalLink className="h-5 w-5 text-gray-400" />
          <span className="text-sm text-gray-600">
            View detailed usage and billing reports
          </span>
        </div>
        <Button variant="outline" size="sm">
          View Reports
        </Button>
      </div>
    </div>
  );
}