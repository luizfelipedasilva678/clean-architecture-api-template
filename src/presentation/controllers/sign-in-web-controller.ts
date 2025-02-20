import BaseWebController from "@/presentation/controllers/base-web-controller";
import { badRequest, ok, internalServerError, redirect } from "@/shared";
import type { SignDTO, SuccessfulSignInDTO, UseCase } from "@/use-cases/ports";
import type { IncorrectUserOrPasswordError } from "@/use-cases/sign-in/errors";
import type {
	Controller,
	HttpRedirect,
	HttpRequest,
	HttpResponse,
	SessionManager,
} from "@/presentation/ports";

class SignInWebController
	extends BaseWebController
	implements Controller<HttpRequest, HttpResponse | HttpRedirect>
{
	private readonly useCase: SignInUseCase;
	private readonly sessionManager: SessionManager;

	constructor(useCase: SignInUseCase, sessionManager: SessionManager) {
		super();
		this.useCase = useCase;
		this.sessionManager = sessionManager;
	}

	public async execute(
		request: HttpRequest,
	): Promise<HttpResponse | HttpRedirect> {
		try {
			const session = this.sessionManager.get();

			if (session.authenticated) {
				return redirect("/");
			}

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
				return badRequest({
					message: useCaseResponse.message,
				});
			}

			this.sessionManager.create({
				authenticated: useCaseResponse.authenticated,
				user: {
					id: useCaseResponse.id,
					login: useCaseResponse.login,
				},
			});

			return ok(useCaseResponse);
		} catch (error) {
			return internalServerError();
		}
	}
}

type SignInUseCase = UseCase<
	SignDTO,
	SuccessfulSignInDTO | IncorrectUserOrPasswordError
>;

export default SignInWebController;
