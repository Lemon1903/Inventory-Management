// import { faker } from "@faker-js/faker";

// import { Category, Item, PartialCategory } from "@/types";

// function getRandomProductName(): ProductNames {
//   const productNames = Object.values(ProductNames);
//   const randomIndex = Math.floor(Math.random() * productNames.length);
//   return productNames[randomIndex];
// }

// /* ----- Items ----- */

// function getRandomDepartment(): Department {
//   const departments = Object.values(Department);
//   const randomIndex = Math.floor(Math.random() * departments.length);
//   return departments[randomIndex];
// }

// function createFakeItems(count: number): Item[] {
//   return Array.from({ length: count }, () => {
//     const dateAdded = faker.date.past().toDateString();
//     return {
//       id: faker.number.int(),
//       imgData: faker.image.url(),
//       name: getRandomProductName(),
//       description: faker.commerce.productDescription(),
//       quantity: faker.number.int(400),
//       unitPrice: parseFloat(faker.commerce.price({ min: 100, max: 10_000, dec: 2 })),
//       dateAdded,
//       dateUpdated: dateAdded,
//       category: getRandomDepartment(),
//     };
//   });
// }

// let itemsData = createFakeItems(20);

// export async function fetchItems() {
//   // Simulate some network latency
//   await new Promise((r) => setTimeout(r, 1000));
//   return itemsData;
//   // throw new Error("Failed to fetch data");
// }

// export async function createItem(newData: Item) {
//   // Simulate some network latency
//   await new Promise((r) => setTimeout(r, 1000));
//   itemsData = [newData, ...itemsData];
// }

// export async function updateItem({ itemID, updatedData }: { itemID: number; updatedData: Item }) {
//   // Simulate some network latency
//   // await new Promise((r) => setTimeout(r, 1000));
//   // itemsData = itemsData.map((item) => (item.id === itemID ? updatedData : item));
//   const { id, ...rest } = updatedData;
//   fetch(`${import.meta.env.VITE_DOMAIN}/api/products/${itemID}`, {
//     method: "PUT",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify(rest),
//   });
// }

// export async function deleteItems(selectedIDs: number[]) {
//   // Simulate some network latency
//   await new Promise((r) => setTimeout(r, 1000));
//   itemsData = itemsData.filter((item) => !selectedIDs.includes(item.id));
// }

// /* ----- Sales ----- */

// // function createFakeSales(count: number): Sale[] {
// //   return Array.from({ length: count }, () => {
// //     return {
// //       id: faker.number.int(),
// //       name: itemsData[faker.number.int(20) - 1],
// //       sold: faker.number.int(100),
// //       total: parseFloat(faker.commerce.price({ min: 100, max: 10_000, dec: 2 })),
// //       date: faker.date.past(),
// //     };
// //   });
// // }

// // let salesData = createFakeSales(20);

// // export async function fetchSales() {
// //   // Simulate some network latency
// //   await new Promise((r) => setTimeout(r, 1000));
// //   return salesData;
// //   // throw new Error("Failed to fetch data");
// // }

// // export async function createSale(newData: Sale) {
// //   // Simulate some network latency
// //   await new Promise((r) => setTimeout(r, 1000));
// //   salesData = [newData, ...salesData];
// // }

// // export async function updateSale({ saleID, updatedData }: { saleID: number; updatedData: Sale }) {
// //   // Simulate some network latency
// //   await new Promise((r) => setTimeout(r, 1000));
// //   salesData = salesData.map((sale) => (sale.id === saleID ? updatedData : sale));
// // }

// // export async function deleteSales(selectedIDs: number[]) {
// //   // Simulate some network latency
// //   await new Promise((r) => setTimeout(r, 1000));
// //   salesData = salesData.filter((sale) => !selectedIDs.includes(sale.id));
// // }

// /* ----- Category ----- */

// function createFakeCategories(): Category[] {
//   return [
//     { id: 1, name: "Electronics" },
//     { id: 2, name: "Groceries" },
//     { id: 3, name: "Clothing" },
//     { id: 4, name: "Books" },
//     { id: 5, name: "Movies" },
//     { id: 6, name: "Music" },
//     { id: 7, name: "Games" },
//     { id: 8, name: "Sports" },
//     { id: 9, name: "Outdoors" },
//     { id: 10, name: "Automotive" },
//   ];
// }

// let categoriesData = createFakeCategories();

// export async function fetchCategories() {
//   // Simulate some network latency
//   await new Promise((r) => setTimeout(r, 1000));
//   return categoriesData;
// }

// export async function createCategory(newData: PartialCategory) {
//   // Simulate some network latency
//   await new Promise((r) => setTimeout(r, 1000));
//   categoriesData = [{ name: newData["name"], id: faker.number.int() }, ...categoriesData];
// }

// export async function updateCategory({
//   categoryID,
//   updatedData,
// }: {
//   categoryID: number;
//   updatedData: PartialCategory;
// }) {
//   // Simulate some network latency
//   await new Promise((r) => setTimeout(r, 1000));
//   categoriesData = categoriesData.map((category) =>
//     category.id === categoryID ? (updatedData as Category) : category,
//   );
// }

// export async function deleteCategories(selectedIDs: number[]) {
//   // Simulate some network latency
//   await new Promise((r) => setTimeout(r, 1000));
//   categoriesData = categoriesData.filter((category) => !selectedIDs.includes(category.id));
// }
