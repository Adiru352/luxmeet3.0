import { useState } from 'react';
import { Shield, Eye, EyeOff } from 'lucide-react';
import { Button } from '../ui/Button';
import { useToast } from '../../hooks/useToast';

interface Permission {
  id: string;
  name: string;
  description: string;
  roles: string[];
}

const mockPermissions: Permission[] = [
  {
    id: '1',
    name: 'edit_cards',
    description: 'Create and edit business cards',
    roles: ['admin', 'user'],
  },
  {
    id: '2',
    name: 'manage_team',
    description: 'Manage team members and permissions',
    roles: ['admin'],
  },
  {
    id: '3',
    name: 'view_analytics',
    description: 'View analytics and reports',
    roles: ['admin', 'user'],
  },
];

export function AccessControl() {
  const [permissions, setPermissions] = useState(mockPermissions);
  const { addToast } = useToast();

  const handleToggleRole = (permissionId: string, role: string) => {
    setPermissions((prev) =>
      prev.map((permission) => {
        if (permission.id === permissionId) {
          const roles = permission.roles.includes(role)
            ? permission.roles.filter((r) => r !== role)
            : [...permission.roles, role];
          return { ...permission, roles };
        }
        return permission;
      })
    );
    addToast('success', 'Permissions updated successfully');
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between">
        <h2 className="text-lg font-medium text-gray-900">Access Control</h2>
        <Button>Add Permission</Button>
      </div>

      <div className="grid gap-6">
        {permissions.map((permission) => (
          <div
            key={permission.id}
            className="rounded-lg border border-gray-200 bg-white p-6"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Shield className="h-5 w-5 text-gray-400" />
                <div>
                  <h3 className="text-sm font-medium text-gray-900">
                    {permission.name}
                  </h3>
                  <p className="text-sm text-gray-500">{permission.description}</p>
                </div>
              </div>
              <div className="flex space-x-2">
                {['admin', 'user'].map((role) => (
                  <Button
                    key={role}
                    variant={permission.roles.includes(role) ? 'primary' : 'outline'}
                    size="sm"
                    onClick={() => handleToggleRole(permission.id, role)}
                  >
                    {permission.roles.includes(role) ? (
                      <Eye className="mr-2 h-4 w-4" />
                    ) : (
                      <EyeOff className="mr-2 h-4 w-4" />
                    )}
                    {role}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}