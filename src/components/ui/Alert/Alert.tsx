import { AlertCircle, Terminal } from "lucide-react";
import {
  AlertDescription,
  AlertTitle,
  Alert as AlertUI,
} from "@/lib/shadcn/ui/alert";

type AlertProps = {
  variant?: "destructive" | "default";
  title: string;
  description?: string;
}

export default function Alert({
  variant = "default", title, description,
}: AlertProps) {
  return (
    <AlertUI variant={variant}>
      {variant === "default" && (
        <Terminal className="size-4" />
      )}

      {variant === "destructive" && (
        <AlertCircle className="size-4" />
      )}

      <AlertTitle>
        {title}
      </AlertTitle>

      {description && (
        <AlertDescription>
          {description}
        </AlertDescription>
      )}
    </AlertUI>
  );
}
