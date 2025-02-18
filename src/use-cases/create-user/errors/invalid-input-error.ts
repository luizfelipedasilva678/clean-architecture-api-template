class InvalidInputError extends Error {
	public readonly details: string[] = [];

	constructor(details: string[]) {
		super("Invalid input for create user");

		this.details = details;
		this.name = "InvalidInputError";
	}
}

export default InvalidInputError;
