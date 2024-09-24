import { RowDataPacket } from "mysql2";
import { auth } from "@/auth";
import { executeQuery } from "@/utils/executeQuery";

type DesignDTO = {
  id: number;
  name: string;
  keywords: string | null;
  created_at: Date;
  updated_at: Date;
  product_id: number;
  product_name: string;
  category_id: number;
  category_name: string;
} & RowDataPacket;

export type DesignProduct = {
  id: number;
  name: string;
}

export type DesignCategory = {
  id: number;
  name: string;
}

export type Design = {
  id: number;
  name: string;
  keywords: string[];
  createdAt: Date;
  updatedAt: Date;
  product: DesignProduct;
  categories: DesignCategory[];
}

function formatDesigns(acc: Map<number, Design>, design: DesignDTO): Map<number, Design> {
  if (!acc.has(design.id)) {
    acc.set(design.id, {
      id: design.id,
      name: design.name,
      keywords: design.keywords?.split(",") || [],
      createdAt: design.created_at,
      updatedAt: design.updated_at,
      product: {
        id: design.product_id,
        name: design.product_name,
      },
      categories: [{
        id: design.category_id,
        name: design.category_name,
      }],
    });
  } else {
    acc.get(design.id)?.categories.push({
      id: design.category_id,
      name: design.category_name,
    });
  }

  return acc;
}

async function getAll(): Promise<{
  designs: Design[]
}> {
  const session = await auth();
  if (!session) throw new Error("Unable to get user session");
  const userId = +session.user.id;

  const query = "SELECT `designs.id` AS id, `designs.title` AS name, `designs.tags` AS keywords, `designs.created_at` AS created_at, `designs.updated_at` AS updated_at, `products.id` AS product_id, `products.name` AS product_name, `categories.id` AS category_id, `categories.name` AS category_name FROM `designs` JOIN `products` ON `designs.product_id` = products.id JOIN `category_design` ON `designs.id` = category_design.design_id JOIN `categories` ON `category_design.category_id` = categories.id WHERE `designs.user_id` = ? ORDER BY `designs.id` DESC";

  const results = await executeQuery<DesignDTO[]>(query, [userId]);

  const formattedResults = results.reduce(formatDesigns, new Map<number, Design>());

  return {
    designs: Array.from(formattedResults.values()),
  };
}

export const designService = {
  getAll,
};
