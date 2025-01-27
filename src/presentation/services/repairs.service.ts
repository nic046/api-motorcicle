import { Repair, RepairStatus } from "../../data";
import { CreateRepairDTO, CustomError } from "../../domain";
import { UserService } from "./user.service";

export class RepairService {
  constructor(public readonly userService: UserService) {}

  async showRepairs() {
    try {
      return await Repair.find({
        relations: ["user"],
        select: {
          user: {
            name: true,
            email: true,
            role: true,
            status: true,
          },
        },
      });
    } catch (error) {
      throw CustomError.internalServer("Error getting the repair");
    }
  }
  async showOneRepair(id: string) {
    const repair = await Repair.findOne({
      where: {
        id,
        status: RepairStatus.PENDING,
      },
      relations: ["user"],
      select: {
        user: {
          name: true,
          email: true,
          role: true,
          status: true,
        },
      },
    });

    if (!repair) {
      throw CustomError.notFound("Repair not found");
    }
    return repair;
  }

  async createRepair(repairData: CreateRepairDTO) {
    const repair = new Repair();
    const user = await this.userService.showOneUser(repairData.userId);

    repair.date = repairData.date;
    repair.motorsNumber = repairData.motorsNumber;
    repair.description = repairData.description;
    repair.userId = repairData.userId;

    repair.user = user;

    try {
      return await repair.save();
    } catch (error) {
      console.log(error);
      throw CustomError.internalServer("Error creating Repair");
    }
  }

  async updateRepair(id: string) {
    const repair = await this.showOneRepair(id);

    repair.status = RepairStatus.COMPLETED;

    try {
      return await repair.save();
    } catch (error) {
      throw CustomError.internalServer("Error updating Repair");
    }
  }

  async deleteRepair(id: string) {
    const repair = await this.showOneRepair(id);

    repair.status = RepairStatus.CANCELLED;

    try {
      return await repair.save();
    } catch (error) {
      throw CustomError.internalServer("Error deleting Repair");
    }
  }
}
