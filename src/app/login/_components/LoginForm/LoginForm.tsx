import Link from "next/link";
import { redirect } from "next/navigation";
import { routes } from "@/utils/routes";
import { Button } from "@/components/ui/Button";
import { Input } from "@/lib/shadcn/ui/input";
import { Label } from "@/lib/shadcn/ui/label";
import { CustomError, signIn } from "@/auth";

export default function LoginForm() {
  return (
    <div>
      <form
        className="space-y-6"
        action={async (formData) => {
          "use server";

          try {
            await signIn("credentials", formData);
          } catch (e) {
            redirect(`${routes.auth.login(
              (e as CustomError).code,
            )}`);
          }
        }}
      >
        <div>
          <Label>
            E-mail
            <Input
              id="email"
              name="email"
              placeholder="Digite seu e-mail"
              type="email"
              required
            />
          </Label>
        </div>

        <div>
          <Label>
            Senha
            <Input
              id="password"
              name="password"
              type="password"
              placeholder="Digite sua senha"
              required
            />
          </Label>
        </div>

        <div className="flex justify-between">
          <Button
            type="submit"
            id="submit"
          >
            Entrar
          </Button>

          <Link href={routes.auth.forgotPassword}>
            <Button variant="link" id="forgotPassword">
              Esqueceu a senha?
            </Button>
          </Link>
        </div>
      </form>
    </div>
  );
}
