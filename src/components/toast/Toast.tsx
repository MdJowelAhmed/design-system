import type { ReactNode } from 'react';
import { CheckCircle2, AlertTriangle, XCircle, Info, X } from '../../icons/set';
import { cn } from '../../utils';
import type { StatusVariant } from '../../utils';

export type ToastVariant = StatusVariant;

export interface ToastMessage {
  id: string;
  title: string;
  description?: string;
  variant?: ToastVariant;
  /** Auto-dismiss delay in ms. `Infinity` keeps the toast until dismissed. */
  duration?: number;
}

const variantStyles: Record<
  ToastVariant,
  { surface: string; icon: ReactNode }
> = {
  info: {
    surface:
      'bg-info-50 border-info-200 text-info-900 dark:bg-info-950/80 dark:border-info-800 dark:text-info-200',
    icon: (
      <Info className="text-info-600 dark:text-info-400 h-5 w-5 shrink-0" />
    ),
  },
  success: {
    surface:
      'bg-success-50 border-success-200 text-success-900 dark:bg-success-950/80 dark:border-success-800 dark:text-success-200',
    icon: (
      <CheckCircle2 className="text-success-600 dark:text-success-400 h-5 w-5 shrink-0" />
    ),
  },
  warning: {
    surface:
      'bg-warning-50 border-warning-200 text-warning-900 dark:bg-warning-950/80 dark:border-warning-800 dark:text-warning-200',
    icon: (
      <AlertTriangle className="text-warning-600 dark:text-warning-400 h-5 w-5 shrink-0" />
    ),
  },
  danger: {
    surface:
      'bg-danger-50 border-danger-200 text-danger-900 dark:bg-danger-950/80 dark:border-danger-800 dark:text-danger-200',
    icon: (
      <XCircle className="text-danger-600 dark:text-danger-400 h-5 w-5 shrink-0" />
    ),
  },
};

export interface ToastProps {
  toast: ToastMessage;
  onDismiss: (id: string) => void;
}

export function ToastItem({ toast, onDismiss }: ToastProps) {
  const { id, title, description, variant = 'info' } = toast;
  const style = variantStyles[variant];
  const isUrgent = variant === 'danger' || variant === 'warning';

  return (
    <div
      role={isUrgent ? 'alert' : 'status'}
      aria-live={isUrgent ? 'assertive' : 'polite'}
      className={cn(
        'animate-content-in flex w-full max-w-sm items-start gap-3 rounded-lg border p-4 shadow-lg transition-all duration-300',
        style.surface,
      )}
    >
      {style.icon}
      <div className="flex-1 space-y-1">
        <p className="text-sm leading-none font-semibold">{title}</p>
        {description && <p className="text-xs opacity-90">{description}</p>}
      </div>
      <button
        type="button"
        onClick={() => onDismiss(id)}
        className="focus-ring rounded-md p-1 opacity-70 transition-opacity hover:opacity-100"
        aria-label="Dismiss notification"
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  );
}
