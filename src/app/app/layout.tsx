import { PropsWithChildren } from "react";
import { Topbar } from "@/components/layout/auth/Topbar";

export default function Layout({
  children,
}: PropsWithChildren) {
  return (
    <div>
      <Topbar />

      <main>
        {children}
      </main>
    </div>
  );
}
