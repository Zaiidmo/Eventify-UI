import React from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface SortConfig {
  key: string;
  direction: 'asc' | 'desc';
}

interface TableHeaderProps {
  columns: {
    key: string;
    label: string;
    sortable?: boolean;
  }[];
  sortConfig: SortConfig | null;
  onSort: (key: string) => void;
}

export function TableHeader({ columns, sortConfig, onSort }: TableHeaderProps) {
  return (
    <thead className="backdrop-filter backdrop-blur-xl bg-gray-100/60 dark:bg-gray-600/60  rounded-xl rounded-b-0 border-b-0 max-h-[90%]">
      <tr>
        {columns.map((column) => (
          <th
            key={column.key}
            scope="col"
            className="px-6 py-3 text-left text-xs font-medium text-black dark:text-white uppercase tracking-wider"
          >
            {column.sortable ? (
              <button
                className="group inline-flex items-center bg-transparent space-x-1 hover:text-primary hover:underline border-none"
                onClick={() => onSort(column.key)}
              >
                <span>{column.label}</span>
                <span className="inline-flex flex-col h-3 w-3 justify-center">
                  {sortConfig?.key === column.key ? (
                    sortConfig.direction === 'asc' ? (
                      <ChevronUp className="h-3 w-3" />
                    ) : (
                      <ChevronDown className="h-3 w-3" />
                    )
                  ) : (
                    <ChevronDown className="h-3 w-3 opacity-0 group-hover:opacity-100" />
                  )}
                </span>
              </button>
            ) : (
              <span>{column.label}</span>
            )}
          </th>
        ))}
      </tr>
    </thead>
  );
}