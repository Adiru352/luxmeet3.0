import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/Tabs';
import { PricingPlans } from '../../components/billing/PricingPlans';
import { BillingOverview } from '../../components/billing/BillingOverview';
import { useAuthStore } from '../../store/useAuthStore';

export function BillingPage() {
  const [activeTab, setActiveTab] = useState('overview');
  const { user } = useAuthStore();

  // Mock subscription data - replace with actual data from your backend
  const subscription = {
    id: '123',
    teamId: user?.teamId || '',
    plan: 'pro',
    status: 'active',
    currentPeriodEnd: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    cancelAtPeriodEnd: false,
  };

  return (
    <div className="container mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Billing & Subscription</h1>
        <p className="mt-1 text-sm text-gray-500">
          Manage your subscription, payment methods, and billing history
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="plans">Plans</TabsTrigger>
        </TabsList>

        <div className="mt-6">
          <TabsContent value="overview">
            <BillingOverview teamId={user?.teamId || ''} subscription={subscription} />
          </TabsContent>

          <TabsContent value="plans">
            <PricingPlans teamId={user?.teamId || ''} currentPlan={subscription.plan} />
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
}