export interface Account {
  id: string;
  type: "Savings" | "Current" | "Student" | "Fixed Deposit" | "Corporate";
  accountNumber: string;
  balance: number;
  currency: string;
  lastTransactionDate: string;
}

export type Transaction = {
  id: string;
  date: string;
  description: string;
  type: "credit" | "debit";
  amount: number;
  balance: number;
  category: string;
};

export interface AccountCardProps {
  type: string;
  number: string;
  balance: number;
  lastTransaction: string;
}

export type Option = {
    value: string;
    label: string;
};

export type SelectProps = {
    options: Option[];
    value: string;
    onChange: (value: string) => void;
    label?: string;
};

export interface LoginDetails {
  email: string;
  password: string;
}

export interface AccountCarouselProps {
  accounts: Account[];
}

