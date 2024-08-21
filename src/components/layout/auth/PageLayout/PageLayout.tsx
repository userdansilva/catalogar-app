import { PropsWithChildren } from "react";
import { Button } from "@/components/ui/Button";

type PageLayoutProps = PropsWithChildren<{
  title: string;
  description?: string;
}>

export default function PageLayout({
  title, description, children,
}: PageLayoutProps) {
  return (
    <div className="space-y-10">
      <div className="space-y-4">
        <div className="flex items-center">
          <div className="flex-1">
            <h1 className="text-3xl font-extrabold tracking-tight">
              {title}
            </h1>
          </div>

          <Button id="add-category">
            Adicionar
          </Button>
        </div>

        {description && (
          <p className="">
            {description}
          </p>
        )}
      </div>

      <div>
        {children}
      </div>
    </div>
  );
}
