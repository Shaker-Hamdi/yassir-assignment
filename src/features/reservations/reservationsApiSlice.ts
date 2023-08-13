import { apiSlice } from "../../store/api/apiSlice";
import { Reservation, ReservationsResponse } from "../../types/apiTypes";

export const permissionsApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    getReservationsList: builder.query<Reservation[], void>({
      query: () => ({
        url: "/",
      }),
      transformResponse: (responseData: ReservationsResponse, meta, arg) => {
        return responseData.reservations;
      },
    }),
  }),
});

export const { useGetReservationsListQuery } = permissionsApiSlice;
