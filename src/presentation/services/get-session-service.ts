import { internalServerError, ok } from "@/shared";
import type {
	Service,
	HttpResponse,
	SessionManager,
} from "@/presentation/ports";

class GetSessionService implements Service<void, HttpResponse> {
	private readonly sessionManager: SessionManager;

	constructor(sessionManager: SessionManager) {
		this.sessionManager = sessionManager;
	}

	public async execute(): Promise<HttpResponse> {
		try {
			const session = this.sessionManager.get();

			return ok(session);
		} catch (err) {
			return internalServerError();
		}
	}
}

export default GetSessionService;
