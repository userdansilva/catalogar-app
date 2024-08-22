import { executeQuery } from "@/utils/executeQuery";

type ProductDB = {
  id: number;
  name: string;
  archived: "Y" | "N";
  created_at: Date;
  updated_at: Date | null;
}

export type Product = {
  id: number;
  name: string;
  isArchived: boolean;
  createdAt: Date;
  updatedAt: Date | null;
}

async function getAll(): Promise<{
  products: Product[],
}> {
  const query = "SELECT id, name, archived, created_at, updated_at FROM products WHERE user_id = ? ORDER BY id DESC";

  const results = await executeQuery<ProductDB[]>(query, [1]);

  const formattedResults = results.map<Product>((product) => ({
    id: product.id,
    name: product.name,
    isArchived: product.archived === "Y",
    createdAt: product.created_at,
    updatedAt: product.created_at || undefined,
  }));

  return {
    products: formattedResults,
  };
}

export const productService = {
  getAll,
};
