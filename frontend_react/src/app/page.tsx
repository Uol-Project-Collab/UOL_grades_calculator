"use client";

import { useState } from "react";
import LoginForm from "../components/auth/LoginForm";
import RegisterForm from "../components/auth/RegisterForm";

export default function Home() {
  const [isLoginTab, SetLoginTab] = useState(true);
  const buttonGray = "bg-gray-200 hover:bg-gray-100 w-[50%] p-5 text-gray-500 cursor-pointer transition";
  return (
    <div className="flex flex-col items-center justify-center">
      <h1 className="text-page text-background w-[90%] md:w-[80%] mb-2 text-left font-extrabold">
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
