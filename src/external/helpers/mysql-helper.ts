import { createPool, type Pool } from "mysql2/promise";

class MySqlHelper {
	private static pool: Pool = createPool({
		host: process.env.DB_HOST,
		user: process.env.DB_USER,
		password: process.env.DB_PASSWORD,
		database:
			process.env.ENV === "development"
				? process.env.DB_PROD
				: process.env.DB_TEST,
	});

	static getConnection() {
		return MySqlHelper.pool.getConnection();
	}
}

export default MySqlHelper;
