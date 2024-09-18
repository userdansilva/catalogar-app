import { PageLayout } from "@/components/layout/auth/PageLayout";
import { ProductsTable } from "./_components/products-table";
import { CreateProductDialog } from "./_components/create-product-dialog";

export default function ProductsPage() {
  return (
    <PageLayout title="Produtos" actionButton={<CreateProductDialog />}>
      <ProductsTable />
    </PageLayout>
  );
}
