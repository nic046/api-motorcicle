import { Role } from "../../../data";

export class UpdateUserDTO {
    constructor(
        public readonly name: string,
        public readonly email: string,
    ){}

    static create(object: { [key: string]: any }) :[string?, UpdateUserDTO?] {

        const { name, email } = object;

        if(!name) return ["Missing name"];
        if(name.length <= 3) return ["Name must have at least 3 words"]
        if(!email) return ["Missing email"];
        if(email.length <= 4) return ["Email must have at least 4 words"]

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) return ["Invalid email format"];

        return [undefined, new UpdateUserDTO(name, email)]
    }
}