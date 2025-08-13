import type { AccountTransactionsProps, Transaction } from "@/lib/interfaces";
import { Select } from "./Select";
import TextBox from "./TextBox";
import { formatCurrency } from "@/lib/utils";
import { useState } from "react";
import React from "react";
import { mockTransactions } from "@/data/mockData";

const AccountTransactions: React.FC<AccountTransactionsProps> = ({
    selectedAccounts
}) => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [minAmount, setMinAmount] = useState("");
  const [typeFilter, setTypeFilter] = useState("*");
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredTransactions, setFilteredTransactions] = useState<Transaction[]>([]);
  const [paginatedTransactions, setPaginatedTransactions] = useState<Transaction[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const pageSize = 5;


  React.useEffect(() => {
    if (!selectedAccounts) {
      setFilteredTransactions([]);
      setPaginatedTransactions([]);
      setTotalPages(1);
      return;
    }
    let txns = mockTransactions[selectedAccounts.id] || [];
    if (typeFilter !== "*") {
      txns = txns.filter((txn) => txn.type === typeFilter);
    }
    if (startDate) {
      txns = txns.filter((txn) => new Date(txn.date) >= new Date(startDate));
    }
    if (endDate) {
      txns = txns.filter((txn) => new Date(txn.date) <= new Date(endDate));
    }
    if (minAmount) {
      txns = txns.filter((txn) => txn.amount >= Number(minAmount));
    }
    setFilteredTransactions(txns);
    setTotalPages(Math.max(1, Math.ceil(txns.length / pageSize)));
    setCurrentPage(1); // Reset to first page when filters change
  }, [selectedAccounts, typeFilter, startDate, endDate, minAmount]);

  React.useEffect(() => {
    const startIdx = (currentPage - 1) * pageSize;
    setPaginatedTransactions(filteredTransactions.slice(startIdx, startIdx + pageSize));
  }, [filteredTransactions, currentPage, pageSize]);


  return (
    <div className="mt-10">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div>
          <h2 className="text-2xl font-bold text-primary mb-1">
            {selectedAccounts.type} Account ({selectedAccounts.accountNumber})
          </h2>
        </div>

        <div className="flex flex-col md:flex-row gap-4">
          <Select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e)}
            options={[
              { value: "*", label: "All Types" },
              { value: "credit", label: "Credit" },
              { value: "debit", label: "Debit" },
            ]}
          />
          <TextBox
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            placeholder="Start Date"
          />
          <TextBox
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            placeholder="End Date"
          />
          <TextBox
            type="number"
            min={0}
            value={minAmount}
            onChange={(e) => setMinAmount(e.target.value)}
            placeholder="Min Amount"
          />
        </div>
      </div>

      <div className="overflow-x-auto bg-white rounded-lg shadow border border-primary">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-primary text-white">
            <tr>
              <th className="px-4 py-2 text-left">Date</th>
              <th className="px-4 py-2 text-left">Type</th>
              <th className="px-4 py-2 text-left">Description</th>
              <th className="px-4 py-2 text-left">Amount</th>
              <th className="px-4 py-2 text-left">Balance After</th>
            </tr>
          </thead>
          <tbody>
            {paginatedTransactions.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-4 py-6 text-center text-gray-400">
                  No transactions found.
                </td>
              </tr>
            ) : (
              paginatedTransactions.map((txn, idx) => (
                <tr key={idx} className="hover:bg-gray-50">
                  <td className="px-4 py-2">{txn.date}</td>
                  <td className="px-4 py-2 capitalize">{txn.type}</td>
                  <td className="px-4 py-2">{txn.description}</td>
                  <td
                    className={`px-4 py-2 font-semibold ${
                      txn.type === "credit" ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {formatCurrency(txn.amount)}
                  </td>
                  <td className="px-4 py-2">{formatCurrency(txn.balance)}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
        {totalPages > 1 && (
          <div className="flex justify-end items-center gap-2 p-4">
            <button
              className="px-3 py-1 rounded bg-primary text-white disabled:opacity-50"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(currentPage - 1)}
            >
              Prev
            </button>
            <span className="text-primary font-semibold">
              Page {currentPage} of {totalPages}
            </span>
            <button
              className="px-3 py-1 rounded bg-primary text-white disabled:opacity-50"
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage(currentPage + 1)}
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AccountTransactions;
