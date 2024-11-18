interface TableProps {
  children: React.ReactNode;
}

export function Table({ children }: TableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">{children}</table>
    </div>
  );
}

Table.Header = function TableHeader({ children }: TableProps) {
  return <thead className="bg-gray-50">{children}</thead>;
};

Table.Body = function TableBody({ children }: TableProps) {
  return <tbody className="divide-y divide-gray-200 bg-white">{children}</tbody>;
};

Table.Row = function TableRow({ children }: TableProps) {
  return <tr>{children}</tr>;
};

Table.HeaderCell = function TableHeaderCell({ children }: TableProps) {
  return (
    <th
      scope="col"
      className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
    >
      {children}
    </th>
  );
};

Table.Cell = function TableCell({ children }: TableProps) {
  return <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-900">{children}</td>;
};