export default function Navbar() {
  const navLink = "text-body text-background flex item-center font-bold"
  const materialIcon = "material-symbols-outlined mr-2"
  return(
    <nav className="bg-primary-dark flex flex-col justify-between rounded-2xl p-10 mt-2 w-fit h-full">
      <ul className="mt-10 flex flex-col items-start gap-4">
        <li className={navLink}>
          <span className={materialIcon}>
            desktop_windows
          </span>
          Dashboard
        </li>
        <li className={navLink}>
          <span className={materialIcon}>
            import_contacts
          </span>
          Modules
        </li>
        <li className={navLink}>
          <span className={materialIcon}>monitoring</span>
          Results
        </li>
      </ul>
      <ul>
        <li className={navLink}>
          <span className={materialIcon}>logout</span>
          Logout
        </li>
      </ul>
    </nav>
  );
}