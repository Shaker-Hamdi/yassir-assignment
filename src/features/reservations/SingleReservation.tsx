import * as Popover from "@radix-ui/react-popover";
import clsx from "clsx";
import { format } from "date-fns";

import Icon from "../../components/ui/Icon";
import { Reservation } from "../../types/apiTypes";

type Iprops = {
  reservation: Reservation;
};

const SingleReservation: React.FC<Iprops> = ({ reservation }) => {
  return (
    <div className={clsx("relative rounded-xl bg-white shadow-md")}>
      <div
        className={clsx(
          "flex flex-col items-center justify-center rounded-tl-lg rounded-tr-lg bg-violet-600 p-5 text-center text-white",
        )}
      >
        <h2 className={clsx("text-xl font-medium")}>
          {reservation.customer.firstName} {reservation.customer.lastName}
        </h2>

        <em
          className={clsx(
            "mt-1 flex items-baseline text-sm leading-none opacity-70",
          )}
        >
          <Icon iconName="calendar_today" className={clsx("me-1 text-sm")} />
          {reservation.businessDate}
        </em>
      </div>

      <ul className={clsx("grid grid-cols-2 gap-3 p-5")}>
        <li
          className={clsx(
            "flex flex-col items-center justify-center rounded-lg bg-gray-100 p-2 text-center",
          )}
        >
          <h4 className={clsx("font-medium")}>Status</h4>
          <p className={clsx("text-sm capitalize text-gray-500")}>
            {reservation.status.toLowerCase()}
          </p>
        </li>

        <li
          className={clsx(
            "flex flex-col items-center justify-center rounded-lg bg-gray-100 p-2 text-center",
          )}
        >
          <h4 className={clsx("font-medium")}>Shift</h4>
          <p className={clsx("text-sm capitalize text-gray-500")}>
            {reservation.shift.toLowerCase()}
          </p>
        </li>

        <li
          className={clsx(
            "flex flex-col items-center justify-center rounded-lg bg-gray-100 p-2 text-center",
          )}
        >
          <h4 className={clsx("font-medium")}>Guests</h4>
          <p className={clsx("text-sm capitalize text-gray-500")}>
            {reservation.quantity}
          </p>
        </li>

        <li
          className={clsx(
            "flex flex-col items-center justify-center rounded-lg bg-gray-100 p-2 text-center",
          )}
        >
          <h4 className={clsx("font-medium")}>Area</h4>
          <p className={clsx("text-sm capitalize text-gray-500")}>
            {reservation.area.toLowerCase()}
          </p>
        </li>

        <li
          className={clsx(
            "flex flex-col items-center justify-center rounded-lg bg-gray-100 p-2 text-center",
          )}
        >
          <h4 className={clsx("font-medium")}>Start</h4>
          <p className={clsx("text-sm capitalize text-gray-500")}>
            {format(new Date(reservation.start), "hh:mm a")}
          </p>
        </li>

        <li
          className={clsx(
            "flex flex-col items-center justify-center rounded-lg bg-gray-100 p-2 text-center",
          )}
        >
          <h4 className={clsx("font-medium")}>End</h4>
          <p className={clsx("text-sm capitalize text-gray-500")}>
            {format(new Date(reservation.end), "hh:mm a")}
          </p>
        </li>
      </ul>

      {reservation.guestNotes && (
        <Popover.Root>
          <Popover.Trigger asChild>
            <button
              aria-label="Update dimensions"
              className={clsx(
                "absolute -right-2 -top-2 flex h-10 w-10 items-center justify-center rounded-full bg-pink-600 text-white hover:bg-white hover:text-pink-600",
              )}
            >
              <Icon iconName="sticky_note" />
            </button>
          </Popover.Trigger>
          <Popover.Content
            className={clsx("relative rounded-xl bg-white p-5 shadow-md")}
            sideOffset={5}
            align="end"
          >
            <p className={clsx("text-sm")}>{reservation.guestNotes}</p>
            <Popover.Arrow className={clsx("fill-white")} />
          </Popover.Content>
        </Popover.Root>
      )}
    </div>
  );
};

export default SingleReservation;
