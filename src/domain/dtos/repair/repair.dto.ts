import { regularExp } from "../../../config";

export class CreateRepairDTO {
  constructor(
    public readonly date: Date,
    public readonly userId: string,
    public readonly motorsNumber: string,
    public readonly description: string
) {}

  static create(object: { [key: string]: any }): [string?, CreateRepairDTO?] {
    const { date, userId, motorsNumber, description } = object;

    if (new Date(date) > new Date()) return ["Date cannot be in the future"];
    if (!userId) return ["Missing user Id"]
    if(!regularExp.uuid.test(userId)) return ["Uuid need to have a proper format"]
    if(!motorsNumber) return ["Missing motor number"]
    //TODO: Add a  control of bad words in description
    if(!description) return ["Missing description"]

    return [undefined, new CreateRepairDTO(date, userId, motorsNumber, description)];
  }
}
