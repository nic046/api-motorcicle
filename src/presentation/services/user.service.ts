import { Status, User } from "../../data";
import { CustomError } from "../../domain";

export class UserService {
  constructor() {}

  async showUsers() {
    try {
      return await User.find();
    } catch (error) {
      throw CustomError.internalServer("Error getting the user");
    }
  }
  async showOneUser(id: string) {
    const user = await User.findOne({
      where: {
        id,
        status: Status.AVAIBLE,
      },
    });
    if (!user) {
      throw CustomError.notFound("User not found");
    }
    return user;
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
      throw CustomError.internalServer("Error creating user");
    }
  }

  async updateUser(id: string, userData: any) {
    const user = await this.showOneUser(id);

    user.name = userData.name.toLowerCase().trim();
    user.email = userData.email.toLowerCase().trim();

    try {
      return await user.save();
    } catch (error) {
      throw CustomError.internalServer("Error updating user");
    }
  }

  async deleteUser(id: string) {
    const user = await this.showOneUser(id);

    console.log("delete", user);
    user.status = Status.DISABLED;

    try {
      return await user.save();
    } catch (error) {
      throw CustomError.internalServer("Error deleting post");
    }
  }
}
