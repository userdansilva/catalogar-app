import { Loader2 } from "lucide-react";
import { forwardRef } from "react";
import {
  ButtonProps as ButtonUIProps,
  Button as ButtonUI,
} from "@/lib/shadcn/ui/button";

type ButtonProps = ButtonUIProps & {
  id: string;
  loading?: boolean;
}

const Button = forwardRef<ButtonUIProps & HTMLButtonElement, ButtonProps>(({
  children, loading, disabled, ...rest
}, ref) => (
  <ButtonUI {...rest} disabled={loading || disabled} ref={ref}>
    {loading && (
      <>
        <Loader2 className="mr-2 size-4 animate-spin" />
        Carregando
      </>
    )}

    {!loading && children}
  </ButtonUI>
));

export default Button;
