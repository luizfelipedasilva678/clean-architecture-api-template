import type { CreateUserDTO } from "@/use-cases/ports";
import type CreateUserInputValidator from "@/use-cases/ports/create-user-input-validator";

class Validator implements CreateUserInputValidator {
  public isValid(input: CreateUserDTO): boolean {
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

      if (nameIsValid && loginIsValid && passwordIsValid) return true;
    }

    return false;
  }
}

export default Validator;
