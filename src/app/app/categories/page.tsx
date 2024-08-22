import { PageLayout } from "@/components/layout/auth/PageLayout";
import { CategoriesTable } from "./_components/CategoriesTable";

export default async function CategoriesPage() {
  return (
    <PageLayout title="Categorias">
      <CategoriesTable />
    </PageLayout>
  );
}
