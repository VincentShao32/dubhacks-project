import Link from "next/link";

export default function Home() {
  let a = 5;
  const handleOpenGroupWindowCreate = () => {
    
  }

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
    </ul>
  );
}
