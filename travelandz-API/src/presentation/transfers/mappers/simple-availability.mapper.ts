import { CheckSimpleAvailableTransfersDto } from "../../../domain/dtos";

export function parseSimpleAvailabilityURL(
  checkSimpleAvailableTransfersDto: CheckSimpleAvailableTransfersDto,
): string {
  const { language, from, passengers, to } = checkSimpleAvailableTransfersDto;
  let dataURL = `transfer-api/1.0/availability/${language}/from/${from.type}/${from.code}/to/${to.type}/${to.code}/${from.date}`;
  if (to.date) {
    dataURL += `/${to.date}`;
  }
  const passengersURL = `/${passengers.adults}/${passengers.children}/${passengers.infants}`;
  return `/${dataURL}${passengersURL}`;
}
