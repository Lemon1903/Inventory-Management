import { Item, PartialItem } from "@/types";

interface IUpdateItem {
  itemID: number;
  updatedData: PartialItem;
}

/**
 * Fetches the items from the API.
 *
 * @returns A promise that resolves to an array of Item objects.
 * @throws If there is an error fetching the items.
 */
export async function fetchItems(): Promise<Item[]> {
  try {
    const response = await fetch(`${import.meta.env.VITE_DOMAIN}/api/Products`);
    if (!response.ok) throw new Error(response.statusText);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching items:", error);
    throw error;
  }
}

/**
 * Creates a new item.
 *
 * @param newData - The data for the new item.
 * @returns A promise that resolves when the item is created successfully.
 * @throws If there is an error creating the item.
 */
export async function createItem(newData: PartialItem): Promise<void> {
  try {
    const response = await fetch(`${import.meta.env.VITE_DOMAIN}/api/Products`, {
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

/**
 * Updates a item in the database.
 *
 * @param {IUpdateItem} options - The options for updating the item.
 * @param {string} options.itemID - The ID of the item to update.
 * @param {PartialItem} options.updatedData - The updated data for the item.
 * @returns {Promise<void>} - A promise that resolves when the item is updated successfully.
 * @throws {Error} - If there is an error updating the item.
 */
export async function updateItem({ itemID, updatedData }: IUpdateItem): Promise<void> {
  try {
    const response = await fetch(`${import.meta.env.VITE_DOMAIN}/api/Products/${itemID}`, {
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

/**
 * Deletes items with the specified IDs from the server.
 *
 * @param selectedIDs - An array of numbers representing the IDs of the items to delete.
 * @returns A Promise that resolves when all items have been successfully deleted.
 * @throws If there is an error while deleting the items.
 */
export async function deleteItems(selectedIDs: number[]): Promise<void> {
  try {
    await Promise.all(
      selectedIDs.map(async (id) => {
        const response = await fetch(`${import.meta.env.VITE_DOMAIN}/api/Products/${id}`, {
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
