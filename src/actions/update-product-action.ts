"use server";

import { revalidatePath } from "next/cache";
import { returnValidationErrors } from "next-safe-action";
import { actionClient } from "@/lib/safe-action";
import { updateProductSchema } from "./schema";
import { productService } from "@/services/productService";
import { routes } from "@/utils/routes";

export const updateProductAction = actionClient
  .schema(updateProductSchema)
  .action(async ({ parsedInput: { id, name, isArchived } }) => {
    const isNameAvaliable = await productService.isNameAvaliable(name, id);

    if (!isNameAvaliable) {
      returnValidationErrors(updateProductSchema, {
        name: {
          _errors: ["Nome do produto já está em uso"],
        },
      });
    }

    const { product } = await productService.update({
      id, name, isArchived,
    });

    revalidatePath(routes.authenticated.products.home);

    return { product };
  });
