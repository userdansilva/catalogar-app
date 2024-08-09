import { useFormContext } from "react-hook-form";
import {
  FormControl, FormDescription, FormField, FormItem, FormLabel,
  FormMessage,
} from "@/lib/shadcn/ui/form";
import { Input as InputUI } from "@/lib/shadcn/ui/input";

type InputProps = {
  name: string;
  label: string;
  placeholder?: string;
  description?: string;
}

export default function Input({
  name,
  label,
  placeholder,
  description,
}: InputProps) {
  const {
    control,
  } = useFormContext();

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
              placeholder={placeholder}
              {...field}
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
