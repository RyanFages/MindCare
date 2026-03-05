/**
 * Utility Functions
 */

import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Merge Tailwind CSS classes with clsx
 * Handles class name conflicts intelligently
 */
export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}
