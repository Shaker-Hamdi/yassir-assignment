import clsx from "clsx";
import React from "react";

type Iprops = {
  onSortSubmit: (sortBy: string, sortOrder: string) => void;
};

const ReservationSort: React.FC<Iprops> = ({ onSortSubmit }) => {
  const [sortOption, setSortOption] = React.useState<string>(""); // Format: "<sortBy>-<sortOrder>"

  const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSortOption(event.target.value);
    const [sortBy, sortOrder] = event.target.value.split("-");
    onSortSubmit(sortBy, sortOrder);
  };

  return (
    <div className={clsx("flex-1")}>
      <select
        value={sortOption}
        onChange={handleSortChange}
        className={clsx("w-full")}
      >
        <option value="">Sort By ...</option>
        <option value="quantity-asc">Quantity (Ascending)</option>
        <option value="quantity-desc">Quantity (Descending)</option>
        <option value="customer-asc">Customer (Ascending)</option>
        <option value="customer-desc">Customer (Descending)</option>
      </select>
    </div>
  );
};

export default ReservationSort;
