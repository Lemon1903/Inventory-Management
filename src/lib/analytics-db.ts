/**
 * Program Title: analytics-db.ts
 * Programmers: Khent Alba
 * 
 * Where the program fits in the general software design:
 * - This file contains functions for fetching analytics data from the database.
 * 
 * Date written and revised:
 * - Written: July 17, 2024
 * - Revised: January 26, 2025
 * 
 * Purpose:
 * - The purpose of this file is to provide functions for fetching analytics data from the database.
 * 
 * Data Structures used:
 * - InventoryLvlCategory interface (represents inventory level category analytics).
 * - InventoryLvlProduct interface (represents inventory level product analytics).
 * - RevenueByCategory interface (represents revenue by category analytics).
 * - RevenueByProduct interface (represents revenue by product analytics).
 * - SoldByCategory interface (represents items sold by category analytics).
 * - SoldByProduct interface (represents items sold by product analytics).
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


import {
  InventoryLvlCategory,
  InventoryLvlProduct,
  RevenueByCategory,
  RevenueByProduct,
  SoldByCategory,
  SoldByProduct,
} from "@/types";

/**
 * Fetches the inventory level products analytics.
 *
 * @returns {Promise<InventoryLvlProduct[]>} The inventory level products analytics.
 */
export async function fetchInventoryLvlProduct(): Promise<InventoryLvlProduct[]> {
  try {
    const response = await fetch(`${import.meta.env.VITE_DOMAIN}/api/Analytics/inventory-levels-product`);
    if (!response.ok) throw new Error(response.statusText);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching inventory level products analytics:", error);
    throw error;
  }
}

/**
 * Fetches the inventory level category analytics.
 *
 * @returns {Promise<InventoryLvlCategory[]>} The inventory level category analytics.
 */
export async function fetchInventoryLvlCategory(): Promise<InventoryLvlCategory[]> {
  try {
    const response = await fetch(`${import.meta.env.VITE_DOMAIN}/api/Analytics/inventory-levels-category`);
    if (!response.ok) throw new Error(response.statusText);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching inventory level category analytics:", error);
    throw error;
  }
}

/**
 * Fetches the total revenue analytics.
 *
 * @returns {Promise<number>} The total revenue analytics.
 */
export async function fetchTotalRevenue(): Promise<number> {
  try {
    const response = await fetch(`${import.meta.env.VITE_DOMAIN}/api/Analytics/total-revenue`);
    if (!response.ok) throw new Error(response.statusText);
    const data = await response.json();
    return data.totalRevenue;
  } catch (error) {
    console.error("Error fetching total revenue analytics:", error);
    throw error;
  }
}

/**
 * Fetches the total products sold analytics.
 *
 * @returns {Promise<number>} The total products sold analytics.
 */
export async function fetchTotalProductsSold(): Promise<number> {
  try {
    const response = await fetch(`${import.meta.env.VITE_DOMAIN}/api/Analytics/total-items-sold`);
    if (!response.ok) throw new Error(response.statusText);
    const data = await response.json();
    return data.totalItemsSold;
  } catch (error) {
    console.error("Error fetching total products sold analytics:", error);
    throw error;
  }
}

/**
 * Fetches the total orders analytics.
 *
 * @returns {Promise<number>} The total orders analytics.
 */
export async function fetchRevenueByProduct(): Promise<RevenueByProduct[]> {
  try {
    const response = await fetch(`${import.meta.env.VITE_DOMAIN}/api/Analytics/revenue-by-product`);
    if (!response.ok) throw new Error(response.statusText);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching revenue by product analytics:", error);
    throw error;
  }
}

/**
 * Fetches the revenue by category analytics.
 *
 * @returns {Promise<RevenueByCategory[]>} The revenue by category analytics.
 */
export async function fetchRevenueByCategory(): Promise<RevenueByCategory[]> {
  try {
    const response = await fetch(`${import.meta.env.VITE_DOMAIN}/api/Analytics/revenue-by-category`);
    if (!response.ok) throw new Error(response.statusText);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching revenue by category analytics:", error);
    throw error;
  }
}

/**
 * Fetches the items sold by product analytics.
 *
 * @returns {Promise<SoldByProduct[]>} The items sold by product analytics.
 */
export async function fetchSoldByProduct(): Promise<SoldByProduct[]> {
  try {
    const response = await fetch(`${import.meta.env.VITE_DOMAIN}/api/Analytics/items-sold-product`);
    if (!response.ok) throw new Error(response.statusText);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching items sold by product analytics:", error);
    throw error;
  }
}

/**
 * Fetches the items sold by category analytics.
 *
 * @returns {Promise<SoldByCategory[]>} The items sold by category analytics.
 */
export async function fetchSoldByCategory(): Promise<SoldByCategory[]> {
  try {
    const response = await fetch(`${import.meta.env.VITE_DOMAIN}/api/Analytics/items-sold-category`);
    if (!response.ok) throw new Error(response.statusText);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching items sold by category analytics:", error);
    throw error;
  }
}
