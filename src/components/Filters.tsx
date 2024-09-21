import { useState } from "react";

interface FiltersProps {
  onFilterChange: (filters: {
    title: string;
    "album.title": string;
    "album.user.email": string;
  }) => void;
}

export default function Filters({ onFilterChange }: FiltersProps) {
  const [filters, setFilters] = useState({
    title: "",
    "album.title": "",
    "album.user.email": "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onFilterChange(filters);
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <input
          type="text"
          name="title"
          placeholder="Filter by title"
          value={filters.title}
          onChange={handleInputChange}
          className="border rounded p-2"
        />
        <input
          type="text"
          name="album.title"
          placeholder="Filter by album title"
          value={filters["album.title"]}
          onChange={handleInputChange}
          className="border rounded p-2"
        />
        <input
          type="text"
          name="album.user.email"
          placeholder="Filter by user email"
          value={filters["album.user.email"]}
          onChange={handleInputChange}
          className="border rounded p-2"
        />
      </div>
      <button
        type="submit"
        className="mt-2 bg-blue-500 text-white px-4 py-2 rounded"
      >
        Apply Filters
      </button>
    </form>
  );
}
