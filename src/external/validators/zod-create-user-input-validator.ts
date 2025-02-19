import type { CreateUserDTO } from "@/use-cases/ports";
import type CreateUserInputValidator from "@/use-cases/ports/create-user-input-validator";
import { z } from "zod";

class ZodCreateUserInputValidator implements CreateUserInputValidator {
  public validate(input: CreateUserDTO): string[] {
    const schema = z.object({
      name: z
        .string({
          message: "Name must be a string",
        })
        .min(3, "Name must be at least 3 characters long")
        .regex(/^[A-Za-z\s]+$/, "Name must contain only letters"),
      login: z
        .string({
          message: "Login must be a string",
        })
        .min(3, {
          message: "Login must be at least 3 characters long",
        })
        .regex(/^[A-Za-z0-9]+$/, "Login must contain only letters and numbers"),
      password: z
        .string({
          message: "Password must be a string",
        })
        .min(8, {
          message: "Password must be at least 8 characters long",
        })
        .regex(
          /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
          "Password must contain at least one letter, one number and one special character"
        ),
    });

    const result = schema.safeParse(input);

    if (result.success) return [];

    return result.error.errors.map((error) => error.message);
  }
}

export default ZodCreateUserInputValidator;
