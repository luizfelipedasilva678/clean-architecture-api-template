import { WelcomeMessageWebService } from "@/presentation/services";
import type { SessionManager } from "@/presentation/ports";

async function makeWelcomeMessageWebService(sessionManager: SessionManager) {
	const service = new WelcomeMessageWebService(sessionManager);

	return service;
}

export default makeWelcomeMessageWebService;
