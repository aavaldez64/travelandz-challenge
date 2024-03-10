type Errors = { errors: string[] };
export type DtoResponse<T> = [string | Errors] | [null, T];

export * from "./transfers/simple-availability.interface";
export * from "./transfers/bookings.interface.interface";
export * from "./transfers/request-booking-body.interface";
