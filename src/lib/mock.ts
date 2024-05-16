import { faker } from "@faker-js/faker";

import { Department, Item, ProductNames, Sale } from "@/types";

function getRandomProductName(): ProductNames {
  const productNames = Object.values(ProductNames);
  const randomIndex = Math.floor(Math.random() * productNames.length);
  return productNames[randomIndex];
}

/* ----- Items ----- */

function getRandomDepartment(): Department {
  const departments = Object.values(Department);
  const randomIndex = Math.floor(Math.random() * departments.length);
  return departments[randomIndex];
}

function createFakeItems(count: number): Item[] {
  return Array.from({ length: count }, () => {
    const dateAdded = faker.date.past();
    return {
      id: faker.string.uuid(),
      image: faker.image.url(),
      name: getRandomProductName(),
      description: faker.commerce.productDescription(),
      quantity: faker.number.int(400),
      price: parseFloat(faker.commerce.price({ min: 100, max: 10_000, dec: 2 })),
      dateAdded,
      dateUpdated: dateAdded,
      category: getRandomDepartment(),
    };
  });
}

let itemsData = createFakeItems(20);

export async function fetchItems() {
  // Simulate some network latency
  // await new Promise((r) => setTimeout(r, 1000));
  // return itemsData;
  // throw new Error("Failed to fetch data");
  const response = await fetch(`${import.meta.env.VITE_DOMAIN}/api/products`);
  const data = await response.json();
  return data;
}

export async function createItem(newData: Item): Promise<void> {
  // Simulate some network latency
  // await new Promise((r) => setTimeout(r, 1000));
  // itemsData = [newData, ...itemsData];
  fetch(`${import.meta.env.VITE_DOMAIN}/api/products`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newData),
  });
  // const data = await response.json();
  // return data;
}

export async function updateItem({ itemID, updatedData }: { itemID: string; updatedData: Item }): Promise<void> {
  // Simulate some network latency
  // await new Promise((r) => setTimeout(r, 1000));
  // itemsData = itemsData.map((item) => (item.id === itemID ? updatedData : item));
  fetch(`${import.meta.env.VITE_DOMAIN}/api/products/${itemID}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updatedData),
  });
}

export async function deleteItems(selectedIDs: string[]): Promise<void> {
  // Simulate some network latency
  // await new Promise((r) => setTimeout(r, 1000));
  // itemsData = itemsData.filter((item) => !selectedIDs.includes(item.id));
  selectedIDs.forEach(async (id) => {
    fetch(`${import.meta.env.VITE_DOMAIN}/api/products/${id}`, {
      method: "DELETE",
    });
  });
}

/* ----- Sales ----- */

function createFakeSales(count: number): Sale[] {
  return Array.from({ length: count }, () => {
    return {
      id: faker.string.uuid(),
      name: getRandomProductName(),
      sold: faker.number.int(100),
      total: parseFloat(faker.commerce.price({ min: 100, max: 10_000, dec: 2 })),
      date: faker.date.past(),
    };
  });
}

let salesData = createFakeSales(20);

export async function fetchSales() {
  // Simulate some network latency
  await new Promise((r) => setTimeout(r, 1000));
  return salesData;
  // throw new Error("Failed to fetch data");
}

export async function createSale(newData: Sale): Promise<void> {
  // Simulate some network latency
  await new Promise((r) => setTimeout(r, 1000));
  salesData = [newData, ...salesData];
}

export async function updateSale({ saleID, updatedData }: { saleID: string; updatedData: Sale }): Promise<void> {
  // Simulate some network latency
  await new Promise((r) => setTimeout(r, 1000));
  salesData = salesData.map((sale) => (sale.id === saleID ? updatedData : sale));
}

export async function deleteSales(selectedIDs: string[]): Promise<void> {
  // Simulate some network latency
  await new Promise((r) => setTimeout(r, 1000));
  salesData = salesData.filter((sale) => !selectedIDs.includes(sale.id));
}
