import { Category, PartialCategory } from "@/types";

interface IUpdateCategory {
  categoryID: number;
  updatedData: PartialCategory;
}

/**
 * Fetches the categories from the API.
 *
 * @returns A promise that resolves to an array of Category objects.
 * @throws If there is an error fetching the categories.
 */
export async function fetchCategories(): Promise<Category[]> {
  try {
    const response = await fetch(`${import.meta.env.VITE_DOMAIN}/api/Categories`);
    if (!response.ok) throw new Error(response.statusText);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching categories:", error);
    throw error;
  }
}

/**
 * Creates a new category.
 *
 * @param newData - The data for the new category.
 * @returns A promise that resolves when the category is created successfully.
 * @throws If there is an error creating the category.
 */
export async function createCategory(newData: PartialCategory): Promise<void> {
  try {
    const response = await fetch(`${import.meta.env.VITE_DOMAIN}/api/Categories`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newData),
    });
    if (!response.ok) throw new Error(response.statusText);
  } catch (error) {
    console.error("Error creating category:", error);
    throw error;
  }
}

/**
 * Updates a category in the database.
 *
 * @param {string} options.categoryID - The ID of the category to update.
 * @param {PartialCategory} options.updatedData - The updated data for the category.
 * @returns {Promise<void>} - A promise that resolves when the category is updated successfully.
 * @throws {Error} - If there is an error updating the category.
 */
export async function updateCategory({ categoryID, updatedData }: IUpdateCategory): Promise<void> {
  try {
    const response = await fetch(`${import.meta.env.VITE_DOMAIN}/api/Categories/${categoryID}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedData),
    });
    if (!response.ok) throw new Error(response.statusText);
  } catch (error) {
    console.error("Error updating category:", error);
    throw error;
  }
}

/**
 * Deletes categories with the specified IDs from the server.
 *
 * @param selectedIDs - An array of numbers representing the IDs of the categories to delete.
 * @returns A Promise that resolves when all categories have been successfully deleted.
 * @throws If there is an error while deleting the categories.
 */
export async function deleteCategories(selectedIDs: number[]): Promise<void> {
  try {
    await Promise.all(
      selectedIDs.map(async (id) => {
        const response = await fetch(`${import.meta.env.VITE_DOMAIN}/api/Categories/${id}`, {
          method: "DELETE",
        });
        if (!response.ok) throw new Error(response.statusText);
      }),
    );
  } catch (error) {
    console.error("Error deleting categories:", error);
    throw error;
  }
}
