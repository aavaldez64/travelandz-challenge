import { NextFunction, Request, Response } from "express";
import { JwtAdapter } from "../../config/jwt.adapter";
import { UserModel } from "../../data/mongodb";
import { Roles } from "../../domain/entities";

export class AuthMiddleware {
  static ValidateJWT =
    (...roles: Roles[]) =>
    async (req: Request, res: Response, next: NextFunction) => {
      const authorization = req.header("Authorization");
      if (!authorization)
        return res.status(401).json({ message: "Unable to authenticate" });
      if (!authorization.startsWith("Bearer "))
        return res.status(401).json({ message: "Invalid Bearer token" });

      const token = authorization.split(" ").at(1) || "";

      try {
        const payload = await JwtAdapter.verifyToken(token);
        if (!payload) {
          return res.status(401).json({ message: "Invalid token" });
        }
        // req.body.token = token;
        const user = await UserModel.findById(payload.id);
        if (!user) {
          return res
            .status(500)
            .json({ message: "Invalid Token by internal server error" });
        }
        if (!user.isActive) {
          return res.status(401).json({ message: "Unauthorized" });
        }
        if (roles && roles.length > 0 && !roles.includes(user.role)) {
          return res.status(401).json({ message: "Unauthorized" });
        }

        // req.user = user;
        next();
      } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error" });
      }
    };
}
