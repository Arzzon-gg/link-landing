export interface PublicMenuItem {
  id: number;
  name: string;
  description: string | null;
  basePrice: number;
  isAvailable: boolean;
  sortOrder: number;
  imageUrl: string | null;
  isCombo: boolean;
  comboItems: PublicMenuComboItem[];
  menuId: number | null;
}

export interface PublicMenuComboItem {
  id: number;
  name: string;
}

export interface PublicMenuCategory {
  id: number;
  name: string;
  imageUrl: string | null;
  sortOrder: number;
  sectionId: number | null;
  menuId: number | null;
  items: PublicMenuItem[];
}

export interface PublicMenuSection {
  id: number;
  name: string;
  sortOrder: number;
  menuId: number | null;
}

export interface PublicMenuCatalog {
  id: number;
  name: string;
  sortOrder: number;
}

export interface PublicMenuBranch {
  id: number | null;
  name: string;
  location: string;
}

export interface PublicMenuData {
  branch: PublicMenuBranch;
  generatedAtUtc: string;
  menus: PublicMenuCatalog[];
  sections: PublicMenuSection[];
  categories: PublicMenuCategory[];
  uncategorizedItems: PublicMenuItem[];
  promotions: PublicPromotion[];
}

export interface PublicPromotion {
  id: number;
  imageUrl: string;
  altText: string | null;
  sortOrder: number;
  menuItemId: number | null;
}
