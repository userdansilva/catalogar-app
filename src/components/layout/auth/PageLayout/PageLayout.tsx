import { PropsWithChildren, ReactNode } from "react";

type PageLayoutProps = PropsWithChildren<{
  title: string;
  description?: string;
  actionButton?: ReactNode;
}>

export default function PageLayout({
  title, description, children, actionButton,
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

          {actionButton}
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
