export default function RegisterForm() {
  return (
    <>
      <h1 className="text-sub text-text-dark font-bold">Register</h1>
      <form className="flex w-full flex-col">
        {["Email", "Password", "Confirm Password"].map((label, index) => (
          <div key={index} className="mt-1 flex flex-col">
            <label>{label}</label>
            <input
              className="mt-1 rounded-lg p-2 outline-1"
              type={label.includes("Password") ? "password" : "text"}
              placeholder={`Enter your ${label.toLowerCase()}.`}
            />
          </div>
        ))}
        <button
          className="bg-primary-dark text-background mt-4 flex items-center justify-center rounded-lg p-2"
          type="submit"
        >
          Register
          <span className="material-symbols-outlined ml-2">person_add</span>
        </button>
      </form>

      <p>
        Have an account? <b>Login</b>
      </p>
    </>
  );
}
