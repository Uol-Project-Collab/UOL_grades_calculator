import { useRouter } from "next/navigation";

export default function Navbar() {
  const navLink = "text-body text-background flex item-center font-bold cursor-pointer";
  const materialIcon = "material-symbols-outlined mr-2";
  const router = useRouter();
  return (
    <nav className="bg-primary-dark mt-2 flex w-fit flex-col justify-between rounded-2xl p-10">
      <ul className="mt-10 flex flex-col items-start gap-4">
        <li className={navLink}>
          <span className={materialIcon}>desktop_windows</span>
          <button
            onClick={() => {
              router.push("/dashboard");
            }}
            className={navLink}
          >
            Dashboard
          </button>
        </li>
        <li className={navLink}>
          <span className={materialIcon}>import_contacts</span>
          <button
            onClick={() => {
              router.push("/modules");
            }}
            className={navLink}
          >
            Modules
          </button>
        </li>
        <li className={navLink}>
          <span className={materialIcon}>monitoring</span>
          <button
            onClick={() => {
              router.push("/result");
            }}
            className={navLink}
          >
            Result
          </button>
        </li>
      </ul>
      <ul>
        <li className={navLink}>
          <span className={materialIcon}>logout</span>
          <button
            onClick={() => {
              router.push("/");
            }}
            className={navLink}
          >
            Logout
          </button>
        </li>
      </ul>
    </nav>
  );
}
