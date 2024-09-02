"use server";

import { revalidatePath } from "next/cache";
import { actionClient } from "@/lib/safe-action";
import { deleteProductSchema } from "./schema";
import { productService } from "@/services/productService";
import { routes } from "@/utils/routes";

export const deleteProductAction = actionClient
  .schema(deleteProductSchema)
  .action(async ({ parsedInput: { id } }) => {
    await productService.delete(id);

    revalidatePath(routes.authenticated.products.home);
  });
