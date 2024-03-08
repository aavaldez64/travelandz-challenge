import { AuthDatasourceInterface } from "../../domain/datasources/";
import { RegisterUserDto } from "../../domain/dtos";
import { UserEntity } from "../../domain/entities";
import { CustomError } from "../../domain/errors";

export class AuthDatasource implements AuthDatasourceInterface {
  async register(registerUserDto: RegisterUserDto): Promise<UserEntity> {
    const { name, email, password } = registerUserDto;
    try {
      // 1 Verify user
      // 2 Hash password
      // 3 Map response to entity
      return new UserEntity("abc", name, email, password);
    } catch (error) {
      if (error instanceof CustomError) {
        throw error;
      }
      throw CustomError.internalServer(error);
    }
  }
}
