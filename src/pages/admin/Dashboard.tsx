import { useState } from 'react';
import { motion } from 'framer-motion';
import { Users, CreditCard, Shield, AlertTriangle } from 'lucide-react';
import { UserManagement } from '../../components/admin/UserManagement';
import { AccessControl } from '../../components/admin/AccessControl';
import { PaymentStatus } from '../../components/admin/PaymentStatus';
import { AdminStats } from '../../components/admin/AdminStats';
import { useAuthStore } from '../../store/useAuthStore';

export function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('users');
  const { user } = useAuthStore();

  if (user?.role !== 'admin') {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-center">
          <AlertTriangle className="mx-auto h-12 w-12 text-red-500" />
          <h2 className="mt-4 text-lg font-medium text-gray-900">Access Denied</h2>
          <p className="mt-2 text-gray-500">You don't have permission to access this page.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
        <p className="mt-1 text-gray-500">Manage users, access, and system settings</p>
      </div>

      <AdminStats />

      <div className="mt-8">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            {[
              { id: 'users', label: 'User Management', icon: Users },
              { id: 'access', label: 'Access Control', icon: Shield },
              { id: 'payments', label: 'Payment Status', icon: CreditCard },
            ].map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => setActiveTab(id)}
                className={`flex items-center space-x-2 border-b-2 px-1 pb-4 pt-2 text-sm font-medium ${
                  activeTab === id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                }`}
              >
                <Icon className="h-5 w-5" />
                <span>{label}</span>
              </button>
            ))}
          </nav>
        </div>

        <div className="mt-8">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            {activeTab === 'users' && <UserManagement />}
            {activeTab === 'access' && <AccessControl />}
            {activeTab === 'payments' && <PaymentStatus />}
          </motion.div>
        </div>
      </div>
    </div>
  );
}