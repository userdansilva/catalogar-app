import Link from "next/link";
import Head from "next/head";
import { Heading, Paragraph } from "@/components/ui/Typography";
import { routes } from "@/utils/routes";
import { LoginForm } from "./_components/LoginForm";
import { CodeError } from "@/auth";
import { Alert } from "@/components/ui/Alert";

type LoginPageProps = {
  searchParams?: {
    code?: CodeError;
  }
}

export default function LoginPage({
  searchParams,
}: LoginPageProps) {
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
              <Link
                href={routes.auth.register}
                className="underline underline-offset-2"
              >
                clique aqui
              </Link>
              {" "}
              para cadastrar.
            </Paragraph>
          </div>

          {searchParams?.code === "credentials" && (
            <Alert
              title="Ops! Email e/ou senha inválidos."
              variant="destructive"
            />
          )}

          {searchParams?.code === "server" && (
            <Alert
              title="Falha ao validar credenciais"
              description="Não foi possível conectar ao servidor,
              por favor tente novamente mais tarde. Se o erro
              persistir entre em contato conosco."
              variant="destructive"
            />
          )}

          <LoginForm />
        </div>
      </div>
    </>
  );
}
