"use client";

import Link from "next/link";
import ProfileSVG from "../../graphics/account_circle.svg";
import { useState } from "react";
import { useUser } from "@auth0/nextjs-auth0/client";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const { user, error, isLoading } = useUser();

  return (
    <div className="absolute top-0 z-10 w-full bg-black text-white p-4 justify-between items-center font-[family-name:var(--font-satoshi-variable)]">
      <div className="flex mx-auto w-fit items-center gap-16">
        <Link href="/orders" className="text-lg ">
          list view
        </Link>
        <h1 className="text-4xl">Datch</h1>
        <Link href="/map" className="text-lg ">
          map view
        </Link>
      </div>

      <button
        className="absolute right-5 top-[12px]"
        onClick={() => setOpen((prev) => !prev)}
      >
        <svg
          width="49"
          height="49"
          viewBox="0 0 49 49"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M11.9437 34.9125C13.6791 33.5854 15.6187 32.5391 17.7625 31.7734C19.9062 31.0078 22.1521 30.625 24.5 30.625C26.8479 30.625 29.0937 31.0078 31.2375 31.7734C33.3812 32.5391 35.3208 33.5854 37.0562 34.9125C38.2472 33.5174 39.1745 31.9351 39.838 30.1656C40.5015 28.3962 40.8333 26.5077 40.8333 24.5C40.8333 19.9743 39.2425 16.1207 36.0609 12.9391C32.8793 9.75748 29.0257 8.16668 24.5 8.16668C19.9743 8.16668 16.1206 9.75748 12.939 12.9391C9.75745 16.1207 8.16665 19.9743 8.16665 24.5C8.16665 26.5077 8.49842 28.3962 9.16196 30.1656C9.8255 31.9351 10.7528 33.5174 11.9437 34.9125ZM24.5 26.5417C22.4923 26.5417 20.7995 25.8526 19.4213 24.4745C18.0432 23.0964 17.3541 21.4035 17.3541 19.3958C17.3541 17.3882 18.0432 15.6953 19.4213 14.3172C20.7995 12.9391 22.4923 12.25 24.5 12.25C26.5076 12.25 28.2005 12.9391 29.5786 14.3172C30.9568 15.6953 31.6458 17.3882 31.6458 19.3958C31.6458 21.4035 30.9568 23.0964 29.5786 24.4745C28.2005 25.8526 26.5076 26.5417 24.5 26.5417ZM24.5 44.9167C21.6757 44.9167 19.0215 44.3807 16.5375 43.3089C14.0535 42.237 11.8927 40.7823 10.0552 38.9448C8.21769 37.1073 6.763 34.9465 5.69113 32.4625C4.61925 29.9785 4.08331 27.3243 4.08331 24.5C4.08331 21.6757 4.61925 19.0215 5.69113 16.5375C6.763 14.0535 8.21769 11.8927 10.0552 10.0552C11.8927 8.21772 14.0535 6.76303 16.5375 5.69116C19.0215 4.61928 21.6757 4.08334 24.5 4.08334C27.3243 4.08334 29.9785 4.61928 32.4625 5.69116C34.9465 6.76303 37.1073 8.21772 38.9448 10.0552C40.7823 11.8927 42.237 14.0535 43.3088 16.5375C44.3807 19.0215 44.9166 21.6757 44.9166 24.5C44.9166 27.3243 44.3807 29.9785 43.3088 32.4625C42.237 34.9465 40.7823 37.1073 38.9448 38.9448C37.1073 40.7823 34.9465 42.237 32.4625 43.3089C29.9785 44.3807 27.3243 44.9167 24.5 44.9167Z"
            fill="#FEF7FF"
          />
        </svg>
      </button>

      {open && (
        <div className="flex flex-col absolute right-0 top-[70px] bg-red p-4 w-[100px] items-center">
          {user ? (
            <a href="/api/auth/logout">Log Out</a>
          ) : (
            <a href="/api/auth/login">Log In</a>
          )}
        </div>
      )}

      {/* {user ? (
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
      )} */}
    </div>
  );
};

export default Navbar;
