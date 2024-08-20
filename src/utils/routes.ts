import { CodeError } from "@/auth";

export const routes = {
  auth: {
    register: "/register",
    login: (code?: CodeError) => (!code
      ? "/login"
      : `/login?code=${code}`),
    forgotPassword: "/forgot-password",
  },
  authenticated: {
    home: "/app",
    designs: {
      home: "/app/designs",
    },
    categories: {
      home: "/app/categories",
    },
    products: {
      home: "/app/products",
    },
    profile: "/app/profile",
    company: "/app/company",
  },
};
