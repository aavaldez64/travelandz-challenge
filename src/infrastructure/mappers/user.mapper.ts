import { UserEntity } from "../../domain/entities";
import { CustomError } from "../../domain/errors";

export class UserMapper {
  static UserEntityFromObject(props: Record<string, any>): UserEntity {
    // const { id, _id, username, email, password, isActive } = props;
    const { id, _id, name, lastName, phone, username, email, isActive, role } =
      props;

    if (!id && !_id) {
      throw CustomError.badRequest("Missing id");
    }
    if (!name) {
      throw CustomError.badRequest("Missing name");
    }
    if (!lastName) {
      throw CustomError.badRequest("Missing lastName");
    }
    if (!phone) {
      throw CustomError.badRequest("Missing phone");
    }
    if (!username) {
      throw CustomError.badRequest("Missing username");
    }
    if (!email) {
      throw CustomError.badRequest("Missing email");
    }
    // if (!password) {
    //   throw CustomError.badRequest("Missing password");
    // }
    // return new UserEntity(id || _id, username, email, password, isActive);
    return new UserEntity(
      id || _id,
      name,
      lastName,
      phone,
      username,
      email,
      role,
      isActive,
    );
  }
}
