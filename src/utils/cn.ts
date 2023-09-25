import { twMerge } from 'tailwind-merge';
import { clsx } from 'clsx';

type CNArgs = (string | undefined | false | null | CNArgs[])[];

export default function cn(...args: CNArgs) {
  return twMerge(clsx(...args.filter(Boolean)));
}
