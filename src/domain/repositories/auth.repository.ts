import { UserEntity } from "../entities";
import { RegisterUserDto } from "../dtos/auth/register-user.dto";

export abstract class AuthRepositoryInterface {
  // abstract register(loginUserDto: LoginUserDto): Promise<User>;

  abstract register(registerUserDto: RegisterUserDto): Promise<UserEntity>;
}
