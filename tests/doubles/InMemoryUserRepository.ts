import type {
  CreateUserDTO,
  UserFoundDTO,
  UserRepository,
  CreatedUserDTO,
} from "@/use-cases/ports";

class InMemoryUserRepository implements UserRepository {
  public readonly users: any[] = [];

  public async findByLogin(login: string): Promise<UserFoundDTO> {
    return this.users.find((user) => user.login === login);
  }

  public async create(user: CreateUserDTO): Promise<CreatedUserDTO> {
    this.users.push({
      id: this.users.length + 1,
      name: user.name,
      login: user.login,
      password: user.password,
    });

    const createdUser = this.users[this.users.length - 1];

    return {
      id: createdUser.id,
      name: createdUser.name,
      login: createdUser.login,
    };
  }
}

export default InMemoryUserRepository;
