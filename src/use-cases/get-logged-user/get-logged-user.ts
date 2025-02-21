import type { UseCase, SessionManager, LoggedUserDTO } from "@/use-cases/ports";

class GetLoggedUser implements UseCase<void, LoggedUserDTO> {
	private readonly sessionManager: SessionManager;

	public constructor(sessionManager: SessionManager) {
		this.sessionManager = sessionManager;
	}

	public async execute(): Promise<LoggedUserDTO> {
		return this.sessionManager.get();
	}
}

export default GetLoggedUser;
