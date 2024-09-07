import { PageLayout } from "@/components/layout/auth/PageLayout";
import { ProductsTable } from "./_components/products-table";
import { CreateProductDialog } from "./_components/create-product-dialog";
import { Alert } from "@/components/ui/Alert";

export default function ProductsPage() {
  return (
    <PageLayout title="Produtos" actionButton={<CreateProductDialog />}>
      <Alert
        title="TODOs"
        description="Adicionar: regras para deletar produtos, textos dos modais"
        variant="destructive"
      />

      <ProductsTable />
    </PageLayout>
  );
}
