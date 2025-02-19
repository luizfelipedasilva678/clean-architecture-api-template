import type { CreateUserDTO } from "@/use-cases/ports";
import type CreateUserInputValidator from "@/use-cases/ports/create-user-input-validator";
import { z } from "zod";

const INVALID_NAME_TYPE = "Name must be a string";
const INVALID_NAME_LENGTH = "Name must be at least 3 characters long";
const INVALID_NAME_REGEX = "Name must contain only letters";

const INVALID_LOGIN_TYPE = "Login must be a string";
const INVALID_LOGIN_LENGTH = "Login must be at least 3 characters long";
const INVALID_LOGIN_REGEX = "Login must contain only letters and numbers";

const INVALID_PASSWORD_TYPE = "Password must be a string";
const INVALID_PASSWORD_LENGTH = "Password must be at least 8 characters long";
const INVALID_PASSWORD_REGEX =
	"Password must contain at least one letter, one number and one special character";

class ZodCreateUserInputValidator implements CreateUserInputValidator {
	public validate(input: CreateUserDTO): string[] {
		const schema = z.object({
			name: z
				.string({
					message: INVALID_NAME_TYPE,
				})
				.min(3, INVALID_NAME_LENGTH)
				.regex(/^[A-Za-z\s]+$/, INVALID_NAME_REGEX),
			login: z
				.string({
					message: INVALID_LOGIN_TYPE,
				})
				.min(3, {
					message: INVALID_LOGIN_LENGTH,
				})
				.regex(/^[A-Za-z0-9]+$/, INVALID_LOGIN_REGEX),
			password: z
				.string({
					message: INVALID_PASSWORD_TYPE,
				})
				.min(8, {
					message: INVALID_PASSWORD_LENGTH,
				})
				.regex(
					/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
					INVALID_PASSWORD_REGEX,
				),
		});

		const result = schema.safeParse(input);

		if (result.success) return [];

		return result.error.errors.map((error) => error.message);
	}
}

export default ZodCreateUserInputValidator;
