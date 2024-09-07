import { RowDataPacket } from "mysql2";
import { z } from "zod";
import { executeQuery, getConnection } from "@/utils/executeQuery";
import { auth } from "@/auth";
import {
  type createProductSchema,
  type updateProductSchema,
} from "@/actions/schema";

type ProductDTO = {
  id: number;
  name: string;
  archived: "Y" | "N";
  created_at: Date;
  updated_at: Date;
} & RowDataPacket;

export type Product = {
  id: number;
  name: string;
  isArchived: boolean;
  createdAt: Date;
  updatedAt: Date;
}

function formatProduct(product: ProductDTO): Product {
  return {
    id: product.id,
    name: product.name,
    isArchived: product.archived === "Y",
    createdAt: product.created_at,
    updatedAt: product.updated_at,
  };
}

type ProductsFilters = {
  exactName?: string;
}

async function getAll({
  exactName,
}: ProductsFilters = {}): Promise<{
  products: Product[],
}> {
  const session = await auth();
  if (!session) throw new Error("Unable to get user session");
  const userId = +session.user.id;

  const queryParams: (string | number)[] = [userId];

  let query = "SELECT `id`, `name`, `archived`, `created_at`, `updated_at` FROM `products` WHERE `user_id` = ?";

  if (exactName) {
    query += " AND `name` = ?";
    queryParams.push(exactName);
  }

  query += " ORDER BY `id` DESC";

  const results = await executeQuery<ProductDTO[]>(query, queryParams);

  const formattedResults = results.map<Product>(formatProduct);

  return {
    products: formattedResults,
  };
}

async function create(newProduct: z.infer<typeof createProductSchema>): Promise<{
  product: Product,
}> {
  const session = await auth();
  if (!session) throw new Error("Unable to get user session");
  const userId = +session.user.id;

  const insertQuery = "INSERT INTO `products` (`name`, `archived`, `user_id`, `created_at`, `updated_at`) VALUES (?, 'N', ?, NOW(), NOW())";
  const getQuery = "SELECT `id`, `name`, `archived`, `created_at`, `updated_at` FROM `products` WHERE `user_id` = ? AND `id` = LAST_INSERT_ID()";

  const connection = await getConnection();

  try {
    await connection.beginTransaction();

    await connection.query(insertQuery, [newProduct.name, userId]);
    const [results] = await connection.query<ProductDTO[]>(getQuery, [userId]);

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

async function remove(productId: number): Promise<void> {
  const session = await auth();
  if (!session) throw new Error("Unable to get user session");
  const userId = +session.user.id;

  const query = "DELETE FROM `products` WHERE `id` = ? AND `user_id` = ?";

  const connection = await getConnection();

  try {
    await connection.beginTransaction();
    await connection.query(query, [productId, userId]);

    await connection.commit();
  } catch {
    await connection.rollback();
  } finally {
    connection.release();
  }
}

async function update(updateProduct: z.infer<typeof updateProductSchema>) {
  const session = await auth();
  if (!session) throw new Error("Unable to get user session");
  const userId = +session.user.id;

  const updateQuery = "UPDATE `products` SET `name` = ?, `archived` = ?, `updated_at` = NOW() WHERE `id` = ? AND `user_id` = ?";
  const getQuery = "SELECT `id`, `name`, `archived`, `created_at`, `updated_at` FROM `products` WHERE `id` = ? AND `user_id` = ?";

  const connection = await getConnection();

  try {
    await connection.beginTransaction();
    await connection.query(updateQuery, [
      updateProduct.name,
      updateProduct.isArchived ? "Y" : "N",
      updateProduct.id,
      userId,
    ]);

    const [results] = await connection.query<ProductDTO[]>(getQuery, [
      updateProduct.id,
      userId,
    ]);

    await connection.commit();

    const product = formatProduct(results[0]);

    return { product };
  } catch {
    await connection.rollback();
  } finally {
    connection.release();
  }

  throw new Error("Algo deu errado ao editar produto");
}

async function isNameAvaliable(name: string, id?: number) {
  const session = await auth();
  if (!session) throw new Error("Unable to get user session");
  const userId = +session.user.id;

  let query = "SELECT COUNT(*) AS `count` FROM `products` WHERE LOWER(`name`) = LOWER(?) AND `user_id` = ?";
  const queryParams = [name, userId];

  if (id) {
    query += " AND `id` != ?";
    queryParams.push(id);
  }

  const [result] = await executeQuery<{ count: number }[]>(query, queryParams);

  return result.count === 0;
}

export const productService = {
  getAll,
  create,
  update,
  delete: remove,
  isNameAvaliable,
};
