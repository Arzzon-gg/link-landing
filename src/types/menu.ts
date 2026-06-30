export interface PublicMenuItem {
  id: number;
  name: string;
  description: string | null;
  basePrice: number;
  isAvailable: boolean;
  sortOrder: number;
  imageUrl: string | null;
}

export interface PublicMenuCategory {
  id: number;
  name: string;
  imageUrl: string | null;
  sortOrder: number;
  sectionId: number | null;
  items: PublicMenuItem[];
}

export interface PublicMenuSection {
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
  sections: PublicMenuSection[];
  categories: PublicMenuCategory[];
  uncategorizedItems: PublicMenuItem[];
}
