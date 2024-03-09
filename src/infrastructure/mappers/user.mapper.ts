import { UserEntity } from "../../domain/entities";
import { CustomError } from "../../domain/errors";

export class UserMapper {
  static UserEntityFromObject(props: Record<string, any>): UserEntity {
    const { id, _id, username, email, password } = props;

    if (!id && !_id) {
      throw CustomError.badRequest("Missing id");
    }
    if (!username) {
      throw CustomError.badRequest("Missing username");
    }
    if (!email) {
      throw CustomError.badRequest("Missing email");
    }
    if (!password) {
      throw CustomError.badRequest("Missing password");
    }
    return new UserEntity(id || _id, username, email, password);
  }
}
