"use client";

import { z } from "zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAction } from "next-safe-action/hooks";
import { Pencil } from "lucide-react";
import { Button as ButtonUI } from "@/lib/shadcn/ui/button";
import { updateCategorySchema } from "@/actions/schema";
import { Category } from "@/services/categoryService";
import { useToast } from "@/lib/hooks/use-toast";
import { updateCategoryAction } from "@/actions/update-category-action";
import {
  Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger,
} from "@/lib/shadcn/ui/dialog";
import {
  Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage,
} from "@/lib/shadcn/ui/form";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import {
  Select,
  SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/lib/shadcn/ui/select";
import { CategoryPreview } from "./category-preview";

type FormValues = z.infer<typeof updateCategorySchema>;

type UpdateCategoryDialogProps = {
  category: Category
}

export function UpdateCategoryDialog({
  category,
}: UpdateCategoryDialogProps) {
  const { toast } = useToast();
  const [open, setOpen] = useState(false);

  const methods = useForm<FormValues>({
    mode: "onChange",
    defaultValues: {
      id: category.id,
      name: category.name,
      isArchived: category.isArchived,
      textColor: category.textColor,
      backgroundColor: category.backgroundColor,
    },
    values: {
      id: category.id,
      name: category.name,
      isArchived: category.isArchived,
      textColor: category.textColor,
      backgroundColor: category.backgroundColor,
    },
    resolver: zodResolver(updateCategorySchema),
  });

  const { execute, isPending } = useAction(updateCategoryAction, {
    onSuccess: () => {
      setOpen(false);
      methods.reset();

      toast({
        title: "Categoria atualizada com sucesso!",
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
        description: "Falha ocorreu ao editar a categoria, por favor tente novamente.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (values: FormValues) => execute({
    id: values.id,
    name: values.name,
    isArchived: values.isArchived,
    textColor: values.textColor,
    backgroundColor: values.backgroundColor,
  });

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <ButtonUI id="edit-button" size="icon" variant="ghost">
          <Pencil className="size-4" />
        </ButtonUI>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            Editar categoria
          </DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when youre done.
          </DialogDescription>
        </DialogHeader>

        <Form {...methods}>
          <form
            onSubmit={methods.handleSubmit(onSubmit)}
            id="edit-category-form"
            className="space-y-6"
          >
            <Input
              id="category-name"
              label="Nome"
              name="name"
              placeholder="Ex.: Formatura, Terceição, Férias..."
              autoComplete="off"
              control={methods.control}
            />

            <FormField
              control={methods.control}
              name="isArchived"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Status</FormLabel>

                  <Select
                    onValueChange={(v) => field.onChange(v === "ARCHIVED")}
                    defaultValue={field.value ? "ARCHIVED" : "ACTIVE"}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione o status" />
                      </SelectTrigger>
                    </FormControl>

                    <SelectContent>
                      <SelectItem value="ACTIVE">
                        Ativo
                      </SelectItem>

                      <SelectItem value="ARCHIVED">
                        Arquivado
                      </SelectItem>
                    </SelectContent>
                  </Select>

                  <FormDescription className="text-xs">
                    Arquivar categorias faz com que eles fiquem escondidos de seu catálogo.
                    É útil para categorias sazonais como natal, carnaval, dia dos namorados e etc.
                    <br />
                    <span className="whitespace-break-spaces font-semibold">
                      Obs.: Se o item tiver outra categoria ativa,
                      ele vai continuar sendo exibido.
                    </span>
                  </FormDescription>

                  <FormMessage className="text-xs font-normal" />
                </FormItem>
              )}
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
            id="save-changes"
            form="edit-category-form"
            type="submit"
            disabled={!methods.formState.isDirty}
            loading={isPending}
          >
            Salvar alterações
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
