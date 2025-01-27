/**
 * Program Title: utils.ts
 * Programmers: Khent Alba
 * 
 * Where the program fits in the general software design:
 * - This file contains utility functions to be used globally.
 * 
 * Date written and revised:
 * - Written: July 17, 2024
 * - Revised: January 26, 2025
 * 
 * Purpose:
 * - The purpose of this file is to provide utility functions to be used globally in the application.
 * 
 * Data Structures used:
 * - simple arrays
 * 
 * Algorithms used:
 * - using twMerge to merge tailwind classes
 * - Random color generation
 * 
 * Control:
 * - Combining class names into a single string
 * - Generating random RGB colors
 */


import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Combines multiple class names into a single string.
 *
 * @param inputs - The class names to be combined.
 * @returns The combined class names as a string.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function generateRandomRGBColors(length: number) {
  const colors: string[] = [];
  for (let i = 0; i < length; i++) {
    colors.push(`rgba(
      ${Math.floor(Math.random() * 255)},
      ${Math.floor(Math.random() * 255)},
      ${Math.floor(Math.random() * 255)},
      0.5
    )`);
  }
  return colors;
}
