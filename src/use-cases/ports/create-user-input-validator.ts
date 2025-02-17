import type CreateUserDTO from "@/use-cases/ports/create-user-dto";

interface CreateUserInputValidator {
	isValid: (input: CreateUserDTO) => boolean;
}

export default CreateUserInputValidator;
