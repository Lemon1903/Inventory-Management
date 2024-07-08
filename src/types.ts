/** Represents an item in the inventory. */
export type Item = {
  [key: string]: any;
  id: number;
  img?: string;
  name: string;
  description: string;
  quantity: number;
  unitPrice: number;
  dateAdded: string;
  categoryId: number;
  category: Category;
};

export type PartialItem = Omit<Item, "id" | "dateAdded">;

/** Represents a sale in the inventory. */
export type Sale = {
  [key: string]: any;
  id: number;
  product: Item;
  productId: number;
  quantitySold: number;
  totalPrice: number;
  dateAdded: Date;
};

export type PartialSale = Omit<Sale, "id" | "dateAdded" | "totalPrice">;

/** Represents a category in the inventory. */
export type Category = {
  [key: string]: any;
  id: number;
  name: string;
};

export type PartialCategory = Omit<Category, "id">;

export type InventoryLvlProduct = {
  name: string;
  quantity: number;
};

export type InventoryLvlCategory = {
  name: string;
  quantity: number;
};

export type RevenueByProduct = {
  itemName: string;
  revenue: number;
};

export type RevenueByCategory = {
  itemName: string;
  revenue: number;
};

export type SoldByProduct = {
  itemName: string;
  quantitySold: number;
};

export type SoldByCategory = {
  itemName: string;
  quantitySold: number;
};
