import { useRouter } from "next/navigation";

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
              router.push("/user/dashboard");
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
