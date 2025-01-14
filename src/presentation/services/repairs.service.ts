import { Repair, RepairStatus } from "../../data";
import { CustomError } from "../../domain";

export class RepairService {
  constructor() {}

  async showRepairs() {
    try {
      return await Repair.find();
    } catch (error) {
      throw CustomError.internalServer("Error getting the repair")
    }
  }
  async showOneRepair(id: string) {
    const repair = await Repair.findOne({
      where: {
        id,
        status: RepairStatus.PENDING,
      },
    });

    if (!repair) {
      throw CustomError.notFound("Repair not found")
    }
    return repair;
  }

  async createRepair(repairData: any) {
    const repair = new Repair();

    repair.date = repairData.date;
    repair.status = repairData.status;

    try {
      return await repair.save();
    } catch (error) {
      console.log(error);
      throw CustomError.internalServer("Error creating Repair")
    }
  }

  async updateRepair(id: string, repairData: any) {
    const repair = await this.showOneRepair(id);

    repair.date = repairData.date.toLowerCase().trim();

    try {
      return await repair.save();
    } catch (error) {
      throw CustomError.internalServer("Error updating Repair");
    }
  }

  async deleteRepair(id: string) {
    const repair = await this.showOneRepair(id);

    repair.status = RepairStatus.PENDING;

    try {
      return await repair.save();
    } catch (error) {
      throw CustomError.internalServer("Error deleting Repair");
    }
  }
}
