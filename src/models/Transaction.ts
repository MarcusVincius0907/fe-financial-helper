export interface TransactionItem {
  _id: string;
  externalId: string;
  description: string;
  amount: string;
  date: string;
  categoryId: string;
}

export interface CategoryItem {
  _id: string;
  value: string;
  text: string;
}

export interface CategoryForm {
  value: string;
  text: string;
}

export interface TrasactionChart {
  labels: string[];
  series: SerieItem[];
}

export interface SerieItem {
  name: string;
  amount: number;
  quantity: number;
}