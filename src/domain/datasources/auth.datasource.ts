import { UserEntity } from "../entities";
import { LoginUserDto, RegisterUserDto } from "../dtos";

export abstract class AuthDatasourceInterface {
  abstract login(loginUserDto: LoginUserDto): Promise<UserEntity>;

  abstract register(registerUserDto: RegisterUserDto): Promise<UserEntity>;
}
