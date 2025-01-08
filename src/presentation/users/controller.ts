import { Request, Response } from "express";
import { UserService } from "../services/user.service";
import { CreateUserDTO } from "../../domain";

interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  role: string;
  status: boolean;
}

export class UserController {
  constructor(private readonly userService: UserService) {}

  createUser = async (req: Request, res: Response) => {
    const [error, createUserDTO] = CreateUserDTO.create(req.body)

    if(error) return res.status(422).json({ message: error })

    this.userService
      .createUser(createUserDTO!)
      .then((data) => {
        return res.status(201).json(data);
      })
      .catch((error) => {
        return res.status(500).json({
          message: "Error creating post",
          error,
        });
      });
  };

  getAllUser = async (req: Request, res: Response) => {
    this.userService
      .showUsers()
      .then((data) => {
        return res.status(200).json(data);
      })
      .catch((error) => {
        return res.status(500).json({
          message: "Error finding all users",
          error,
        });
      });
  };

  getOneUser = async (req: Request, res: Response) => {
    const { id } = req.params;
    this.userService
      .showOneUser(id)
      .then((data: any) => {
        res.status(200).json(data);
      })
      .catch((error: any) => {
        res.status(500).json({
          message: "Error getting one user",
          error,
        });
      });
  };

  editUser = async (req: Request, res: Response) => {
    const [error, createUserDTO] = CreateUserDTO.create(req.body)

    if(error) return res.status(422).json({ message: error })

    const { id } = req.params;

    this.userService
      .updateUser(id, createUserDTO!)
      .then((data) => {
        return res.status(200).json(data);
      })
      .catch((error: any) => {
        res.status(500).json({
          message: "Error editing user",
          error,
        });
      });
  };

  deleteUser = async (req: Request, res: Response) => {
    const { id } = req.params;
    
    this.userService
    .deleteUser(id)
    .then(() => {
      res.status(204).json(null)
    })
    .catch((error: any) => {
      res.status(500).json({
        message: "Error getting one user",
        error,
      });
    });
  };
}
