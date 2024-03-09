import { hashSync, compareSync } from "bcryptjs";

export class BcryptAdapter {
  static hash(password: string, salt: number = 10): string {
    return hashSync(password, salt);
  }

  static compare(password: string, hash: string): boolean {
    return compareSync(password, hash);
  }
}
