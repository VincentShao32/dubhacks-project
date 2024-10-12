import localFont from "next/font/local";
import "./globals.css";
import { ConvexClientProvider } from "./ConvexClientProvider";

import { UserProvider } from "@auth0/nextjs-auth0/client";

import Navbar from "./components/Navbar";

export default function RootLayout({ children }) {
  return (
    <UserProvider>
      <html lang="en">
        <body>
          <Navbar></Navbar>
          <header>
            {/* <SignedOut>
              <SignInButton />
            </SignedOut>
            <SignedIn>
              <UserButton />
            </SignedIn> */}
          </header>
          <ConvexClientProvider>{children}</ConvexClientProvider>
        </body>
      </html>
    </UserProvider>
  );
}
