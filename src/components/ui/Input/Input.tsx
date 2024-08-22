import { Control } from "react-hook-form";
import {
  FormControl, FormDescription, FormField, FormItem, FormLabel,
  FormMessage,
} from "@/lib/shadcn/ui/form";
import {
  InputProps as InputUIProps,
  Input as InputUI,
} from "@/lib/shadcn/ui/input";

type InputProps = InputUIProps & {
  id: string;
  name: string;
  label: string;
  description?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: Control<any, any>;
}

export default function Input({
  name,
  label,
  description,
  control,
  ...rest
}: InputProps) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>
            {label}
          </FormLabel>

          <FormControl>
            <InputUI
              {...field}
              {...rest}
            />
          </FormControl>

          {description && (
            <FormDescription>
              {description}
            </FormDescription>
          )}

          <FormMessage className="text-xs font-normal" />
        </FormItem>
      )}
    />
  );
}
