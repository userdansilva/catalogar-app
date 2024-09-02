import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Pencil } from "lucide-react";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/lib/shadcn/ui/table";
import { productService } from "@/services/productService";
import { Button } from "@/components/ui/Button";
import { DeleteProductAlertDialog } from "./delete-product-alert-dialog";

export async function ProductsTable() {
  const data = await productService.getAll();

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Id</TableHead>
          <TableHead>Nome</TableHead>
          <TableHead>Criado em</TableHead>
          <TableHead>Atualizado em</TableHead>
          <TableHead>Ações</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {data.products.map((product) => (
          <TableRow key={product.id}>
            <TableCell>{product.id}</TableCell>
            <TableCell>{product.name}</TableCell>
            <TableCell>{format(product.createdAt, "dd MMM, yyyy HH:mm", { locale: ptBR })}</TableCell>
            <TableCell>{product.updatedAt ? format(product.updatedAt, "dd MMM, yyyy HH:mm", { locale: ptBR }) : "---"}</TableCell>
            <TableCell className="space-x-1 p-0">
              <Button id="edit-button" size="icon" variant="ghost">
                <Pencil className="size-4" />
              </Button>
              <DeleteProductAlertDialog product={product} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
