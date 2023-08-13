import clsx from "clsx";

import { Reservation } from "../../types/apiTypes";

type Iprops = {
  reservations: Reservation[] | undefined;
};

const ReservationsList: React.FC<Iprops> = ({ reservations }) => {
  return (
    <table>
      <tbody>
        {reservations?.map(reservation => {
          return (
            <tr key={reservation.id}>
              <td>{reservation.id}</td>
              <td>{reservation.shift}</td>
              <td>{reservation.status}</td>
              <td>{reservation.businessDate}</td>
              <td>{reservation.area}</td>
              <td>{reservation.quantity}</td>
              <td>
                {reservation.customer.firstName} {reservation.customer.lastName}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default ReservationsList;
