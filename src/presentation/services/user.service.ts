import { encriptAdapter, JwtAdapter } from "../../config";
import { Status, User } from "../../data";
import { CustomError, LoginUserDTO } from "../../domain";
import { EmailService } from "./email.service";

export class UserService {
  constructor(private readonly emailService: EmailService) {}

  async showUsers() {
    try {
      return await User.find({
        relations: ["repairs"],
        select: {
          id: true,
          name: true,
          email: true,
          role: true,
          status: true,
          repairs: {
            date: true,
            motorsNumber: true,
            description: true,
          },
        },
      });
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
      relations: ["repairs"],
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        status: true,
        repairs: {
          date: true,
          motorsNumber: true,
          description: true,
        },
      },
    });
    if (!user) {
      throw CustomError.notFound("User not found");
    }
    return user;
  }

  async register(userData: any) {
    const user = new User();

    user.name = userData.name;
    user.email = userData.email;
    user.password = userData.password;
    user.role = userData.role;
    user.status = userData.status;

    try {
      const dbUser = await user.save();

      return {
        id: dbUser.id,
        email: dbUser.email,
        role: dbUser.role,
        status: dbUser.status,
      };
    } catch (error: any) {
      if (error.code === "23505") {
        throw CustomError.badRequest(
          `User with ${userData.email} already exist`
        );
      }
      throw CustomError.internalServer("Error creating user");
    }
  }

  async login(credentials: LoginUserDTO) {
    const user = await this.findUserByEmail(credentials.email);

    const isMatching = encriptAdapter.compare(
      credentials.password,
      user.password
    );

    if (!isMatching) throw CustomError.unAuthorized("Invalid Credentials");

    const token = await JwtAdapter.generateToken({ id: user.id });

    return {
      token: token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    };
  }

  validateEmail = async (token: string) => {
    const payload = await JwtAdapter.validateToken(token);
    if (!payload) throw CustomError.badRequest("Invalid Token");

    const { email } = payload as { email: string };
    if (!email) throw CustomError.internalServer("Email not in token");

    const user = await User.findOne({ where: { email } });
    if (!user) throw CustomError.internalServer("Email not exist");

    user.status = Status.AVAIBLE;

    try {
      await user.save();
      return {
        message: "Usuario creado",
      };
    } catch (error) {
      throw CustomError.internalServer("Error activating account");
    }
  };

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

  async findUserByEmail(email: string) {
    const user = await User.findOne({
      where: {
        email,
        status: Status.AVAIBLE,
      },
    });

    if (!user)
      throw CustomError.notFound(`User with email: ${email} not found`);

    return user;
  }
}
