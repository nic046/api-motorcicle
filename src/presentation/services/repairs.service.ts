export class RepairService {
    constructor(){}

    async showRepairs() {
        return {
            message: "Showing Repairs"
        }
    }
    async showOneRepair(id: number) {
        return{
            message: `Showing one Repair ${id}`
        }
    }
    async createRepair(Repair: string) {
        return{
            message: `Create Repair ${Repair}`
        }
    }
    async updateRepair(id: number, Repair:string) {
        return {
            message: `Update Repair with id: ${id} data ${Repair}`
        }
    }
    async deleteRepair(id: number){
        return{
            message: `Delete user with id ${id}`
        }
    }
}