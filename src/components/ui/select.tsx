import { Control } from "react-hook-form";
import {
  FormControl, FormDescription, FormField, FormItem, FormLabel,
  FormMessage,
} from "@/lib/shadcn/ui/form";
import {
  Select as SelectUI, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/lib/shadcn/ui/select";

type SelectProps = {
  name: string;
  label: string;
  description?: string;
  options: {
    label: string;
    value: string;
  }[];
  placeholder: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: Control<any, any>;
}

export function Select({
  name, label, description, options, placeholder, control,
}: SelectProps) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>

          <SelectUI
            onValueChange={field.onChange}
            defaultValue={field.value}
          >
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder={placeholder} />
              </SelectTrigger>
            </FormControl>

            <SelectContent>
              {options.map((option) => (
                <SelectItem value={option.value} key={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </SelectUI>

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
