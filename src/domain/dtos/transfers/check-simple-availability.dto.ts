import { DtoResponse } from "../../interfaces";

interface OutBound {
  type: string;
  code: string;
  date: string;
}
interface InBound {
  type: string;
  code: string;
  date?: string;
}
interface Passengers {
  adults: string;
  children: string;
  infants: string;
}
export class CheckSimpleAvailableTransfersDto {
  constructor(
    public language: string,
    public passengers: Passengers,
    public from: OutBound,
    public to: InBound,
  ) {}
  static create(
    props: Record<string, any>,
  ): DtoResponse<CheckSimpleAvailableTransfersDto> {
    const errors: string[] = [];
    const {
      language = "es",
      adults = "0",
      children = "0",
      infants = "0",
      fromType,
      fromCode,
      outBound,
      toType,
      toCode,
      inBound,
    } = props;

    if (!fromType) errors.push("fromType is required");
    if (!fromCode) errors.push("fromCode is required");
    if (!outBound) errors.push("Out bound date is required");
    if (!toType) errors.push("toType is required");
    if (!toCode) errors.push("toCode is required");

    if (adults === "0" && children === "0" && infants === "0")
      errors.push("Is required at least 1 passenger");

    if (new Date(outBound).toDateString() === "Invalid Date") {
      errors.push("Invalid out bound date");
    }
    if (inBound && new Date(inBound).toDateString() === "Invalid Date") {
      errors.push("Invalid in bound date");
    }

    if (errors.length > 0) {
      if (errors.length === 1) return [errors[0]];
      return [{ errors: errors }];
    }
    const passengersData = {
      adults: adults,
      children: children,
      infants: infants,
    };
    const fromData = {
      type: fromType,
      code: fromCode,
      date: new Date(outBound).toISOString(),
    };
    const toData: InBound = {
      type: toType,
      code: toCode,
    };
    if (inBound) {
      toData.date = new Date(inBound).toISOString();
    }
    return [
      null,
      new CheckSimpleAvailableTransfersDto(
        language,
        passengersData,
        fromData,
        toData,
      ),
    ];
  }
}
