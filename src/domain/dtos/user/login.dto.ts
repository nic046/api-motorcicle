import { regularExp } from "../../../config";
import { Role } from "../../../data";

export class LoginUserDTO {
  constructor(
    public readonly email: string,
    public readonly password: string,
  ) {}

  static create(object: { [key: string]: any }): [string?, LoginUserDTO?] {
    const { email, password} = object;

    if (!email) return ["Missing email"];
    if (email.length <= 4) return ["Email must have at least 4 words"];

    if (!regularExp.email.test(email)) return ["Invalid email format"];

    if (!password) return ["Missing password"];
    if (password.length <= 8) return ["Password must have at least 8 words"];

    if (!regularExp.password.test(password))
      return ["Password must contain at least one special character"];


    return [undefined, new LoginUserDTO(email, password)];
  }
}
