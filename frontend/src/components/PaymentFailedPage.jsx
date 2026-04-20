import { XCircleIcon, RefreshCcw, Home, ShieldAlert } from "lucide-react";
import { useNavigate } from "react-router-dom";

const PaymentFailed = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f172a] via-[#111827] to-[#020617] px-4 py-8 flex items-center justify-center">
      <div className="w-full max-w-2xl bg-white/10 backdrop-blur-xl border border-white/10 rounded-3xl shadow-2xl overflow-hidden">

        {/* Header */}
        <div className="px-6 md:px-10 py-8 border-b border-white/10 text-center">
          <div className="flex justify-center mb-5">
            <div className="w-24 h-24 rounded-2xl bg-red-500/15 border border-red-400/20 flex items-center justify-center">
              <XCircleIcon className="w-14 h-14 text-red-400" />
            </div>
          </div>

          <h1 className="text-3xl md:text-4xl font-bold text-white">
            Payment Failed
          </h1>

          <p className="text-slate-300 mt-2 text-sm md:text-base">
            We couldn’t complete your payment. Don’t worry — no money was deducted.
          </p>
        </div>

        {/* Body */}
        <div className="p-6 md:p-10 space-y-6">

          {/* Info Box */}
          <div className="bg-red-500/10 border border-red-400/20 rounded-2xl p-5">
            <div className="flex items-center gap-2 mb-3">
              <ShieldAlert size={18} className="text-red-300" />
              <h2 className="text-white font-semibold">
                Possible Reasons
              </h2>
            </div>

            <ul className="space-y-2 text-sm text-slate-300">
              <li>• Bank authorization failed</li>
              <li>• Insufficient balance</li>
              <li>• Network interruption</li>
              <li>• Payment window expired</li>
              <li>• Incorrect OTP or verification issue</li>
            </ul>
          </div>

          {/* Action Buttons */}
          <div className="grid sm:grid-cols-2 gap-4">
            <button
              onClick={() => navigate(-1)}
              className="flex items-center justify-center gap-2 bg-cyan-500 hover:bg-cyan-400 text-slate-900 font-semibold py-3 rounded-xl transition"
            >
              <RefreshCcw size={18} />
              Try Again
            </button>

            <button
              onClick={() => navigate("/")}
              className="flex items-center justify-center gap-2 border border-white/15 hover:bg-white/5 text-white font-semibold py-3 rounded-xl transition"
            >
              <Home size={18} />
              Go to Home
            </button>
          </div>

          {/* Footer */}
          <p className="text-center text-xs text-slate-400 pt-2">
            If the issue continues, please contact your bank or support team.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PaymentFailed;
