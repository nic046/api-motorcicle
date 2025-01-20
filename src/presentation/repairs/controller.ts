import { Request, Response } from "express";
import { RepairService } from "../services/repairs.service";
import { CustomError, CreateRepairDTO } from "../../domain";

export class RepairController {
  constructor(private readonly repairService: RepairService) {}

  private handleError = (error: unknown, res: Response) => {
    if (error instanceof CustomError) {
      return res.status(error.statusCode).json({ message: error.message });
    }

    console.log(error);
    return res.status(500).json({ message: "Something went very wrong" });
  };

  createRepair = async (req: Request, res: Response) => {
    const [error, createRepairDTO] = CreateRepairDTO.create(req.body);

    if (error) return res.status(422).json({ message: error });

    this.repairService
      .createRepair(createRepairDTO!)
      .then((data) => {
        return res.status(201).json(data);
      })
      .catch((error: any) => this.handleError(error, res));
  };

  getAllRepairs = async (req: Request, res: Response) => {
    this.repairService
      .showRepairs()
      .then((data) => {
        return res.status(201).json(data);
      })
      .catch((error: any) => this.handleError(error, res));
  };

  getOneRepair = async (req: Request, res: Response) => {
    const { id } = req.params;
    this.repairService
      .showOneRepair(id)
      .then((data: any) => {
        res.status(200).json(data);
      })
      .catch((error: any) => this.handleError(error, res));
  };

  editRepair = async (req: Request, res: Response) => {
    const { id } = req.params;

    this.repairService
      .updateRepair(id)
      .then((data: any) => {
        return res.status(200).json(data);
      })
      .catch((error: any) => this.handleError(error, res));
  };

  deleteRepair = async (req: Request, res: Response) => {
    const { id } = req.params;

    this.repairService
      .deleteRepair(id)
      .then((data: any) => {
        return res.status(204).json(data);
      })
      .catch((error: any) => this.handleError(error, res));
  };
}
