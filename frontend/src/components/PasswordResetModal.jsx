import React from 'react';
import { Mail, Lock, ArrowLeft } from 'lucide-react'; // Optional: using lucide-react for icons

const PasswordResetModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-8 shadow-2xl transition-all">

        {/* Header */}
        <div className="mb-6 text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-blue-50">
            <Lock className="h-7 w-7 text-blue-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900">Forgot password?</h2>
          <p className="mt-2 text-sm text-gray-500">
            No worries, we'll send you reset instructions.
          </p>
        </div>

        {/* Form Container */}
        <form onSubmit={(e) => e.preventDefault()} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Email Address
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <Mail className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="email"
                placeholder="enter your email"
                className="block w-full rounded-lg border border-gray-300 bg-gray-50 py-2.5 pl-10 pr-3 text-gray-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all outline-none"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full rounded-lg bg-gray-900 py-3 text-sm font-semibold text-white transition-all hover:bg-gray-800 active:scale-[0.98]"
          >
            Reset password
          </button>
        </form>

        {/* Footer */}
        <button
          onClick={onClose}
          className="mt-6 flex w-full items-center justify-center gap-2 text-sm font-medium text-gray-500 hover:text-gray-700 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to log in
        </button>

        
      </div>
    </div>
  );
};

export default PasswordResetModal;