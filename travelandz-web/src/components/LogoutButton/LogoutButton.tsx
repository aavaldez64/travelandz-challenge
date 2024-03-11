"use client";

import { ActionLogout } from "@/actions";

type Props = Omit<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  "type" | "onClick"
>;
export function LogoutButton({ children, ...props }: Props) {
  const handleOnClick = () => {
    ActionLogout();
  };
  return (
    <button {...props} type="button" onClick={handleOnClick}>
      {children}
    </button>
  );
}
