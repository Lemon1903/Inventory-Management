/**
 * Program Title: products.lazy.tsx
 * Programmers: Khent Alba
 * 
 * Where the program fits in the general software design:
 * - This file contains the lazy-loaded route for the "/products" path.
 * 
 * Date written and revised:
 * - Written: July 17, 2024
 * - Revised: January 26, 2025
 * 
 * Purpose:
 * - The purpose of this file is to provide a lazy-loaded route for the "/products" path.
 * 
 * Data Structures used:
 * - React Router: Used to create a lazy-loaded route for the "/products" path.
 * 
 * Algorithms used:
 * - Lazy Loading: The route is lazy-loaded using React Router's createLazyFileRoute function.
 */


import { createLazyFileRoute } from "@tanstack/react-router";

import ItemTable from "@/components/items/ItemTable";

/** Represents a lazy-loaded route for the "/products" path. */
export const Route = createLazyFileRoute("/products")({
  component: ItemTable,
});
