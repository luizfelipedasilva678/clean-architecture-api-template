import { BcryptJsEncoder } from "@/external/encoder";
import { MySqlHelper } from "@/external/helpers";
import { InMariaDBRepository } from "@/external/repositories";
import { SignInWebController } from "@/presentation/controllers";
import type { SessionManager } from "@/use-cases/ports/session-manager";
import { SignIn } from "@/use-cases/sign-in";

async function makeSignInWebController(sessionManager: SessionManager) {
	const encoder = new BcryptJsEncoder();
	const repository = new InMariaDBRepository(await MySqlHelper.getConnection());
	const useCase = new SignIn(repository, encoder, sessionManager);
	const controller = new SignInWebController(useCase);

	return controller;
}

export default makeSignInWebController;
