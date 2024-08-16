/**
 * Add here types that represents rules of the system
 */

export type ApiResponseError = {
  code: string;
  message: string;
  field?: string;
}

export type ApiResponse<T> = {
  data: T;
  errors: ApiResponseError[];
}
