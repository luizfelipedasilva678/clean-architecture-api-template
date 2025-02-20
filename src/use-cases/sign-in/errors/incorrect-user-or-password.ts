class IncorrectUserOrPasswordError extends Error {
	constructor() {
		super("Incorrect user or password");
		this.name = "IncorrectUserOrPasswordError";
	}
}

export default IncorrectUserOrPasswordError;
