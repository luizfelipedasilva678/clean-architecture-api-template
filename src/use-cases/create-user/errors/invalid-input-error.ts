class InvalidInputError extends Error {
  public readonly details: string[] = [
    "Name is required and must be a string with at least 3 characters",
    "Login is required and must be a string with at least 3 characters only A-Z, a-z and 0-9 are allowed",
    "Password is required and must be a string with at least 8 characters and must have at least one number, one special character",
  ];

  constructor() {
    super("Invalid input for create user");
    this.name = "InvalidInputError";
  }
}

export default InvalidInputError;
