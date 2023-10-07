import { twMerge } from 'tailwind-merge';
import { ClassArray, clsx } from 'clsx';


export default function cn(...args: ClassArray): string {
  return twMerge(clsx(...args.filter(Boolean)));
}
