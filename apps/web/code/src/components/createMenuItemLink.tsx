import Link from "next/link";
import { ReactNode } from "react";


export const createMenuItemLink = ({ href, children }: { href: string, children: ReactNode }) => {
  return function MenuItemLink({ active }: { active: boolean }){
    return (
      <Link
        href={href}
        className={`p-2 w-full ${active && 'bg-dynamic-magenta'}`}>
        {children}
      </Link>
    )
  }
}
