import { useState } from 'react';
import { format } from 'date-fns';
import { Table } from '../components/ui/Table';
import { LeadFilters } from '../components/leads/LeadFilters';
import { LeadScore } from '../components/leads/LeadScore';
import type { Lead } from '../types';

const mockLeads: Lead[] = [
  {
    id: '1',
    name: 'Alice Johnson',
    email: 'alice@company.com',
    source: 'nfc',
    businessCardId: '1',
    createdAt: new Date('2024-02-20'),
    score: 85,
    notes: 'Met at Tech Conference 2024',
  },
  {
    id: '2',
    name: 'Bob Smith',
    email: 'bob@enterprise.com',
    source: 'qr',
    businessCardId: '1',
    createdAt: new Date('2024-02-21'),
    score: 65,
  },
];

export function Leads() {
  const [leads] = useState<Lead[]>(mockLeads);
  const [searchTerm, setSearchTerm] = useState('');
  const [sourceFilter, setSourceFilter] = useState<Lead['source'] | 'all'>('all');

  const filteredLeads = leads.filter((lead) => {
    const matchesSearch = lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSource = sourceFilter === 'all' || lead.source === sourceFilter;
    return matchesSearch && matchesSource;
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Leads</h1>
        <p className="mt-2 text-gray-600">
          Manage and track your leads captured through your digital business cards.
        </p>
      </div>

      <LeadFilters
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        sourceFilter={sourceFilter}
        onSourceFilterChange={setSourceFilter}
      />

      <div className="rounded-lg border border-gray-200 bg-white shadow">
        <Table>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Name</Table.HeaderCell>
              <Table.HeaderCell>Email</Table.HeaderCell>
              <Table.HeaderCell>Source</Table.HeaderCell>
              <Table.HeaderCell>Date</Table.HeaderCell>
              <Table.HeaderCell>Score</Table.HeaderCell>
              <Table.HeaderCell>Notes</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {filteredLeads.map((lead) => (
              <Table.Row key={lead.id}>
                <Table.Cell>{lead.name}</Table.Cell>
                <Table.Cell>{lead.email}</Table.Cell>
                <Table.Cell>
                  <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium capitalize">
                    {lead.source}
                  </span>
                </Table.Cell>
                <Table.Cell>{format(lead.createdAt, 'MMM d, yyyy')}</Table.Cell>
                <Table.Cell>
                  <LeadScore score={lead.score} />
                </Table.Cell>
                <Table.Cell>{lead.notes || '-'}</Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </div>
    </div>
  );
}