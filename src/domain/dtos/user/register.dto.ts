import { regularExp } from "../../../config";
import { Role } from "../../../data";
import { z } from "zod";

const registerUserSchema = z.object({
  name: z
    .string({ required_error: "Name is required" })
    .min(3, { message: "Name must have at least 3 characters" }),
  email: z
    .string({ required_error: "Email is required" })
    .min(4, { message: "Email must have at least 4 characters" })
    .regex(regularExp.email, { message: "Invalid email format" }),
  password: z
    .string({ required_error: "Password is required" })
    .min(8, { message: "Password must have at least 8 characters" })
    .regex(regularExp.password, {
      message: "Password must contain at least one special character",
    }),
  role: z
    .string({ required_error: "Role is required" })
    .refine(
      (role) => role === Role.CLIENT || role === Role.EMPLOYEE,
      { message: "Role must be 'CLIENT' or 'EMPLOYEE'" }
    ),
});

export class RegisterUserDTO {
  constructor(
    public readonly name: string,
    public readonly email: string,
    public readonly password: string,
    public readonly role: string
  ) {}

  static create(object: { [key: string]: any }): [string?, RegisterUserDTO?] {
    const { name, email, password, role } = object;

    const result = registerUserSchema.safeParse(object);

    if (!result.success) {
      const errorMessages = result.error.issues.map((e) => e.message).join(" --- ");
      return [errorMessages];
    }

    return [undefined, new RegisterUserDTO(name, email, password, role)];
  }
}
