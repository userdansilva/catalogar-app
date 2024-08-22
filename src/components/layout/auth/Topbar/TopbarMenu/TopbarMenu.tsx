import { LogOut, Store, User } from "lucide-react";
import Link from "next/link";
import { Avatar, AvatarFallback } from "@/lib/shadcn/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/lib/shadcn/ui/dropdown-menu";
import { routes } from "@/utils/routes";
import { signOut } from "@/auth";

function getInitials(fullName: string) {
  const splittedName = fullName.split(" ");

  const firstName = splittedName[0];
  const lastName = splittedName[splittedName.length - 1];

  return firstName.charAt(0) + lastName.charAt(0);
}

type TopbarMenuProps = {
  user: {
    name: string;
    email: string;
  }
}

export default function TopbarMenu({
  user,
}: TopbarMenuProps) {
  const initials = getInitials(user.name);

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Avatar className="cursor-pointer">
            <AvatarFallback>
              {initials}
            </AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>

        <DropdownMenuContent className="w-64">
          <DropdownMenuLabel className="-mb-2">
            {user.name}
          </DropdownMenuLabel>

          <DropdownMenuGroup>
            <DropdownMenuItem disabled>
              <span className="truncate">
                {user.email}
              </span>
            </DropdownMenuItem>
          </DropdownMenuGroup>

          <DropdownMenuSeparator />

          <DropdownMenuLabel>
            Minha conta
          </DropdownMenuLabel>

          <DropdownMenuGroup>
            <DropdownMenuItem asChild>
              <Link
                href={routes.authenticated.profile}
                className="cursor-pointer"
              >
                <User className="mr-2 size-4" />
                <span>Perfil</span>
              </Link>
            </DropdownMenuItem>

            <DropdownMenuItem asChild>
              <Link
                href={routes.authenticated.company}
                className="cursor-pointer"
              >
                <Store className="mr-2 size-4" />
                <span>Minha empresa</span>
              </Link>
            </DropdownMenuItem>

            <DropdownMenuSeparator />

            <DropdownMenuItem asChild>
              <button
                type="submit"
                form="signout-form"
                className="w-full cursor-pointer"
              >
                <LogOut className="mr-2 size-4" />
                <span>Sair</span>
              </button>
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>

      <form
        id="signout-form"
        hidden
        action={async () => {
          "use server";

          await signOut({
            redirectTo: routes.auth.login(),
          });
        }}
      />
    </>
  );
}
