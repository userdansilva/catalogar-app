import { z } from "zod";

const product = {
  id: z.number().positive(),
  name: z.string().min(2).max(255),
  isArchived: z.boolean(),
};

export const createProductSchema = z.object({
  name: product.name,
});

export const editProductSchema = z.object({
  id: product.id,
  name: product.name,
  isArchived: product.isArchived,
});

export const deleteProductSchema = z.object({
  id: product.id,
});
