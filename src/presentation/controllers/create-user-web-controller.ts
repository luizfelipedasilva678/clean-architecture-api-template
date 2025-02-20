import type { CreateUserDTO, UseCase, CreatedUserDTO } from "@/use-cases/ports";
import BaseWebController from "@/presentation/controllers/base-web-controller";
import { badRequest, created, internalServerError, redirect } from "@/shared";
import type {
	Controller,
	HttpRedirect,
	HttpRequest,
	HttpResponse,
	SessionManager,
} from "@/presentation/ports";
import {
	InvalidInputError,
	type LoginExistsError,
} from "@/use-cases/create-user/errors";

class CreateUserWebController
	extends BaseWebController
	implements Controller<HttpRequest, HttpResponse | HttpRedirect>
{
	private readonly useCase: CreateUserUseCase;
	private readonly sessionManager: SessionManager;

	public constructor(
		useCase: CreateUserUseCase,
		sessionManager: SessionManager,
	) {
		super();
		this.useCase = useCase;
		this.sessionManager = sessionManager;
	}

	public async execute(
		request: HttpRequest,
	): Promise<HttpResponse | HttpRedirect> {
		try {
			if (this.sessionManager.get().authenticated) {
				return redirect("/");
			}

			const missingParams = this.getMissingParams(
				["login", "name", "password"],
				request.body,
			);

			if (missingParams.length > 0) {
				return badRequest({
					message: `Missing params: ${missingParams.join(", ")}`,
				});
			}

			const useCaseResponse = await this.useCase.execute({
				login: request.body.login,
				name: request.body.name,
				password: request.body.password,
			});

			if (useCaseResponse instanceof Error) {
				const isInvalidInputError =
					useCaseResponse instanceof InvalidInputError;

				return badRequest({
					message: useCaseResponse.message,
					...(isInvalidInputError ? { details: useCaseResponse.details } : {}),
				});
			}

			return created({
				id: useCaseResponse.id,
				name: useCaseResponse.name,
				login: useCaseResponse.login,
			});
		} catch (error) {
			return internalServerError();
		}
	}
}

type CreateUserUseCase = UseCase<
	CreateUserDTO,
	CreatedUserDTO | LoginExistsError | InvalidInputError
>;

export default CreateUserWebController;
