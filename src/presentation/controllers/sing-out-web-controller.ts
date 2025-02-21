import type { UseCase } from "@/use-cases/ports";
import type {
	Controller,
	HttpRedirect,
	HttpResponse,
} from "@/presentation/ports";
import { internalServerError, redirect } from "@/shared";

class SignOutWebController
	implements Controller<void, HttpRedirect | HttpResponse>
{
	private readonly useCase: SignOutUseCase;

	public constructor(useCase: SignOutUseCase) {
		this.useCase = useCase;
	}

	public async execute(): Promise<HttpRedirect | HttpResponse> {
		try {
			await this.useCase.execute();

			return redirect("/");
		} catch (err) {
			return internalServerError();
		}
	}
}

type SignOutUseCase = UseCase<void, void>;

export default SignOutWebController;
