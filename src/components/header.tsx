"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";

const Header = () => {
  const pathname = usePathname();

  const linkClass = (href: string) =>
    pathname === href
      ? "text-blue-500 font-bold "
      : "text-gray-700 hover:text-blue-500";

  return (
    <nav className="p-4 w-full flex justify-center items-center border-b-2 border-gray-200">
      <ul className="flex gap-4">
        <li>
          <Link href="/" className={linkClass("/")}>
            Dashboard
          </Link>
        </li>
        <li>
          <Link href="/inventario" className={linkClass("/inventario")}>
            Inventario
          </Link>
        </li>
        <li>
          <Link href="/pedidos" className={linkClass("/pedidos")}>
            Pedidos
          </Link>
        </li>
        <li>
          <Link href="/caja" className={linkClass("/caja")}>
            Caja
          </Link>
        </li>
        <li>
          <Link href="/resumen" className={linkClass("/resumen")}>
            Resumen
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Header;
