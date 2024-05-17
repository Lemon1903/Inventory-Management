export type Item = {
  [key: string]: any;
  // id: string;
  id: number;
  imgData?: string;
  name: string;
  description?: string;
  quantity: number;
  unitPrice: number;
  dateAdded: Date;
  // dateUpdated: Date;
  category: Department;
};

export type PartialItem = Omit<Item, "id" | "dateAdded">;

export type Sale = {
  [key: string]: any;
  id: number;
  name: ProductNames;
  sold: number;
  total: number;
  date: Date;
};

export enum Department {
  Electronics = "Electronics",
  Groceries = "Groceries",
  Clothing = "Clothing",
  Books = "Books",
  Movies = "Movies",
  Music = "Music",
  Games = "Games",
  Sports = "Sports",
  Outdoors = "Outdoors",
  Automotive = "Automotive",
  Industrial = "Industrial",
  Toys = "Toys",
  Beauty = "Beauty",
  Health = "Health",
  Home = "Home",
  Garden = "Garden",
  Tools = "Tools",
  Kids = "Kids",
  Baby = "Baby",
  Shoes = "Shoes",
  Jewelry = "Jewelry",
  Watches = "Watches",
  Pet = "Pet",
  Grocery = "Grocery",
}
export enum ProductNames {
  EcoFriendlyShampoo = "EcoFriendlyShampoo",
  WirelessEarbuds = "WirelessEarbuds",
  OrganicCoffeeBeans = "OrganicCoffeeBeans",
  FitnessTrackerWatch = "FitnessTrackerWatch",
  ErgonomicOfficeChair = "ErgonomicOfficeChair",
  PortableBluetoothSpeaker = "PortableBluetoothSpeaker",
  StainlessSteelWaterBottle = "StainlessSteelWaterBottle",
  VeganLeatherBoots = "VeganLeatherBoots",
  HandmadeWoodenClock = "HandmadeWoodenClock",
  RecycledPlasticSunglasses = "RecycledPlasticSunglasses",
  NaturalBambooToothbrush = "NaturalBambooToothbrush",
  ReusableShoppingBag = "ReusableShoppingBag",
  SolarPoweredCharger = "SolarPoweredCharger",
  BiodegradablePhoneCase = "BiodegradablePhoneCase",
  OrganicCottonTShirt = "OrganicCottonTShirt",
  NonToxicYogaMat = "NonToxicYogaMat",
  FairTradeChocolate = "FairTradeChocolate",
  SustainableWineCorkscrew = "SustainableWineCorkscrew",
  LaundryDetergent = "LaundryDetergent",
  RecycledPaperNotebook = "RecycledPaperNotebook",
}
