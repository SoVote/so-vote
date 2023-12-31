import { Menu } from "@headlessui/react"
import { ReactNode } from "react";
import Link from "next/link";

export const MenuItem = ({ href, children }: { href: string, children: ReactNode }) => {
  return (
    <Menu.Item>
      {({ active }) => (
        <Link
          href={href}
          className={`p-2 w-full ${active && 'bg-dynamic-magenta'}`}>
          {children}
        </Link>
      )}
    </Menu.Item>
  )
}
