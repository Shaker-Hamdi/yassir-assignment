import clsx from "clsx";
import { useEffect, useState } from "react";

import Pagination from "../../components/ui/Pagination";
import { Reservation } from "../../types/apiTypes";
import ReservationsList from "./ReservationsList";
import { useGetReservationsListQuery } from "./reservationsApiSlice";

type Iprops = {};

const Reservations: React.FC<Iprops> = () => {
  const [reservations, setReservations] = useState<Reservation[]>();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [reservationsPerPage, setReservationsPerPage] = useState<number>(5);
  const [totalReservations, setTotalReservations] = useState<number>(0);
  const { data, isLoading, isSuccess } = useGetReservationsListQuery();

  useEffect(() => {
    if (isSuccess && data) {
      setReservations(data);
      setTotalReservations(data.length);
    }
  }, [data, isSuccess]);

  const indexOfLastReservation = currentPage * reservationsPerPage;
  const indexOfFirstReservation = indexOfLastReservation - reservationsPerPage;
  const currentReservations = reservations?.slice(
    indexOfFirstReservation,
    indexOfLastReservation,
  );
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <section className={clsx("")}>
      <ReservationsList reservations={currentReservations} />
      <Pagination
        currentPage={currentPage}
        itemsPerPage={reservationsPerPage}
        totalItems={totalReservations}
        paginate={paginate}
      />
    </section>
  );
};

export default Reservations;
