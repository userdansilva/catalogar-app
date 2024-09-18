import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/lib/shadcn/ui/table";
import { categoryService } from "@/services/categoryService";
import { Badge } from "@/lib/shadcn/ui/badge";

export async function CategoriesTable() {
  const data = await categoryService.getAll();

  return (
    <Table>
      <colgroup>
        <col width={50} />
        <col />
        <col width={150} />
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
          <TableHead>Favorito</TableHead>
          <TableHead>Criado em</TableHead>
          <TableHead>Atualizado em</TableHead>
          <TableHead className="text-center">Ações</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {data.categories.map((category) => (
          <TableRow key={category.id}>
            <TableCell>{category.id}</TableCell>
            <TableCell>{category.name}</TableCell>
            <TableCell align="center">
              <Badge variant={category.isArchived ? "secondary" : "default"}>
                {category.isArchived ? "Arquivado" : "Ativo"}
              </Badge>
            </TableCell>
            <TableCell>{category.isFavorite ? "Sim" : "Não"}</TableCell>
            <TableCell>{format(category.createdAt, "dd MMM, yyyy HH:mm", { locale: ptBR })}</TableCell>
            <TableCell>{category.updatedAt ? format(category.updatedAt, "dd MMM, yyyy HH:mm", { locale: ptBR }) : "---"}</TableCell>
            <TableCell className="flex justify-center space-x-1 p-2">
              <div className="flex">
                {/* <UpdateProductDialog product={product} /> */}
                {/* <DeleteProductAlertDialog product={product} /> */}
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
