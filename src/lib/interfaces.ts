export interface Account {
  id: string;
  type: "Savings" | "Current" | "Loan";
  accountNumber: string;
  balance: number;
  currency: string;
  lastTransactionDate: string;
  isActive?: boolean;
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
  setSelectedAccounts: (account: Account) => void;
  selectedAccounts: Account | undefined;
}

export interface AccountTransactionsProps {
  selectedAccounts: Account;
}

export interface UseSessionTimeoutOptions {
  timeoutMinutes?: number;
  warningMinutes?: number;
  onTimeout: () => void;
}

export interface User {
  id: number | null;
  email: string | null;
  name: string | null;
  firstName: string | null;
  middleName: string | null;
  lastName: string | null;
  phoneNumber: string | null;
}

export interface AuthState {
  isAuthenticated: boolean;
  user: User;
  loading: boolean;
  error: string | null;
}
