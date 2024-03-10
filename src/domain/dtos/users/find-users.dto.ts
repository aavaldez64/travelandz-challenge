import { DtoResponse } from "../../interfaces";

export class FindUserDto {
  private constructor(
    public limit: number,
    public skip: number,
  ) {}

  static create(props: Record<string, any>): DtoResponse<FindUserDto> {
    const { limit = 50, skip = 0 } = props;

    if (isNaN(+limit)) return ["limit must be a number"];

    if (isNaN(+skip)) return ["skip must be a number"];

    return [null, new FindUserDto(+limit, +skip)];
  }
}
