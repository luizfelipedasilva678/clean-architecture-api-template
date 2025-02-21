import type { Controller, HttpResponse } from "@/presentation/ports";
import { internalServerError, ok } from "@/shared";
import type { LoggedUserDTO, UseCase } from "@/use-cases/ports";

class GetLoggedUserWebController implements Controller<void, HttpResponse> {
	private readonly useCase: GetLoggedUserUseCase;

	public constructor(useCase: GetLoggedUserUseCase) {
		this.useCase = useCase;
	}

	public async execute(): Promise<HttpResponse> {
		try {
			return ok(await this.useCase.execute());
		} catch (err) {
			return internalServerError();
		}
	}
}

type GetLoggedUserUseCase = UseCase<void, LoggedUserDTO>;

export default GetLoggedUserWebController;
