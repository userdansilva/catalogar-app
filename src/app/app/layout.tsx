import { PropsWithChildren } from "react";
import { Topbar } from "@/components/layout/auth/Topbar";

export default function Layout({
  children,
}: PropsWithChildren) {
  return (
    <div className="text-sm">
      <div className="fixed inset-x-0 top-0 z-10 h-16">
        <Topbar />
      </div>

      <main className="mx-auto mt-16 min-h-[calc(100vh-4rem)] max-w-6xl px-4 py-16">
        {children}
      </main>
    </div>
  );
}
