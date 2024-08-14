// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import mysql from "mysql2/promise";

type Data = {
  name: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {
  const {
    DB_HOSTNAME,
    DB_PORT,
    DB_NAME,
    DB_USERNAME,
    DB_PASSWORD,
  } = process.env;

  try {
    const connection = await mysql.createConnection({
      host: DB_HOSTNAME,
      port: DB_PORT ? parseInt(DB_PORT, 10) : 3306,
      database: DB_NAME,
      user: DB_USERNAME,
      password: DB_PASSWORD,
    });

    const [results, fields] = await connection.query(
      "SELECT * FROM catalogar.categories WHERE user_id = 1",
    );

    console.log("results", results);
    console.log("fields", fields);
  } catch (err) {
    console.log(err);
  }

  res.status(200).json({ name: "John Doe" });
}
