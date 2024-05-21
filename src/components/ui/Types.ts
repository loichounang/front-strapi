// types.ts

export interface SubCategory {
    id: number;
    sousCategorie: string; // Code de la sous-catégorie
    sousCategorie_Text: string; // Nom de la sous-catégorie
    sousCategorie_Parent: string; // Code de la catégorie parente
    sousCategorie_ParentText: string; // Nom de la catégorie parente
  }
  
  export interface CategoryMap {
    [key: string]: SubCategory[];
  }
  