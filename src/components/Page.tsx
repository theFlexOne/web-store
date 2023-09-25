import clsx from 'clsx';
import { ClassValue } from 'clsx';
import { HTMLAttributes, forwardRef, ForwardedRef } from 'react';
import { twMerge } from 'tailwind-merge';

interface PageProps extends HTMLAttributes<HTMLDivElement> {}

function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(...inputs));
}

const Page = forwardRef(
  (
    { children, className, ...rest }: PageProps,
    ref: ForwardedRef<HTMLDivElement>
  ) => {
    return (
      <div
        ref={ref}
        className={cn('flex flex-col min-h-full', className)}
        {...rest}
      >
        {children}
      </div>
    );
  }
);

export default Page;
