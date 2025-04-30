import LoginForm from "../components/auth/LoginForm";
import RegisterForm from "../components/auth/RegisterForm";

export default function Home() {
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
      <section className="ml-4 w-[40%]">
        {/* <LoginForm /> */}
        <RegisterForm />
      </section>
    </div>
  );
}
