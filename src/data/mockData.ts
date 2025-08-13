import type { Account, Transaction } from "@/lib/interfaces";
import { generateTransactions } from "@/lib/utils";

export const accountIds = [
  "acc_001",
  "acc_002",
  "acc_003",
  "acc_004",
  "acc_005",
  "acc_006",
];

export const dummyUser = {
  id: 1,
  name: "Test User",
  email: "test@interswitch.com",
  phoneNumber: "1234567890",
  firstName: "Test",
  middleName: "User",
  lastName: "Example",
};

export const categories = {
  credit: [
    "Salary",
    "Transfer In",
    "Refund",
    "Investment Return",
    "Interest Credit",
    "Gift",
  ],
  debit: [
    "Grocery",
    "Restaurant",
    "Online Purchase",
    "Transfer Out",
    "Bill Payment",
    "Cash Withdrawal",
    "Transportation",
  ],
};

export const mockAccounts: Account[] = [
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
    type: "Student",
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
    type: "Fixed Deposit",
    accountNumber: "5678901234567890",
    balance: 500000.0,
    currency: "NGN",
    lastTransactionDate: "2024-03-05",
  },
  {
    id: "acc_006",
    type: "Corporate",
    accountNumber: "6789012345678901",
    balance: 75000.25,
    currency: "NGN",
    lastTransactionDate: "2024-03-15",
  },
];

export const mockTransactions: Record<string, Transaction[]> =
  accountIds.reduce((acc, id) => {
    acc[id] = generateTransactions(id, 20);
    return acc;
  }, {} as Record<string, Transaction[]>);

//   "acc_001": [
//     {
//       id: "txn_001",
//       date: "2024-01-15",
//       description: "Direct Deposit - Salary",
//       type: "credit",
//       amount: 5000.00,
//       balance: 25750.50,
//       category: "Income"
//     },
//     {
//       id: "txn_002",
//       date: "2024-01-14",
//       description: "Online Transfer to Checking",
//       type: "debit",
//       amount: 1000.00,
//       balance: 20750.50,
//       category: "Transfer"
//     },
//     {
//       id: "txn_003",
//       date: "2024-01-12",
//       description: "Interest Credit",
//       type: "credit",
//       amount: 15.75,
//       balance: 21750.50,
//       category: "Interest"
//     },
//     {
//       id: "txn_004",
//       date: "2024-01-10",
//       description: "ATM Withdrawal",
//       type: "debit",
//       amount: 200.00,
//       balance: 21734.75,
//       category: "Cash"
//     },
//     {
//       id: "txn_005",
//       date: "2024-01-08",
//       description: "Investment Dividend",
//       type: "credit",
//       amount: 125.50,
//       balance: 21934.75,
//       category: "Investment"
//     }
//   ],
//   "acc_002": [
//     {
//       id: "txn_101",
//       date: "2024-01-16",
//       description: "Coffee Shop Payment",
//       type: "debit",
//       amount: 4.85,
//       balance: 8932.25,
//       category: "Food"
//     },
//     {
//       id: "txn_102",
//       date: "2024-01-15",
//       description: "Online Transfer from Savings",
//       type: "credit",
//       amount: 1000.00,
//       balance: 8937.10,
//       category: "Transfer"
//     },
//     {
//       id: "txn_103",
//       date: "2024-01-14",
//       description: "Utility Bill Payment",
//       type: "debit",
//       amount: 125.50,
//       balance: 7937.10,
//       category: "Bills"
//     },
//     {
//       id: "txn_104",
//       date: "2024-01-13",
//       description: "Grocery Store Purchase",
//       type: "debit",
//       amount: 87.32,
//       balance: 8062.60,
//       category: "Groceries"
//     },
//     {
//       id: "txn_105",
//       date: "2024-01-12",
//       description: "Gas Station Payment",
//       type: "debit",
//       amount: 45.00,
//       balance: 8149.92,
//       category: "Transportation"
//     }
//   ],
//   "acc_003": [
//     {
//       id: "txn_201",
//       date: "2024-01-10",
//       description: "Monthly Loan Payment",
//       type: "credit",
//       amount: 500.00,
//       balance: -15000.00,
//       category: "Payment"
//     },
//     {
//       id: "txn_202",
//       date: "2024-01-01",
//       description: "Interest Charge",
//       type: "debit",
//       amount: 125.00,
//       balance: -15500.00,
//       category: "Interest"
//     }
//   ]
// };
