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
import { Product } from "@/services/productService";
import { deleteProductAction } from "@/actions/delete-product-action";
import { useToast } from "@/lib/hooks/use-toast";

type DeleteProductAlertDialogProps = {
  product: Product;
}

export function DeleteProductAlertDialog({
  product,
}: DeleteProductAlertDialogProps) {
  const { toast } = useToast();

  const { execute } = useAction(deleteProductAction, {
    onSuccess: () => {
      toast({
        title: "Produto removido com sucesso!",
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

  const onConfirm = () => execute({ id: product.id });

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
            Essa ação não poderá ser desfeita. O produto
            {" "}
            <span className="rounded-sm bg-muted p-1 font-mono font-semibold">{product.name}</span>
            {" "}
            será removido permanentemente.
            Mas você ainda poderá adicionar outro produto com o mesmo nome.
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
