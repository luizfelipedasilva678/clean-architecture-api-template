import type { CreateUserDTO } from "@/use-cases/ports";
import type CreateUserInputValidator from "@/use-cases/ports/create-user-input-validator";

class Validator implements CreateUserInputValidator {
  private readonly errors: string[] = [];

  public validate(input: CreateUserDTO): string[] {
    if ("name" in input && "login" in input && "password" in input) {
      const nameIsValid =
        typeof input.name === "string" && input.name.length >= 3;
      const loginIsValid =
        typeof input.login === "string" &&
        input.login.length >= 3 &&
        input.login.match(/^[A-Za-z0-9]+$/);
      const passwordIsValid =
        typeof input.password === "string" &&
        input.password.length >= 8 &&
        input.password.match(
          /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/
        );

      if (!nameIsValid) {
        this.errors.push("Name must be at least 3 characters long");
      }

      if (!loginIsValid) {
        this.errors.push("Login must be at least 3 characters long");
      }

      if (!passwordIsValid) {
        this.errors.push(
          "Password must be at least 8 characters long and contain at least one letter, one number and one special character"
        );
      }
    }

    return this.errors;
  }
}

export default Validator;
