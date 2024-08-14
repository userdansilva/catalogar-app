import type { NextApiRequest, NextApiResponse } from "next";
import { executeQuery } from "@/utils/executeQuery";

type Data = {
  name: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {
  try {
    const results = await executeQuery(
      "SELECT * FROM catalogar.categories WHERE user_id = 1",
    );

    console.log("results", results);
  } catch (err) {
    console.log(err);
  }

  res.status(200).json({ name: "John Doe" });
}
