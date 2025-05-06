"use client";

import { useRouter } from "next/navigation";
import { useState, useContext } from "react";
import { useAuth } from "../../context/AuthProvider";

/**
 * LoginForm Component
 *
 * This component renders a login form with fields for email and password,
 * along with a submit button. It also includes a link to navigate to the
 * account creation page for users who do not have an account.
 *
 * @component
 *
 * @returns {JSX.Element} The rendered login form component.
 *
 * @remarks
 * - The form uses Tailwind CSS classes for styling.
 * - The `router.push` function is used to navigate to the dashboard upon successful login.
 * - The `onClick` handler for the submit button prevents the default form submission behavior.
 *
 * @example
 * ```tsx
 * import LoginForm from './LoginForm';
 *
 * function App() {
 *   return (
 *     <div>
 *       <LoginForm />
 *     </div>
 *   );
 * }
 * ```
 *
 * @dependencies
 * - `useRouter` from `next/router` for navigation.
 *
 * @todo
 * - Replace the placeholder `onClick` handler with the actual login function.
 * - Add form validation for email and password fields.
 * - Implement error handling for login failures.
 */
export default function LoginForm() {
  const router = useRouter();

  const { email, setEmail, remember, setRemember } = useAuth();
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleRememberState = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRemember(event.target.checked);
  };

  const validateEmail = (email: string) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();

    setError(null);

    if (email === "") {
      setError("Please enter login details.");
      return;
    }

    if (!validateEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    if (password.length < 8) {
      setError("Password must be at least 6 characters.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("http://localhost:3000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error);
      }

      const { emaill, uid, token } = data;

      if (remember) {
        // Store token securely (localStorage for now)
        localStorage.setItem("authToken", token);
      } else {
        sessionStorage.setItem("authToken", token);
      }

      // If success, navigate to dashboard
      router.push("/dashboard");
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-[95%] flex-col items-center justify-around p-4 sm:p-6">
      <h1 className="text-sub text-text-dark text-center font-bold sm:text-left">
        Enter your details
      </h1>
      <form
        className="flex w-full max-w-[30rem] flex-col"
        onSubmit={handleLogin}
      >
        <div className="mt-1 flex flex-col pt-1 pb-1">
          <label className="text-sm sm:text-base">Email</label>
          <input
            className="focus:ring-primary-dark rounded-lg border border-gray-300 p-2 outline-1 focus:ring-2"
            type="text"
            placeholder="Enter your email."
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mt-1 flex flex-col pt-2 pb-2">
          <label className="text-sm sm:text-base">Password</label>
          <input
            className="focus:ring-primary-dark rounded-lg border border-gray-300 p-2 outline-1 focus:ring-2"
            type="password"
            placeholder="Enter your password."
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div>
          <label>
            <input
              type="checkbox"
              onChange={handleRememberState}
              checked={remember}
            />{" "}
            Remember my password
          </label>
        </div>

        {error && <p className="mt-2 text-sm text-red-600">{error}</p>}

        <button
          className="bg-primary-dark text-background hover:bg-primary mt-4 flex cursor-pointer items-center justify-center rounded-lg p-2 transition disabled:opacity-50"
          type="submit"
          disabled={loading}
        >
          {loading ? "Logging in..." : "Login"}
          <span className="material-symbols-outlined ml-2">login</span>
        </button>
      </form>

      <p className="mt-4 cursor-pointer text-center text-sm sm:text-base">
        Don't have an account? <b>Create an Account</b>
      </p>
    </div>
  );
}
