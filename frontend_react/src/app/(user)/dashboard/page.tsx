export default function Dashboard() {
  return (
    <div className="bg-background mx-auto flex h-full w-[90%] flex-col p-1 md:w-[80%] md:p-2">
      <div className="w-full pt-10 text-right">
        <h1 className="text-page text-text-dark mr-4 font-extrabold sm:ml-12 md:ml-24 lg:ml-48">
          UOL Project Collab
        </h1>
      </div>

      <header className="bg-primary-dark flex w-full justify-between rounded-2xl p-10">
        <div>
          <h1 className="text-page text-background mt-4 font-bold md:mt-0">
            Welcome, User!
          </h1>
          <p className="text-body text-background font-regular mt-2">
            Always stay updated in your student grades.
          </p>
        </div>
        <div className="flex flex-row self-end">
          <p className="text-body text-background font-regular mt-2 mr-5">
            Privacy
          </p>
          <p className="text-body text-background font-regular mt-2">Support</p>
        </div>
      </header>
      <nav>
        <ul className="mt-10 flex flex-col items-start justify-center gap-4">
          <li className="text-body text-text-dark font-bold">
            <span className="material-symbols-outlined mr-2">
              desktop_windows
            </span>
            Dashboard
          </li>
          <li className="text-body text-text-dark font-bold">
            <span className="material-symbols-outlined mr-2">
              import_contacts
            </span>
            Modules
          </li>
          <li className="text-body text-text-dark font-bold">
            <span className="material-symbols-outlined mr-2">monitoring</span>
            Results
          </li>
          <li className="text-body text-text-dark font-bold">
            <span className="material-symbols-outlined mr-2">logout</span>
            Logout
          </li>
        </ul>
      </nav>
    </div>
  );
}
