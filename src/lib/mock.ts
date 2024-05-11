import { faker } from "@faker-js/faker";

import { Department } from "@/types";

export type Item = {
  [key: string]: any;
  id: string;
  image?: string;
  name: string;
  description?: string;
  quantity: number;
  price: number;
  dateAdded: Date;
  dateUpdated: Date;
  category: Department;
};

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
      name: faker.commerce.productName(),
      description: faker.commerce.productDescription(),
      quantity: faker.number.int(400),
      price: parseFloat(faker.commerce.price({ min: 100, max: 10_000, dec: 2 })),
      dateAdded,
      dateUpdated: dateAdded,
      category: getRandomDepartment(),
    };
  });
}

let data = createFakeItems(20);

export async function fetchData() {
  // Simulate some network latency
  await new Promise((r) => setTimeout(r, 1000));
  return data;
  // throw new Error("Failed to fetch data");
}

export async function createData(newData: Item): Promise<void> {
  // Simulate some network latency
  await new Promise((r) => setTimeout(r, 1000));
  data = [newData, ...data];
}

export async function updateData({ itemID, updatedData }: { itemID: string; updatedData: Item }): Promise<void> {
  // Simulate some network latency
  await new Promise((r) => setTimeout(r, 1000));
  data = data.map((item) => (item.id === itemID ? updatedData : item));
}

export async function deleteData(selectedIDs: string[]): Promise<void> {
  // Simulate some network latency
  await new Promise((r) => setTimeout(r, 1000));
  data = data.filter((item) => !selectedIDs.includes(item.id));
}
