import { User } from "../../data";

export class UserService {
  constructor() {}

  async showUsers() {
    try {
      return await User.find();
    } catch (error) {
      throw new Error("Error getting users");
    }
  }
  async showOneUser(id: string) {
    const user = await User.findOne({
      where: {
        id,
        status: true,
      },
    });
    
    if(!user){
        throw new Error("User not found");
    }
    return user
  }

  async createUser(userData: any) {
    const user = new User();

    user.name = userData.name;
    user.email = userData.email;
    user.password = userData.password;
    user.role = userData.role;
    user.status = userData.status;

    try {
      return await user.save();
    } catch (error) {
      throw new Error(`Error creating user: ${error}`);
    }
  }

  async updateUser(id: string, userData: any) {
    const user = await this.showOneUser(id)

    user.name = userData.name.toLowerCase().trim()
    user.email = userData.email.toLowerCase().trim()
    user.password = userData.password.toLowerCase().trim()

    try {
        return await user.save()
    } catch (error) {
        throw new Error("Error updating user")
    }
  }

  async deleteUser(id: string) {
    const user = await this.showOneUser(id)

    user.status = false

   try {
    user.save()
   } catch (error) {
    throw new Error("Error deleting user")
   }
  }
}
