"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Header() {
  const path = usePathname();

  const navItems = [
    { href: "/", label: "Home" },
    { href: "/dashboard", label: "Dashboard" },
    { href: "/admin", label: "Admin" },
    { href: "/recommendations", label: "Recommendations" },
  ];

  return (
    <header className="bg-gray-900 text-white py-3 px-6 flex items-center justify-between shadow-md">
      <h1 className="text-xl font-bold tracking-wide text-blue-400">
        🛍️ NextShop
      </h1>
      <nav className="space-x-4">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`hover:text-blue-400 ${
              path === item.href ? "text-blue-400 font-semibold" : ""
            }`}
          >
            {item.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}
