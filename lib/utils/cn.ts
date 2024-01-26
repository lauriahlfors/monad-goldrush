import { ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/** Tailwind helper function to merge tailwind classes together
 *  intelligently.
 *  @param inputs
 *  @returns
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
