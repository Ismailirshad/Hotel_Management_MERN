import { PlusCircle, Wallet, TrendingUp, BadgeIndianRupee } from "lucide-react";
import {
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { memo, useCallback, useEffect, useMemo, useState } from "react";
import api from "../../lib/axios.js";
import AccountingModuleSkeleton from "../../components/skeletones/superAdminSkeleton/AccountingModuleSkeleton.jsx";

const SuperAdminAccountingModule = () => {
  const [summary, setSummary] = useState(null);
  const [expenses, setExpenses] = useState([]);
  const [formData, setFormData] = useState({
    category: "",
    amount: "",
    note: "",
  });
  const [loading, setLoading] = useState(true);

  const fetchAccountingData = useCallback(async () => {
    setLoading(true);
    try {
      const summaryRes = await api.get("/superAdmin/accounting-summary");
      const expensesRes = await api.get("/superAdmin/accounting-expense");
      setSummary(summaryRes.data);
      setExpenses(expensesRes.data);
    } catch (err) {
      console.error("Error loading accounting data", err);
    } finally {
      setLoading(false);
    }
  },[]);

  useEffect(() => {
    fetchAccountingData();
  }, [fetchAccountingData]);

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

  const incomeExpenseData = useMemo(() => {
    if (!summary) return [];

    return [
      { name: "Income", value: summary?.totalRevenue },
      { name: "Expense", value: summary?.totalExpenses },
    ];
  }, [summary]);

  const COLORS = ["#22c55e", "#ef4444"];

  return (
    <div className="min-h-screen bg-linear-to-br from-[#f8f4ea] via-[#fdfaf4] to-[#efe7d6] text-slate-800 p-0 sm:p-6 md:p-10">
      {loading || !summary ? (
        <AccountingModuleSkeleton />
      ) : (
        <div className="max-w-7xl mx-auto space-y-8">
          {/* Header */}
          <div>
            <p className="uppercase tracking-[0.35em] text-xs font-semibold text-[#b88917] mb-3">
              Financial Control Center
            </p>
            <h1 className="text-4xl font-bold text-slate-900">
              ERP Accounting Module
            </h1>
            <p className="text-slate-500 mt-2 max-w-2xl">
              Track revenue, manage expenses and monitor profit with an elegant
              executive finance dashboard.
            </p>
          </div>

          {/* Summary Cards */}
          <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-6">
            <div className="rounded-3xl bg-white border border-[#eadfca] shadow-lg p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-500">Total Revenue</p>
                  <p className="text-3xl font-bold text-slate-900 mt-2">
                    ₹{summary.totalRevenue}
                  </p>
                </div>
                <div className="p-4 rounded-2xl bg-slate-300/50">
                  <BadgeIndianRupee className="w-7 h-7 text-slate-700" />
                </div>
              </div>
            </div>

            <div className="rounded-3xl bg-white border border-[#eadfca] shadow-lg p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-500">Total Expenses</p>
                  <p className="text-3xl font-bold text-slate-900 mt-2">
                    ₹{summary.totalExpenses}
                  </p>
                </div>
                <div className="p-4 rounded-2xl bg-slate-300/50">
                  <Wallet className="w-7 h-7 text-slate-700" />
                </div>
              </div>
            </div>

            <div className="rounded-3xl bg-white border border-[#eadfca] shadow-lg p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-500">Profit</p>
                  <p className="text-3xl font-bold text-slate-900 mt-2">
                    ₹{summary.totalProfit}
                  </p>
                </div>
                <div className="p-4 rounded-2xl bg-slate-300/50">
                  <TrendingUp className="w-7 h-7 text-slate-700" />
                </div>
              </div>
            </div>
          </div>

          {/* Pie Chart */}
          <div className="bg-white rounded-3xl shadow-lg border border-[#eadfca] p-6 mt-5">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">
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
            className="rounded-3xl bg-white border border-[#eadfca] shadow-lg p-6 space-y-5"
          >
            <h2 className="text-2xl font-semibold text-slate-900">
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
                className="border border-[#eadfca] rounded-xl px-4 py-3 bg-[#fdfaf4] focus:outline-none focus:ring-2 focus:ring-[#b88917]/30"
                required
              />

              <input
                type="number"
                placeholder="Amount"
                value={formData.amount}
                onChange={(e) =>
                  setFormData({ ...formData, amount: e.target.value })
                }
                className="border border-[#eadfca] rounded-xl px-4 py-3 bg-[#fdfaf4] focus:outline-none focus:ring-2 focus:ring-[#b88917]/30"
                required
              />

              <input
                type="text"
                placeholder="Note (optional)"
                value={formData.note}
                onChange={(e) =>
                  setFormData({ ...formData, note: e.target.value })
                }
                className="border border-[#eadfca] rounded-xl px-4 py-3 bg-[#fdfaf4] focus:outline-none focus:ring-2 focus:ring-[#b88917]/30"
              />
            </div>

            <button
              type="submit"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-[#b88917] hover:bg-[#9e7413] text-white font-semibold transition-all"
            >
              <PlusCircle size={18} />
              Add Expense
            </button>
          </form>

          {/* Expense History */}
          <div className="rounded-3xl bg-white border border-[#eadfca] shadow-lg p-6">
            <h2 className="text-2xl font-semibold text-slate-900 mb-5">
              Expense History
            </h2>

            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-[#eadfca] text-slate-500">
                    <th className="text-left px-4 py-3">Date</th>
                    <th className="text-left px-4 py-3">Category</th>
                    <th className="text-left px-4 py-3">Amount</th>
                    <th className="text-left px-4 py-3">Note</th>
                  </tr>
                </thead>

                <tbody>
                  {expenses.length > 0 ? (
                    expenses.map((expense, i) => (
                      <tr
                        key={i}
                        className="border-b border-[#f2ead9] hover:bg-[#fdfaf4]"
                      >
                        <td className="px-4 py-3">
                          {new Date(expense.date).toLocaleDateString("en-GB")}
                        </td>
                        <td className="px-4 py-3 font-medium">
                          {expense.category}
                        </td>
                        <td className="px-4 py-3 text-rose-600 font-semibold">
                          ₹{expense.amount}
                        </td>
                        <td className="px-4 py-3 text-slate-500">
                          {expense.note || "-"}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan="4"
                        className="text-center py-8 text-slate-400"
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

export default memo(SuperAdminAccountingModule);
