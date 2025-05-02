export default function LoginForm() {
  return (
    <div className="flex h-full flex-col items-center justify-around">
      <h1 className="text-page text-text-dark font-bold">Enter your details</h1>
      <form className="flex w-[30rem] flex-col">
        <div className="mt-1 flex flex-col pt-1 pb-1">
          <label>Email</label>
          <input
            className="rounded-lg p-2 outline-1"
            type="text"
            placeholder="Enter your email."
          />
        </div>
        <div className="mt-1 flex flex-col pt-2 pb-2">
          <label>Password</label>
          <input
            className="rounded-lg p-2 outline-1"
            type="text"
            placeholder="Enter your password."
          />
        </div>
        <button
          className="bg-primary-dark text-background mt-4 flex items-center justify-center rounded-lg p-2"
          type="submit"
        >
          Login
          <span className="material-symbols-outlined ml-2">login</span>
        </button>
      </form>

      <p>
        Don't have an account? <b>Create an Account</b>
      </p>
    </div>
  );
}
