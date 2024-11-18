import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '../components/ui/Button';
import { Bell, Shield, CreditCard, User, Mail } from 'lucide-react';

const notificationSchema = z.object({
  emailNotifications: z.boolean(),
  leadAlerts: z.boolean(),
  weeklyReport: z.boolean(),
  marketingEmails: z.boolean(),
});

const privacySchema = z.object({
  showEmail: z.boolean(),
  showPhone: z.boolean(),
  allowIndexing: z.boolean(),
  trackAnalytics: z.boolean(),
});

export function Settings() {
  const [activeTab, setActiveTab] = useState('profile');

  const {
    register: notificationRegister,
    handleSubmit: handleNotificationSubmit,
  } = useForm({
    resolver: zodResolver(notificationSchema),
    defaultValues: {
      emailNotifications: true,
      leadAlerts: true,
      weeklyReport: false,
      marketingEmails: false,
    },
  });

  const {
    register: privacyRegister,
    handleSubmit: handlePrivacySubmit,
  } = useForm({
    resolver: zodResolver(privacySchema),
    defaultValues: {
      showEmail: true,
      showPhone: true,
      allowIndexing: true,
      trackAnalytics: true,
    },
  });

  const tabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'privacy', label: 'Privacy', icon: Shield },
    { id: 'billing', label: 'Billing', icon: CreditCard },
  ];

  return (
    <div className="mx-auto max-w-4xl">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
        <p className="mt-1 text-sm text-gray-500">
          Manage your account settings and preferences
        </p>
      </div>

      <div className="flex space-x-4">
        <nav className="w-48 space-y-1">
          {tabs.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setActiveTab(id)}
              className={`flex w-full items-center space-x-3 rounded-md px-3 py-2 text-sm font-medium ${
                activeTab === id
                  ? 'bg-blue-50 text-blue-700'
                  : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              <Icon className="h-5 w-5" />
              <span>{label}</span>
            </button>
          ))}
        </nav>

        <div className="flex-1 space-y-6 rounded-lg bg-white p-6 shadow-sm">
          {activeTab === 'profile' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium text-gray-900">Profile Information</h3>
                <p className="mt-1 text-sm text-gray-500">
                  Update your personal information and email preferences
                </p>
              </div>

              <div className="grid gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Full Name</label>
                  <input
                    type="text"
                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500"
                    defaultValue="John Doe"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Email Address</label>
                  <input
                    type="email"
                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500"
                    defaultValue="john@example.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Time Zone</label>
                  <select className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500">
                    <option>Eastern Time (ET)</option>
                    <option>Pacific Time (PT)</option>
                    <option>UTC</option>
                  </select>
                </div>
              </div>

              <div className="flex justify-end">
                <Button>Save Changes</Button>
              </div>
            </div>
          )}

          {activeTab === 'notifications' && (
            <form onSubmit={handleNotificationSubmit(() => {})}>
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium text-gray-900">Notification Preferences</h3>
                  <p className="mt-1 text-sm text-gray-500">
                    Choose how and when you want to be notified
                  </p>
                </div>

                <div className="space-y-4">
                  <label className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      {...notificationRegister('emailNotifications')}
                      className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="text-sm text-gray-700">Email Notifications</span>
                  </label>

                  <label className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      {...notificationRegister('leadAlerts')}
                      className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="text-sm text-gray-700">Lead Alerts</span>
                  </label>

                  <label className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      {...notificationRegister('weeklyReport')}
                      className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="text-sm text-gray-700">Weekly Report</span>
                  </label>

                  <label className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      {...notificationRegister('marketingEmails')}
                      className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="text-sm text-gray-700">Marketing Emails</span>
                  </label>
                </div>

                <div className="flex justify-end">
                  <Button type="submit">Save Preferences</Button>
                </div>
              </div>
            </form>
          )}

          {activeTab === 'privacy' && (
            <form onSubmit={handlePrivacySubmit(() => {})}>
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium text-gray-900">Privacy Settings</h3>
                  <p className="mt-1 text-sm text-gray-500">
                    Control your privacy and data sharing preferences
                  </p>
                </div>

                <div className="space-y-4">
                  <label className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      {...privacyRegister('showEmail')}
                      className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="text-sm text-gray-700">Show email on business card</span>
                  </label>

                  <label className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      {...privacyRegister('showPhone')}
                      className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="text-sm text-gray-700">Show phone number on business card</span>
                  </label>

                  <label className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      {...privacyRegister('allowIndexing')}
                      className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="text-sm text-gray-700">Allow search engines to index my card</span>
                  </label>

                  <label className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      {...privacyRegister('trackAnalytics')}
                      className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="text-sm text-gray-700">Enable analytics tracking</span>
                  </label>
                </div>

                <div className="flex justify-end">
                  <Button type="submit">Save Privacy Settings</Button>
                </div>
              </div>
            </form>
          )}

          {activeTab === 'billing' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium text-gray-900">Billing Information</h3>
                <p className="mt-1 text-sm text-gray-500">Manage your subscription and payment methods</p>
              </div>

              <div className="rounded-lg border border-gray-200 bg-gray-50 p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-gray-900">Pro Plan</p>
                    <p className="text-sm text-gray-500">$9.99/month</p>
                  </div>
                  <Button variant="outline">Change Plan</Button>
                </div>
              </div>

              <div>
                <h4 className="mb-4 text-sm font-medium text-gray-900">Payment Method</h4>
                <div className="flex items-center space-x-3 rounded-lg border border-gray-200 p-4">
                  <div className="h-8 w-12 rounded bg-gray-200" />
                  <div>
                    <p className="font-medium text-gray-900">•••• 4242</p>
                    <p className="text-sm text-gray-500">Expires 12/24</p>
                  </div>
                </div>
              </div>

              <div className="flex justify-end space-x-4">
                <Button variant="outline">Update Payment Method</Button>
                <Button>Save Changes</Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}