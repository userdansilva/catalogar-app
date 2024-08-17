import Link from "next/link";
import Head from "next/head";
import { Heading, Paragraph } from "@/components/ui/Typography";
import { routes } from "@/utils/routes";
import { LoginForm } from "./_components/LoginForm";

export default function LoginPage() {
  return (
    <>
      <Head>
        <title>Catalogar - Login</title>
      </Head>

      <div className="flex h-screen items-center justify-center">
        <div className="w-96 space-y-6">
          <div>
            <Heading as="h1">
              Bem vindo de volta!
            </Heading>

            <Paragraph>
              Faça login para gerenciar seu catálogo. Se ainda não tem cadastro
              {" "}
              <Link href={routes.auth.register} className="underline underline-offset-2">
                clique aqui
              </Link>
              {" "}
              para cadastrar.
            </Paragraph>
          </div>

          <LoginForm />
        </div>
      </div>
    </>
  );
}
