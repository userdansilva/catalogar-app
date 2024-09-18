"use server";

import { revalidatePath } from "next/cache";
import { returnValidationErrors } from "next-safe-action";
import { actionClient } from "@/lib/safe-action";
import { createCategorySchema } from "./schema";
import { categoryService } from "@/services/categoryService";
import { routes } from "@/utils/routes";

export const createCategoryAction = actionClient
  .schema(createCategorySchema)
  .action(async ({
    parsedInput: {
      name, textColor, backgroundColor,
    },
  }) => {
    const isNameAvaliable = await categoryService.isNameAvaliable(name);

    if (!isNameAvaliable) {
      returnValidationErrors(createCategorySchema, {
        name: {
          _errors: ["Nome do produto já está em uso"],
        },
      });
    }

    const { category } = await categoryService.create({
      name, textColor, backgroundColor,
    });

    revalidatePath(routes.authenticated.categories.home);

    return { category };
  });
