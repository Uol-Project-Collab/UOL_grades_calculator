interface HeaderProps {
  message: string;
}

export default function AddModulesHeader({ message }: HeaderProps) {
  return (
    <div className="bg-primary-dark text-background text-sub mt-4 mb-4 flex w-full items-center justify-center p-5 font-bold">
      {message}
    </div>
  );
}
