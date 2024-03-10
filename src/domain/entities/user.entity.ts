export enum Roles {
  user = "USER",
  admin = "ADMIN",
}
export class UserEntity {
  constructor(
    public id: string,
    public username: string,
    public email: string,
    public role: Roles,
    // public password: string,
    public isActive: boolean,
  ) {}
}
