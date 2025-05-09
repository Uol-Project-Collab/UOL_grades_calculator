import AuthGuard from "./components/AuthGuard";

/**
 * Layout component that serves as the main structure for the user-facing pages.
 *
 * @param {Object} props - The props object.
 * @param {React.ReactNode} props.children - The child components to be rendered within the layout.
 *
 * @returns {JSX.Element} The layout structure containing a header, navigation bar, and content area.
 *
 * @remarks
 * - The layout includes a responsive design with specific width and padding adjustments for different screen sizes.
 * - The header displays a title and a welcoming message for the user.
 * - The `Navbar` component is used for navigation, and the `children` prop is rendered as the main content.
 *
 * @example
 * ```tsx
 * <Layout>
 *   <div>Your content here</div>
 * </Layout>
 * ```
 */
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-background mx-auto flex h-full w-[90%] flex-col p-1 md:w-[80%] md:p-2">
      <AuthGuard>
        <div className="w-full pt-10 text-right">
          <h1 className="text-page text-text-dark mr-4 font-extrabold sm:ml-12 md:ml-24 lg:ml-48">
            UOL Project Collab
          </h1>
        </div>
        
        {children}
      </AuthGuard>
    </div>
  );
}
