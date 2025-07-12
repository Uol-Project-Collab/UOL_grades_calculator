"use client";
import { usePathname, useRouter } from "next/navigation";
import { logout } from "../../(utils)/AxiosAuth";

/**
 * Navbar component that provides navigation links for the application.
 *
 * This component renders a vertical navigation bar with links to different
 * sections of the application, including "Dashboard", "Modules", "Result",
 * and "Logout". It uses dynamic styling to highlight the active link based
 * on the current pathname.
 *
 * @returns {JSX.Element} The rendered Navbar component.
 *
 * ## Classes:
 * - `navLink`: A shared class for styling navigation links.
 * - `materialIcon`: A shared class for styling Material Icons.
 *
 * ## Dependencies:
 * - `useRouter`: A hook for programmatic navigation.
 * - `usePathname`: A hook to retrieve the current pathname for active link highlighting.
 *
 * ## Functions:
 * - `handleNavigation(path: string)`: Navigates to the specified path using the router.
 *
 * ## Structure:
 * - The navigation bar is divided into two sections:
 *   1. Main navigation links (Dashboard, Modules, Result).
 *   2. Logout link.
 *
 * ## Notes:
 * - The `font-bold` class is conditionally applied to the active link for visual emphasis.
 * - The `material-symbols-outlined` class is used for Material Icons next to each link.
 *
 * * @example
 * ```tsx
 * <Navbar />
 * ```
 */
export default function Navbar() {
  const navLink =
    "text-body text-background flex item-center font-regular cursor-pointer";
  const materialIcon = "material-symbols-outlined mr-2";
  const router = useRouter();
  const pathname = usePathname();

  const handleNavigation = (path: string) => {
    router.push(path);
  };

  const handleLogout = async () => {
    try {
      const response = logout();
      console.log("Logout successful:", response);
      router.push("/"); // Redirect to login page
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <nav className="bg-primary-dark mt-2 flex h-full w-fit flex-col justify-between rounded-2xl p-10">
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
          <button onClick={handleLogout} className={navLink}>
            Logout
          </button>
        </li>
      </ul>
    </nav>
  );
}
