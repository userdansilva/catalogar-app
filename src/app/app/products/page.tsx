import { PageLayout } from "@/components/layout/auth/PageLayout";
import { ProductsTable } from "./_components/ProductsTable";
import { Modal, ModalContent, ModalFooter } from "@/components/ui/Modal";
import { Button } from "@/components/ui/Button";
import { CategoryForm } from "@/components/forms/CategoryForm";

export default function ProductsPage() {
  return (
    <>
      <PageLayout title="Produtos">
        <ProductsTable />
      </PageLayout>

      <Modal
        title="Novo produto"
        description="Make changes to your profile here. Click save when you're done."
      >
        <ModalContent>
          <CategoryForm
            id="create-category-form"
          // onSubmit={(v) => console.log(v)}
          />
        </ModalContent>

        <ModalFooter>
          <Button id="create-product" type="button">
            Criar
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
}
