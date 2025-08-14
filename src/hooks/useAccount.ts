import { mockAccounts, transactions } from "@/data/mockData";
import type { transactionFormData } from "@/lib/formData";
import type { Transaction } from "@/lib/interfaces";

export const useAccount = () => {
  const getAccounts = async () => {
    await new Promise((resolve) => setTimeout(resolve, 2000));
    return {
      success: true,
      message: "Login successful",
      data: mockAccounts,
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
    accountTransactions.sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );
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
    const lastBalance = accTrans.data[0]?.balance || 0;
    const data: Transaction = {
      id: `txn_${Math.random().toString(36).substring(2, 15)}`,
      date: new Date().toISOString().split("T")[0],
      description: transaction.description || "No description",
      type: "debit",
      amount: Number(transaction.amount),
      balance: lastBalance - transaction.amount,
      category: transaction.category || "Uncategorized",
    };
    accTrans.data.push(data);
    transactions[transaction.accountId as keyof typeof transactions] =
      accTrans.data;

    //Update the account balance
    const accountIndex = mockAccounts.findIndex(
      (acc) => acc.id === transaction.accountId
    );
    if (accountIndex !== -1) {
      mockAccounts[accountIndex].balance -= transaction.amount;
    }

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
