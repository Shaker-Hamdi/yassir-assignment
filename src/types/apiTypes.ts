export type Reservation = {
  id: number;
  businessDate: string;
  status: string;
  shift: string;
  start: string;
  end: string;
  quantity: number;
  customer: {
    firstName: string;
    lastName: string;
  };
  area: string;
  guestNotes: string;
};

export type ReservationsResponse = {
  [key: string | "reservations"]: Reservation[];
};

export type FilterCriteria = {
  status: string[];
  selectedDate: string | null;
  shifts: string[];
  areas: string[];
};

export type MetadataObj = {
  [key: string]: any;
};
