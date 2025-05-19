interface HeaderProps {
  title: string;
  message: string;
}

/**
 * Header component that displays a title, a message, and additional links.
 *
 * @component
 * @param {HeaderProps} props - The props for the Header component.
 * @param {string} props.title - The main title to be displayed in the header.
 * @param {string} props.message - A descriptive message or subtitle to be displayed below the title.
 *
 * @returns {JSX.Element} A styled header element containing the title, message, and links for "Privacy" and "Support".
 *
 * @remarks
 * - The header is styled using Tailwind CSS classes.
 * - The layout includes a flex container with two sections: one for the title and message, and another for the links.
 * - The "Privacy" and "Support" links are placeholders and can be updated to include navigation functionality.
 *
 * @example
 * ```tsx
 * <Header title="Welcome" message="Your personalized dashboard" />
 * ```
 */
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
