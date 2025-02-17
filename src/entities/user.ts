class User {
	private readonly id: number;
	private readonly name: string;
	private readonly login: string;
	private readonly password: string;

	constructor(id = 0, name = "", login = "", password = "") {
		this.id = id;
		this.name = name;
		this.login = login;
		this.password = password;
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

	public getPassword(): string {
		return this.password;
	}
}

export default User;
