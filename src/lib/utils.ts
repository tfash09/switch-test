import { categories } from "@/data/mockData";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import type { Transaction } from "@/lib/interfaces";

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};

export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
};


export const randomDate = (start: Date, end: Date): string => {
  const date = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
  return date.toISOString().split("T")[0];
}

export const randomAmount = (min: number, max: number) => {
  return parseFloat((Math.random() * (max - min) + min).toFixed(2));
}

export const generateTransactions = (accountId: string, count: number): Transaction[] => {
  let balance = randomAmount(5000, 100000); 
  const txns: Transaction[] = [];

  for (let i = 0; i < count; i++) {
    const type = Math.random() > 0.5 ? "credit" : "debit";
    const amount = randomAmount(10, 5000);
    if (type === "debit") balance -= amount;
    else balance += amount;

    txns.push({
      id: `txn_${accountId.split("_")[1]}_${i + 1}`,
      date: randomDate(new Date(2023, 0, 1), new Date(2024, 11, 31)),
      description: type === "credit"
        ? categories.credit[Math.floor(Math.random() * categories.credit.length)]
        : categories.debit[Math.floor(Math.random() * categories.debit.length)],
      type,
      amount,
      balance: parseFloat(balance.toFixed(2)),
      category: type === "credit"
        ? "Income"
        : categories.debit[Math.floor(Math.random() * categories.debit.length)]
    });
  }

  return txns.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}
