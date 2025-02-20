interface SessionManager {
	create: (session: Session) => void;
	destroy: () => Promise<void>;
	get: () => Session;
}

interface Session {
	user?: {
		id: string;
		login: string;
	};
	authenticated: boolean;
}

export type { SessionManager, Session };
