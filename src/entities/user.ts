class User {
  private readonly id: number;
  private readonly name: string;
  private readonly login: string;

  constructor(id = 0, name = "", login = "") {
    this.id = id;
    this.name = name;
    this.login = login;
  }

  public getId(): number {
    return this.id;
  }

  public getName(): string {
    return this.name;
  }

  public getLogin(): string {
    return this.login;
  }
}

export default User;
