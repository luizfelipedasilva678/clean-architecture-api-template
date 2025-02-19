import type { CreateUserDTO, UserDTO, UserRepository } from "@/use-cases/ports";
import type {
	PoolConnection,
	ResultSetHeader,
	RowDataPacket,
} from "mysql2/promise";

class InMariaDBRepository implements UserRepository {
	private connection: PoolConnection;

	constructor(connection: PoolConnection) {
		this.connection = connection;
	}

	public async create(user: CreateUserDTO): Promise<UserDTO> {
		const sql = "INSERT INTO users (name, login, password) VALUES (?, ?, ?)";
		const values = [user.name, user.login, user.password];

		const [result] = await this.connection.execute<ResultSetHeader>(
			sql,
			values,
		);

		this.connection.release();

		return {
			id: result.insertId,
			name: user.name,
			login: user.login,
		};
	}

	public async findByLogin(login: string): Promise<UserDTO> {
		const sql = "SELECT id, name, login FROM users WHERE login = ?";
		const values = [login];

		const [rows] = await this.connection.execute<RowDataPacket[]>(sql, values);

		this.connection.release();

		const user = rows[0];

		if (!user) return null;

		return user as UserDTO;
	}
}

export default InMariaDBRepository;
