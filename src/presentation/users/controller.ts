import { Request, Response } from "express";
import { UserService } from "../services/user.service";
import { CreateUserDTO, CustomError } from "../../domain";
import { UpdateUserDTO } from "../../domain/dtos/user/update.dto";

export class UserController {
  constructor(private readonly userService: UserService) {}

  private handleError = (error: unknown, res: Response) => {
    if(error instanceof CustomError) {
      return res.status(error.statusCode).json({ message: error.message })
    }

    console.log(error);
    return res.status(500).json({ message: "Something went very wrong" })
  }

  createUser = async (req: Request, res: Response) => {
    const [error, createUserDTO] = CreateUserDTO.create(req.body);

    if (error) return res.status(422).json({ message: error });

    this.userService
      .createUser(createUserDTO!)
      .then((data) => {
        return res.status(201).json(data);
      })
      .catch((error: any) => this.handleError(error, res));
  };

  getAllUser = async (req: Request, res: Response) => {
    this.userService
      .showUsers()
      .then((data) => {
        return res.status(201).json(data);
      })
      .catch((error: any) => this.handleError(error, res));
  };

  getOneUser = async (req: Request, res: Response) => {
    const { id } = req.params;
    this.userService
      .showOneUser(id)
      .then((data: any) => {
        res.status(201).json(data);
      })
      .catch((error: any) => this.handleError(error, res));
  };

  editUser = async (req: Request, res: Response) => {
    const [error, updateUserDTO] = UpdateUserDTO.create(req.body);

    if (error) return res.status(422).json({ message: error });

    const { id } = req.params;

    this.userService
      .updateUser(id, updateUserDTO!)
      .then((data) => {
        return res.status(200).json(data);
      })
      .catch((error: any) => this.handleError(error, res));
  };

  deleteUser = async (req: Request, res: Response) => {
    const { id } = req.params;

    this.userService
      .deleteUser(id)
      .then(() => {
        res.status(204).json(null);
      })
      .catch((error: any) => this.handleError(error, res));
  };
}
