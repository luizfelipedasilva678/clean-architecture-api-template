import { WelcomeMessageWebService } from "@/presentation/services";
import type { SessionManager } from "@/presentation/ports";

async function makeWelcomeMessageWebService(sessionManager: SessionManager) {
	const controller = new WelcomeMessageWebService(sessionManager);

	return controller;
}

export default makeWelcomeMessageWebService;
