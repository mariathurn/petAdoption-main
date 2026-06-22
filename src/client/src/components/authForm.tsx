import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { createUser, getUserByEmail } from "../api-service";

type Props = {
  onClose: () => void;
};

export default function AuthForm({ onClose }: Props) {
  const { login } = useAuth();

  const [isSignup, setIsSignup] = useState(true);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");

  const validateEmail = (e: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!validateEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    if (isSignup) {
      try {
        const data = await createUser({ firstName, lastName, email, password });
        localStorage.setItem("userId", data.id);
        window.dispatchEvent(new Event("storage"));
        login(data.firstName);
        onClose();
      } catch (err: any) {
        setError(err.message);
      }
    } else {
      try {
        const data = await getUserByEmail(email);
        localStorage.setItem("userId", data);
        window.dispatchEvent(new Event("storage"));
        login(firstName);
        onClose();
      } catch {
        setError("User not found, please sign up.");
      }
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="relative w-full max-w-md rounded-2xl bg-white/80 shadow-xl ring-1 ring-black/10 backdrop-blur-lg p-8">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 transition"
          aria-label="Close"
        >
          ✕
        </button>

        <h2 className="text-3xl font-bold text-center text-purple-800 mb-6">
          {isSignup ? "Sign Up" : "Log In"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {isSignup && (
            <input
              type="text"
              placeholder="Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="rounded-lg border w-full border-gray-300 px-4 py-2 focus:ring-2 focus:ring-purple-300 focus:outline-none"
              required
            />
          )}

          <input
            type="text"
            placeholder="First Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className="rounded-lg w-full border border-gray-300 mb-4 px-4 py-2 focus:ring-2 focus:ring-purple-300 focus:outline-none"
            required
          />

          <input
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-purple-300 focus:outline-none"
            required
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-purple-300 focus:outline-none"
            required
          />

          {error && <p className="text-red-600 text-sm">{error}</p>}

          <button
            type="submit"
            className="w-full rounded-lg bg-purple-700 text-white font-semibold py-2 hover:bg-purple-600 transition"
          >
            {isSignup ? "Create Account" : "Log In"}
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-gray-700">
          {isSignup ? (
            <>
              Already have an account?{" "}
              <button
                onClick={() => setIsSignup(false)}
                className="text-purple-700 font-medium hover:underline transition"
              >
                Log in here
              </button>
            </>
          ) : (
            <>
              New user?{" "}
              <button
                onClick={() => setIsSignup(true)}
                className="text-purple-700 font-medium hover:underline transition"
              >
                Sign up here
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
