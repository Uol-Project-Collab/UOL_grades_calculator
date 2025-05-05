'use client';

import { useRouter } from "next/navigation";
import { useState } from "react";

/**
 * A React functional component that renders a registration form.
 *
 * @component
 * @returns {JSX.Element} The rendered registration form component.
 *
 * @description
 * This component provides a user interface for creating a new account.
 * It includes input fields for email, password, and password confirmation,
 * as well as a submit button that redirects the user to the dashboard upon successful registration.
 *
 * @remarks
 * - The form uses Tailwind CSS classes for styling.
 * - The `useRouter` hook from Next.js is used for navigation.
 * - The password fields are masked for security.
 *
 * @example
 * ```tsx
 * import RegisterForm from './RegisterForm';
 *
 * function App() {
 *   return <RegisterForm />;
 * }
 * ```
 *
 * @todo
 * - Replace the placeholder `onClick` handler with the actual registration logic.
 * - Add form validation for better user experience.
 * - Implement error handling for failed registration attempts.
 */
export default function RegistrationForm() {
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const validateEmail = (email: string) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleRegister = async (event: React.FormEvent) => {
    event.preventDefault();
    setError(null);

    if (!email || !password || !confirmPassword) {
      setError("All fields are required.");
      return;
    }

    if (!validateEmail(email)) {
      setError("Invalid email format.");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('http://localhost:3000/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const { message } = await response.json();
        throw new Error(message || "Registration failed.");
      }

      router.push('/dashboard'); // or '/login' if you prefer manual login
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-[95%] flex-col items-center justify-around p-4 sm:p-6">
      <h1 className="text-sub text-text-dark text-center font-bold sm:text-left">
        Create your account
      </h1>
      <form className="flex w-full max-w-[30rem] flex-col" onSubmit={handleRegister}>
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
            placeholder="Create a password."
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div className="mt-1 flex flex-col pt-2 pb-2">
          <label className="text-sm sm:text-base">Confirm Password</label>
          <input
            className="focus:ring-primary-dark rounded-lg border border-gray-300 p-2 outline-1 focus:ring-2"
            type="password"
            placeholder="Re-enter your password."
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>

        {error && (
          <p className="text-red-600 text-sm mt-2">{error}</p>
        )}

        <button
          className="bg-primary-dark text-background hover:bg-primary mt-4 flex cursor-pointer items-center justify-center rounded-lg p-2 transition disabled:opacity-50"
          type="submit"
          disabled={loading}
        >
          {loading ? "Creating account..." : "Register"}
          <span className="material-symbols-outlined ml-2">person_add</span>
        </button>
      </form>

      <p className="mt-4 cursor-pointer text-center text-sm sm:text-base">
        Already have an account? <b>Login</b>
      </p>
    </div>
  );
}
