"use client";

import { Pencil } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useAction } from "next-safe-action/hooks";
import { Button as ButtonUI } from "@/lib/shadcn/ui/button";
import {
  Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger,
} from "@/lib/shadcn/ui/dialog";
import { Button } from "@/components/ui/Button";
import { Product } from "@/services/productService";
import {
  Form, FormControl, FormDescription, FormField, FormItem, FormLabel,
  FormMessage,
} from "@/lib/shadcn/ui/form";
import { Input } from "@/components/ui/Input";
import { updateProductSchema } from "@/actions/schema";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/lib/shadcn/ui/select";
import { updateProductAction } from "@/actions/update-product-action";
import { useToast } from "@/lib/hooks/use-toast";

type FormValues = z.infer<typeof updateProductSchema>;

type EditProductDialogProps = {
  product: Product;
}

export function UpdateProductDialog({
  product,
}: EditProductDialogProps) {
  const { toast } = useToast();
  const [open, setOpen] = useState(false);

  const methods = useForm<FormValues>({
    mode: "onChange",
    defaultValues: {
      id: product.id,
      name: product.name,
      isArchived: product.isArchived,
    },
    values: {
      id: product.id,
      name: product.name,
      isArchived: product.isArchived,
    },
    resolver: zodResolver(updateProductSchema),
  });

  const { execute, isPending } = useAction(updateProductAction, {
    onSuccess: () => {
      setOpen(false);
      methods.reset();

      toast({
        title: "Produto atualizado com sucesso!",
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
        description: "Falha ocorreu ao editar o produto, por favor tente novamente.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (values: FormValues) => execute({
    id: values.id,
    name: values.name,
    isArchived: values.isArchived,
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
            Editar produto
          </DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when youre done.
          </DialogDescription>
        </DialogHeader>

        <Form {...methods}>
          <form
            onSubmit={methods.handleSubmit(onSubmit)}
            id="edit-product-form"
            className="space-y-6"
          >
            <Input
              id="product-name"
              label="Nome"
              name="name"
              placeholder="Ex.: Caneca, Boné, Camisa..."
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
                    Arquivar produtos faz com que eles fiquem escondidos de seu catálogo.
                    É útil quando parou temporariamente de produzir, ou está sem estoque,
                    desse produto.
                  </FormDescription>

                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>

        <DialogFooter>
          <Button
            id="save-changes"
            form="edit-product-form"
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
