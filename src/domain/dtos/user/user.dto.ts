import { Role } from "../../../data";

export class CreateUserDTO {
    constructor(
        public readonly name: string,
        public readonly email: string,
        public readonly password: string,
        public readonly role: string
    ){}

    static create(object: { [key: string]: any }) :[string?, CreateUserDTO?] {

        const { name, email, password, role } = object;

        if(!name) return ["Missing name"];
        if(name.length <= 3) return ["Name must have at least 3 words"]
        if(!email) return ["Missing email"];
        if(email.length <= 4) return ["Email must have at least 4 words"]

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) return ["Invalid email format"];

        if(!password) return ["Missing password"];
        if(password.length <= 8) return ["Password must have at least 8 words"]

        const specialCharRegex = /[!@#$%^&*(),.?":{}|<>]/;
        if (!specialCharRegex.test(password)) return ["Password must contain at least one special character"];
        
        if(!role) return ["Missing role"];
        if (role !== Role.CLIENT && role !== Role.EMPLOYEE) return ["Role must be 'CLIENT' or 'EMPLOYEE'"];

        return [undefined, new CreateUserDTO(name, email, password, role)]
    }
}