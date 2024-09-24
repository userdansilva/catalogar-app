import { RowDataPacket } from "mysql2";
import { z } from "zod";
import { auth } from "@/auth";
import { executeQuery, getConnection } from "@/utils/executeQuery";
import {
  type updateCategorySchema,
  type createCategorySchema,
} from "@/actions/schema";

type CategoryDTO = {
  id: number;
  name: string;
  color_bg: string; // HEX
  color_text: string // HEX
  archived: "Y" | "N";
  created_at: Date;
  updated_at: Date;
} & RowDataPacket;

export type Category = {
  id: number;
  name: string;
  isArchived: boolean;
  backgroundColor: string;
  textColor: string
  createdAt: Date;
  updatedAt: Date;
}

function formatCategory(category: CategoryDTO): Category {
  return {
    id: category.id,
    name: category.name,
    isArchived: category.archived === "Y",
    backgroundColor: category.color_bg,
    textColor: category.color_text,
    createdAt: category.created_at,
    updatedAt: category.updated_at,
  };
}

async function getAll(): Promise<{
  categories: Category[],
}> {
  const session = await auth();
  if (!session) throw new Error("Unable to get user session");
  const userId = +session.user.id;

  const query = "SELECT `id`, `name`, `color_bg`, `color_text`, `archived`, `created_at`, `updated_at` FROM `categories` WHERE `user_id` = ? ORDER BY `id` DESC";

  const results = await executeQuery<CategoryDTO[]>(query, [userId]);

  const formattedResults = results.map<Category>(formatCategory);

  return {
    categories: formattedResults,
  };
}

async function create(newCategory: z.infer<typeof createCategorySchema>): Promise<{
  category: Category,
}> {
  const session = await auth();
  if (!session) throw new Error("Unable to get user session");
  const userId = +session.user.id;

  const insertQuery = "INSERT INTO `categories` (`name`, `favorite`, `color_bg`, `color_text`, `archived`, `created_at`, `updated_at`, `user_id`) VALUES (?, 'N', ?, ?, 'N', NOW(), NOW(), ?)";
  const getQuery = "SELECT `id`, `name`, `color_bg`, `color_text`, `archived`, `created_at`, `updated_at` FROM `categories` WHERE `user_id` = ? AND `id` = LAST_INSERT_ID()";

  const connection = await getConnection();

  try {
    await connection.beginTransaction();

    await connection.query(insertQuery, [
      newCategory.name,
      newCategory.backgroundColor,
      newCategory.textColor,
      userId,
    ]);
    const [results] = await connection.query<CategoryDTO[]>(getQuery, [userId]);

    await connection.commit();

    const category = formatCategory(results[0]);

    return { category };
  } catch {
    await connection.rollback();
  } finally {
    connection.release();
  }

  throw new Error("Algo deu errado ao criar categoria");
}

async function remove(categoryId: number): Promise<void> {
  const session = await auth();
  if (!session) throw new Error("Unable to get user session");
  const userId = +session.user.id;

  const query = "DELETE FROM `categories` WHERE `id` = ? AND `user_id` = ?";

  const connetion = await getConnection();

  try {
    await connetion.beginTransaction();
    await connetion.query(query, [categoryId, userId]);

    await connetion.commit();
  } catch {
    await connetion.rollback();
  } finally {
    connetion.release();
  }
}

async function update(updateCategory: z.infer<typeof updateCategorySchema>) {
  const session = await auth();
  if (!session) throw new Error("Unable to get user session");
  const userId = +session.user.id;

  const updateQuery = "UPDATE `categories` SET `name` = ?, `color_text` = ?, `color_bg` = ?, `archived` = ?, `updated_at` = NOW() WHERE `id` = ? AND `user_id` = ?";
  const getQuery = "SELECT `id`, `name`, `color_bg`, `color_text`, `archived`, `created_at`, `updated_at` FROM `categories` WHERE `id` = ? AND `user_id` = ?";

  const connection = await getConnection();

  try {
    await connection.beginTransaction();
    await connection.query(updateQuery, [
      updateCategory.name,
      updateCategory.textColor,
      updateCategory.backgroundColor,
      updateCategory.isArchived ? "Y" : "N",
      updateCategory.id,
      userId,
    ]);

    const [results] = await connection.query<CategoryDTO[]>(getQuery, [
      updateCategory.id,
      userId,
    ]);

    await connection.commit();

    const category = formatCategory(results[0]);

    return { category };
  } catch {
    await connection.rollback();
  } finally {
    connection.release();
  }

  throw new Error("Algo deu errado ao editar categoria");
}

async function isNameAvaliable(name: string, id?: number) {
  const session = await auth();
  if (!session) throw new Error("Unable to get user session");
  const userId = +session.user.id;

  let query = "SELECT COUNT(*) AS `count` FROM `categories` WHERE LOWER(`name`) = LOWER(?) AND `user_id` = ?";
  const queryParams = [name, userId];

  if (id) {
    query += " AND `id` != ?";
    queryParams.push(id);
  }

  const [result] = await executeQuery<{ count: number }[]>(query, queryParams);

  return result.count === 0;
}

export const categoryService = {
  getAll,
  create,
  update,
  delete: remove,
  isNameAvaliable,
};
