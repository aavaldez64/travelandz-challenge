import { DtoResponse } from "../../interfaces";

export class GetBookingsDto {
  constructor(
    public language: string,
    public fromDate: string,
    public toDate: string,
    public dateType: string,
    public offset: string,
    public limit: string,
  ) {}
  static create(props: Record<string, any>): DtoResponse<GetBookingsDto> {
    const errors: string[] = [];
    const {
      language = "es",
      fromDate,
      toDate,
      dateType = "FROM_DATE",
      offset = 0,
      limit = 20,
    } = props;

    if (!fromDate) errors.push("fromDate is required");
    if (!toDate) errors.push("toDate is required");

    if (new Date(fromDate).toDateString() === "Invalid Date") {
      errors.push("Invalid out bound date");
    }
    if (new Date(toDate).toDateString() === "Invalid Date") {
      errors.push("Invalid out bound date");
    }

    if (errors.length > 0) {
      if (errors.length === 1) return [errors[0]];
      return [{ errors: errors }];
    }

    return [
      null,
      new GetBookingsDto(
        language,
        new Date(fromDate).toISOString().split("T").at(0)!,
        new Date(toDate).toISOString().split("T").at(0)!,
        dateType,
        offset,
        limit,
      ),
    ];
  }
}
