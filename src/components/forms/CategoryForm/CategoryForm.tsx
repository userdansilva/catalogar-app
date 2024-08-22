"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Form } from "@/lib/shadcn/ui/form";
import { Input } from "@/components/ui/Input";

const schema = z.object({
  name: z.string()
    .min(1, "Campo obrigatório")
    .max(255, "Máximo de 255 caracteres"),
});

export type FormValues = z.infer<typeof schema>;

type CategoryFormProps = {
  values?: FormValues;
  onSubmit: (values: FormValues) => void;
  id: string;
}

export default function CategoryForm({
  values, onSubmit, id,
}: CategoryFormProps) {
  const methods = useForm<FormValues>({
    mode: "onChange",
    defaultValues: values || {
      name: "",
    },
    resolver: zodResolver(schema),
  });

  return (
    <Form {...methods}>
      <form
        onSubmit={methods.handleSubmit((v) => onSubmit(v))}
        id={id}
      >
        <Input
          id="product-name"
          label="Nome"
          name="name"
          placeholder="Ex.: Caneca, Boné, Camisa..."
          control={methods.control}
        />
      </form>
    </Form>
  );
}
