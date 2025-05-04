"use client";

import { useState } from "react";
import LoginForm from "../components/auth/LoginForm";
import RegisterForm from "../components/auth/RegisterForm";

/**
 * The `Home` component serves as the main page for the application.
 * It provides a user interface for toggling between login and registration forms.
 *
 * @component
 * @returns {JSX.Element} The rendered Home component.
 *
 * @remarks
 * - The component uses Tailwind CSS for styling.
 * - It includes a toggle mechanism to switch between "Login" and "Register" tabs.
 * - The `isLoginTab` state determines which form is displayed.
 *
 * @example
 * ```tsx
 * import Home from './page';
 *
 * function App() {
 *   return <Home />;
 * }
 * ```
 *
 * @description
 * The component is structured into two main sections:
 * 1. A welcome section with an image and introductory text.
 * 2. A form section with buttons to toggle between login and registration forms.
 *
 * @state
 * - `isLoginTab` (`boolean`): Tracks whether the "Login" tab is active.
 *
 * @styles
 * - `buttonGray`: A shared class for styling inactive buttons.
 * - Various Tailwind CSS classes are used for layout and design.
 *
 * @dependencies
 * - `LoginForm`: Component rendered when the "Login" tab is active.
 * - `RegisterForm`: Component rendered when the "Register" tab is active.
 */
export default function Home() {
  const [isLoginTab, SetLoginTab] = useState(true);
  const buttonGray =
    "bg-gray-200 hover:bg-gray-100 w-[50%] p-5 text-gray-500 cursor-pointer transition";
  return (
    <div className="flex flex-col items-center justify-center">
      <h1 className="text-page text-background mb-2 w-[90%] text-left font-extrabold md:w-[80%]">
        UOL Project Collab
      </h1>
      <div className="bg-background mx-auto flex w-[90%] flex-col items-start rounded-2xl p-4 md:w-[80%] md:flex-row md:p-[2rem]">
        <section className="w-full text-center md:w-[60%] md:text-left">
          <img
            src="/college-students.png"
            className="mx-auto w-[80%] md:mx-0 md:w-auto"
            alt="College Students"
          />
          <h1 className="text-hero text-text-dark mt-4 font-extrabold md:mt-0">
            Hi there.
          </h1>
          <p className="text-sub text-text-dark mt-2 font-bold">
            Want your result before your degree?
            <br />
            You are at the right place.
          </p>
        </section>
        <section className="mt-6 ml-0 h-full w-full md:mt-0 md:ml-4 md:w-[40%]">
          <div className="flex items-center justify-evenly">
            <button
              className={isLoginTab ? "w-[50%] p-5" : buttonGray}
              onClick={() => {
                SetLoginTab(true);
              }}
            >
              Login
            </button>
            <button
              className={isLoginTab ? buttonGray : "w-[50%] p-5"}
              onClick={() => {
                SetLoginTab(false);
              }}
            >
              Register
            </button>
          </div>

          {isLoginTab ? <LoginForm /> : <RegisterForm />}
        </section>
      </div>
    </div>
  );
}
