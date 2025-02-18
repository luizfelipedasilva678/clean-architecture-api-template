import { User } from "@/entities";
import type CreateUserInputValidator from "@/use-cases/ports/create-user-input-validator";
import {
  InvalidInputError,
  LoginExistsError,
} from "@/use-cases/create-user/errors";
import type {
  CreateUserDTO,
  UseCase,
  UserDTO,
  UserRepository,
} from "@/use-cases/ports";

class CreateUser implements UseCase<CreateUserDTO, UserDTO> {
  private readonly userRepository: UserRepository;
  private readonly inputValidator: CreateUserInputValidator;

  constructor(
    userRepository: UserRepository,
    inputValidator: CreateUserInputValidator
  ) {
    this.inputValidator = inputValidator;
    this.userRepository = userRepository;
  }

  public async execute(
    input: CreateUserDTO
  ): Promise<UserDTO | LoginExistsError | InvalidInputError> {
    const validationResult = this.inputValidator.validate(input);

    if (validationResult.length > 0) {
      return new InvalidInputError(validationResult);
    }

    const user = new User(0, input.name, input.login, input.password);
    const found = await this.userRepository.findByLogin(user.getLogin());

    if (found) {
      return new LoginExistsError();
    }

    return this.userRepository.create({
      login: user.getLogin(),
      name: user.getName(),
      password: user.getPassword(),
    });
  }
}

export default CreateUser;
