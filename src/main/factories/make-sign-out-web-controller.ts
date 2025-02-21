import { SignOutWebController } from "@/presentation/controllers";
import type { SessionManager } from "@/use-cases/ports/session-manager";
import { SignOut } from "@/use-cases/sign-out";

async function makeSignOutWebService(sessionManager: SessionManager) {
	const useCase = new SignOut(sessionManager);
	const controller = new SignOutWebController(useCase);

	return controller;
}

export default makeSignOutWebService;
