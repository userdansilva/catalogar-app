import { z } from "zod";

// Products
const product = {
  id: z.number().positive(),
  name: z.string().min(2).max(255),
  isArchived: z.boolean(),
};

export const createProductSchema = z.object({
  name: product.name,
});

export const updateProductSchema = z.object({
  id: product.id,
  name: product.name,
  isArchived: product.isArchived,
});

export const deleteProductSchema = z.object({
  id: product.id,
});

// Categories
const category = {
  id: z.number().positive(),
  name: z.string().min(2).max(255),
  isArchived: z.boolean(),
  textColor: z.string().min(7).max(7).startsWith("#"),
  backgroundColor: z.string().min(7).max(7).startsWith("#"),
};

export const createCategorySchema = z.object({
  name: category.name,
  textColor: category.textColor,
  backgroundColor: category.backgroundColor,
});

export const updateCategorySchema = z.object({
  id: category.id,
  name: category.name,
  textColor: category.textColor,
  backgroundColor: category.backgroundColor,
  isArchived: category.isArchived,
});

export const deleteCategorySchema = z.object({
  id: category.id,
});
