"use server";

import { returnValidationErrors } from "next-safe-action";
import { revalidatePath } from "next/cache";
import { actionClient } from "@/lib/safe-action";
import { updateCategorySchema } from "./schema";
import { categoryService } from "@/services/categoryService";
import { routes } from "@/utils/routes";

export const updateCategoryAction = actionClient
  .schema(updateCategorySchema)
  .action(async ({
    parsedInput: {
      id, name, isArchived, textColor, backgroundColor,
    },
  }) => {
    const isNameAvaliable = await categoryService.isNameAvaliable(name, id);

    if (!isNameAvaliable) {
      returnValidationErrors(updateCategorySchema, {
        name: {
          _errors: ["Nome da category já está em uso"],
        },
      });
    }

    const { category } = await categoryService.update({
      id, name, isArchived, textColor, backgroundColor,
    });

    revalidatePath(routes.authenticated.categories.home);

    return { category };
  });
