import { Validators } from "../../../config";
import { DtoResponse } from "../../interfaces";

export class RegisterUserDto {
  private constructor(
    public name: string,
    public email: string,
    public password: string,
  ) {}

  static create(props: Record<string, any>): DtoResponse<RegisterUserDto> {
    const { name, email, password } = props;

    if (!name) return ["name is required"];
    if (!email) return ["email is required"];
    if (!Validators.isEmail(email)) return ["Invalid email"];

    if (!password) return ["password is required"];

    return [
      null,
      new RegisterUserDto(name, (email as string).toLowerCase(), password),
    ];
  }
}
