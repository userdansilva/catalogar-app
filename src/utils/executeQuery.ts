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
  statements: (string | number)[] = [],
) {
  try {
    const [results] = await connection.execute(query, statements);
    return results;
  } catch {
    throw new Error("Falha ao executar ação no banco de dados");
  }
}

/**
 * Use this function to execute queries in db
 *
 * Example
 *
 * ```ts
 * type User = {
 *  name: string;
 *  email: string;
 * }
 *
 * const results = await executeQuery<User[]>(
 *  "SELECT `name`, `email` FROM `users` WHERE `name` = ? AND `age` > ?",
 * ["Daniel", 26]
 * )
 * ```
 */
export async function executeQuery<T>(
  query: string,
  statements?: (string | number)[],
) {
  const connection = await getConnection();
  const results = await connectionExecute(connection, query, statements);
  connection.release();
  return results as T;
}
