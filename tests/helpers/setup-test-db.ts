import MySqlHelper from "@/external/helpers/mysql-helper";

async function setupTestDB() {
  const connection = await MySqlHelper.getConnection();

  await connection.query("DELETE FROM users");
  await connection.query("ALTER TABLE users AUTO_INCREMENT = 1");

  connection.release();
}

export default setupTestDB;
