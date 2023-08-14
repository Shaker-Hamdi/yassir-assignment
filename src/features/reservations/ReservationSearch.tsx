import React from "react";

type Iprops = {
  onSearchChange: (searchTerm: string) => void;
};

const ReservationSearch: React.FC<Iprops> = ({
  onSearchChange: onSearchChange,
}) => {
  const [searchTerm, setSearchTerm] = React.useState<string>(""); // Format: "<sortBy>-<sortOrder>"

  const handleSortChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
    onSearchChange(event.target.value);
  };

  const handleClearSearch = () => {
    setSearchTerm("");
    onSearchChange("");
  };

  return (
    <div>
      <label>
        Search:
        <input
          type="text"
          value={searchTerm}
          onChange={handleSortChange}
          placeholder="Search by customer name ..."
        />
      </label>

      <button onClick={handleClearSearch}>X</button>
    </div>
  );
};

export default ReservationSearch;
