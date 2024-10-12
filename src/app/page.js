"use client";
import Link from "next/link";
import { useState } from "react";

export default function Home() {
  let a = 5;
  const [isOpen, setIsOpen] = useState(false);

  const handleOpenGroupWindowCreate = () => {
    setIsOpen(true);
  };

  // Function to close the popup
  const closePopup = () => {
    setIsOpen(false);
  };

  return (
    <ul>
      <li>
        <Link href="/">Home</Link>
      </li>
      <li>
        <Link href="/about">About Us</Link>
      </li>
      <li>
        <Link href="/api/auth/login">Login</Link>
      </li>
      <li>
        <a href="/api/auth/logout">Logout</a>
      </li>
    <button onClick={handleOpenGroupWindowCreate}>Create Group Order</button>
    {isOpen && (<div className="popup-overlay" >
          <div className="popup-content" >
            <h2>Popup Title</h2>
            <p>This is the popup content. You can put anything you want here.</p>
            <button onClick={closePopup}>Close Popup</button>
          </div>
        </div>)}
    </ul>
  );
}
