"use client";

import { useUser } from "@auth0/nextjs-auth0/client";
import Link from "next/link";

const Navbar = () => {
  const { user, error, isLoading } = useUser();

  return (
    <div className="fixed w-full flex bg-orange-500 p-4 text-white justify-between items-center">
      <h1>Datch</h1>
      {user ? (
        <a
          className="bg-red-500 p-4 text-white rounded"
          href="/api/auth/logout"
        >
          Logout
        </a>
      ) : (
        <Link
          className="bg-blue-500 p-4 text-white rounded"
          href="/api/auth/login"
        >
          Login
        </Link>
      )}
    </div>
  );
};

export default Navbar;
