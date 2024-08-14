import { Loader2 } from "lucide-react";
import {
  ButtonProps as ButtonUIProps,
  Button as ButtonUI,
} from "@/lib/shadcn/ui/button";

type ButtonProps = ButtonUIProps & {
  id: string;
  loading?: boolean;
}

export default function Button({
  children, loading, disabled, ...rest
}: ButtonProps) {
  return (
    <ButtonUI {...rest} disabled={loading || disabled}>
      {loading && (
        <>
          <Loader2 className="mr-2 size-4 animate-spin" />
          Carregando
        </>
      )}

      {!loading && children}
    </ButtonUI>
  );
}
