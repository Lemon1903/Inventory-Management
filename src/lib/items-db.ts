import { PartialItem } from "@/types";

interface IUpdateItem {
  itemID: number;
  updatedData: PartialItem;
}

export async function fetchItems() {
  try {
    const response = await fetch(`${import.meta.env.VITE_DOMAIN}/api/products`);
    if (!response.ok) throw new Error(response.statusText);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching items:", error);
    throw error;
  }
}

export async function createItem(newData: PartialItem): Promise<void> {
  try {
    const response = await fetch(`${import.meta.env.VITE_DOMAIN}/api/products`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newData),
    });
    if (!response.ok) throw new Error(response.statusText);
  } catch (error) {
    console.error("Error creating item:", error);
    throw error;
  }
}

export async function updateItem({ itemID, updatedData }: IUpdateItem): Promise<void> {
  try {
    const response = await fetch(`${import.meta.env.VITE_DOMAIN}/api/products/${itemID}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedData),
    });
    if (!response.ok) throw new Error(response.statusText);
  } catch (error) {
    console.error("Error updating item:", error);
    throw error;
  }
}

export async function deleteItems(selectedIDs: number[]): Promise<void> {
  try {
    await Promise.all(
      selectedIDs.map(async (id) => {
        const response = await fetch(`${import.meta.env.VITE_DOMAIN}/api/products/${id}`, {
          method: "DELETE",
        });
        if (!response.ok) throw new Error(response.statusText);
      }),
    );
  } catch (error) {
    console.error("Error deleting items:", error);
    throw error;
  }
}
