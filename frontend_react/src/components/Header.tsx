interface HeaderProps {
  title: string;
  message: string;
}

export default function Header({ title, message }: HeaderProps) {
  return (
    <header className="bg-primary-dark flex w-full justify-between rounded-2xl p-10">
      <div>
        <h1 className="text-page text-background mt-4 font-bold md:mt-0">
          {title}
        </h1>
        <p className="text-body text-background font-regular mt-2">{message}</p>
      </div>
      <div className="flex flex-row self-end">
        <p className="text-body text-background font-regular mt-2 mr-5">
          Privacy
        </p>
        <p className="text-body text-background font-regular mt-2">Support</p>
      </div>
    </header>
  );
}
