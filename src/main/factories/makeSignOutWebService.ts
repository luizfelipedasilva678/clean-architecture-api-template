import { SignOutWebService } from "@/presentation/services";
import type { SessionManager } from "@/presentation/ports";

async function makeSignOutWebService(sessionManager: SessionManager) {
	const controller = new SignOutWebService(sessionManager);

	return controller;
}

export default makeSignOutWebService;
