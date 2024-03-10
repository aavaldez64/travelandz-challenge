import type {
  DtoResponse,
  TransferDirection,
  TransferType,
} from "../../interfaces";

const VALID_TRANSFER_TYPES: TransferType[] = ["CRUISE", "FLIGHT", "TRAIN"];
const VALID_TRANSFER_Directions: TransferDirection[] = ["ARRIVAL", "DEPARTURE"];
export class RequestBookingBodyDto {
  constructor(
    public language: string,
    public rateKey: string,
    public transferType: TransferType,
    public transferDirection: TransferDirection,
    public transferCode: string,
    public transferCompanyName: string,
    public welcomeMessage: string,
    public remark: string,
  ) {}
  static create(
    props: Record<string, any>,
  ): DtoResponse<RequestBookingBodyDto> {
    const errors: string[] = [];
    const {
      language = "es",
      rateKey,
      transferType,
      transferDirection,
      transferCode = "XR1234",
      transferCompanyName = "null",
      welcomeMessage = "",
      remark = "",
    } = props;

    if (!rateKey) errors.push("rateKey is required");
    if (!transferType) errors.push("transferType is required");
    if (!VALID_TRANSFER_TYPES.includes(transferType))
      errors.push("Invalid transfer type. Must be (CRUISE | FLIGHT | TRAIN)");

    if (!transferDirection) errors.push("transferDirection is required");
    if (!VALID_TRANSFER_Directions.includes(transferDirection))
      errors.push("Invalid transfer direction. Must be (ARRIVAL | DEPARTURE)");

    if (errors.length > 0) {
      if (errors.length === 1) return [errors[0]];
      return [{ errors: errors }];
    }

    return [
      null,
      new RequestBookingBodyDto(
        language,
        rateKey,
        transferType,
        transferDirection,
        transferCode,
        transferCompanyName,
        welcomeMessage,
        remark,
      ),
    ];
  }
}
