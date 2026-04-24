import { useState } from "react";

// ─── REUSABLE INPUT COMPONENT (DRY) ─────────────────────────────────────────
// Pill-shaped input — matches your project's existing style exactly
const InputField = ({ type, placeholder, value, onChange }) => (
  <input
    type={type}
    placeholder={placeholder}
    value={value}
    onChange={onChange}
    required
    className="w-full bg-transparent border-2 border-emerald-600 text-white
               placeholder-gray-400 font-medium text-lg py-2 px-6 rounded-full
               outline-none focus:border-emerald-400 transition-colors duration-200"
  />
);

// ─── MAIN LOGIN COMPONENT ────────────────────────────────────────────────────
const Login = ({ handleLogin }) => {

  const [email, setEmail]     = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  // All field config in one place — add a field here, it renders automatically
  const fields = [
    {
      id: "email",
      type: "email",
      placeholder: "Enter your email",
      value: email,
      onChange: (e) => setEmail(e.target.value),
    },
    {
      id: "password",
      type: "password",
      placeholder: "Enter password",
      value: password,
      onChange: (e) => setPassword(e.target.value),
    },
  ];

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    await handleLogin(email, password);
    setEmail("");
    setPassword("");
    setLoading(false);
  };

  return (
    // Dull dark background 
    <div className="flex h-screen w-screen items-center justify-center git bg-[#0f0f0f]">

      {/* Card — same emerald border style as your original */}
      <div className="border-2 border-emerald-600 rounded-xl p-16 flex flex-col items-center gap-5 w-full max-w-md">

        {/* Title  */}
        <h1 className="text-white text-2xl font-semibold tracking-tight mb-2">Log In</h1>

        {/* Form */}
        <form onSubmit={submitHandler} className="flex flex-col items-center gap-4 w-full">

          {/* One .map() renders all inputs */}
          {fields.map((field) => (
            <InputField
              key={field.id}
              type={field.type}
              placeholder={field.placeholder}
              value={field.value}
              onChange={field.onChange}
            />
          ))}

          {/* Submit button */}
          <button
            type="submit"
            disabled={loading}
            className="mt-3 w-full bg-emerald-600 hover:bg-emerald-700 disabled:opacity-60
                       disabled:cursor-not-allowed text-white font-semibold text-lg
                       py-2 px-8 rounded-full transition-colors duration-200"
          >
            {loading ? "Logging in…" : "Log in"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;