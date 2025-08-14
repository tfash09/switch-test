export type loginFormData = {
  email: string;
  password: string;
};

export type transactionFormData = {
  accountId: string;
  destinationAccount: string;
  description: string;
  amount: number;
  category: string;
};
