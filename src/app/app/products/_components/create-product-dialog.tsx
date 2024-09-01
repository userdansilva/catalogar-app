"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useAction } from "next-safe-action/hooks";
import { useState } from "react";
import { Form } from "@/lib/shadcn/ui/form";
import { Input } from "@/components/ui/Input";
import { createProductSchema } from "@/actions/schema";
import { createProductAction } from "@/actions/create-product-action";
import { Button } from "@/components/ui/Button";
import {
  Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle,
  DialogTrigger,
} from "@/lib/shadcn/ui/dialog";

type FormValues = z.infer<typeof createProductSchema>;

export function CreateProductDialog() {
  const [open, setOpen] = useState(false);

  const methods = useForm<FormValues>({
    mode: "onChange",
    defaultValues: {
      name: "",
    },
    resolver: zodResolver(createProductSchema),
  });

  const { execute, isPending } = useAction(createProductAction, {
    onSuccess: () => {
      setOpen(false);
      methods.reset();

      // Toast
    },
  });

  const onSubmit = (values: FormValues) => execute({
    name: values.name,
  });

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button id="open-create-product-dialog">
          Adicionar
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>
            Criar produto
          </DialogTitle>

          <DialogDescription>
            Make changes to your profile here. Click save when youre done.
          </DialogDescription>
        </DialogHeader>

        <Form {...methods}>
          <form
            onSubmit={methods.handleSubmit(onSubmit)}
            id="create-product-form"
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

        <DialogFooter>
          <Button
            id="create-product-button"
            type="submit"
            form="create-product-form"
            loading={isPending}
          >
            Adicionar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
