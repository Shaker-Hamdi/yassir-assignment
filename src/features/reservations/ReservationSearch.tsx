import clsx from "clsx";
import React from "react";

import Icon from "../../components/ui/Icon";

type Iprops = {
  onSearchChange: (searchTerm: string) => void;
};

const ReservationSearch: React.FC<Iprops> = ({
  onSearchChange: onSearchChange,
}) => {
  const [searchTerm, setSearchTerm] = React.useState<string>(""); // Format: "<sortBy>-<sortOrder>"

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
    onSearchChange(event.target.value);
  };

  const handleClearSearch = () => {
    setSearchTerm("");
    onSearchChange("");
  };

  return (
    <div className={clsx("relative md:col-span-6 lg:col-span-8")}>
      <input
        type="text"
        value={searchTerm}
        onChange={handleSearchChange}
        placeholder="Search by customer name ..."
        className={clsx("w-full")}
      />

      {searchTerm && (
        <button
          onClick={handleClearSearch}
          className="absolute right-0 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center text-gray-400"
        >
          <Icon iconName="close" />
        </button>
      )}
    </div>
  );
};

export default ReservationSearch;
