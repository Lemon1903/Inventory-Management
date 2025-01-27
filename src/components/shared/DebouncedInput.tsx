/**
 * Program Title: DebouncedInput.tsx
 * Programmers: Khent Alba
 * 
 * Where the program fits in the general software design:
 * - The part for managing user input efficiently for better user experience
 * 
 * Date written and revised:
 * - Written: July 17, 2024
 * - Revised: January 26, 2025
 * 
 * Purpose:
 * - The purpose of this component is to provide a debounced input field that triggers
 *  the `onChange` callback
 * 
 * Data Structures used:
 * - value state, timeout (created within useEffect), props spread object.
 * 
 * Algorithms used:
 * - Debouncing logic (using setTimeout to delay function execution), dependency 
 * tracking in useEffect to trigger re-renders on value or prop changes.
 * 
 * Control:
 * - Event handling (onChange callback for input changes), cleanup control with 
 * clearTimeout to prevent stale updates, state synchronization with initialValue.
 */


import { useEffect, useState } from "react";

import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

/**
 * Props for the DebouncedInput component.
 *
 * @remarks
 * This component provides a debounced input field that triggers the `onChange` callback
 * after a specified delay.
 */
export type DebouncedInputProps = {
  /** The initial value of the input field. */
  initialValue: string | number;

  /**
   * The callback function that is triggered when the input value changes.
   *
   * @param value - The new value of the input field.
   */
  onChange: (value: string | number) => void;

  /**
   * The delay (in milliseconds) before triggering the `onChange` callback after the input value changes.
   * Defaults to 300 milliseconds if not specified.
   */
  debounce?: number;
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange">;

/**
 * A debounced input component that delays the execution of the onChange event
 * until the user has stopped typing for a specified duration.
 *
 * @param {DebouncedInputProps} props - The component props.
 * @example
 * ```tsx
 * import React from 'react';
 * import DebouncedInput from './DebouncedInput';
 *
 * function App() {
 *   const handleInputChange = (value) => {
 *     console.log(value);
 *   };
 *
 *   return (
 *     <div>
 *       <h1>Debounced Input Example</h1>
 *       <DebouncedInput
 *         initialValue=""
 *         onChange={handleInputChange}
 *         debounce={500}
 *         className="my-input"
 *       />
 *     </div>
 *   );
 * }
 * ```
 */
export default function DebouncedInput({
  initialValue,
  onChange,
  debounce = 500,
  className,
  ...props
}: DebouncedInputProps) {
  const [value, setValue] = useState(initialValue);

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  useEffect(() => {
    const timeout = setTimeout(() => onChange(value), debounce);
    return () => clearTimeout(timeout);
  }, [value]);

  return (
    <Input
      className={cn("h-full pl-10", className)}
      placeholder="Search"
      value={value}
      onChange={(e) => setValue(e.target.value)}
      {...props}
    />
  );
}
