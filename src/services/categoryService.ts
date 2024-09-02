import { auth } from "@/auth";
import { executeQuery } from "@/utils/executeQuery";

type CategoryDB = {
  id: number;
  name: string;
  favorite: "Y" | "N";
  color_bg: string; // HEX
  color_text: string // HEX
  archived: "Y" | "N";
  created_at: Date;
  updated_at: Date | null;
}

export type Category = {
  id: number;
  name: string;
  isFavorite: boolean;
  isArchived: boolean;
  backgroundColor: string;
  textColor: string
  createdAt: Date;
  updatedAt: Date | null;
}

async function getAll(): Promise<{
  categories: Category[],
}> {
  const session = await auth();
  if (!session) throw new Error("Unable to get user session");
  const userId = +session.user.id;

  const query = "SELECT id, name, favorite, color_bg, color_text, archived, created_at, updated_at FROM categories WHERE user_id = ? ORDER BY id DESC";

  const results = await executeQuery<CategoryDB[]>(query, [userId]);

  const formattedResults = results.map<Category>((category) => ({
    id: category.id,
    name: category.name,
    isFavorite: category.favorite === "Y",
    isArchived: category.archived === "Y",
    backgroundColor: category.color_bg,
    textColor: category.color_text,
    createdAt: category.created_at,
    updatedAt: category.created_at || undefined,
  }));

  return {
    categories: formattedResults,
  };
}

export const categoryService = {
  getAll,
};
