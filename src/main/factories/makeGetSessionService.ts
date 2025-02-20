import { GetSessionService } from "@/presentation/services";
import type { SessionManager } from "@/presentation/ports";

async function makeGetSessionService(sessionManager: SessionManager) {
	const service = new GetSessionService(sessionManager);

	return service;
}

export default makeGetSessionService;
