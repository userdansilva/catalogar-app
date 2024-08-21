import { PropsWithChildren } from "react";
import { Topbar } from "@/components/layout/auth/Topbar";

export default function Layout({
  children,
}: PropsWithChildren) {
  return (
    <div className="space-y-10 text-sm">
      <Topbar />

      <main className="mx-auto min-h-[calc(100vh-6.5rem)] max-w-6xl px-10">
        {children}
      </main>
    </div>
  );
}
