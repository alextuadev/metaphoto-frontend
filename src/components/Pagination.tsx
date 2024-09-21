interface PaginationProps {
  offset: number;
  limit: number;
  onPageChange: (newOffset: number) => void;
  onLimitChange: (newLimit: number) => void;
}

export default function Pagination({
  offset,
  limit,
  onPageChange,
  onLimitChange,
}: PaginationProps) {
  const handlePrevious = () => {
    if (offset - limit >= 0) {
      onPageChange(offset - limit);
    }
  };

  const handleNext = () => {
    onPageChange(offset + limit);
  };

  const handleLimitChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onLimitChange(Number(e.target.value));
  };

  return (
    <div className="flex justify-between items-center mt-4">
      <button
        onClick={handlePrevious}
        disabled={offset === 0}
        className="bg-blue-500 text-white px-4 py-2 rounded disabled:bg-gray-300"
      >
        Previous
      </button>
      <div>
        <label htmlFor="limit" className="mr-2">
          Page Size:
        </label>
        <select
          id="limit"
          value={limit}
          onChange={handleLimitChange}
          className="border rounded p-2"
        >
          <option value="10">10</option>
          <option value="20">20</option>
          <option value="50">50</option>
        </select>
      </div>
      <button
        onClick={handleNext}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Next
      </button>
    </div>
  );
}
