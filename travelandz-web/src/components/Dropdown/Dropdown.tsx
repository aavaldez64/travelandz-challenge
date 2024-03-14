"use client";

import { useEffect, useRef, useState } from "react";
import clsx from "clsx";
import { Icons } from "@/icons";

interface DropdownProps extends React.PropsWithChildren {
  label: string | React.ReactNode;
  buttonFunction?: "open" | "toggle";
  onFocusOut?: () => void;
  className?: string;
  containerClassName?: string;
  placement?: "left" | "right" | "up" | "down";
}
export function Dropdown({
  className,
  buttonFunction = "toggle",
  onFocusOut = () => {},
  containerClassName = "select",
  children,
  placement = "down",
  label,
}: DropdownProps) {
  const dropdownContainer = useRef<HTMLDivElement>(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const handleOnClick = () => {
    if (buttonFunction === "open") {
      setDropdownOpen(true);
    }
    if (buttonFunction === "toggle") {
      setDropdownOpen((prev) => !prev);
    }
  };
  useEffect(() => {
    if (dropdownOpen === true) {
      const handleClicks = (event: MouseEvent) => {
        const domElement = event.target as HTMLElement;
        if (!dropdownContainer.current?.contains(domElement)) {
          onFocusOut();
          setDropdownOpen(false);
        }
      };
      window.addEventListener("click", handleClicks);
      return () => {
        window.removeEventListener("click", handleClicks);
      };
    }
  }, [dropdownOpen]);
  return (
    <div ref={dropdownContainer} className={"relative " + containerClassName}>
      <button type="button" className={className} onClick={handleOnClick}>
        {label}
      </button>
      {dropdownOpen && (
        <div
          aria-expanded={dropdownOpen}
          className={clsx(
            "w-full min-w-36 absolute rounded divide-y divide-gray-100 shadow focus:outline-none transition-opacity duration-100 border border-gray-200 bg-white text-gray-900 z-20",
            placement === "down" && "top-full left-0",
            placement === "right" && "top-0 left-full",

            placement === "up" && "bottom-full left-0",
            placement === "left" && "top-0 right-full"
          )}
        >
          {children}
        </div>
      )}
    </div>
  );
}

interface SelectDropdownProps
  extends Omit<DropdownProps, "containerClassName"> {}
export function SelectDropdown({
  children,
  label,
  ...props
}: SelectDropdownProps) {
  return (
    <Dropdown
      {...props}
      containerClassName="select"
      className="w-full"
      label={
        <div className="relative flex w-full items-center gap-2">
          {label}
          <Icons.SelectArrow className="absolute right-0" />
        </div>
      }
    >
      <ul className="max-h-96 overflow-y-auto [&>li]:p-1 [&>li]:cursor-pointer [&>li:hover]:bg-gray-500 [&>li:hover]:text-white">
        {children}
      </ul>
    </Dropdown>
  );
}

interface SelectDropdownWithTextBoxProps
  extends Omit<
    DropdownProps,
    | "containerClassName"
    | "label"
    | "className"
    | "buttonFunction"
    | "onFocusOut"
  > {
  value: string;
  placeholder?: string;
  inputText: string | null;
  handleOnChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  resetFunction: () => void;
}
export function SelectDropdownWithTextBox({
  children,
  placeholder,
  value,
  inputText,
  handleOnChange,
  resetFunction,
  ...props
}: SelectDropdownWithTextBoxProps) {
  const onFocusOut = () => {
    resetFunction();
  };
  return (
    <Dropdown
      className="w-full"
      buttonFunction="open"
      onFocusOut={onFocusOut}
      {...props}
      label={
        <input
          className="w-full"
          type="text"
          placeholder={placeholder}
          value={inputText ?? value}
          onChange={handleOnChange}
        />
      }
      containerClassName=""
    >
      <ul className="max-h-96 overflow-y-auto [&>li]:p-1 [&>li]:cursor-pointer [&>li:hover]:bg-gray-500 [&>li:hover]:text-white">
        {children}
      </ul>
    </Dropdown>
  );
}
