import { User } from "@/entities";
import type CreateUserInputValidator from "@/use-cases/ports/create-user-input-validator";
import {
  InvalidInputError,
  LoginExistsError,
} from "@/use-cases/create-user/errors";
import type {
  CreateUserDTO,
  Encoder,
  UseCase,
  UserDTO,
  UserRepository,
} from "@/use-cases/ports";

class CreateUser implements UseCase<CreateUserDTO, UserDTO> {
  private readonly userRepository: UserRepository;
  private readonly inputValidator: CreateUserInputValidator;
  private readonly encoder: Encoder;

  constructor(
    userRepository: UserRepository,
    inputValidator: CreateUserInputValidator,
    encoder: Encoder
  ) {
    this.inputValidator = inputValidator;
    this.userRepository = userRepository;
    this.encoder = encoder;
  }

  public async execute(
    input: CreateUserDTO
  ): Promise<UserDTO | LoginExistsError | InvalidInputError> {
    const validationResult = this.inputValidator.validate(input);

    if (validationResult.length > 0) {
      return new InvalidInputError(validationResult);
    }

    const password = await this.encoder.encode(input.password);
    const user = new User(0, input.name, input.login, password);
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
