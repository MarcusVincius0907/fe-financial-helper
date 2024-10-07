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
    budget: number;
}

export interface CategoryForm {
    value: string;
    text: string;
    budget: number;
}

export interface TrasactionChart {
    mostVisited: string;
    mostExpensive: string;
    mostSpentCategory: string;
    overHungredSpent: number;

    categoryChart: { label: string; data: number }[];
    currentMonthExpense: { label: string; data: number }[];
    budgetByCategory: BudgetChart[];
    lastBoughtItems: TransactionItem[];
}

export interface BudgetChart {
    category: string;
    expected: number;
    current: number;
}
