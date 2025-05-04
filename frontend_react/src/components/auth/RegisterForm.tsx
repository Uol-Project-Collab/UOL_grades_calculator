import { useRouter } from "next/navigation";

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
export default function RegisterForm() {
  const router = useRouter();
  
  return (
    <div className="flex h-[95%] flex-col items-center justify-around p-4 sm:p-6">
      <h1 className="text-sub text-text-dark text-center font-bold sm:text-left">
        Create an account
      </h1>
      <form className="flex w-full max-w-[30rem] flex-col">
        {["Email", "Password", "Confirm Password"].map((label, index) => (
          <div key={index} className="mt-1 flex flex-col pt-1 pb-1">
            <label className="text-sm sm:text-base">{label}</label>
            <input
              className="focus:ring-primary-dark mt-1 rounded-lg border border-gray-300 p-2 outline-1 focus:ring-2"
              type={label.includes("Password") ? "password" : "text"}
              placeholder={`Enter your ${label.toLowerCase()}.`}
            />
          </div>
        ))}
        <button
          className="bg-primary-dark text-background hover:bg-primary mt-4 flex cursor-pointer items-center justify-center rounded-lg p-2 transition"
          type="submit"
          onClick={
            // will be replaced with the login function
              (event) => {
              event.preventDefault();
              router.push("/dashboard");
            }
          }
        >
          Register
          <span className="material-symbols-outlined ml-2">person_add</span>
        </button>
      </form>

      <p className="mt-4 text-center text-sm sm:text-base">
        Have an account?{" "}
        <b className="text-primary-dark cursor-pointer">Login</b>
      </p>
    </div>
  );
}
