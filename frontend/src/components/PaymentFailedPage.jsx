import { XCircleIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";

const PaymentFailed = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-lg p-8 text-center space-y-6">
        {/* Icon */}
        <div className="flex justify-center">
          <XCircleIcon className="w-20 h-20 text-red-500" />
        </div>

        {/* Title */}
        <h1 className="text-2xl font-semibold text-slate-900">
          Payment Failed
        </h1>

        {/* Message */}
        <p className="text-slate-600 text-sm">
          We couldn’t complete your payment. Don’t worry — no money was
          deducted.
        </p>

        {/* Info Box */}
        <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-sm text-red-700 text-left">
          <p className="font-medium mb-1">Possible reasons:</p>
          <ul className="list-disc ml-4 space-y-1">
            <li>Bank authorization failed</li>
            <li>Insufficient balance</li>
            <li>Network issue</li>
            <li>Payment window closed</li>
          </ul>
        </div>

        {/* Actions */}
        <div className="space-y-3">
          <button
            onClick={() => navigate(-1)}
            className="w-full bg-slate-900 hover:bg-slate-800 text-white py-3 rounded-xl font-semibold"
          >
            Try Payment Again
          </button>

          <button
            onClick={() => navigate("/")}
            className="w-full border border-slate-300 text-slate-700 py-3 rounded-xl font-medium hover:bg-slate-100"
          >
            Go to Home
          </button>
        </div>

        {/* Footer */}
        <p className="text-xs text-slate-400">
          If the issue persists, please contact your bank or support.
        </p>
      </div>
    </div>
  );
};

export default PaymentFailed;
