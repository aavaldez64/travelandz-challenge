import type { Request, Response } from "express";
import { RegisterUserDto } from "../../domain/dtos";
import { AuthRepositoryInterface } from "../../domain/repositories";

export class AuthController {
  constructor(private readonly authRepository: AuthRepositoryInterface) {}

  registerUser = async (req: Request, res: Response) => {
    const [error, registerUserDto] = RegisterUserDto.create(req.body);
    if (error !== null) return res.status(400).json({ message: error });

    const user = await this.authRepository.register(registerUserDto);

    res.status(201).json({ data: user });
  };

  loginUser = async (req: Request, res: Response) => {
    res.status(200).json({ message: "User logged in" });
  };
}
