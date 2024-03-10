import { Validators } from "../../../config";
import { DtoResponse } from "../../interfaces";

export class UpdateUserDto {
  private constructor(
    public username?: string,
    public email?: string,
    public password?: string,
  ) {}

  static create(props: Record<string, any>): DtoResponse<UpdateUserDto> {
    const { username, email, password } = props;

    // if (!username) return ["username is required"];
    // if (!email) return ["email is required"];
    if (email && !Validators.isEmail(email)) return ["Invalid email"];

    return [
      null,
      new UpdateUserDto(
        username && (username as string).toLowerCase(),
        email && (email as string).toLowerCase(),
        password,
      ),
    ];
  }
}
