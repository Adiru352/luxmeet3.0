import { Link } from 'react-router-dom';
import { Menu } from '@headlessui/react';
import { UserCircle, Menu as MenuIcon } from 'lucide-react';
import { useAuthStore } from '../../store/useAuthStore';
import { Button } from '../ui/Button';
import { MegaMenu } from './MegaMenu';

export function Header() {
  const { user, logout } = useAuthStore();

  return (
    <header className="border-b border-gray-200 bg-white">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center space-x-8">
          <Link to="/" className="flex items-center space-x-2">
            <UserCircle className="h-8 w-8 text-blue-600" />
            <span className="text-xl font-bold text-gray-900">Luxmeet</span>
          </Link>

          <MegaMenu />
        </div>

        <div className="flex items-center">
          {user ? (
            <Menu as="div" className="relative">
              <Menu.Button className="flex items-center space-x-2 rounded-full p-2 hover:bg-gray-100">
                <img
                  src={`https://api.dicebear.com/7.x/initials/svg?seed=${user.name}`}
                  alt={user.name}
                  className="h-8 w-8 rounded-full"
                />
                <MenuIcon className="h-5 w-5 text-gray-600" />
              </Menu.Button>
              <Menu.Items className="absolute right-0 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5">
                <Menu.Item>
                  {({ active }) => (
                    <Link
                      to="/profile"
                      className={`${
                        active ? 'bg-gray-100' : ''
                      } block px-4 py-2 text-sm text-gray-700`}
                    >
                      Profile
                    </Link>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <button
                      onClick={logout}
                      className={`${
                        active ? 'bg-gray-100' : ''
                      } block w-full px-4 py-2 text-left text-sm text-gray-700`}
                    >
                      Sign out
                    </button>
                  )}
                </Menu.Item>
              </Menu.Items>
            </Menu>
          ) : (
            <div className="flex items-center space-x-4">
              <Link to="/login">
                <Button variant="ghost">Sign in</Button>
              </Link>
              <Link to="/register">
                <Button>Get Started</Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}