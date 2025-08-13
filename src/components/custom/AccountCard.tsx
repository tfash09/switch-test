import React, { useState } from "react";
import {
  EyeIcon,
  EyeSlashIcon,
  CreditCardIcon,
} from "@heroicons/react/24/outline";
import type { Account } from "@/lib/interfaces";
import { formatCurrency } from "@/lib/utils";

const mask = (str: string) => str.replace(/.(?=.{4})/g, "*");

const AccountCard: React.FC<Account> = ({
  type,
  accountNumber,
  balance,
  lastTransactionDate,
  isActive,
}) => {
  const [showNumber, setShowNumber] = useState(false);
  const [showBalance, setShowBalance] = useState(false);

  return (
    <div
      className={`shadow-lg rounded-xl p-6 flex flex-col gap-3 w-55 md:w-80 border transition-all duration-300 ease-in-out hover:text-white cursor-pointer
        hover:bg-primary hover:shadow-xl 
        active:bg-primary active:shadow-xl 
        ${
          isActive
            ? "border-secondary text-white bg-primary"
            : "border-primary text-primary bg-white "
        }
        `}
    >
      <div className="flex items-center gap-2 flex-col sm:flex-row">
        <CreditCardIcon className="h-6 w-6 duration-300" />
        <span className="font-bold text-lg duration-300">{type} Account</span>
      </div>
      <div className="flex items-center justify-between flex-col sm:flex-row">
        <span>Account No:</span>
        <div className="flex justify-between">
          <span className="font-mono text-secondary-300">
            {showNumber ? accountNumber : mask(accountNumber)}
          </span>
          <button onClick={() => setShowNumber(!showNumber)} className="ml-2">
            {showNumber ? (
              <EyeSlashIcon className="h-5 w-5 text-secondary-300" />
            ) : (
              <EyeIcon className="h-5 w-5 text-secondary-300" />
            )}
          </button>
        </div>
      </div>
      <div className="flex items-center flex-col sm:flex-row">
        <span className="mr-3">Balance:</span>
        <div className="flex justify-between w-full">
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
      </div>
      <div className="flex text-sm flex-col sm:flex-row">
        <span>Last Transaction:</span>
        <span className="font-medium">{lastTransactionDate}</span>
      </div>
    </div>
  );
};

export default AccountCard;
