interface HeaderProps {
  message: string;
}

export default function HeaderMessage({message} : HeaderProps){
  return(
    <div className="flex items-center justify-center w-full p-5 mt-4 mb-4 bg-primary-dark text-background text-sub font-bold">
      {message}
    </div>
  );
}