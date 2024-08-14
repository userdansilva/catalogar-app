import { HTMLAttributes } from "react";

type TypographyHeadingProps = Omit<HTMLAttributes<HTMLHeadingElement>, "className">;

function TypographyH1({ children, ...rest }: TypographyHeadingProps) {
  return (
    <h1
      className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl"
      {...rest}
    >
      {children}
    </h1>
  );
}

function TypographyH2({ children, ...rest }: TypographyHeadingProps) {
  return (
    <h2
      className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0"
      {...rest}
    >
      {children}
    </h2>
  );
}

function TypographyH3({ children, ...rest }: TypographyHeadingProps) {
  return (
    <h3
      className="scroll-m-20 text-2xl font-semibold tracking-tight"
      {...rest}
    >
      {children}
    </h3>
  );
}

function TypographyH4({ children, ...rest }: TypographyHeadingProps) {
  return (
    <h4
      className="scroll-m-20 text-xl font-semibold tracking-tight"
      {...rest}
    >
      {children}
    </h4>
  );
}

type HeadingProps = TypographyHeadingProps & {
  as: "h1" | "h2" | "h3" | "h4";
}

export function Heading({
  as, ...rest
}: HeadingProps) {
  if (as === "h1") return <TypographyH1 {...rest} />;
  if (as === "h2") return <TypographyH2 {...rest} />;
  if (as === "h3") return <TypographyH3 {...rest} />;
  if (as === "h4") return <TypographyH4 {...rest} />;

  throw new Error("Invalid props");
}

type ParagraphProps = Omit<HTMLAttributes<HTMLParagraphElement>, "className">;

export function Paragraph({ children, ...rest }: ParagraphProps) {
  return (
    <p
      className="leading-7 [&:not(:first-child)]:mt-6"
      {...rest}
    >
      {children}
    </p>
  );
}
