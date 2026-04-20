import { useState } from "react";
import { useUserStore } from "../../store/useUserStore.js";

const LoginModal = ({ setShowModal, openForgot }) => {
  const { signup, login, loading } = useUserStore();
  const [formType, setFormType] = useState("login");

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let success = false;
    if (formType === "login") {
      success = await login(form);
    } else {
      success = await signup(form);
    }
    if (success) setShowModal(false);
  };

  const handleGoogleLogin = () => {
    window.location.href = "http://localhost:4000/api/auth/google";
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-md flex items-center justify-center z-50 px-4">
      
      {/* MODAL CARD */}
      <div className="relative w-full max-w-md rounded-2xl bg-white/90 backdrop-blur-xl shadow-2xl p-6">

        {/* CLOSE BUTTON */}
        <button
          onClick={() => setShowModal(false)}
          className="absolute top-4 right-4 text-slate-500 hover:text-slate-800 text-lg"
        >
          ✕
        </button>

        {/* TITLE */}
        <h2 className="text-2xl font-bold text-slate-900 text-center mb-6">
          {formType === "login" ? "Welcome Back" : "Create Account"}
        </h2>

        {/* FORM */}
        <form onSubmit={handleSubmit} className="space-y-4">

          {formType !== "login" && (
            <div>
              <label className="block mb-1 text-sm font-medium text-slate-700">
                Name
              </label>
              <input
                type="text"
                id="name"
                value={form.name}
                placeholder="Enter your name"
                onChange={handleChange}
                className="w-full rounded-lg border text-sm border-slate-300 px-4 py-2 text-slate-900
                           focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                required
              />
            </div>
          )}

          <div>
            <label className="block mb-1 text-sm font-medium text-slate-700">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={form.email}
              placeholder="Enter your email"
              onChange={handleChange}
              className="w-full rounded-lg border text-sm border-slate-300 px-4 py-2 text-slate-900
                         focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              required
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium text-slate-700">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={form.password}
              placeholder="Enter your password"
              onChange={handleChange}
              className="w-full rounded-lg border text-sm border-slate-300 px-4 py-2 text-slate-900
                         focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              required
            />
          </div>

          {/* SUBMIT */}
          <button
            type="submit"
            className="w-full bg-emerald-600 text-white py-2.5 rounded-lg
                       hover:bg-emerald-700 transition font-medium"
          >
            {loading ? "Processing..." : formType === "login" ? "Login" : "Signup"}
          </button>

          {/* FORGOT */}
          <p
            onClick={openForgot}
            className="text-sm text-emerald-600 hover:underline text-right cursor-pointer"
          >
            Forgot password?
          </p>

          {/* SWITCH MODE */}
          <p className="text-center text-sm text-slate-600">
            {formType === "login"
              ? "Don’t have an account?"
              : "Already have an account?"}
            <span
              className="ml-1 text-emerald-600 font-medium cursor-pointer"
              onClick={() =>
                setFormType(formType === "login" ? "signup" : "login")
              }
            >
              {formType === "login" ? "Sign up" : "Login"}
            </span>
          </p>
        </form>

        {/* GOOGLE LOGIN */}
         <button
          onClick={handleGoogleLogin}
          className="w-full mt-3 flex items-center justify-center gap-3 bg-gray-800 border border-gray-300 text-slate-200 hover:text-slate-900 font-medium py-1 px-4
           rounded-lg hover:bg-gray-500 transition-colors duration-200 shadow-sm cursor-pointer"
        >
          <img
            src="/googleLogo.png"
            width={38}
            height={38}
            alt="Google logo"
            loading="lazy"
            className="object-contain"
          />
          <span>Sign in with Google</span>
        </button>
      </div>
    </div>
  );
};

export default LoginModal;

