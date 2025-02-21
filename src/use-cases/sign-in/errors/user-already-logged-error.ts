class UserAlreadyLoggedError extends Error {
	constructor() {
		super("User already logged");
		this.name = "UserAlreadyLoggedError";
	}
}

export default UserAlreadyLoggedError;
