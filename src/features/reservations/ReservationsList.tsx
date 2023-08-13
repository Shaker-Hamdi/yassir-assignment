import { Reservation } from "../../types/apiTypes";

type Iprops = {
  reservations: Reservation[] | undefined;
};

const ReservationsList: React.FC<Iprops> = ({ reservations }) => {
  return (
    <div>
      {reservations?.map(reservation => {
        return (
          <div key={reservation.id}>
            <div>{reservation.id}</div>
            <div>{reservation.shift}</div>
          </div>
        );
      })}
    </div>
  );
};

export default ReservationsList;
