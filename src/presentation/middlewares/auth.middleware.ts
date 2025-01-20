import { NextFunction, Request, Response } from "express";
import { JwtAdapter } from "../../config/jwt.adapter";
import { Status, User, Role } from "../../data";

export class AuthMiddleware {

  static async protect(req: Request, res: Response, next: NextFunction) {
    const authorization = req.header("authorization");

    if (!authorization)
      return res.status(401).json({ message: "No token provided" });

    if (!authorization.startsWith("Bearer "))
      return res.status(401).json({ message: "Invalid token" });

    const token = authorization.split(" ").at(1) || "";

    try {
      const payload = (await JwtAdapter.validateToken(token)) as { id: string };
      if (!payload) return res.status(401).json({ message: "Invalid token" });

      const user = await User.findOne({
        where: {
          id: payload.id,
          status: Status.AVAIBLE,
        },
      });
      if (!user) return res.status(401).json({ message: "Invalid user" });

      req.body.sessionBody = user;
      next();
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }

  static restricTo = (...roles: Role[]) => {
    return (req: Request, res: Response, next: NextFunction) => {

      if (!roles.includes(req.body.sessionBody.role))
        return res
          .status(403)
          .json({ message: "You are not authorizated to access this route, only emplees are authorize" });
        
      next();
    };
  };
}