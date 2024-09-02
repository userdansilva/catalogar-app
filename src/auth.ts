import NextAuth, { CredentialsSignin, DefaultSession } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { compare } from "bcryptjs";
import { z, ZodError } from "zod";
import "next-auth/jwt";
import { executeQuery } from "./utils/executeQuery";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
    } & DefaultSession["user"];
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    userId: string;
  }
}

type User = {
  id: number;
  name: string;
  email: string;
  password: string;
}

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

const query = "SELECT `id`, `name`, `email`, `password` FROM `users` WHERE `email` = ?";

export type CodeError = "credentials" | "server";

export class CustomError extends CredentialsSignin {
  code: CodeError;

  constructor(code: CodeError) {
    super(code);
    this.code = code;
  }
}

export const {
  handlers, signIn, signOut, auth,
} = NextAuth({
  providers: [
    Credentials({
      credentials: { email: {}, password: {} },
      authorize: async (credentials) => {
        try {
          const {
            email, password,
          } = await schema.parseAsync(credentials);

          const [user] = await executeQuery<User[]>(query, [email as string]);

          // return null also return an error with code "credentials"
          if (!user) return null;

          const isValid = await compare(password as string, user.password);

          if (!isValid) return null;

          return {
            id: user.id.toString(),
            name: user.name,
            email: user.email,
          };
        } catch (e) {
          if (e instanceof ZodError) {
            throw new CustomError("credentials");
          }

          throw new CustomError("server");
        }
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
  callbacks: {
    // Logged in users are authenticated, otherwise redirect to login page
    authorized: async ({ auth: authData }) => !!authData,
    jwt: ({ token, user }) => {
      if (user && user.id) {
        // eslint-disable-next-line no-param-reassign
        token.userId = user.id;
      }

      return token;
    },
    session: ({ session, token }) => ({
      ...session,
      user: {
        ...session.user,
        id: token.userId,
      },
    }),
  },
});
