import { useState } from 'react';
import { CreditCard, AlertTriangle, CheckCircle, XCircle } from 'lucide-react';
import { Button } from '../ui/Button';
import { useToast } from '../../hooks/useToast';
import { Confirmation } from '../ui/Confirmation';

interface Payment {
  id: string;
  userId: string;
  userName: string;
  plan: string;
  amount: number;
  status: 'paid' | 'overdue' | 'cancelled';
  dueDate: string;
}

const mockPayments: Payment[] = [
  {
    id: '1',
    userId: '1',
    userName: 'John Doe',
    plan: 'Pro',
    amount: 9.99,
    status: 'paid',
    dueDate: '2024-03-20T00:00:00Z',
  },
  {
    id: '2',
    userId: '2',
    userName: 'Jane Smith',
    plan: 'Enterprise',
    amount: 49.99,
    status: 'overdue',
    dueDate: '2024-02-15T00:00:00Z',
  },
];

export function PaymentStatus() {
  const [payments, setPayments] = useState(mockPayments);
  const [selectedPayment, setSelectedPayment] = useState<Payment | null>(null);
  const [showBlockConfirm, setShowBlockConfirm] = useState(false);
  const { addToast } = useToast();

  const handleBlockUser = () => {
    if (selectedPayment) {
      // In a real app, you would call an API to block the user
      addToast('success', `User access blocked due to payment issues`);
      setShowBlockConfirm(false);
    }
  };

  const getStatusIcon = (status: Payment['status']) => {
    switch (status) {
      case 'paid':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'overdue':
        return <AlertTriangle className="h-5 w-5 text-red-500" />;
      case 'cancelled':
        return <XCircle className="h-5 w-5 text-gray-500" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between">
        <h2 className="text-lg font-medium text-gray-900">Payment Status</h2>
        <Button>Export Report</Button>
      </div>

      <div className="rounded-lg border border-gray-200 bg-white">
        <table className="min-w-full divide-y divide-gray-200">
          <thead>
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                User
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                Plan
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                Amount
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                Due Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {payments.map((payment) => (
              <tr key={payment.id}>
                <td className="whitespace-nowrap px-6 py-4">{payment.userName}</td>
                <td className="whitespace-nowrap px-6 py-4">{payment.plan}</td>
                <td className="whitespace-nowrap px-6 py-4">
                  ${payment.amount.toFixed(2)}
                </td>
                <td className="whitespace-nowrap px-6 py-4">
                  <div className="flex items-center space-x-2">
                    {getStatusIcon(payment.status)}
                    <span
                      className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${
                        payment.status === 'paid'
                          ? 'bg-green-100 text-green-800'
                          : payment.status === 'overdue'
                          ? 'bg-red-100 text-red-800'
                          : 'bg-gray-100 text-gray-800'
                      }`}
                    >
                      {payment.status}
                    </span>
                  </div>
                </td>
                <td className="whitespace-nowrap px-6 py-4">
                  {new Date(payment.dueDate).toLocaleDateString()}
                </td>
                <td className="whitespace-nowrap px-6 py-4">
                  <div className="flex space-x-2">
                    {payment.status === 'overdue' && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          setSelectedPayment(payment);
                          setShowBlockConfirm(true);
                        }}
                      >
                        Block Access
                      </Button>
                    )}
                    <Button variant="outline" size="sm">
                      Send Reminder
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Confirmation
        isOpen={showBlockConfirm}
        onClose={() => setShowBlockConfirm(false)}
        onConfirm={handleBlockUser}
        title="Block User Access"
        message="Are you sure you want to block this user's access due to payment issues?"
        type="warning"
      />
    </div>
  );
}