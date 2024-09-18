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
    home: "/",
    designs: {
      home: "/designs",
    },
    categories: {
      home: "/categories",
    },
    products: {
      home: "/products",
    },
    profile: "/profile",
    company: "/company",
  },
};
