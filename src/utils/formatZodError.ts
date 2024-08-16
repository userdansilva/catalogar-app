import { ZodError } from "zod";
import { ApiResponseError } from "@/config/system";

export function formatZodError(zodError: ZodError): ApiResponseError[] {
  return zodError.errors.map((error) => ({
    code: error.code.toUpperCase(),
    message: error.message,
    field: error.path[0].toString(),
  }));
}
