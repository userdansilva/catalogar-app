import { PageLayout } from "@/components/layout/auth/PageLayout";
import { DesignsCatalog } from "./_components/designs-catalog";

export default async function DesignsPage() {
  return (
    <PageLayout title="Designs">
      <DesignsCatalog />
    </PageLayout>
  );
}
