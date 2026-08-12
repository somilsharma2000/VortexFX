import { toast as sonnerToast } from "sonner";

// Minimal useToast hook backed by sonner, matching the shadcn-style
// `{ toast } = useToast()` + `toast({ title, description, variant })` API.
export function useToast() {
  const toast = ({ title, description, variant }) => {
    if (variant === "destructive") {
      sonnerToast.error(title, { description });
    } else {
      sonnerToast(title, { description });
    }
  };
  return { toast };
}