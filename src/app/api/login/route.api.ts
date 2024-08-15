import { z, ZodError } from "zod";
import { NextResponse } from "next/server";
import { signIn } from "@/utils/auth";

const schema = z.object({
  email: z.string().email({
    message: "E-mail inválido",
  }),
  password: z.string().min(1, {
    message: "Senha é obrigatório",
  }),
});

type FormattedError = {
  code: string;
  message: string;
}

function formatZodError(zodError: ZodError): FormattedError[] {
  return zodError.errors.map((error) => ({
    code: error.code.toUpperCase(),
    message: error.message,
  }));
}

export async function POST(request: Request) {
  const credentials = await request.json();

  try {
    const {
      email, password,
    } = await schema.parseAsync(credentials);

    const formData = new FormData();

    formData.append("email", email);
    formData.append("password", password);

    await signIn("credentials", formData);
  } catch (e) {
    if (e instanceof ZodError) {
      // should I add field like: field: email

      return NextResponse.json({
        data: null,
        errors: formatZodError(e),
      }, {
        status: 400,
      });
    }

    return NextResponse.json({
      data: null,
      errors: [{
        code: "INVALID_CREDENTIALS",
        message: "Email e/ou senha inválidos",
      }],
    }, {
      status: 400,
    });
  }
}
