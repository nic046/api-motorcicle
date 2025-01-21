import { z } from "zod";

const createRepairSchema = z.object({
  date: z
    .string({ message: "Date is required" })
    .refine((val) => !isNaN(Date.parse(val)), {
      message: "Invalid date format",
    }),
  motors: z.string({ message: "Motors field is required" }).min(2, {
    message: "Motors field must have at least 2 characters",
  }),
  description: z
    .string({ message: "Description is required" })
    .min(1, { message: "Description cannot be empty" }),
  userId: z.string({ message: "UUID is required" }).uuid({
    message: "Invalid UUID format",
  }),
});

export class CreateRepairDTO {
  constructor(
    public readonly date: Date,
    public readonly userId: string,
    public readonly motorsNumber: string,
    public readonly description: string
  ) {}

  static create(object: { [key: string]: any }): [string?, CreateRepairDTO?] {
    const { date, userId, motorsNumber, description } = object;

    const result = createRepairSchema.safeParse(object);

    if (!result.success) {
      const errorMessages = result.error.issues.map((e) => e.message).join(" --- ");
      return [errorMessages];
    }

    return [
      undefined,
      new CreateRepairDTO(date, userId, motorsNumber, description),
    ];
  }
}
