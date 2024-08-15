import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { compare } from "bcryptjs";
import { executeQuery } from "./executeQuery";

type User = {
  name: string;
  email: string;
  password: string;
}

export const {
  handlers, signIn, signOut, auth,
} = NextAuth({
  providers: [
    Credentials({
      credentials: { email: {}, password: {} },
      authorize: async (credentials) => {
        const query = "SELECT name, email, password FROM users WHERE email = ?";

        const [user] = await executeQuery<User[]>(query, [credentials.email as string]);

        if (!user) return null;

        const isValid = await compare(credentials.password as string, user.password);

        if (!isValid) return null;

        return user;
      },
    }),
  ],
});
