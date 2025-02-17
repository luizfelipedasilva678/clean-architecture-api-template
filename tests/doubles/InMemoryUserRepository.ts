import type { CreateUserDTO, UserDTO, UserRepository } from "@/use-cases/ports";

class InMemoryUserRepository implements UserRepository {
  public readonly users: UserDTO[] = [];

  public async findByLogin(login: string): Promise<UserDTO> {
    return this.users.find((user) => user.login === login);
  }

  public async create(user: CreateUserDTO): Promise<UserDTO> {
    this.users.push({
      id: this.users.length + 1,
      name: user.name,
      login: user.login,
    });

    return this.users[this.users.length - 1];
  }
}

export default InMemoryUserRepository;
