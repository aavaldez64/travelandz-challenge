import { FindUserDto, UpdateUserDto } from "../dtos";
import { UserEntity } from "../entities";

export abstract class UsersRepositoryInterface {
  abstract find(findUserDto: FindUserDto): Promise<UserEntity[]>;
  abstract findOne(id: string): Promise<UserEntity>;
  abstract update(
    id: string,
    updateUserDto: UpdateUserDto,
  ): Promise<UserEntity>;
  abstract toggleActive(id: string): Promise<UserEntity>;
}
