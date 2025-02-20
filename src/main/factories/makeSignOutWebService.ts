import { SignOutWebService } from "@/presentation/services";
import type { SessionManager } from "@/presentation/ports";

async function makeSignOutWebService(sessionManager: SessionManager) {
	const service = new SignOutWebService(sessionManager);

	return service;
}

export default makeSignOutWebService;
