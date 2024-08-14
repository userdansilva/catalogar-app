import mysql from "mysql2/promise";

async function getConnection() {
  const {
    DB_HOSTNAME,
    DB_PORT,
    DB_NAME,
    DB_USERNAME,
    DB_PASSWORD,
  } = process.env;

  try {
    const pool = mysql.createPool({
      host: DB_HOSTNAME,
      port: DB_PORT ? parseInt(DB_PORT, 10) : 3306,
      database: DB_NAME,
      user: DB_USERNAME,
      password: DB_PASSWORD,
    });

    const connection = await pool.getConnection();

    return connection;
  } catch {
    throw new Error("Falha ao se conectar ao banco de dados");
  }
}

async function connectionExecute(
  connection: mysql.PoolConnection,
  query: string,
) {
  try {
    const [results] = await connection.execute(query);
    return results;
  } catch {
    throw new Error("Falha ao executar ação no banco de dados");
  }
}

export async function executeQuery(query: string) {
  const connection = await getConnection();
  const results = await connectionExecute(connection, query);
  connection.release();
  return results;
}
