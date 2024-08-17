import { CodeError } from "@/auth";

export const routes = {
  auth: {
    register: "/register",
    login: (code?: CodeError) => (!code
      ? "/login"
      : `/login?code=${code}`),
    forgotPassword: "/forgot-password",
  },
};
