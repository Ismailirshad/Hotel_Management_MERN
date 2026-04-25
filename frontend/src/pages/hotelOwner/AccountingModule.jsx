import React, { memo, useEffect, useMemo, useState } from "react";
import { PlusCircle } from "lucide-react";
import api from "../../lib/axios.js";
import AccountingModuleSkeleton from "../../components/skeletones/adminSkeleton/AccountingModuleSkeleton.jsx";
import {
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

const AccountingModule = () => {
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
      const [summaryRes, expensesRes] = await Promise.all([
        api.get("/admin/accounting-summary"),
        api.get("/admin/accounting-expense"),
      ]);
      setSummary(summaryRes.data);
      setExpenses(expensesRes.data);
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
      await api.post("/admin/addExpense", formData);
      setFormData({ category: "", amount: "", note: "" });
      fetchAccountingData();
    } catch (err) {
      console.error("Error adding expense", err);
    }
  };

  const incomeExpenseData = useMemo(
    () => [
      { name: "Income", value: summary?.totalRevenue },
      { name: "Expense", value: summary?.totalExpenses },
    ],
    [summary],
  );
  const COLORS = ["#22c55e", "#ef4444"];
  return (
    <div className="min-h-screen bg-[#0f1220] text-gray-200 p-0 sm:p-6 md:p-10">
      {loading || !summary ? (
        <AccountingModuleSkeleton />
      ) : (
        <div className="max-w-6xl mx-auto space-y-8">
          <h1 className="text-4xl font-semibold tracking-tight">
            ERP Accounting Module
          </h1>
          {/* Summary Cards */}
          <div className="grid sm:grid-cols-3 gap-6">
            {[
              {
                label: "Total Revenue",
                value: summary.totalRevenue.toFixed(2),
                color: "text-blue-400",
              },
              {
                label: "Total Expenses",
                value: summary.totalExpenses.toFixed(2),
                color: "text-red-400",
              },
              {
                label: "Profit",
                value: summary.totalProfit.toFixed(2),
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

          {/* Pie Chart */}
          {/* <div className="bg-white rounded-3xl shadow-lg border border-[#eadfca] p-6 mt-5"> */}
          <div className="bg-[#1a1d2e]/90 border border-white/5 rounded-2xl p-6 shadow-lg mt-5">
            <h2 className="text-2xl font-bold text-slat-200 mb-4">
              Income vs Expense
            </h2>

            <div className="h-[360px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={incomeExpenseData}
                    dataKey="value"
                    innerRadius={80}
                    outerRadius={120}
                    paddingAngle={5}
                    label
                  >
                    {incomeExpenseData.map((entry, index) => (
                      <Cell key={index} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>

                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Add Expense Form */}
          <form
            onSubmit={handleSubmit}
            className="bg-[#1a1d2e]/90 border border-white/5 rounded-2xl p-6 shadow-lg space-y-4"
          >
            <h2 className="text-xl font-semibold text-white">
              Add New Expense
            </h2>

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
                          {new Date(expense?.date).toLocaleDateString()}
                        </td>
                        <td className="px-4 py-2">{expense?.category}</td>
                        <td className="px-4 py-2 text-red-400 font-semibold">
                          ₹{expense?.amount}
                        </td>
                        <td className="px-4 py-2 text-gray-400">
                          {expense?.note || "-"}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan="4"
                        className="text-center py-6 text-gray-500"
                      >
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

export default memo(AccountingModule);
