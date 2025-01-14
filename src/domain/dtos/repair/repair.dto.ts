export class CreateRepairDTO {
  constructor(public readonly date: Date) {}

  static create(object: { [key: string]: any }): [string?, CreateRepairDTO?] {
    const { date } = object;

    if (new Date(date) > new Date()) return ["Date cannot be in the future"];

    return [undefined, new CreateRepairDTO(date)];
  }
}
