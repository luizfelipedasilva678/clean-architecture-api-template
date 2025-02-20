import type { Session, SessionManager } from "@/presentation/ports";
import type { FastifySessionObject } from "@fastify/session";

class FastifySessionManagerAdapter implements SessionManager {
	private readonly sessionObject: FastifySessionObject;

	constructor(sessionObject: FastifySessionObject) {
		this.sessionObject = sessionObject;
	}

	public async destroy(): Promise<void> {
		this.sessionObject.authenticated = false;
		this.sessionObject.user = undefined;
		await this.sessionObject.destroy();
	}

	public get(): Session {
		return {
			authenticated: !!this.sessionObject.authenticated,
			user: this.sessionObject.user,
		};
	}

	public create(session: Session): void {
		this.sessionObject.authenticated = session.authenticated;

		if (session.user)
			this.sessionObject.user = {
				id: session.user.id,
				login: session.user.login,
			};
	}
}

export default FastifySessionManagerAdapter;
