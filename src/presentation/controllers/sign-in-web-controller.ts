import BaseWebController from "@/presentation/controllers/base-web-controller";
import { badRequest, ok, internalServerError, redirect } from "@/shared";
import type { SignDTO, SuccessfulSignInDTO, UseCase } from "@/use-cases/ports";
import {
	type IncorrectUserOrPasswordError,
	UserAlreadyLoggedError,
} from "@/use-cases/sign-in/errors";
import type {
	Controller,
	HttpRedirect,
	HttpRequest,
	HttpResponse,
} from "@/presentation/ports";

class SignInWebController
	extends BaseWebController
	implements Controller<HttpRequest, HttpResponse | HttpRedirect>
{
	private readonly useCase: SignInUseCase;

	constructor(useCase: SignInUseCase) {
		super();
		this.useCase = useCase;
	}

	public async execute(
		request: HttpRequest,
	): Promise<HttpResponse | HttpRedirect> {
		try {
			const missingParams = this.getMissingParams(
				["login", "password"],
				request.body,
			);

			if (missingParams.length > 0) {
				return badRequest({
					message: `Missing params: ${missingParams.join(", ")}`,
				});
			}

			const useCaseResponse = await this.useCase.execute({
				login: request.body.login,
				password: request.body.password,
			});

			if (useCaseResponse instanceof Error) {
				if (useCaseResponse instanceof UserAlreadyLoggedError) {
					return redirect("/");
				}

				return badRequest({
					message: useCaseResponse.message,
				});
			}

			return ok(useCaseResponse);
		} catch (error) {
			return internalServerError();
		}
	}
}

type SignInUseCase = UseCase<
	SignDTO,
	SuccessfulSignInDTO | IncorrectUserOrPasswordError | UserAlreadyLoggedError
>;

export default SignInWebController;
