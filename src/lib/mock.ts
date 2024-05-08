import { faker } from "@faker-js/faker";

export type Item = {
  id: string;
  image: string;
  name: string;
  description: string;
  quantity: number;
  price: number;
  dateAdded: Date;
  category: string;
};

export function createFakeItems(count: number): Item[] {
  return Array.from({ length: count }, () => ({
    id: faker.string.uuid(),
    image: faker.image.url(),
    name: faker.commerce.productName(),
    description: faker.commerce.productDescription(),
    quantity: faker.number.int(400),
    price: parseFloat(faker.commerce.price({ min: 100, max: 10_000, dec: 2 })),
    dateAdded: faker.date.past(),
    category: faker.commerce.department(),
  }));
}
