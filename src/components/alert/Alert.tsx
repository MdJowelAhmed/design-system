import { forwardRef } from 'react';
import { Info, CheckCircle2, AlertTriangle, XCircle, X } from '../../icons/set';
import { cn } from '../../utils';
import { Heading } from '../typography';
import { alertVariants } from './Alert.styles';
import type { AlertProps } from './Alert.types';

const defaultIcons = {
  info: <Info className="text-info-600 dark:text-info-400 h-5 w-5 shrink-0" />,
  success: (
    <CheckCircle2 className="text-success-600 dark:text-success-400 h-5 w-5 shrink-0" />
  ),
  warning: (
    <AlertTriangle className="text-warning-600 dark:text-warning-400 h-5 w-5 shrink-0" />
  ),
  danger: (
    <XCircle className="text-danger-600 dark:text-danger-400 h-5 w-5 shrink-0" />
  ),
};

export const Alert = forwardRef<HTMLDivElement, AlertProps>(
  (
    {
      className,
      variant = 'info',
      title,
      icon,
      onClose,
      action,
      children,
      ...props
    },
    ref,
  ) => {
    const iconToRender =
      icon ?? (variant ? defaultIcons[variant] : defaultIcons.info);

    return (
      <div
        ref={ref}
        role="alert"
        className={cn(alertVariants({ variant, className }))}
        {...props}
      >
        {iconToRender}

        <div className="grid flex-1 gap-1">
          {title && (
            <Heading
              level={5}
              size="sm"
              weight="semibold"
              className="leading-none tracking-tight"
            >
              {title}
            </Heading>
          )}
          {children && (
            <div className="text-sm leading-relaxed opacity-90">{children}</div>
          )}
          {action && <div className="mt-2">{action}</div>}
        </div>

        {onClose && (
          <button
            type="button"
            onClick={onClose}
            aria-label="Dismiss alert"
            className="shrink-0 rounded-lg p-1 transition-opacity hover:opacity-70 focus:ring-2 focus:ring-current focus:outline-none"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>
    );
  },
);

Alert.displayName = 'Alert';
