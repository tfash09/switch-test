import Button from "@/components/custom/Button";
import Modal from "@/components/custom/Modal";
import { Select } from "@/components/custom/Select";
import TextBox from "@/components/custom/TextBox";
import { useAccount } from "@/hooks/useAccount";
import type { transactionFormData } from "@/lib/formData";
import type { Account, Option } from "@/lib/interfaces";
import { showToast } from "@/lib/toast";
import { formatCurrency } from "@/lib/utils";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const TransferPage: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [balance, setBalance] = useState(0);
  const [submitLoader, setSubmitLoader] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [accounts, setAccounts] = useState<Option[]>([]);
  const [rawAccounts, setRawAccounts] = useState<Account[]>([]);
  const [formData, setFormData] = useState<transactionFormData>({
    accountId: "",
    destinationAccount: "",
    description: "",
    amount: 0,
    category: "",
  });
  const { getAccounts, addTransaction } = useAccount();

  const handleFetchAccounts = async () => {
    setLoading(true);
    try {
      const response = await getAccounts();
      if (response.success) {
        const userAccounts = response.data as Account[];
        const accountOptions = userAccounts
          .filter((acc) => acc.type !== "Loan")
          .map((acc) => ({
            value: acc.id,
            label: `${acc.type} - ${acc.accountNumber} - ${formatCurrency(
              acc.balance
            )}`,
          }));
        const balance = userAccounts[0].balance;
        setBalance(balance);

        handleChange("accountId", accountOptions[0].value);
        setAccounts(accountOptions);
        setRawAccounts(userAccounts);
      } else {
        showToast(response.message, "error");
      }
    } catch {
      showToast("An error Ocured", "error");
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    handleFetchAccounts();
  }, []);

  const handleChange = (
    field: keyof transactionFormData,
    value: string | number
  ) => {
    if (field === "accountId") {
      const selectedAccount = rawAccounts.find((acc) => acc.id === value);
      if (selectedAccount) {
        setBalance(selectedAccount?.balance || 0);
      }
    }

    if (field === "destinationAccount") {
      const strValue = String(value);
      if (!/^\d*$/.test(strValue)) {
        return;
      }
      if (strValue.length > 10) return;
      setFormData((prev) => ({ ...prev, [field]: strValue }));
    } else {
      setFormData((prev) => ({ ...prev, [field]: value }));
    }
  };

  const validateForm = () => {
    if (!formData.accountId) return "Please select a source account";
    if (!/^\d{10}$/.test(formData.destinationAccount))
      return "Destination account must be exactly 10 digits";
    if (!formData.amount || formData.amount <= 0)
      return "Amount must be greater than zero";
    if (formData.amount > balance)
      return "Insufficient balance for this transfer";
    if (!formData.description) return "Description is required";
    if (!formData.category) return "Category is required";
    return null;
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const error = validateForm();
    if (error) {
      showToast(error, "error");
      return;
    }
    setShowModal(true);
  };

  const handleConfirmTransfer = async () => {
    setSubmitLoader(true);
    try {
      const response = await addTransaction(formData);
      if (response.success) {
        setShowModal(false);
        showToast(response.message, "success");
        navigate("/account-summary");
      } else {
        showToast(response.message, "error");
      }
    } catch {
      showToast("Transfer failed", "error");
    } finally {
      setSubmitLoader(false);
    }
  };

  return (
    <div className="p-8 bg-white w-full min-h-screen">
      {loading ? (
        <div className="flex items-center justify-center min-h-screen md:h-5">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-primary"></div>
        </div>
      ) : (
        <div className="flex flex-col items-start mb-8 gap-4 w-full">
          <div>
            <h1 className="text-3xl font-bold text-primary mb-1">
              Transfer Money
            </h1>
            <div className="text-lg text-green-700">
              Transfer money between accounts
            </div>
          </div>
          <div className="flex flex-row gap-4 w-full mt-8">
            <form
              onSubmit={onSubmit}
              className="flex flex-col gap-4 w-full max-w-lg"
            >
              <Select
                options={accounts}
                value={formData.accountId}
                onChange={(value) => handleChange("accountId", value)}
              />

              <TextBox
                label="Destination Account"
                placeholder="Enter 10-digit account number"
                value={formData.destinationAccount}
                onChange={(e) =>
                  handleChange("destinationAccount", e.target.value)
                }
              />

              <TextBox
                label="Description"
                placeholder="Description of the transaction"
                value={formData.description}
                onChange={(e) => handleChange("description", e.target.value)}
              />

              <TextBox
                label="Amount"
                type="amount"
                placeholder="Enter amount"
                value={formData.amount}
                onChange={(e) => handleChange("amount", Number(e.target.value))}
              />

              <TextBox
                label="Category"
                placeholder="e.g., Utilities, Rent, Savings"
                value={formData.category}
                onChange={(e) => handleChange("category", e.target.value)}
              />

              <Button type="submit" className="mt-4">
                Submit Transfer
              </Button>
            </form>
          </div>
        </div>
      )}

      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        size="md"
        title="Transaction Summary"
        closeOnOutsideClick={false}
      >
        <div className="space-y-4 p-3 bg-[#f1f5f8] rounded-lg">
          <p>
            <strong>From Account:</strong>{" "}
            {accounts.find((acc) => acc.value === formData.accountId)?.label}
          </p>
          <p>
            <strong>Destination Account:</strong> {formData.destinationAccount}
          </p>
          <p>
            <strong>Amount:</strong> {formatCurrency(formData.amount)}
          </p>
          <p>
            <strong>Description:</strong> {formData.description}
          </p>
          <p>
            <strong>Category:</strong> {formData.category}
          </p>
        </div>
        <div className="flex justify-end gap-3 mt-6">
          <Button variant="outline" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
          <Button loading={submitLoader} onClick={handleConfirmTransfer}>
            Confirm Transfer
          </Button>
        </div>
      </Modal>
    </div>
  );
};

export default TransferPage;
