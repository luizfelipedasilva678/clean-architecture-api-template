import { internalServerError, redirect } from "@/shared";
import type {
	Service,
	HttpResponse,
	HttpRedirect,
	SessionManager,
} from "@/presentation/ports";

class SignOutWebService implements Service<void, HttpResponse | HttpRedirect> {
	private readonly sessionManager: SessionManager;

	constructor(sessionManager: SessionManager) {
		this.sessionManager = sessionManager;
	}

	public async execute(): Promise<HttpResponse | HttpRedirect> {
		try {
			if (this.sessionManager.get().authenticated) {
				await this.sessionManager.destroy();
			}

			return redirect("/");
		} catch (err) {
			return internalServerError();
		}
	}
}

export default SignOutWebService;
