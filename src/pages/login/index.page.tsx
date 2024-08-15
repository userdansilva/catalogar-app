import Link from "next/link";
import Head from "next/head";
import { Heading, Paragraph } from "@/components/ui/Typography";
import { LoginForm, FormValues } from "./components/LoginForm";
import { routes } from "@/utils/routes";
import { api } from "@/utils/api";

export default function LoginPage() {
  const onSubmit = async (values: FormValues) => {
    try {
      const me = await api.post("/login", values);
      console.log(me);
    } catch (e) {
      console.error(e);
    }
  };

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

          <LoginForm onSubmit={onSubmit} />
        </div>
      </div>
    </>
  );
}
