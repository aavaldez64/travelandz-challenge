import { type UserInterface, UserModel } from "../../data/mongodb";
import { UsersDatasourceInterface } from "../../domain/datasources/users.datasource";
import { FindUserDto, UpdateUserDto } from "../../domain/dtos";
import { UserEntity } from "../../domain/entities";
import { CustomError } from "../../domain/errors";
import { UserMapper } from "../mappers/user.mapper";
import type { HashFunction } from "../interfaces";

export class UsersDatasource implements UsersDatasourceInterface {
  constructor(private readonly hashPassword: HashFunction) {}
  private async findById(id: string): Promise<UserInterface> {
    try {
      const user = await UserModel.findById(id);
      if (!user) {
        throw CustomError.notFound("User not found");
      }
      return user;
    } catch (error: any) {
      if (error instanceof CustomError) {
        throw error;
      }
      if (error.kind === "ObjectId") {
        throw CustomError.badRequest("Invalid id");
      }
      throw CustomError.internalServer(error);
    }
  }

  async find(findUserDto: FindUserDto): Promise<UserEntity[]> {
    const users = await UserModel.find(
      { isActive: true },
      {},
      { limit: findUserDto.limit, skip: findUserDto.skip },
    );
    return users.map(user => UserMapper.UserEntityFromObject(user));
  }
  async findOne(id: string): Promise<UserEntity> {
    const user = await this.findById(id);
    return UserMapper.UserEntityFromObject(user);
  }
  async update(id: string, updateUserDto: UpdateUserDto): Promise<UserEntity> {
    const user = await this.findById(id);
    const { email, password, username } = updateUserDto;
    if (email) user.email = email;
    if (username) user.username = username;
    if (password) {
      const newPassword = this.hashPassword(password);
      user.password = newPassword;
    }
    await user.save();
    return UserMapper.UserEntityFromObject(user);
  }
  async toggleActive(id: string): Promise<UserEntity> {
    const user = await this.findById(id);
    user.isActive = !user.isActive;
    await user.save();
    return UserMapper.UserEntityFromObject(user);
  }
}
