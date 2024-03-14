import Link from "next/link";
import { Icons } from "@/icons";
import { LogoutButton } from "@/components";
import type { IconType } from "@/interfaces";

const links = [
  {
    href: "/dashboard",
    label: "Dashboard",
    Icon: Icons.Dashboard,
  },
  {
    href: "/bookings",
    label: "Mi Agenda",
    Icon: Icons.Bookings,
  },
];
interface Props {
  username: string;
}
export function Header({ username }: Props) {
  return (
    <header className="w-full bg-gradient-to-r from-sky-600 to-sky-800">
      <div className="mx-auto w-full max-w-[1600px] p-8 flex flex-col lg:flex-row lg:justify-between gap-6">
        <p className="font-semibold text-lg text-white text-center lg:text-start">
          Hola {username}!
        </p>
        <ul className="flex flex-col lg:flex-row lg:justify-end gap-6 text-white">
          {links.map((item) => (
            <li key={item.href}>
              <HeaderLink {...item} />
            </li>
          ))}
          <li>
            <LogoutButton className="flex gap-2 items-center font-semibold hover:underline">
              Cerrar sesión
              <Icons.Logout className="text-xl" />
            </LogoutButton>
          </li>
        </ul>
      </div>
    </header>
  );
}

interface HeaderLinkProps {
  href: string;
  label: string;
  Icon?: IconType;
}
function HeaderLink({ href, label, Icon }: HeaderLinkProps) {
  return (
    <Link
      href={href}
      className="flex gap-2 items-center font-semibold hover:underline"
    >
      {Icon && <Icon className="" />}
      {label}
    </Link>
  );
}
