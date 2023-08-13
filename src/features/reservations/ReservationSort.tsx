import React from "react";

const ReservationSort: React.FC<{
  onSortSubmit: (sortBy: string, sortOrder: string) => void;
}> = ({ onSortSubmit }) => {
  const [sortOption, setSortOption] = React.useState<string>(""); // Format: "<sortBy>-<sortOrder>"

  const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSortOption(event.target.value);
    const [sortBy, sortOrder] = event.target.value.split("-");
    onSortSubmit(sortBy, sortOrder);
  };

  return (
    <div>
      <label>
        Sort by:
        <select value={sortOption} onChange={handleSortChange}>
          <option value="">Select...</option>
          <option value="quantity-asc">Quantity (Ascending)</option>
          <option value="quantity-desc">Quantity (Descending)</option>
          <option value="customer-asc">Customer (Ascending)</option>
          <option value="customer-desc">Customer (Descending)</option>
        </select>
      </label>
    </div>
  );
};

export default ReservationSort;
