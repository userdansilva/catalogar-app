import { RowDataPacket } from "mysql2";
import { executeQuery, getConnection } from "@/utils/executeQuery";

type ProductDB = {
  id: number;
  name: string;
  archived: "Y" | "N";
  created_at: Date;
  updated_at: Date | null;
} & RowDataPacket;

export type Product = {
  id: number;
  name: string;
  isArchived: boolean;
  createdAt: Date;
  updatedAt: Date | null;
}

function formatProduct(product: ProductDB): Product {
  return {
    id: product.id,
    name: product.name,
    isArchived: product.archived === "Y",
    createdAt: product.created_at,
    updatedAt: product.created_at || undefined,
  };
}

async function getAll(): Promise<{
  products: Product[],
}> {
  const query = "SELECT `id`, `name`, `archived`, `created_at`, `updated_at` FROM `products` WHERE `user_id` = ? ORDER BY `id` DESC";

  const results = await executeQuery<ProductDB[]>(query, [1]);

  const formattedResults = results.map<Product>(formatProduct);

  return {
    products: formattedResults,
  };
}

type NewProduct = {
  name: Product["name"];
}

async function create(newProduct: NewProduct): Promise<{
  product: Product,
}> {
  const insertQuery = "INSERT INTO `products` (`name`, `archived`, `user_id`, `created_at`, `updated_at`) VALUES (?, 'N', ?, NOW(), NOW())";
  const getQuery = "SELECT `id`, `name`, `archived`, `created_at`, `updated_at` FROM `products` WHERE `user_id` = ? AND `id` = LAST_INSERT_ID()";

  const connection = await getConnection();

  try {
    await connection.beginTransaction();

    await connection.query(insertQuery, [newProduct.name, 1]);
    const [results] = await connection.query<ProductDB[]>(getQuery, [1]);

    await connection.commit();

    const product = formatProduct(results[0]);

    return { product };
  } catch {
    await connection.rollback();
  } finally {
    connection.release();
  }

  throw new Error("Algo deu errado ao criar produto");
}

export const productService = {
  getAll,
  create,
};
