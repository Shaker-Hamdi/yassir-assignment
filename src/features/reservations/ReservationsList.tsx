import clsx from "clsx";

import { Reservation } from "../../types/apiTypes";
import SingleReservation from "./SingleReservation";

type Iprops = {
  reservations: Reservation[] | undefined;
};

const ReservationsList: React.FC<Iprops> = ({ reservations }) => {
  return (
    <ul
      className={clsx(
        "mt-10 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4",
      )}
    >
      {reservations?.map(reservation => {
        return (
          <li key={reservation.id} className={clsx("w-full")}>
            <SingleReservation reservation={reservation} />
          </li>
        );
      })}
    </ul>
  );
};

export default ReservationsList;
