import { Validators } from "../../../config";
import { DtoResponse } from "../../interfaces";

export class RegisterUserDto {
  private constructor(
    public name: string,
    public lastName: string,
    public phone: string,
    public username: string,
    public email: string,
    public password: string,
  ) {}

  static create(props: Record<string, any>): DtoResponse<RegisterUserDto> {
    const { name, lastName, phone, username, email, password } = props;

    const errors: string[] = [];

    if (!name) errors.push("name is required");
    if (!lastName) errors.push("lastName is required");
    if (!phone) errors.push("phone is required");
    if (!Validators.isPhone(phone)) errors.push("Invalid phone number");
    if (!username) errors.push("username is required");
    if (!email) errors.push("email is required");
    if (!Validators.isEmail(email)) errors.push("Invalid email");

    if (!password) errors.push("password is required");

    if (errors.length > 0) {
      if (errors.length === 1) return [errors[0]];
      return [{ errors: errors }];
    }

    return [
      null,
      new RegisterUserDto(
        name,
        lastName,
        phone,
        (username as string).toLowerCase(),
        (email as string).toLowerCase(),
        password,
      ),
    ];
  }
}
