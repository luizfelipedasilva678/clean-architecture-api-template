import type CreateUserDTO from "@/use-cases/ports/create-user-dto";

interface CreateUserInputValidator {
	validate: (input: CreateUserDTO) => string[];
}

export default CreateUserInputValidator;
