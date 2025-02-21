import type { UseCase, SessionManager } from "@/use-cases/ports";

class SignOut implements UseCase<void, void> {
	private readonly sessionManager: SessionManager;

	public constructor(sessionManager: SessionManager) {
		this.sessionManager = sessionManager;
	}

	public async execute(): Promise<void> {
		if (this.sessionManager.get().authenticated) {
			await this.sessionManager.destroy();
		}
	}
}

export default SignOut;
