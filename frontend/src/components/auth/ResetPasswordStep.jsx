import React from "react";
import toast from "react-hot-toast";
import api from "../../lib/axios.js";

const ResetPasswordStep = ({
  loading,
  setLoading,
  confirmPassword,
  setConfirmPassword,
  password,
  setPassword,
  onClose,
  openLogin,
  email,
}) => {
  const handleResetPassword = async () => {
    setLoading(true);
    try {
      await api.post(
        "/auth/resetPassword",
        { password, email },
        { withCredentials: true },
      );
      toast.success("Password reset successfully");
      onClose();
      openLogin();
    } catch (error) {
      toast.error(error.response?.data?.message || "Reset failed");
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <div className="text-center mb-6">
        <h2 className="text-2xl font-extrabold text-transparent bg-clip-text bg-linear-to-r from-emerald-400 to-cyan-200">
          Reset Password
        </h2>
        <p className="text-gray-400 text-sm mt-1">
          Forge a new key for your sanctuary.
        </p>
      </div>

      <div className="space-y-4 mb-6">
        {/* New Password Input */}
        <div className="relative group">
          <input
            type="password"
            placeholder="New Password"
            className="w-full px-4 py-3 text-sm border border-emerald-900/50  rounded-xl outline-none transition-all duration-300 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 placeholder-gray-600"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        {/* Confirm Password Input */}
        <div className="relative group">
          <input
            type="password"
            placeholder="Confirm New Password"
            className="w-full px-4 py-3 text-sm border border-emerald-900/50  rounded-xl outline-none transition-all duration-300 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 placeholder-gray-600"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
      </div>

      <button
        onClick={handleResetPassword}
        disabled={loading}
        className="cursor-pointer relative w-full overflow-hidden group bg-linear-to-br from-emerald-600 to-teal-700 hover:from-emerald-500 hover:to-teal-600 text-white font-bold py-3 rounded-xl transition-all duration-300 active:scale-[0.98] shadow-lg shadow-emerald-900/20"
      >
        <span className="relative z-10 flex items-center justify-center gap-2">
          {loading ? (
            <>
              <div className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              Updating...
            </>
          ) : (
            "Update Password"
          )}
        </span>
        {/* High-intensity Shine */}
        <div className="absolute top-0 -inset-full h-full w-1/2 z-5 block transform -skew-x-12 bg-linear-to-r from-transparent to-white/20 opacity-50 group-hover:animate-shine" />
      </button>
    </>
  );
};

export default ResetPasswordStep;
