import { signIn } from "@/utils/auth";

export async function POST(request: Request) {
  const credentials = await request.json();

  const formData = new FormData();

  formData.append("email", credentials.email);
  formData.append("password", credentials.password);

  await signIn("credentials", formData);
}
