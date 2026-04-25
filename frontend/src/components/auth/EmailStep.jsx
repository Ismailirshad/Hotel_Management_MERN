import toast from "react-hot-toast";
import api from "../../lib/axios.js";

const EmailStep = ({ setStep, setLoading, email, setEmail, loading }) => {

  const handleSendOtp = async () => {
    setLoading(true);
    try {
      await api.post("/auth/sendOtp", { email }, { withCredentials: true });
      toast.success("OTP sent to your email");
      setStep("otp");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to send OTP");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="text-center mb-6">
        <h2 className="text-2xl font-extrabold text-transparent bg-clip-text bg-linear-to-r from-emerald-400 to-cyan-200">
          Forgot Password
        </h2>
        <p className="text-gray-400 text-sm mt-1">
          We'll send a magic link to your forest cabin.
        </p>
      </div>

      <div className="relative mb-6 group">
        <input
          type="email"
          placeholder="Enter your email"
          className="w-full px-4 py-3 text-sm border border-emerald-900/50  rounded-xl outline-none transition-all duration-300 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 placeholder-gray-500"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        {/* Subtle glow effect on hover */}
        <div className="absolute inset-0 rounded-xl bg-emerald-500/5 blur-xl opacity-0 group-focus-within:opacity-100 transition-opacity pointer-events-none" />
      </div>

      <button
        onClick={handleSendOtp}
        disabled={loading}
        className="cursor-pointer relative w-full overflow-hidden group bg-emerald-700 hover:bg-emerald-600 text-white font-bold py-3 rounded-xl transition-all duration-300 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <span className="relative z-10">
          {loading ? (
            <span className="flex items-center justify-center gap-2">
              <svg
                className="animate-spin h-5 w-5 text-white"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                  fill="none"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Sending...
            </span>
          ) : (
            "Send OTP"
          )}
        </span>

        {/* Shine effect on hover */}
        <div className="absolute top-0 -inset-full h-full w-1/2 z-5 block transform -skew-x-12 bg-linear-to-r from-transparent to-white/10 opacity-40 group-hover:animate-shine" />
      </button>
    </>
  );
};

export default EmailStep;
