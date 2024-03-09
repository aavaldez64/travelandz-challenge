import type { Request, Response } from "express";
import { RegisterUserDto } from "../../domain/dtos";
import { AuthRepositoryInterface } from "../../domain/repositories";
import { ResponseError } from "../custom-errors";
import { JwtAdapter } from "../../config/jwt.adapter";
import { LoginUserDto } from "../../domain/dtos/auth/login-user.dto";

export class AuthController {
  private handleError = ResponseError;

  constructor(private readonly authRepository: AuthRepositoryInterface) {}

  registerUser = async (req: Request, res: Response) => {
    const [error, registerUserDto] = RegisterUserDto.create(req.body);
    if (error !== null) return res.status(400).json({ message: error });

    try {
      const user = await this.authRepository.register(registerUserDto);
      const token = await this.generateUserToken(user.id);
      res.status(201).json({ user, token });
    } catch (error) {
      this.handleError(error, res);
    }
  };

  loginUser = async (req: Request, res: Response) => {
    const [error, loginUserDto] = LoginUserDto.create(req.body);
    if (error !== null) return res.status(400).json({ message: error });

    try {
      const user = await this.authRepository.login(loginUserDto);
      const token = await this.generateUserToken(user.id);
      res.status(201).json({ user, token });
    } catch (error) {
      this.handleError(error, res);
    }
  };

  private generateUserToken = (id: string) => {
    return JwtAdapter.generateToken({
      // username: user.username,
      // email: user.email,
      id: id,
    });
  };
}
