// src/hooks/use-toast.ts (or wherever you prefer to put it)
import { create } from 'zustand';
import { type ToastProps } from './toast'; // Assuming toast.tsx is in the same directory

type Toast = ToastProps & {
  id: string;
  title?: React.ReactNode;
  description?: React.ReactNode;
  action?: React.ReactElement;
  onOpenChange?: (open: boolean) => void;
};

type State = {
  toasts: Toast[];
};

type Actions = {
  addToast: (toast: Toast) => void;
  updateToast: (toast: Toast) => void;
  removeToast: (id: string) => void;
};

const toastStore = create<State & Actions>((set) => ({
  toasts: [],
  addToast: (toast) =>
    set((state) => ({
      toasts: [...state.toasts, { id: Math.random().toString(36).substring(2, 9), ...toast }],
    })),
  updateToast: (toast) =>
    set((state) => ({
      toasts: state.toasts.map((t) => (t.id === toast.id ? { ...t, ...toast } : t)),
    })),
  removeToast: (id) =>
    set((state) => ({
      toasts: state.toasts.filter((toast) => toast.id !== id),
    })),
}));

export function useToast() {
  const { toasts, addToast, updateToast, removeToast } = toastStore();

  return {
    toasts,
    toast: ({ ...props }) => {
      const id = Math.random().toString(36).substring(2, 9);
      addToast({ id, ...props });
      return {
        id: id,
        dismiss: () => removeToast(id),
        update: (props) => updateToast({ id, ...props }),
      };
    },
  };
}