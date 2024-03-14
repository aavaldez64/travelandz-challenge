import { lobster } from "@/fonts";
import clsx from "clsx";

type TravelandzTitleAttributes = Omit<
  React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLSpanElement>,
    HTMLSpanElement
  >,
  "children"
>;

interface Props extends TravelandzTitleAttributes {
  level?: 1 | 2 | 3;
  fontSize?: string;
}
export function TravelandzTitle({
  level,
  fontSize = "text-3xl sm:text-4xl md:text-5xl",
  className = "",
  ...props
}: Props) {
  const tagClassName = clsx(
    lobster.className,
    "font-bold",
    fontSize,
    className
  );
  const Element = () => (
    <span className={tagClassName} {...props}>
      Travelandz
    </span>
  );
  if (level === 1)
    return (
      <h1>
        <Element />
      </h1>
    );
  if (level === 2)
    return (
      <h2>
        <Element />
      </h2>
    );
  if (level === 3)
    return (
      <h3>
        <Element />
      </h3>
    );
  return <Element />;
}
