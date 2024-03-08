import { AuthDatasourceInterface } from "../../domain/datasources";
import { RegisterUserDto } from "../../domain/dtos";
import { UserEntity } from "../../domain/entities";
import { AuthRepositoryInterface } from "../../domain/repositories";

export class AuthRepository implements AuthRepositoryInterface {
  constructor(private readonly datasource: AuthDatasourceInterface) {}

  register(registerUserDto: RegisterUserDto): Promise<UserEntity> {
    return this.datasource.register(registerUserDto);
  }
}
