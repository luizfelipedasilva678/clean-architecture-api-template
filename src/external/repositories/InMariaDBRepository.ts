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
      values
    );

    this.connection.release();

    return {
      id: result.insertId,
      name: user.name,
      login: user.login,
    };
  }
}

export default InMariaDBRepository;
