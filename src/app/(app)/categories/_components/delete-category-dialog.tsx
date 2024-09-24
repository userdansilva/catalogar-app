"use client";

import { AlertDialogTrigger } from "@radix-ui/react-alert-dialog";
import { Trash } from "lucide-react";
import { useAction } from "next-safe-action/hooks";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/lib/shadcn/ui/alert-dialog";
import { Button } from "@/components/ui/Button";
import { useToast } from "@/lib/hooks/use-toast";
import { Category } from "@/services/categoryService";
import { deleteCategoryAction } from "@/actions/delete-category-action";

type DeleteCategoryAlertDialogProps = {
  category: Category;
}

export function DeleteCategoryAlertDialog({
  category,
}: DeleteCategoryAlertDialogProps) {
  const { toast } = useToast();

  const { execute } = useAction(deleteCategoryAction, {
    onSuccess: () => {
      toast({
        title: "Categoria removida com sucesso!",
      });
    },
    onError: () => {
      toast({
        title: "Poxa! Algo deu errado.",
        description: "Falha ocorreu ao remover o produto, por favor tente novamente.",
        variant: "destructive",
      });
    },
  });

  const onConfirm = () => execute({ id: category.id });

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button id="delete-button" size="icon" variant="ghost">
          <Trash className="size-4" />
        </Button>
      </AlertDialogTrigger>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Tem certeza?
          </AlertDialogTitle>

          <AlertDialogDescription>
            Essa ação não poderá ser desfeita. A categoria
            {" "}
            <span className="rounded-sm bg-muted p-1 font-mono font-semibold">{category.name}</span>
            {" "}
            será removido permanentemente.
            Mas você ainda poderá adicionar outra categoria com o mesmo nome.
          </AlertDialogDescription>

          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={onConfirm}>
              Confirmar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogHeader>
      </AlertDialogContent>
    </AlertDialog>
  );
}
