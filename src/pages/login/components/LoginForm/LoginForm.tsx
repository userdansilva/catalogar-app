import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import Link from "next/link";
import { Input } from "@/components/ui/Input";
import { Form } from "@/lib/shadcn/ui/form";
import { routes } from "@/utils/routes";
import { Button } from "@/components/ui/Button";

const schema = z.object({
  email: z.string().optional(),
  password: z.string().optional(),

  // email: z.string().email({
  //   message: "E-mail inválido",
  // }),
  // password: z.string().min(1, {
  //   message: "Campo obrigatório",
  // }),
});

export type FormValues = z.infer<typeof schema>;

type LoginFormProps = {
  onSubmit: (values: FormValues) => Promise<void>;
}

export default function LoginForm({
  onSubmit,
}: LoginFormProps) {
  const methods = useForm<FormValues>({
    mode: "onChange",
    defaultValues: {
      email: "daniel.sousa@catalogar.com.br",
      password: "daniel.sousa",
    },
    resolver: zodResolver(schema),
  });

  return (
    <div>
      <Form {...methods}>
        <form
          onSubmit={methods.handleSubmit(onSubmit)}
          className="space-y-6"
        >
          <Input
            label="E-mail"
            name="email"
            id="email"
          />

          <Input
            label="Senha"
            name="password"
            id="password"
            type="password"
          />

          <div className="flex justify-between">
            <Button type="submit" loading={methods.formState.isSubmitting} id="submit">
              Entrar
            </Button>

            <Link href={routes.auth.forgotPassword}>
              <Button variant="link" id="forgotPassword">
                Esqueceu a senha?
              </Button>
            </Link>
          </div>
        </form>
      </Form>
    </div>
  );
}
