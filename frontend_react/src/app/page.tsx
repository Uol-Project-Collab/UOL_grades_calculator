"use client";

import { useState } from "react";
import LoginForm from "../components/auth/LoginForm";
import RegisterForm from "../components/auth/RegisterForm";

export default function Home() {
  const [isLoginTab, SetLoginTab] = useState(true);
  const buttonGray = "bg-gray-200 w-[50%] p-5 text-gray-500";
  return (
    <div className="bg-background flex w-[80%] flex-row items-start rounded-2xl p-[2rem]">
      <section className="w-[60%]">
        <img src="/college-students.png" />
        <h1 className="text-hero text-text-dark font-extrabold">Hi there.</h1>
        <p className="text-sub text-text-dark font-bold">
          Want your result before your degree?
          <br />
          You are at right place.
        </p>
      </section>
      <section className="ml-4 h-full w-[40%]">
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
  );
}
