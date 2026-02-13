'use client';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

type LibraryButtonProps = {
  onClick: () => void;
  variant: 'add' | 'remove' | 'edit';
  children: React.ReactNode;
};

export function LibraryButton({
  onClick,
  variant,
  children,
}: LibraryButtonProps) {
  const variantStyles = {
    add: 'bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700',
    remove: 'bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700',
    edit: 'bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600',
  };

  return (
    <Button
      onClick={onClick}
      className={cn(
        'text-white cursor-pointer font-medium',
        variantStyles[variant]
      )}
    >
      {children}
    </Button>
  );
}