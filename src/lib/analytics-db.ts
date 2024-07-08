import {
  InventoryLvlCategory,
  InventoryLvlProduct,
  RevenueByCategory,
  RevenueByProduct,
  SoldByCategory,
  SoldByProduct,
} from "@/types";

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
