import Link from "next/link";
import Image from "next/image";
import { routes } from "@/utils/routes";
import logo from "../../../../../public/logo.svg";
import { auth } from "@/auth";
import { TopbarMenu } from "./TopbarMenu";

const links = [
  {
    label: "Dashboard",
    url: routes.authenticated.home,
  },
  {
    label: "Designs",
    url: routes.authenticated.designs.home,
  },
  {
    label: "Categorias",
    url: routes.authenticated.categories.home,
  },
  {
    label: "Produtos",
    url: routes.authenticated.products.home,
  },
];

export default async function Topbar() {
  const session = await auth();

  if (!session?.user?.name) {
    throw new Error("Unable to get user full name");
  }

  if (!session?.user?.email) {
    throw new Error("Unable to get user email");
  }

  return (
    <header className="h-full border-b bg-background">
      <nav className="mx-auto flex size-full max-w-6xl items-center px-4">
        <div className="mr-4">
          <Link href={routes.authenticated.home}>
            <Image
              alt="logo escrito catalogar"
              src={logo}
              height={24}
            />
          </Link>
        </div>

        <div className="mx-4 space-x-4 text-sm">
          {links.map((link) => (
            <Link href={link.url} key={link.url}>
              {link.label}
            </Link>
          ))}
        </div>

        <div className="ml-auto">
          <TopbarMenu
            user={{
              name: session.user.name,
              email: session.user.email,
            }}
          />
        </div>
      </nav>
    </header>
  );
}
