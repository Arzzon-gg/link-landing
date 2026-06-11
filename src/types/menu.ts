export interface PublicMenuModifier {
  id: number;
  name: string;
  additionalPrice: number;
  isAvailable: boolean;
  sortOrder?: number;
}

export interface PublicMenuItem {
  id: number;
  name: string;
  description: string | null;
  basePrice: number;
  isAvailable: boolean;
  sortOrder: number;
  imageUrl: string | null;
  modifiers: PublicMenuModifier[];
}

export interface PublicMenuCategory {
  id: number;
  name: string;
  sortOrder: number;
  items: PublicMenuItem[];
}

export interface PublicMenuBranch {
  id: number | null;
  name: string;
  location: string;
}

export interface PublicMenuData {
  branch: PublicMenuBranch;
  generatedAtUtc: string;
  categories: PublicMenuCategory[];
}
