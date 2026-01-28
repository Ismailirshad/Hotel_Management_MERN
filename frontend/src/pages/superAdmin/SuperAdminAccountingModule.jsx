import { PlusCircle } from "lucide-react";
import api from "../../lib/axios.js";
import AccountingModuleSkeleton from "../../components/skeletones/AccountingModuleSkeleton.jsx";
import { useEffect, useState } from "react";

const SuperAdminAccountingModule = () => {
  const [summary, setSummary] = useState(null);
  const [expenses, setExpenses] = useState([]);
  const [formData, setFormData] = useState({
    category: "",
    amount: "",
    note: "",
  });
  const [loading, setLoading] = useState(true);

  const fetchAccountingData = async () => {
    setLoading(true);
    try {
      const summaryRes = await api.get("/superAdmin/accounting-summary");
      const expensesRes = await api.get("/superAdmin/accounting-expense");
      setSummary(summaryRes.data);
      setExpenses(expensesRes.data);
      console.log("Accounting Summary", summaryRes.data);
      console.log("Expenses Data", expensesRes.data);
    } catch (err) {
      console.error("Error loading accounting data", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAccountingData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/superAdmin/addExpense", formData);
      setFormData({ category: "", amount: "", note: "" });
      fetchAccountingData();
    } catch (err) {
      console.error("Error adding expense", err);
    }
  };

  return (
    <div className="min-h-screen bg-[#0f1220] text-gray-200 p-8">
        {(loading || !summary) ? (
            <AccountingModuleSkeleton />
        ): (
      <div className="max-w-6xl mx-auto space-y-8">
          <h1 className="text-4xl font-semibold tracking-tight">
          ERP Accounting Module
        </h1>
        {/* Summary Cards */}
        <div className="grid sm:grid-cols-3 gap-6">
          {[
            {
              label: "Total Revenue",
              value: summary.totalRevenue,
              color: "text-blue-400",
            },
            {
              label: "Total Expenses",
              value: summary.totalExpenses,
              color: "text-red-400",
            },
            {
              label: "Profit",
              value: summary.totalProfit,
              color: "text-green-400",
            },
          ].map(({ label, value, color }, i) => (
            <div
              key={i}
              className="bg-[#1a1d2e]/90 border border-white/5 rounded-2xl p-6 shadow-lg"
            >
              <p className="text-sm text-gray-400">{label}</p>
              <p className={`text-2xl font-semibold ${color}`}>₹{value}</p>
            </div>
          ))}
        </div>

        {/* Add Expense Form */}
        <form
          onSubmit={handleSubmit}
          className="bg-[#1a1d2e]/90 border border-white/5 rounded-2xl p-6 shadow-lg space-y-4"
        >
          <h2 className="text-xl font-semibold text-white">Add New Expense</h2>

          <div className="grid sm:grid-cols-3 gap-4">
            <input
              type="text"
              placeholder="Category"
              value={formData.category}
              onChange={(e) =>
                setFormData({ ...formData, category: e.target.value })
              }
              className="bg-[#0f1220] border border-white/10 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-400"
              required
            />
            <input
              type="number"
              placeholder="Amount"
              value={formData.amount}
              onChange={(e) =>
                setFormData({ ...formData, amount: e.target.value })
              }
              className="bg-[#0f1220] border border-white/10 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-400"
              required
            />
            <input
              type="text"
              placeholder="Note (optional)"
              value={formData.note}
              onChange={(e) =>
                setFormData({ ...formData, note: e.target.value })
              }
              className="bg-[#0f1220] border border-white/10 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-400"
            />
          </div>

          <button
            type="submit"
            className="flex items-center gap-2 bg-cyan-500 hover:bg-cyan-600 text-black font-medium px-4 py-2 rounded-full mt-2"
          >
            <PlusCircle size={18} /> Add Expense
          </button>
        </form>

        {/* Expense Table */}
        <div className="bg-[#1a1d2e]/90 border border-white/5 rounded-2xl p-6 shadow-lg">
          <h2 className="text-xl font-semibold mb-4">Expense History</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="text-gray-400 border-b border-white/10">
                <tr>
                  <th className="px-4 py-2">Date</th>
                  <th className="px-4 py-2">Category</th>
                  <th className="px-4 py-2">Amount</th>
                  <th className="px-4 py-2">Note</th>
                </tr>
              </thead>
              <tbody>
                {expenses.length > 0 ? (
                  expenses.map((expense, i) => (
                    <tr key={i} className="border-b border-white/5">
                      <td className="px-4 py-2 text-gray-300">
                        {new Date(expense.date).toLocaleDateString()}
                      </td>
                      <td className="px-4 py-2">{expense.category}</td>
                      <td className="px-4 py-2 text-red-400 font-semibold">
                        ₹{expense.amount}
                      </td>
                      <td className="px-4 py-2 text-gray-400">
                        {expense.note || "-"}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="text-center py-6 text-gray-500">
                      No expenses recorded yet.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      )}
    </div>
  );
};

export default SuperAdminAccountingModule;
