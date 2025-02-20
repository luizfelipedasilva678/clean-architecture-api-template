import type {
	CreateUserDTO,
	UserFoundDTO,
	CreatedUserDTO,
} from "@/use-cases/ports";

interface UserRepository {
	create: (user: CreateUserDTO) => Promise<CreatedUserDTO>;
	findByLogin: (login: string) => Promise<UserFoundDTO | null>;
}

export default UserRepository;
