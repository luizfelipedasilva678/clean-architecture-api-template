import { IncorrectUserOrPasswordError } from "@/use-cases/sign-in/errors";
import { User } from "@/entities";
import type {
	UseCase,
	SignDTO,
	SuccessfulSignInDTO,
	UserRepository,
	Encoder,
} from "@/use-cases/ports";

class SignIn
	implements
		UseCase<SignDTO, SuccessfulSignInDTO | IncorrectUserOrPasswordError>
{
	private readonly userRepository: UserRepository;
	private readonly encoder: Encoder;

	constructor(userRepository: UserRepository, encoder: Encoder) {
		this.userRepository = userRepository;
		this.encoder = encoder;
	}

	public async execute(
		input: SignDTO,
	): Promise<SuccessfulSignInDTO | IncorrectUserOrPasswordError> {
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

		return {
			id: String(user.getId()),
			login: user.getLogin(),
			authenticated: true,
		};
	}
}

export default SignIn;
