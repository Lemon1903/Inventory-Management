/**
 * Program Title: sales-db.ts
 * Programmers: Khent Alba
 * 
 * Where the program fits in the general software design:
 * - This file contains functions for fetching sales data from the database.
 * 
 * Date written and revised:
 * - Written: July 17, 2024
 * - Revised: January 26, 2025
 * 
 * Purpose:
 * - The purpose of this file is to provide functions for fetching sales data from the database.
 * 
 * Data Structures used:
 * - Sale interface (represents a sale object).
 * 
 * Algorithms used:
 * - Asynchronous data fetching using fetch API.
 * - Error handling for failed fetch requests.
 * 
 * Control:
 * - Fetching data from the API using fetch.
 * - Handling response data and errors.
 * - Exporting functions for use in other files.
 */


import { PartialSale, Sale } from "@/types";

/**
 * Fetches the sales from the API.
 *
 * @returns A promise that resolves to an array of Sale objects.
 * @throws If there is an error fetching the sales.
 */
export async function fetchSales(): Promise<Sale[]> {
  try {
    const response = await fetch(`${import.meta.env.VITE_DOMAIN}/api/Sales`);
    if (!response.ok) throw new Error(response.statusText);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching sales:", error);
    throw error;
  }
}

/**
 * Creates a new sale.
 *
 * @param newData - The data for the new sale.
 * @returns A promise that resolves when the sale is created successfully.
 * @throws If there is an error creating the sale.
 */
export async function createSale(newData: PartialSale) {
  try {
    const response = await fetch(`${import.meta.env.VITE_DOMAIN}/api/Sales`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newData),
    });
    if (!response.ok) throw new Error(response.statusText);
  } catch (error) {
    console.error("Error creating sale:", error);
    throw error;
  }
}
