import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/Input";
import { Form } from "@/lib/shadcn/ui/form";
import { Button } from "@/lib/shadcn/ui/button";

const schema = z.object({
  name: z.string().min(1, {
    message: "Campo obrigatório",
  }),
});

type FormValues = z.infer<typeof schema>;

export default function CategoryForm() {
  const methods = useForm<FormValues>({
    mode: "onChange",
    defaultValues: {
      name: "",
    },
    resolver: zodResolver(schema),
  });

  return (
    <Form {...methods}>
      <form
        onSubmit={methods.handleSubmit((v) => console.log(v))}
        className="space-y-6"
      >
        <Input
          name="name"
          label="Name"
          description="Your product name"
          placeholder="Ex.: Canecas, Camisas, Bonés"
        />

        <Button type="submit">
          Enviar
        </Button>
      </form>
    </Form>
  );
}
