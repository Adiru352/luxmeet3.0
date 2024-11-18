import * as TabsPrimitive from '@headlessui/react';
import { cn } from '../../utils/cn';

export function Tabs({ value, onValueChange, children }: any) {
  return (
    <TabsPrimitive.Group
      selectedIndex={['overview', 'plans'].indexOf(value)}
      onChange={(index) => onValueChange(['overview', 'plans'][index])}
    >
      {children}
    </TabsPrimitive.Group>
  );
}

export function TabsList({ children }: { children: React.ReactNode }) {
  return (
    <TabsPrimitive.List className="inline-flex space-x-1 rounded-lg bg-gray-100 p-1">
      {children}
    </TabsPrimitive.List>
  );
}

export function TabsTrigger({ value, children }: { value: string; children: React.ReactNode }) {
  return (
    <TabsPrimitive.Tab
      className={({ selected }) =>
        cn(
          'rounded-md px-3 py-1.5 text-sm font-medium transition-all',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2',
          selected
            ? 'bg-white text-gray-900 shadow'
            : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
        )
      }
    >
      {children}
    </TabsPrimitive.Tab>
  );
}

export function TabsContent({ value, children }: { value: string; children: React.ReactNode }) {
  return (
    <TabsPrimitive.Panel
      className={cn(
        'rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2'
      )}
    >
      {children}
    </TabsPrimitive.Panel>
  );
}