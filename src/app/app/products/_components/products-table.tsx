import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/lib/shadcn/ui/table";
import { productService } from "@/services/productService";
import { DeleteProductAlertDialog } from "./delete-product-alert-dialog";
import { EditProductDialog } from "./edit-product-dialog";
import { Badge } from "@/lib/shadcn/ui/badge";

export async function ProductsTable() {
  const data = await productService.getAll();

  return (
    <Table>
      <colgroup>
        <col width={50} />
        <col />
        <col width={150} />
        <col width={200} />
        <col width={200} />
        <col width={100} />
      </colgroup>

      <TableHeader>
        <TableRow>
          <TableHead>Id</TableHead>
          <TableHead>Nome</TableHead>
          <TableHead className="text-center">Status</TableHead>
          <TableHead>Criado em</TableHead>
          <TableHead>Atualizado em</TableHead>
          <TableHead className="text-center">Ações</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {data.products.map((product) => (
          <TableRow key={product.id}>
            <TableCell>{product.id}</TableCell>
            <TableCell>{product.name}</TableCell>
            <TableCell align="center">
              <Badge variant={product.isArchived ? "secondary" : "default"}>
                {product.isArchived ? "Arquivado" : "Ativo"}
              </Badge>
            </TableCell>
            <TableCell>{format(product.createdAt, "dd MMM, yyyy HH:mm", { locale: ptBR })}</TableCell>
            <TableCell>{format(product.updatedAt, "dd MMM, yyyy HH:mm", { locale: ptBR })}</TableCell>
            <TableCell className="flex justify-center space-x-1 p-2">
              <div className="flex">
                <EditProductDialog product={product} />
                <DeleteProductAlertDialog product={product} />
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
