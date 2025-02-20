import { SessionManager, Session } from "@/presentation/ports";

class SessionManagerDouble implements SessionManager {
  private session: Session = {
    authenticated: false,
  };

  create(session: Session): void {
    this.session = session;
  }

  destroy(): Promise<void> {
    this.session.user = undefined;
    this.session.authenticated = false;
    return Promise.resolve();
  }

  get(): Session {
    return this.session;
  }
}

export default SessionManagerDouble;
