import { PageLayout } from "@/components/layout/auth/PageLayout";
import { CategoriesTable } from "./_components/categories-table";
import { CreateCategoryDialog } from "./_components/create-category-dialog";

export default async function CategoriesPage() {
  return (
    <PageLayout title="Categorias" actionButton={<CreateCategoryDialog />}>
      <CategoriesTable />
    </PageLayout>
  );
}
