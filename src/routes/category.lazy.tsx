/**
 * Program Title: category.lazy.tsx
 * Programmers: Khent Alba
 * 
 * Where the program fits in the general software design:
 * - This file contains the lazy-loaded route for the "/category" path.
 * 
 * Date written and revised:
 * - Written: July 17, 2024
 * - Revised: January 26, 2025
 * 
 * Purpose:
 * - The purpose of this file is to provide a lazy-loaded route for the "/category" path.
 * 
 * Data Structures used:
 * - React Router: Used to create a lazy-loaded route for the "/category" path.
 * 
 * Algorithms used:
 * - Lazy Loading: The route is lazy-loaded using React Router's createLazyFileRoute function.
 */


import CategoryTable from "@/components/category/CategoryTable";
import { createLazyFileRoute } from "@tanstack/react-router";

/** Represents a lazy-loaded route for the "/category" path. */
export const Route = createLazyFileRoute("/category")({
  component: CategoryTable,
});
