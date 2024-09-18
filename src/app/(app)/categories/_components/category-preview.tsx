import { Control, useWatch } from "react-hook-form";
import { Badge } from "@/lib/shadcn/ui/badge";

type CategoryPreviewProps = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: Control<any, any>;
}

export function CategoryPreview({
  control,
}: CategoryPreviewProps) {
  const {
    name, textColor, backgroundColor,
  } = useWatch({ control });

  return (
    <div className="relative flex w-full justify-center bg-slate-100 py-6">
      <span className="absolute left-2 top-2 text-xs font-semibold">
        Preview
      </span>

      <Badge style={{
        color: textColor,
        backgroundColor,
      }}
      >
        {(name as string | undefined || "Categoria").trim()}
      </Badge>
    </div>
  );
}
