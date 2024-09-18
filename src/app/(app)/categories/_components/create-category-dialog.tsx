"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAction } from "next-safe-action/hooks";
import { useToast } from "@/lib/hooks/use-toast";
import { createCategorySchema } from "@/actions/schema";
import {
  Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle,
  DialogTrigger,
} from "@/lib/shadcn/ui/dialog";
import { Form } from "@/lib/shadcn/ui/form";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { CategoryPreview } from "./category-preview";
import { createCategoryAction } from "@/actions/create-category-action";

type FormValues = z.infer<typeof createCategorySchema>;

export function CreateCategoryDialog() {
  const { toast } = useToast();
  const [open, setOpen] = useState(false);

  const methods = useForm<FormValues>({
    mode: "onChange",
    defaultValues: {
      name: "",
      textColor: "#ffffff",
      backgroundColor: "#000000",
    },
    resolver: zodResolver(createCategorySchema),
  });

  const handleOpenChange = (_open: boolean) => {
    methods.reset();
    setOpen(_open);
  };

  const { execute, isPending } = useAction(createCategoryAction, {
    onSuccess: () => {
      setOpen(false);
      methods.reset();

      toast({
        title: "Categoria criada com sucesso!",
      });
    },
    onError: ({ error }) => {
      const nameValidationErrors = error.validationErrors?.name?._errors;

      if (nameValidationErrors) {
        nameValidationErrors.forEach((message) => {
          methods.setError("name", { message });
        });

        methods.setFocus("name");

        return;
      }

      toast({
        title: "Poxa! Algo deu errado.",
        description: "Falha ocorreu ao criar o produto, por favor tente novamente.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (values: FormValues) => execute({
    name: values.name,
    textColor: values.textColor,
    backgroundColor: values.backgroundColor,
  });

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button id="open-create-product-dialog">
          Adicionar
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>
            Criar categoria
          </DialogTitle>

          <DialogDescription>
            Make changes to your profile here. Click save when youre done.
          </DialogDescription>
        </DialogHeader>

        <Form {...methods}>
          <form
            onSubmit={methods.handleSubmit(onSubmit)}
            id="create-category-form"
            className="space-y-6"
          >
            <Input
              id="category-name"
              label="Nome"
              name="name"
              placeholder="Ex.: Formatura, Namorados, Amizade..."
              autoComplete="off"
              control={methods.control}
            />

            <div className="grid grid-cols-2 gap-4">
              <Input
                id="category-text-color"
                type="color"
                label="Cor do texto"
                name="textColor"
                control={methods.control}
              />

              <Input
                id="category-background-color"
                type="color"
                label="Cor de fundo"
                name="backgroundColor"
                control={methods.control}
              />
            </div>

            <CategoryPreview control={methods.control} />
          </form>
        </Form>

        <DialogFooter>
          <Button
            id="create-category-button"
            type="submit"
            form="create-category-form"
            loading={isPending}
          >
            Adicionar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
