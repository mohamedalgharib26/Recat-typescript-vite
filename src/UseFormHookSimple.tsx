/* eslint-disable @typescript-eslint/no-explicit-any */
import { useRef } from "react";

// Define a type for the return value of our custom hook.
// T is a generic type for our form data.
interface UseSimpleFormReturn<T> {
  register: (name: keyof T) => { ref: React.Ref<any> };
  handleSubmit: (callback: (data: T) => void) => (e: React.FormEvent) => void;
}

export function useSimpleForm<T extends object>(): UseSimpleFormReturn<T> {
  // We use a ref to store references to all input fields.
  const inputRefs = useRef<Record<keyof T, HTMLInputElement | null>>({} as any);

  // The register function connects an input field to our hook.
  // It gives us a ref we can pass to the input element.
  const register = (name: keyof T) => ({
    ref: (el: HTMLInputElement) => {
      if (el) {
        inputRefs.current[name] = el;
      }
    },
  });

  // The handleSubmit function takes a user-defined function.
  // When the form is submitted, it prevents the default behavior,
  // collects the values from the refs, and passes them to the user's function.
  const handleSubmit =
    (callback: (data: T) => void) => (e: React.FormEvent) => {
      e.preventDefault();
      const data: any = {};
      for (const key in inputRefs.current) {
        data[key] = inputRefs.current[key]?.value;
      }
      callback(data);
    };

  return { register, handleSubmit };
}
