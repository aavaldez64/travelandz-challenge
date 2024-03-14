import { DtoResponse } from "../../interfaces";
import { Validators } from "../../../config/validators";

export class GetBookingsDto {
  constructor(
    public language: string,
    public fromDate: string,
    public toDate: string,
    public dateType: string,
    public page: number,
    public limit: number,
  ) {}
  static create(props: Record<string, any>): DtoResponse<GetBookingsDto> {
    const errors: string[] = [];
    const defaultDate = new Date().toISOString().split("T")[0];
    const {
      language = "es",
      fromDate = defaultDate,
      toDate = defaultDate,
      dateType = "FROM_DATE",
      page = "1",
      limit = "20",
    } = props;
    // if (!fromDate) errors.push("out bound is required");
    if (fromDate && !Validators.isDateYYYYMMDD(fromDate))
      errors.push("Invalid out bound. Must be YYYY-MM-DD");
    if (fromDate && new Date(fromDate).toDateString() === "Invalid Date") {
      errors.push("Invalid out bound date");
    }

    // if (!toDate) errors.push("in bound is required");
    if (toDate && !Validators.isDateYYYYMMDD(toDate))
      errors.push("Invalid in bound. Must be YYYY-MM-DD");
    if (toDate && new Date(toDate).toDateString() === "Invalid Date") {
      errors.push("Invalid out bound date");
    }
    if (page && (isNaN(+page) || +page < 1)) {
      errors.push("Invalid page");
    }

    if (errors.length > 0) {
      if (errors.length === 1) return [errors[0]];
      return [{ errors: errors }];
    }

    return [
      null,
      new GetBookingsDto(
        language,
        fromDate || "",
        toDate || "",
        dateType,
        +page,
        +limit,
      ),
    ];
  }
}
