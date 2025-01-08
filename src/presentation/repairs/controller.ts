import { Request, Response } from "express";

interface Repair {
  id: number;
  date: Date;
  status: boolean;
}

const repairs: Repair[] = [];
let repairId = 1;

export class RepairController {
  constructor() {}

  createRepair = async (req: Request, res: Response) => {
    const { date, status } = req.body;

    if (!date) {
      return res.status(400).json({ message: "Date is require" });
    }
    if (!status) {
      return res.status(400).json({ message: "Status is require" });
    }
    const newRepair: Repair = {
      id: repairId++,
      date,
      status,
    };

    repairs.push(newRepair);
    return res.status(201).json({
      message: "Repair has been created",
      newRepair,
    });
  };

  getAllRepairs = async (req: Request, res: Response) => {
    return res.status(201).json({
      repairs,
    });
  };
  getOneRepair = async (req: Request, res: Response) => {
    const { id } = req.params;
    const repairId = +id;

    const repair = repairs.find((r) => r.id === repairId);
    if (!repair) {
      return res
        .status(400)
        .json({ message: `Repair not found with id ${repairId}` });
    }

    return res.status(201).json({
      repair,
    });
  };

  editRepair = async (req: Request, res: Response) => {
    const { id } = req.params;
    const repairId = +id;
    const index = repairs.findIndex((r) => r.id === repairId);

    if (index === -1) {
      return res
        .status(400)
        .json({ message: `Repair not found with id ${repairId}` });
    }

    const { date, status } = req.body;

    repairs[index] = {
      id: repairId,
      date,
      status,
    };
    return res.status(200).json({
      message: "Repair has been edit",
    });
  };

  deleteRepair = async (req: Request, res: Response) => {
    const { id } = req.params;
    const repairId = +id;
    const index = repairs.findIndex((r) => r.id === repairId);

    if (index === -1) {
      return res
        .status(400)
        .json({ message: `Repair not found with id ${repairId}` });
    }

    repairs.splice(index, 1)
    return res.status(200).json({
      message: "Repair has been deleted",
    });
  }
}
