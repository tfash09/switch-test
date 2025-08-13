import React, { useState } from "react";
import AccountCarousel from "@/components/custom/AccountCarousel";
import { formatCurrency } from "@/lib/utils";
import { Select } from "@/components/custom/Select";
import type { Account, Option } from "@/lib/interfaces";
import { mockAccounts } from "@/data/mockData";
import AccountTransactions from "@/components/custom/AccountTransactions";

const sortOptions = [
  { value: "*", label: "Sort By" },
  { value: "balance", label: "Sort By Balance" },
  { value: "date", label: "Sort By Last Transaction Date" },
] as Option[];

const AccountSummaryPage: React.FC = () => {
  const [selectedSort, setSelectedSort] = useState<string>(
    sortOptions[0].value
  );
  const [accountTypes, setAccountTypes] = useState<Option[]>([
    {
      value: "*",
      label: "All Accounts",
    },
  ]);
  const [selectedType, setSelectedType] = useState<string>(
    accountTypes[0].value
  );
  const [balance, setBalance] = useState<number>(0);
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [selectedAccounts, setSelectedAccounts] = useState<Account | undefined>();
  const [filteredAccounts, setFilteredAccounts] = useState<Account[]>([]);
  const [loading, setLoading] = useState(false);

  React.useEffect(() => {
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      const userAccounts = mockAccounts;
      setAccounts(userAccounts);
      setFilteredAccounts(userAccounts);
      const totalBalance = userAccounts.reduce(
        (acc, curr) => acc + curr.balance,
        0
      );
      setBalance(totalBalance);
      if (userAccounts.length > 0) {
        const uniqueTypes = Array.from(
          new Set(userAccounts.map((acc) => acc.type))
        ).map((type) => ({
          value: type,
          label: `${type} Account`,
        }));
        setAccountTypes([
          { value: "*", label: "All Accounts" },
          ...uniqueTypes,
        ]);
      }
    }, 2000);
  }, []);

  React.useEffect(() => {
    let filtered =
      selectedType === "*"
        ? accounts
        : accounts.filter((acc) => acc.type === selectedType);

    if (selectedSort === "balance") {
      filtered = [...filtered].sort((a, b) => b.balance - a.balance);
    } else if (selectedSort === "date") {
      filtered = [...filtered].sort(
        (a, b) =>
          new Date(b.lastTransactionDate).getTime() -
          new Date(a.lastTransactionDate).getTime()
      );
    }
    setSelectedAccounts(undefined)
    setFilteredAccounts(filtered);
  }, [accounts, selectedType, selectedSort]);

  return (
    <div className="p-8 bg-white w-full min-h-screen">
      {loading ? (
        <div className="flex items-center justify-center min-h-screen md:h-5">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-primary"></div>
        </div>
      ) : (
        <div>
          <div>
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
              <div>
                <h1 className="text-3xl font-bold text-primary mb-1">
                  Account Summary
                </h1>
                <div className="text-lg text-green-700">
                  Total Balance:{" "}
                  <span className="font-semibold">
                    {formatCurrency(balance)}
                  </span>
                </div>
              </div>
              <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto">
                <Select
                  value={selectedType}
                  label=""
                  options={accountTypes}
                  onChange={(e) => setSelectedType(e)}
                />
                <Select
                  label=""
                  value={selectedSort}
                  options={sortOptions}
                  onChange={(e) => setSelectedSort(e)}
                />
              </div>
            </div>
          </div>
          <AccountCarousel
            accounts={filteredAccounts}
            selectedAccounts={selectedAccounts}
            setSelectedAccounts={setSelectedAccounts}
          />

          {selectedAccounts && (
            <AccountTransactions
              selectedAccounts={selectedAccounts}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default AccountSummaryPage;
