import Link from "next/link";
import Image from "next/image";
import { routes } from "@/utils/routes";
import logo from "../../../../../public/logo.svg";
import { Avatar, AvatarFallback } from "@/lib/shadcn/ui/avatar";
import { auth } from "@/auth";

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

function getInitials(fullName: string) {
  const splittedName = fullName.split(" ");

  const firstName = splittedName[0];
  const lastName = splittedName[splittedName.length - 1];

  return firstName.charAt(0) + lastName.charAt(0);
}

export default async function Topbar() {
  const session = await auth();

  if (!session?.user?.name) {
    throw new Error("Unable to get user full name");
  }

  const initials = getInitials(session.user.name);

  return (
    <header>
      <nav className="flex h-16 items-center border-b px-4">
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
          <Avatar>
            <AvatarFallback>
              {initials}
            </AvatarFallback>
          </Avatar>
        </div>
      </nav>
    </header>
  );
}
