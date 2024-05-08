import { useEffect, useState } from "react";

import { Input } from "@/components/ui/input";

type DebouncedInputProps = {
  initialValue: string | number;
  onChange: (value: string | number) => void;
  debounce?: number;
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange">;

export default function DebouncedInput({ initialValue, onChange, debounce = 500, ...props }: DebouncedInputProps) {
  const [value, setValue] = useState(initialValue);

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      onChange(value);
    }, debounce);
    return () => clearTimeout(timeout);
  }, [value]);

  return (
    <Input
      className="h-full pl-10"
      placeholder="Search"
      value={value}
      onChange={(e) => setValue(e.target.value)}
      {...props}
    />
  );
}
