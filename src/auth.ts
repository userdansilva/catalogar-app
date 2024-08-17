import NextAuth, { CredentialsSignin } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { compare } from "bcryptjs";
import { z, ZodError } from "zod";
import { executeQuery } from "./utils/executeQuery";

type User = {
  name: string;
  email: string;
  password: string;
}

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

const query = "SELECT name, email, password FROM users WHERE email = ?";

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
});
