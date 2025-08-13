import React, { useState } from "react";
import { EyeIcon, EyeSlashIcon, CreditCardIcon } from "@heroicons/react/24/outline";
import type { Account } from "@/lib/interfaces";
import { formatCurrency } from "@/lib/utils";

const mask = (str: string) => str.replace(/.(?=.{4})/g, "*");

const AccountCard: React.FC<Account> = ({
  type,
  accountNumber,
  balance,
  lastTransactionDate,
}) => {
  const [showNumber, setShowNumber] = useState(false);
  const [showBalance, setShowBalance] = useState(false);

  return (
    <div
      className="bg-white shadow-lg rounded-xl p-6 flex flex-col gap-3 w-55 md:w-80 border border-primary transition-all duration-300 ease-in-out text-primary hover:text-white cursor-pointer
        hover:bg-primary hover:shadow-xl 
        active:bg-primary active:shadow-xl "
    >
    <div className="flex items-center gap-2">
      <CreditCardIcon className="h-6 w-6 duration-300" />
      <span className="font-bold text-lg duration-300">
        {type} Account
      </span>
    </div>
    <div className="flex items-center justify-between">
      <span>Account No:</span>
      <span className="font-mono text-secondary-300">
        {showNumber ? accountNumber : mask(accountNumber)}
      </span>
      <button onClick={() => setShowNumber(!showNumber)}>
        {showNumber ? (
        <EyeSlashIcon className="h-5 w-5 text-secondary-300" />
        ) : (
        <EyeIcon className="h-5 w-5 text-secondary-300" />
        )}
      </button>
    </div>
    <div className="flex items-center justify-between">
      <span>Balance:</span>
      <span className="font-semibold duration-300">
        {showBalance ? `${formatCurrency(balance)}` : "****"}
      </span>
      <button onClick={() => setShowBalance(!showBalance)}>
        {showBalance ? (
        <EyeSlashIcon className="h-5 w-5 text-secondary-300" />
        ) : (
        <EyeIcon className="h-5 w-5 text-secondary-300" />
        )}
      </button>
    </div>
    <div className="text-sm">
      Last Transaction: <span className="font-medium">{lastTransactionDate}</span>
    </div>
    </div>
  );
};

export default AccountCard;