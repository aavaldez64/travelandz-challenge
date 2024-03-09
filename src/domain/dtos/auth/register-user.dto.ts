import { Validators } from "../../../config";
import { DtoResponse } from "../../interfaces";

export class RegisterUserDto {
  private constructor(
    public username: string,
    public email: string,
    public password: string,
  ) {}

  static create(props: Record<string, any>): DtoResponse<RegisterUserDto> {
    const { username, email, password } = props;

    if (!username) return ["username is required"];
    if (!email) return ["email is required"];
    if (!Validators.isEmail(email)) return ["Invalid email"];

    if (!password) return ["password is required"];

    return [
      null,
      new RegisterUserDto(
        (username as string).toLowerCase(),
        (email as string).toLowerCase(),
        password,
      ),
    ];
  }
}
