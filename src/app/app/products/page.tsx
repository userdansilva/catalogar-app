import { PageLayout } from "@/components/layout/auth/PageLayout";
import { ProductsTable } from "./_components/ProductsTable";

export default function ProductsPage() {
  return (
    <PageLayout title="Produtos">
      <ProductsTable />
    </PageLayout>
  );
}
