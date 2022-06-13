import React from "react";
import { type HeaderLevel } from "../types/Header";

interface HeaderProps extends React.HTMLAttributes<HTMLHeadingElement> {
    headerLevel: HeaderLevel;
    children: string;
    className?: string;
}

export const Header: React.FC<HeaderProps> = ({
  headerLevel,
  children,
  className,
}: HeaderProps) => {
  const HeaderTag = ({ ...props }: React.HTMLAttributes<HTMLHeadingElement>) =>
    React.createElement(headerLevel, props, children);
  return <HeaderTag className={className}>{children}</HeaderTag>;
};

//https://kattow.dev/blog/reusable-accessible-headings
