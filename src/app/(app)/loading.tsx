import { LoaderCircle } from "lucide-react";

export default function Loading() {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-4 self-center">
      <LoaderCircle className="size-4 animate-spin" />
      Carregando conteúdo...
    </div>
  );
}
