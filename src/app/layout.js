import localFont from "next/font/local";
import "./globals.css";
import { ConvexClientProvider } from "./ConvexClientProvider";
// import { ConvexProviderWithAuth } from "convex/react";
import { UserProvider } from "@auth0/nextjs-auth0/client";

import Navbar from "./components/Navbar";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

const satoshiVariable = localFont({
  src: "./fonts/Satoshi-Variable.woff",
  variable: "--font-satoshi-variable",
});

const satoshiLight = localFont({
  src: "./fonts/Satoshi-Light.woff",
  variable: "--font-satoshi-light",
});

const satoshiLightItalic = localFont({
  src: "./fonts/Satoshi-LightItalic.woff",
  variable: "--font-satoshi-light-italic",
});

const satoshiMedium = localFont({
  src: "./fonts/Satoshi-Medium.woff",
  variable: "--font-satoshi-medium",
});

export default function RootLayout({ children }) {
  return (
    <UserProvider>
      <html lang="en">
        <body
          className={`${geistSans.variable} ${geistMono.variable} ${satoshiVariable.variable} ${satoshiLight.variable} ${satoshiLightItalic.variable} ${satoshiMedium.variable} antialiased`}
        >
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
