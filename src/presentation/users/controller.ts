import type { Request, Response } from "express";
import { FindUserDto, RegisterUserDto, UpdateUserDto } from "../../domain/dtos";
import {
  AuthRepositoryInterface,
  UsersRepositoryInterface,
} from "../../domain/repositories";
import { ResponseError } from "../custom-errors";
import { JwtAdapter } from "../../config/jwt.adapter";
import { LoginUserDto } from "../../domain/dtos/auth/login-user.dto";

export class UsersController {
  private handleError = ResponseError;

  constructor(private readonly usersRepository: UsersRepositoryInterface) {}

  find = async (req: Request, res: Response) => {
    const [error, findUserDto] = FindUserDto.create(req.body);
    if (error !== null) return res.status(400).json({ message: error });

    try {
      const users = await this.usersRepository.find(findUserDto);
      res.status(201).json({ data: users });
    } catch (error) {
      this.handleError(error, res);
    }
  };
  findOne = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
      const user = await this.usersRepository.findOne(id);
      res.status(201).json(user);
    } catch (error) {
      this.handleError(error, res);
    }
  };
  update = async (req: Request, res: Response) => {
    const { id } = req.params;
    const [error, updateUserDto] = UpdateUserDto.create(req.body);
    if (error !== null) return res.status(400).json({ message: error });

    try {
      const user = await this.usersRepository.update(id, updateUserDto);
      res.status(201).json({ data: user });
    } catch (error) {
      this.handleError(error, res);
    }
  };
  toggleActive = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
      const user = await this.usersRepository.toggleActive(id);
      res.status(201).json({ data: user });
    } catch (error) {
      this.handleError(error, res);
    }
  };

  private handleMissingParam() {}
}
