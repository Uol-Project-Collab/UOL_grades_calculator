"use client";
import { usePathname, useRouter } from "next/navigation";

export default function Navbar() {
  const navLink =
    "text-body text-background flex item-center font-regular cursor-pointer";
  const materialIcon = "material-symbols-outlined mr-2";
  const router = useRouter();
  const pathname = usePathname();

  const handleNavigation = (path: string) => {
    router.push(path);
  };

  return (
    <nav className="bg-primary-dark mt-2 flex w-fit flex-col justify-between rounded-2xl p-10">
      <ul className="mt-10 flex flex-col items-start gap-4">
        <li className={navLink}>
          <span className={materialIcon}>desktop_windows</span>
          <button
            onClick={() => handleNavigation("/dashboard")}
            className={`${navLink} ${pathname === "/dashboard" ? "font-bold" : ""}`}
          >
            Dashboard
          </button>
        </li>
        <li className={navLink}>
          <span className={materialIcon}>import_contacts</span>
          <button
            onClick={() => handleNavigation("/modules")}
            className={`${navLink} ${pathname === "/modules" ? "font-bold" : ""}`}
          >
            Modules
          </button>
        </li>
        <li className={navLink}>
          <span className={materialIcon}>monitoring</span>
          <button
            onClick={() => handleNavigation("/result")}
            className={`${navLink} ${pathname === "/result" ? "font-bold" : ""}`}
          >
            Result
          </button>
        </li>
      </ul>
      <ul>
        <li className={navLink}>
          <span className={materialIcon}>logout</span>
          <button
            onClick={() => handleNavigation("/")}
            className={`${navLink} ${pathname === "/" ? "font-bold" : ""}`}
          >
            Logout
          </button>
        </li>
      </ul>
    </nav>
  );
}
