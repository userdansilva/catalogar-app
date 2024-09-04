"use server";

import { revalidatePath } from "next/cache";
import { actionClient } from "@/lib/safe-action";
import { editProductSchema } from "./schema";
import { productService } from "@/services/productService";
import { routes } from "@/utils/routes";

export const updateProductAction = actionClient
  .schema(editProductSchema)
  .action(async ({ parsedInput: { id, name, isArchived } }) => {
    const { product } = await productService.update({
      id, name, isArchived,
    });

    revalidatePath(routes.authenticated.products.home);

    return { product };
  });
