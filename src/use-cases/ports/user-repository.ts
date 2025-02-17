import type { CreateUserDTO, UserDTO } from "@/use-cases/ports";

interface UserRepository {
	create: (user: CreateUserDTO) => Promise<UserDTO>;
	findByLogin: (login: string) => Promise<UserDTO>;
}

export default UserRepository;
