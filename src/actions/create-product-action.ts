"use server";

import { revalidatePath } from "next/cache";
import { returnValidationErrors } from "next-safe-action";
import { actionClient } from "@/lib/safe-action";
import { createProductSchema } from "./schema";
import { productService } from "@/services/productService";
import { routes } from "@/utils/routes";

export const createProductAction = actionClient
  .schema(createProductSchema)
  .action(async ({ parsedInput: { name } }) => {
    const isNameAvaliable = await productService.isNameAvaliable(name);

    if (!isNameAvaliable) {
      returnValidationErrors(createProductSchema, {
        name: {
          _errors: ["Nome do produto já está em uso"],
        },
      });
    }

    const { product } = await productService.create({ name });

    revalidatePath(routes.authenticated.products.home);

    return { product };
  });
