import Link from "next/link";
import Image from "next/image";
import { routes } from "@/utils/routes";
import logo from "../../../../../public/logo.svg";

const links = [
  {
    label: "Dashboard",
    url: routes.authenticated.home,
  },
];

export default function Topbar() {
  return (
    <header>
      <nav className="flex h-16 items-center border-b px-4">
        <div className="mr-4">
          <Link href={routes.authenticated.home}>
            <Image
              alt="logo escrito catalogar"
              src={logo}
              height={28}
            />
          </Link>
        </div>

        <div className="mx-4 space-x-4">
          {links.map((link) => (
            <Link href={link.url} key={link.url}>
              {link.label}
            </Link>
          ))}
        </div>
      </nav>
    </header>
  );
}
