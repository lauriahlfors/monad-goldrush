import { cn } from '@/lib/utils/cn';
import { ButtonHTMLAttributes, forwardRef } from 'react';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  variant?: 'small' | 'large';
  onClick?: () => void;
  children?: React.ReactNode;
}

/**
 * Reusable game button component.
 */
const GameButton = forwardRef<HTMLButtonElement, Props>(
  ({ className, variant, onClick, children }, ref) => {
    const variants = {
      small: 'w-16',
      large: 'w-48',
    };

    return (
      <button
        className={cn(
          'border-akvamariini-500 bg-akvamariini-900 text-akvamariini-50 hover:bg-akvamariini-50 shadow-akvamariini-900 hover:text-akvamariini-500 h-16 w-16 rounded-xl border-2 text-xl font-semibold shadow-lg',
          className,
          variant && variants[variant]
        )}
        type={'submit'}
        onClick={onClick}
        ref={ref}
      >
        {children}
      </button>
    );
  }
);

GameButton.displayName = 'Button';

export default GameButton;
