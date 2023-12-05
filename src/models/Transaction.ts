export interface TransactionItem {
  id: string;
  externalId: string;
  description: string;
  amount: string;
  date: string;
  category: string;
}

export interface CategoryItem {
  id: string;
  value: string;
  text: string;
}
