export default function LoginForm() {
  return (
    <>
      <h1 className="text-sub text-text-dark font-bold">Login</h1>
      <form className="flex w-[25rem] flex-col">
        <label>Email</label>
        <input
          className="rounded-lg p-2 outline-1"
          type="text"
          placeholder="Enter your email."
        />
        <label>Password</label>
        <input
          className="rounded-lg p-2 outline-1"
          type="text"
          placeholder="Enter your password."
        />
        <button
          className="bg-primary-dark text-background mt-4 rounded-lg p-2"
          type="submit"
        >
          Login
        </button>
      </form>
    </>
  );
}
