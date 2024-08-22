import { format } from "date-fns";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/lib/shadcn/ui/table";
import { productService } from "@/services/productService";

export default async function ProductsTable() {
  const data = await productService.getAll();

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Id</TableHead>
          <TableHead>Nome</TableHead>
          <TableHead>Criado em</TableHead>
          <TableHead>Atualizado em</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {data.products.map((product) => (
          <TableRow key={product.id}>
            <TableCell>{product.id}</TableCell>
            <TableCell>{product.name}</TableCell>
            <TableCell>{format(product.createdAt, "dd MMM, yyyy")}</TableCell>
            <TableCell>{product.updatedAt ? format(product.updatedAt, "dd MMM, yyyy") : "---"}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
