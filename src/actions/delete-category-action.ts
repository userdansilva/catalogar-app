"use server";

import { revalidatePath } from "next/cache";
import { actionClient } from "@/lib/safe-action";
import { deleteCategorySchema } from "./schema";
import { categoryService } from "@/services/categoryService";
import { routes } from "@/utils/routes";

export const deleteCategoryAction = actionClient
  .schema(deleteCategorySchema)
  .action(async ({ parsedInput: { id } }) => {
    await categoryService.delete(id);

    revalidatePath(routes.authenticated.categories.home);
  });
