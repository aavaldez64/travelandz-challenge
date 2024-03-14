"use client";
import { CSSProperties, useEffect } from "react";
import { Icons } from "@/icons";
import style from "@/styles/modal.module.css";

type modalSize = "sm" | "md" | "lg" | "xl";
const modalSizes: Record<modalSize, string> = {
  sm: "max-w-[600px]",
  md: "max-w-[800px]",
  lg: "max-w-[1000px]",
  xl: "max-w-[1200px]",
};
const defaultStyles = {
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  backgroundColor: "white",
  boxShadow: "0px 4px 17px 0px rgba(0,0,0,0.17)",
};
interface Props extends React.PropsWithChildren {
  title: string;
  open: boolean;
  onClose?: () => void;
  size?: modalSize;
  styles?: CSSProperties;
  customOverridedStyles?: CSSProperties;
  scroll?: boolean;
  Footer?: React.ReactNode;
}

export function Modal({
  children,
  title,
  open,
  onClose,
  styles = defaultStyles,
  customOverridedStyles = {},
  size = "sm",
  scroll = true,
  Footer,
}: Props) {
  useEffect(() => {
    const html = document.querySelector("html");
    if (!html) return;
    if (open) {
      html.style.overflowY = "hidden";
    } else {
      html.style.overflowY = "";
    }
    return () => {
      html.style.overflowY = "";
    };
  }, [open]);
  return (
    <aside
      className={`${style.modalBody} ${open ? "visible" : style.modalClosed}`}
    >
      <div className="relative w-full h-full">
        <div
          className={`absolute p-5 w-full rounded-xl lg:rounded-2xl xl:rounded-3xl ${modalSizes[size]}`}
          style={{ ...styles, ...customOverridedStyles }}
        >
          <div className="flex justify-between items-center mb-4 relative">
            <h1 className="capitalize text-lg sm:text-xl md:text-2xl font-bold text-black w-full">
              {title}
            </h1>
            {onClose && (
              <button
                type="button"
                onClick={onClose}
                className="text-3xl md:text-4xl font-bold text-black bg-white rounded-xl p-1 flex items-center justify-center absolute top-0 right-0"
              >
                <Icons.Close />
              </button>
            )}
          </div>
          {scroll ? (
            <div
              style={{ minHeight: "50vh", maxHeight: "75vh" }}
              className="mb-4 flex flex-col items-center overflow-y-auto"
            >
              {children}
            </div>
          ) : (
            children
          )}
          {Footer && <div className="mt-4">{Footer}</div>}
        </div>
      </div>
    </aside>
  );
}
