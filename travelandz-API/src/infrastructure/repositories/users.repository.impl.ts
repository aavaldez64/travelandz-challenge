import { UsersDatasourceInterface } from "../../domain/datasources/users.datasource";
import { FindUserDto, UpdateUserDto } from "../../domain/dtos";
import { UserEntity } from "../../domain/entities";
import { UsersRepositoryInterface } from "../../domain/repositories";

export class UsersRepository implements UsersRepositoryInterface {
  constructor(private readonly datasource: UsersDatasourceInterface) {}
  find(findUserDto: FindUserDto): Promise<UserEntity[]> {
    return this.datasource.find(findUserDto);
  }
  findOne(id: string): Promise<UserEntity> {
    return this.datasource.findOne(id);
  }
  update(id: string, updateUserDto: UpdateUserDto): Promise<UserEntity> {
    return this.datasource.update(id, updateUserDto);
  }
  toggleActive(id: string): Promise<UserEntity> {
    return this.datasource.toggleActive(id);
  }
}
