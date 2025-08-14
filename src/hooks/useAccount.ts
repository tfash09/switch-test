import { transactions } from "@/data/mockData";
import type { transactionFormData } from "@/lib/formData";
import type { Transaction } from "@/lib/interfaces";

export const useAccount = () => {
  const getAccounts = async () => {
    await new Promise((resolve) => setTimeout(resolve, 2000));
    return {
      success: true,
      message: "Login successful",
      data: [
        {
          id: "acc_001",
          type: "Savings",
          accountNumber: "1234567890123456",
          balance: 25750.5,
          currency: "NGN",
          lastTransactionDate: "2024-01-15",
        },
        {
          id: "acc_002",
          type: "Current",
          accountNumber: "2345678901234567",
          balance: 8932.25,
          currency: "NGN",
          lastTransactionDate: "2024-01-16",
        },
        {
          id: "acc_003",
          type: "Loan",
          accountNumber: "3456789012345678",
          balance: 1500.0,
          currency: "NGN",
          lastTransactionDate: "2024-02-01",
        },
        {
          id: "acc_004",
          type: "Savings",
          accountNumber: "4567890123456789",
          balance: 102340.75,
          currency: "NGN",
          lastTransactionDate: "2024-02-10",
        },
        {
          id: "acc_005",
          type: "Current",
          accountNumber: "5678901234567890",
          balance: 500000.0,
          currency: "NGN",
          lastTransactionDate: "2024-03-05",
        },
        {
          id: "acc_006",
          type: "Savings",
          accountNumber: "6789012345678901",
          balance: 75000.25,
          currency: "NGN",
          lastTransactionDate: "2024-03-15",
        },
      ],
    };
  };

  const getAllTransactions = async () => {
    await new Promise((resolve) => setTimeout(resolve, 2000));
    return {
      success: true,
      message: "Login successful",
      data: transactions,
    };
  };

  const getTransactionsByAccountId = async (accountId: string) => {
    await new Promise((resolve) => setTimeout(resolve, 2000));
    const accountTransactions =
      transactions[accountId as keyof typeof transactions] || [];
    return {
      success: true,
      message: "Login successful",
      data: accountTransactions,
    };
  };

  const addTransaction = async (transaction: transactionFormData) => {
    const accTrans = await getTransactionsByAccountId(transaction.accountId);
    if (!accTrans.success || accTrans.data?.length === 0) {
      return {
        success: false,
        message: "Account not found",
      };
    }
    const lastBalance = accTrans.data[accTrans.data.length - 1]?.balance || 0;
    const data: Transaction = {
      id: `txn_${Math.random().toString(36).substring(2, 15)}`,
      date: new Date().toISOString(),
      description: transaction.description || "No description",
      type: "debit",
      amount: Number(transaction.amount),
      balance: lastBalance - transaction.amount,
      category: transaction.category || "Uncategorized",
    };
    accTrans.data.push(data);
    transactions[transaction.accountId as keyof typeof transactions] =
      accTrans.data;

    return {
      success: true,
      message: "Transaction added successfully",
    };
  };

  return {
    getAccounts,
    getAllTransactions,
    getTransactionsByAccountId,
    addTransaction,
  };
};
