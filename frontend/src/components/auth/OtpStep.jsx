import React from 'react'
import toast from 'react-hot-toast';
import api from '../../lib/axios';

const OtpStep = ({loading, setLoading, setStep,otp, setOtp, email}) => {

     const handleVerifyOtp = async () => {
        setLoading(true);
        try {
          await api.post(
            "/auth/verifyOtp",
            { otp, email },
            { withCredentials: true },
          );
          toast.success("OTP verified");
          setStep("reset");
        } catch (error) {
          toast.error(error.response?.data?.message || "Invalid OTP");
        } finally {
          setLoading(false);
        }
      };
  return (
<>
            <div className="text-center mb-6">
              <h2 className="text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-200">
                Verify Identity
              </h2>
              <p className="text-gray-400 text-sm mt-1">
                Enter the 6-digit code whispered through the trees.
              </p>
            </div>

            <div className="relative mb-6 group">
              <input
                type="text"
                maxLength="6"
                placeholder="· · · · · ·"
                className="w-full px-4 py-4 bg-gray-900/60 border border-emerald-900/50 text-emerald-400  text-center text-2xl tracking-[1rem] font-mono rounded-xl outline-none transition-all duration-300 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 placeholder-emerald-900/50"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                required
              />
              {/* Ambient shadow glow */}
              <div className="absolute inset-0 rounded-xl bg-emerald-500/5 blur-2xl opacity-0 group-focus-within:opacity-100 transition-opacity pointer-events-none" />
            </div>

            <button
              onClick={handleVerifyOtp}
              disabled={loading}
              className="cursor-pointer relative w-full overflow-hidden group bg-emerald-800 hover:bg-emerald-700 text-emerald-50 font-bold py-3 rounded-xl transition-all duration-300 active:scale-[0.98] border border-emerald-600/30"
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                {loading ? (
                  <>
                    <div className="h-4 w-4 border-2 border-emerald-200/30 border-t-emerald-200 rounded-full animate-spin" />
                    Verifying...
                  </>
                ) : (
                  "Verify OTP"
                )}
              </span>
              {/* Animated Shine Effect */}
              <div className="absolute top-0 -inset-full h-full w-1/2 z-5 block transform -skew-x-12 bg-gradient-to-r from-transparent to-white/10 opacity-30 group-hover:animate-shine" />
            </button>
          </>
)
}

export default OtpStep