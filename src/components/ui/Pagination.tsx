import clsx from "clsx";

import Icon from "./Icon";

type Iprops = {
  itemsPerPage: number;
  totalItems: number;
  currentPage: number;
  paginate: (pageNumber: number) => void;
};

const Pagination: React.FC<Iprops> = ({
  itemsPerPage,
  totalItems,
  currentPage,
  paginate,
}) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const lastPage = totalPages;

  // Logic for getting the pages to show
  const getPager = () => {
    let pagesToShow = 5;
    let startsFromNumber;
    let pages = [];

    if (totalPages <= pagesToShow) {
      startsFromNumber = 1;
      pagesToShow = totalPages;
    } else {
      if (currentPage <= Math.ceil(pagesToShow / 2)) {
        startsFromNumber = 1;
      } else if (
        currentPage + Math.floor((pagesToShow - 1) / 2) >=
        totalPages
      ) {
        startsFromNumber = totalPages - (pagesToShow - 1);
      } else {
        startsFromNumber = currentPage - Math.floor(pagesToShow / 2);
      }
    }

    for (let i = 1; i <= pagesToShow; i++) {
      pages.push(startsFromNumber++);
    }

    return pages;
  };

  const pager = getPager();

  if (totalPages <= 1) {
    return null;
  }

  const buttonStyles = `flex h-9 w-9 items-center justify-center overflow-hidden rounded-full text-[15px] font-bold text-gray-500 transition hover:bg-gray-900 hover:text-white disabled:cursor-not-allowed disabled:text-gray-300 disabled:hover:bg-transparent`;

  return (
    <ul className="flex">
      <li>
        <button
          onClick={() => paginate(1)}
          disabled={currentPage === 1}
          className={clsx(
            "flex h-9 items-center px-1 text-[15px] font-bold text-gray-900 hover:text-gray-500 disabled:cursor-not-allowed disabled:text-gray-300 disabled:hover:bg-transparent",
          )}
        >
          First
        </button>
      </li>
      <li className="ml-1">
        <button
          onClick={() => paginate(currentPage - 1)}
          disabled={currentPage === 1}
          className={buttonStyles}
        >
          <Icon iconName="keyboard_double_arrow_left" />
        </button>
      </li>
      {pager.map(number => {
        return (
          <li key={number} className="ml-1">
            <button
              onClick={() => paginate(number)}
              className={`${buttonStyles} ${
                number === currentPage && "bg-gray-900 text-white"
              }`}
            >
              {number}
            </button>
          </li>
        );
      })}
      <li className="ml-1">
        <button
          onClick={() => paginate(currentPage + 1)}
          disabled={currentPage === lastPage}
          className={buttonStyles}
        >
          <Icon iconName="keyboard_double_arrow_right" />
        </button>
      </li>
      <li className="ml-1">
        <button
          onClick={() => paginate(lastPage)}
          disabled={currentPage === lastPage}
          className={clsx(
            "flex h-9 items-center px-1 text-[15px] font-bold text-gray-900 hover:text-gray-500 disabled:cursor-not-allowed disabled:text-gray-300 disabled:hover:bg-transparent",
          )}
        >
          Last
        </button>
      </li>
    </ul>
  );
};

export default Pagination;
