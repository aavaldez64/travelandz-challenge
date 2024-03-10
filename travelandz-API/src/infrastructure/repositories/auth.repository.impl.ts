import { AuthDatasourceInterface } from "../../domain/datasources";
import { AuthRepositoryInterface } from "../../domain/repositories";
import { UserEntity } from "../../domain/entities";
import { LoginUserDto, RegisterUserDto } from "../../domain/dtos";

export class AuthRepository implements AuthRepositoryInterface {
  constructor(private readonly datasource: AuthDatasourceInterface) {}
  login(loginUserDto: LoginUserDto): Promise<UserEntity> {
    return this.datasource.login(loginUserDto);
  }

  register(registerUserDto: RegisterUserDto): Promise<UserEntity> {
    return this.datasource.register(registerUserDto);
  }
}
