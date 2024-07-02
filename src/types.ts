/** Represents an item in the inventory. */
export type Item = {
  [key: string]: any;
  id: number;
  imgData?: string;
  name: string;
  description?: string;
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
