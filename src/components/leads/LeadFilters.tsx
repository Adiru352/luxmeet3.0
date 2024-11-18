interface LeadFiltersProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  sourceFilter: string;
  onSourceFilterChange: (value: any) => void;
}

export function LeadFilters({
  searchTerm,
  onSearchChange,
  sourceFilter,
  onSourceFilterChange,
}: LeadFiltersProps) {
  return (
    <div className="flex flex-col space-y-4 sm:flex-row sm:items-center sm:space-x-4 sm:space-y-0">
      <div className="flex-1">
        <label htmlFor="search" className="sr-only">
          Search leads
        </label>
        <input
          type="search"
          id="search"
          placeholder="Search by name or email..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="block w-full rounded-md border border-gray-300 px-4 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500"
        />
      </div>
      <div>
        <select
          value={sourceFilter}
          onChange={(e) => onSourceFilterChange(e.target.value)}
          className="block w-full rounded-md border border-gray-300 px-4 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500"
        >
          <option value="all">All Sources</option>
          <option value="nfc">NFC</option>
          <option value="qr">QR Code</option>
          <option value="share">Direct Share</option>
        </select>
      </div>
    </div>
  );
}