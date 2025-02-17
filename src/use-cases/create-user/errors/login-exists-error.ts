class LoginExistsError extends Error {
	constructor() {
		super("Login already exists");
		this.name = "LoginExistsError";
	}
}

export default LoginExistsError;
