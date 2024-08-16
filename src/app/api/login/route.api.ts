import { z, ZodError } from "zod";
import { NextResponse } from "next/server";
import { signIn } from "@/utils/auth";
import { ApiResponse } from "@/config/system";
import { formatZodError } from "@/utils/formatZodError";

const schema = z.object({
  email: z.string().email({
    message: "E-mail inválido",
  }),
  password: z.string().min(1, {
    message: "Senha é obrigatório",
  }),
});

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
      return NextResponse.json<ApiResponse<null>>({
        data: null,
        errors: formatZodError(e),
      }, {
        status: 400,
      });
    }

    return NextResponse.json<ApiResponse<null>>({
      data: null,
      errors: [{
        code: "INVALID_CREDENTIALS",
        message: "Email e/ou senha inválidos",
      }],
    }, {
      status: 401,
    });
  }
}
