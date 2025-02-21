import { BcryptJsEncoder } from "@/external/encoder";
import { MySqlHelper } from "@/external/helpers";
import { InMariaDBRepository } from "@/external/repositories";
import { ZodCreateUserInputValidator } from "@/external/validators";
import { CreateUserWebController } from "@/presentation/controllers";
import type { SessionManager } from "@/use-cases/ports/session-manager";
import { CreateUser } from "@/use-cases/create-user";

async function makeCreateUserWebController(sessionManager: SessionManager) {
	const encoder = new BcryptJsEncoder();
	const validator = new ZodCreateUserInputValidator();
	const repository = new InMariaDBRepository(await MySqlHelper.getConnection());
	const useCase = new CreateUser(
		repository,
		validator,
		encoder,
		sessionManager,
	);
	const controller = new CreateUserWebController(useCase);

	return controller;
}

export default makeCreateUserWebController;
