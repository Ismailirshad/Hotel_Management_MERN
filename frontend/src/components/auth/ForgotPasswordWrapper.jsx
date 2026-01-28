import React, { useState } from "react";
import EmailStep from "./EmailStep.jsx";
import OtpStep from "./OtpStep.jsx";
import ResetPasswordStep from "./ResetPasswordStep.jsx";

const ForgotPasswordFlowModal = ({ onClose, openLogin }) => {
  const [step, setStep] = useState("email");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const renderForm = () => {
    switch (step) {
      case "email":
        return (
          <EmailStep
            setLoading={setLoading}
            email={email}
            setEmail={setEmail}
            loading={loading}
            setStep={setStep}
          />
        );
      case "otp":
        return (
          <OtpStep
            loading={loading}
            setLoading={setLoading}
            otp={otp}
            setOtp={setOtp}
            setStep={setStep}
            email={email}
          />
        );
      case "reset":
        return (
          <ResetPasswordStep
            loading={loading}
            setLoading={setLoading}
            confirmPassword={confirmPassword}
            setConfirmPassword={setConfirmPassword}
            password={password}
            setPassword={setPassword}
            onClose={onClose}
            openLogin={openLogin}
            email={email}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-md rounded-xl p-6 relative">
        <button className="absolute top-3 right-3 text-black" onClick={onClose}>
          ✖
        </button>
        {renderForm()}
      </div>
    </div>
  );
};

export default ForgotPasswordFlowModal;
