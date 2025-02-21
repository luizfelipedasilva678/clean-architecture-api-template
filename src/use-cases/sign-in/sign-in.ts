import {
	IncorrectUserOrPasswordError,
	UserAlreadyLoggedError,
} from "@/use-cases/sign-in/errors";
import { User } from "@/entities";
import type {
	UseCase,
	SignDTO,
	UserRepository,
	Encoder,
	SessionManager,
	SuccessfulSignInDTO,
} from "@/use-cases/ports";

class SignIn
	implements
		UseCase<
			SignDTO,
			| SuccessfulSignInDTO
			| IncorrectUserOrPasswordError
			| UserAlreadyLoggedError
		>
{
	private readonly userRepository: UserRepository;
	private readonly encoder: Encoder;
	private readonly sessionManager: SessionManager;

	constructor(
		userRepository: UserRepository,
		encoder: Encoder,
		sessionManager: SessionManager,
	) {
		this.userRepository = userRepository;
		this.encoder = encoder;
		this.sessionManager = sessionManager;
	}

	public async execute(
		input: SignDTO,
	): Promise<
		SuccessfulSignInDTO | IncorrectUserOrPasswordError | UserAlreadyLoggedError
	> {
		if (this.sessionManager.get().authenticated) {
			return new UserAlreadyLoggedError();
		}

		const userFound = await this.userRepository.findByLogin(input.login);

		if (!userFound) {
			return new IncorrectUserOrPasswordError();
		}

		const user = new User(
			userFound.id,
			userFound.name,
			userFound.login,
			userFound.password,
		);

		const isPasswordCorrect = await this.encoder.compare(
			input.password,
			user.getPassword(),
		);

		if (!isPasswordCorrect) {
			return new IncorrectUserOrPasswordError();
		}

		this.sessionManager.create({
			authenticated: true,
			user: {
				id: user.getId().toString(),
				login: user.getLogin(),
			},
		});

		return {
			id: user.getId().toString(),
			login: user.getLogin(),
			authenticated: true,
		};
	}
}

export default SignIn;
