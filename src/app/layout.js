import localFont from "next/font/local";
import "./globals.css";
import { ConvexClientProvider } from "./ConvexClientProvider";

import { UserProvider } from "@auth0/nextjs-auth0/client";

import Navbar from "./components/Navbar";

export default function RootLayout({ children }) {
  return (
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
        <ConvexClientProvider>
          <UserProvider>{children}</UserProvider>
        </ConvexClientProvider>
      </body>
    </html>
  );
}
