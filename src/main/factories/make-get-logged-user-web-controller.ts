import { GetLoggedUserWebController } from "@/presentation/controllers";
import { GetLoggedUser } from "@/use-cases/get-logged-user";
import type { SessionManager } from "@/use-cases/ports/session-manager";

async function makeGetLoggedUserWebController(sessionManager: SessionManager) {
	const useCase = new GetLoggedUser(sessionManager);
	const controller = new GetLoggedUserWebController(useCase);

	return controller;
}

export default makeGetLoggedUserWebController;
