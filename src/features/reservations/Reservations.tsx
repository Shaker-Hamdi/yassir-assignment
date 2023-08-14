import { format, parse } from "date-fns";
import { useEffect, useState } from "react";

import LoadingSpinner from "../../components/ui/LoadingSpinner";
import Pagination from "../../components/ui/Pagination";
import { MetadataObj, Reservation } from "../../types/apiTypes";
import ReservationFilter from "./ReservationFilter";
import ReservationSearch from "./ReservationSearch";
import ReservationSort from "./ReservationSort";
import ReservationsList from "./ReservationsList";
import { useGetReservationsListQuery } from "./reservationsApiSlice";

type Iprops = {};

const Reservations: React.FC<Iprops> = () => {
  const [reservations, setReservations] = useState<Reservation[]>();
  const [appliedFilters, setAppliedFilters] = useState<MetadataObj>();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [reservationsPerPage, setReservationsPerPage] = useState<number>(5);
  const [sortCriteria, setSortCriteria] = useState<string>("");

  const { data, isLoading, isSuccess } = useGetReservationsListQuery();

  useEffect(() => {
    // Set reservations when data is fetched
    if (isSuccess && data) {
      setReservations(data);
    }
  }, [data, isSuccess]);

  useEffect(() => {
    // Initial filtering and sorting when component mounts
    // Aslo runs when sortCriteria changes and passes the appliedFilters
    // to sort the filtered reservations if filters are applied
    handleFilterSubmit(appliedFilters || {});
  }, [sortCriteria]);

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

    // Apply sorting based on sortCriteria
    if (sortCriteria) {
      console.log("Yes, there's a sort criteria");
      const [sortBy, sortOrder] = sortCriteria.split("-");
      filteredReservations = filteredReservations.sort((a: any, b: any) => {
        let aValue = a;
        let bValue = b;

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
      });
    }

    setReservations(filteredReservations);
    setAppliedFilters(filters);
  };

  // Sort function: just set the sortCriteria and let the filter function handle the sorting
  const handleSortSubmit = (sortBy: string, sortOrder: string) => {
    setSortCriteria(`${sortBy}-${sortOrder}`);
  };

  const handleSearchChange = (searchTerm: string) => {
    if (searchTerm) {
      setReservations(prevReservations => {
        return prevReservations?.filter((reservation: Reservation) => {
          const customerName = `${reservation.customer.firstName} ${reservation.customer.lastName}`;
          return customerName.toLowerCase().includes(searchTerm.toLowerCase());
        });
      });
    } else {
      if (appliedFilters) {
        handleFilterSubmit(appliedFilters);
      } else {
        setReservations(data);
      }
    }

    // setReservations(() => {
    //   if (searchTerm) {
    //     return data?.filter((reservation: Reservation) => {
    //       const customerName = `${reservation.customer.firstName} ${reservation.customer.lastName}`;
    //       return customerName.toLowerCase().includes(searchTerm.toLowerCase());
    //     });
    //   } else {
    //     return data;
    //   }
    // });
  };

  return (
    <>
      {isLoading ? (
        <div className="absolute bottom-0 left-0 right-0 top-0 z-10 h-full w-full bg-white bg-opacity-70">
          <LoadingSpinner />
        </div>
      ) : (
        <section>
          <div>
            <div>
              <ReservationFilter onSubmit={handleFilterSubmit} />
            </div>
            <div>
              <ReservationSort onSortSubmit={handleSortSubmit} />
            </div>
            <div>
              <ReservationSearch onSearchChange={handleSearchChange} />
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
