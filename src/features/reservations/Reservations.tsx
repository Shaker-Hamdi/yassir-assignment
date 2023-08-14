import clsx from "clsx";
import { format, parse, set } from "date-fns";
import { useEffect, useState } from "react";

import LoadingSpinner from "../../components/ui/LoadingSpinner";
import Pagination from "../../components/ui/Pagination";
import { MetadataObj, Reservation } from "../../types/apiTypes";
import { isEmpty } from "../../utils/helpers";
import ReservationFilter from "./ReservationFilter";
import ReservationSearch from "./ReservationSearch";
import ReservationSort from "./ReservationSort";
import ReservationsList from "./ReservationsList";
import { useGetReservationsListQuery } from "./reservationsApiSlice";

type Iprops = {};

const Reservations: React.FC<Iprops> = () => {
  const [reservations, setReservations] = useState<Reservation[]>();
  const [appliedFilters, setAppliedFilters] = useState<MetadataObj>({});
  const [appliedSearch, setAppliedSearch] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [reservationsPerPage, setReservationsPerPage] = useState<number>(8);

  const { data, isLoading, isSuccess } = useGetReservationsListQuery();

  useEffect(() => {
    // Set reservations locally when data is fetched
    if (isSuccess && data) {
      setReservations(data);
    }
  }, [data, isSuccess]);

  useEffect(() => {
    // Applying the filters if they exist when the search is cleared
    if (appliedSearch === "" && !isEmpty(appliedFilters)) {
      handleFilterSubmit(appliedFilters);
    }
  }, [appliedSearch, appliedFilters]);

  const indexOfLastReservation = currentPage * reservationsPerPage;
  const indexOfFirstReservation = indexOfLastReservation - reservationsPerPage;
  const currentReservations =
    reservations?.slice(indexOfFirstReservation, indexOfLastReservation) || [];

  // Paginagte function: Change page number
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  // Filter function: Filter reservations based on filter criteria
  const handleFilterSubmit = (filters: MetadataObj) => {
    setCurrentPage(1);
    let filteredReservations = data || [];

    // Apply filters
    if (!isEmpty(filters)) {
      filteredReservations = filteredReservations.filter(
        (reservation: MetadataObj) => {
          return Object.keys(filters).every(key => {
            const filterValues = filters[key];

            if (key === "businessDate" && filterValues) {
              const [year, month, day] = filterValues.split("-").map(Number);
              const selectedDate = new Date(year, month - 1, day); // Month is zero-based
              const reservationDate = parse(
                reservation[key],
                "dd.MM.yyyy",
                new Date(),
              );
              return (
                format(reservationDate, "yyyy-MM-dd") ===
                format(selectedDate, "yyyy-MM-dd")
              );
            } else if (filterValues && filterValues.length > 0) {
              return filterValues.includes(reservation[key]);
            }

            return true; // Default to true for keys without filters
          });
        },
      );

      setAppliedFilters(filters);
      setReservations(filteredReservations);

      //If search is applied, re-apply it when filters are applied
      if (appliedSearch) {
        handleSearchChange(appliedSearch);
      }
    }

    //Apply the search when clearing the filter
    if (isEmpty(filters) && appliedSearch) {
      setAppliedFilters({});
      setReservations(data);
      handleSearchChange(appliedSearch);
    }

    //Clear the filters
    if (isEmpty(filters) && !appliedSearch) {
      setReservations(data);
      setAppliedFilters({});
    }
  };

  const handleSortSubmit = (sortBy: string, sortOrder: string) => {
    if (sortBy && sortOrder && reservations) {
      const sortedReservations = [...reservations].sort(
        (a: MetadataObj, b: MetadataObj) => {
          let aValue: string | MetadataObj = a;
          let bValue: string | MetadataObj = b;

          if (sortBy === "customer") {
            aValue = `${a.customer.firstName} ${a.customer.lastName}`;
            bValue = `${b.customer.firstName} ${b.customer.lastName}`;
          } else {
            aValue = a[sortBy];
            bValue = b[sortBy];
          }

          if (sortOrder === "asc") {
            return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
          } else {
            return aValue > bValue ? -1 : aValue < bValue ? 1 : 0;
          }
        },
      );

      setReservations(sortedReservations);
    }
  };

  const handleSearchChange = (searchTerm: string) => {
    if (searchTerm) {
      setAppliedSearch(searchTerm);
      setReservations(prevReservations => {
        return prevReservations?.filter((reservation: Reservation) => {
          const customerName = `${reservation.customer.firstName} ${reservation.customer.lastName}`;
          return customerName.toLowerCase().includes(searchTerm.toLowerCase());
        });
      });
    } else {
      //Clear search
      setAppliedSearch("");
      setReservations(data);
    }
  };

  return (
    <>
      {isLoading ? (
        <div
          className={clsx(
            "absolute bottom-0 left-0 right-0 top-0 z-10 h-full w-full",
          )}
        >
          <LoadingSpinner />
        </div>
      ) : (
        <section className={clsx("flex flex-col")}>
          <div
            className={clsx(
              "mt-5 grid grid-cols-1 gap-5 rounded-xl bg-white p-5 shadow-sm md:grid-cols-12",
            )}
          >
            <ReservationSearch onSearchChange={handleSearchChange} />
            <div
              className={clsx(
                "flex items-center gap-5 md:col-span-6 lg:col-span-4",
              )}
            >
              <ReservationSort onSortSubmit={handleSortSubmit} />
              <ReservationFilter onSubmit={handleFilterSubmit} />
            </div>
          </div>

          <ReservationsList reservations={currentReservations} />

          <Pagination
            currentPage={currentPage}
            itemsPerPage={reservationsPerPage}
            totalItems={reservations?.length || 0}
            paginate={paginate}
          />
        </section>
      )}
    </>
  );
};

export default Reservations;
