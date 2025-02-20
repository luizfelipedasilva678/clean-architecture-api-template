import { internalServerError, ok } from "@/shared";
import type {
	Service,
	HttpResponse,
	HttpRedirect,
	SessionManager,
} from "@/presentation/ports";

class WelcomeMessageWebService
	implements Service<void, HttpResponse | HttpRedirect>
{
	private readonly sessionManager: SessionManager;

	constructor(sessionManager: SessionManager) {
		this.sessionManager = sessionManager;
	}

	public async execute(): Promise<HttpResponse> {
		try {
			if (this.sessionManager.get().authenticated) {
				return ok({
					message: `Hello, ${this.sessionManager.get().user?.login}`,
				});
			}

			return ok({
				message: "Hello, visitor",
			});
		} catch (err) {
			return internalServerError();
		}
	}
}

export default WelcomeMessageWebService;
