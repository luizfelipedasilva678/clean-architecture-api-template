import { User } from "@/entities";
import type CreateUserInputValidator from "@/use-cases/ports/create-user-input-validator";
import {
	InvalidInputError,
	LoginExistsError,
	UserAlreadyLoggedError,
} from "@/use-cases/create-user/errors";
import type {
	CreateUserDTO,
	Encoder,
	UseCase,
	CreatedUserDTO,
	UserRepository,
	SessionManager,
} from "@/use-cases/ports";

class CreateUser
	implements
		UseCase<
			CreateUserDTO,
			| CreatedUserDTO
			| LoginExistsError
			| InvalidInputError
			| UserAlreadyLoggedError
		>
{
	private readonly userRepository: UserRepository;
	private readonly inputValidator: CreateUserInputValidator;
	private readonly encoder: Encoder;
	private readonly sessionManager: SessionManager;

	constructor(
		userRepository: UserRepository,
		inputValidator: CreateUserInputValidator,
		encoder: Encoder,
		sessionManager: SessionManager,
	) {
		this.inputValidator = inputValidator;
		this.userRepository = userRepository;
		this.encoder = encoder;
		this.sessionManager = sessionManager;
	}

	public async execute(
		input: CreateUserDTO,
	): Promise<
		| CreatedUserDTO
		| LoginExistsError
		| InvalidInputError
		| UserAlreadyLoggedError
	> {
		if (this.sessionManager.get().authenticated) {
			return new UserAlreadyLoggedError();
		}

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
