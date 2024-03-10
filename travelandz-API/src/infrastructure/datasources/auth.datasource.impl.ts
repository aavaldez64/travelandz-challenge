import { UserModel } from "../../data/mongodb";
import { AuthDatasourceInterface } from "../../domain/datasources/";
import { UserEntity } from "../../domain/entities";
import { LoginUserDto, RegisterUserDto } from "../../domain/dtos";
import { CustomError } from "../../domain/errors";
import { UserMapper } from "../mappers/user.mapper";
import type { CompareFunction, HashFunction } from "../interfaces";

export class AuthDatasource implements AuthDatasourceInterface {
  constructor(
    private readonly hashPassword: HashFunction,
    private readonly comparePassword: CompareFunction,
  ) {}

  async login(loginUserDto: LoginUserDto): Promise<UserEntity> {
    const { username, password } = loginUserDto;
    try {
      const findUser = await UserModel.findOne({ username });
      if (!findUser) {
        throw CustomError.badRequest("Invalid Credentials");
      }
      const passwordMatch = this.comparePassword(password, findUser.password);
      if (!passwordMatch) {
        throw CustomError.badRequest("Invalid Credentials");
      }

      return UserMapper.UserEntityFromObject(findUser);
    } catch (error) {
      this.handleError(error);
    }
  }

  async register(registerUserDto: RegisterUserDto): Promise<UserEntity> {
    const { name, lastName, phone, username, email, password } =
      registerUserDto;
    try {
      const findUser = await UserModel.findOne({
        $or: [{ username }, { email }],
      });
      if (findUser) {
        // throw CustomError.badRequest("(Username | Email) already exist");
        throw CustomError.badRequest("Invalid Credentials");
      }

      const user = await UserModel.create({
        name,
        lastName,
        phone,
        username,
        email,
        password: this.hashPassword(password),
      });

      await user.save();

      return UserMapper.UserEntityFromObject(user);
    } catch (error) {
      this.handleError(error);
    }
  }

  private handleError(error: any): never {
    if (error instanceof CustomError) {
      throw error;
    }
    throw CustomError.internalServer(error);
  }
}
