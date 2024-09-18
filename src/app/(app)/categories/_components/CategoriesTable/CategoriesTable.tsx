import { format } from "date-fns";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/lib/shadcn/ui/table";
import { categoryService } from "@/services/categoryService";

export default async function CategoriesTable() {
  const data = await categoryService.getAll();

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Id</TableHead>
          <TableHead>Nome</TableHead>
          <TableHead>Favorito</TableHead>
          <TableHead>Criado em</TableHead>
          <TableHead>Atualizado em</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {data.categories.map((category) => (
          <TableRow key={category.id}>
            <TableCell>{category.id}</TableCell>
            <TableCell>{category.name}</TableCell>
            <TableCell>{category.isFavorite ? "Sim" : "Não"}</TableCell>
            <TableCell>{format(category.createdAt, "dd MMM, yyyy")}</TableCell>
            <TableCell>{category.updatedAt ? format(category.updatedAt, "dd MMM, yyyy") : "---"}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
