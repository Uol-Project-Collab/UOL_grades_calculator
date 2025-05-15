import React from "react";
import "./(styles)/globals.css";
/**
 * RootLayout component serves as the main layout wrapper for the application.
 * It defines the HTML structure, including the `<html>` and `<body>` tags,
 * and sets up global configurations such as language, fonts, icons, and metadata.
 *
 * @param {Object} props - The properties object.
 * @param {React.ReactNode} props.children - The child components to be rendered inside the layout.
 *
 * @returns {JSX.Element} The RootLayout component.
 *
 * @remarks
 * - Includes the Poppins font family from Google Fonts for consistent typography.
 * - Imports Material Symbols Outlined icons from Google Fonts with a subset of icons
 *   to optimize bundle size.
 * - Sets a shortcut icon (favicon) for the application.
 * - Applies a global CSS class `background` and flexbox utilities to the `<body>` tag
 *   for layout styling.
 *
 * @example
 * ```tsx
 * <RootLayout>
 *   <div>Welcome to the UOL Grading Calculator</div>
 * </RootLayout>
 * ```
 */
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <title>UOL Grading Calculator</title>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        {/* Font - Poppin */}
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap"
          rel="stylesheet"
        />
        {/* Icons Connection - https://fonts.google.com/icons
         * Docs: https://developers.google.com/fonts/docs/material_symbols
         * Material Symbols Outlined is a collection of 1,100+ icons that are
         * designed to be used in web and mobile applications.
         * Only required icons should be imported to reduce the bundle size.
         * Icons should be imported using the icon_names parameter in the URL.
         * in alphabetical order.
         */}
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined&icon_names=add,arrow_left_alt,arrow_right_alt,cancel,desktop_windows,edit_square,import_contacts,login,logout,monitoring,person_add"
          rel="stylesheet"
        />
        <link rel="shortcut icon" href="/favicon.ico" sizes="any" />
      </head>
      <body className="background flex flex-col items-center justify-center">
        {children}
      </body>
    </html>
  );
}
