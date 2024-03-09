import { DtoResponse } from "../../interfaces";

export class LoginUserDto {
  private constructor(
    public username: string,
    public password: string,
  ) {}

  static create(props: Record<string, any>): DtoResponse<LoginUserDto> {
    const { username, password } = props;

    if (!username) return ["username is required"];

    if (!password) return ["password is required"];

    return [
      null,
      new LoginUserDto((username as string).toLowerCase(), password),
    ];
  }
}
