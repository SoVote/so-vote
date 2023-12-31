'use client';
import { Menu, Transition } from "@headlessui/react";
import { Profile } from "@/components/Profile";
import { Fragment } from "react";
import Image from "next/image";
import { createMenuItemLink } from "@/components/createMenuItemLink";
import { MenuItem } from "@/components/MenuItem";
import { Logo } from "@rainbow-husky/common-ui";

export const LogoMenu = () => {
  return (
    <Menu>
      <Menu.Button className='inline-block'>
        <Logo />
      </Menu.Button>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className='flex flex-col items-start absolute justify-start top-0 left-0 border-b border-r border-violet-femmes bg-black-howl p-2 rounded-br-xl min-w-[200px]'>
          <Menu.Button className='mb-6'>
            <Logo />
          </Menu.Button>
          <MenuItem href={'/'}>Refresh</MenuItem>
          <MenuItem href={'/browse'}>Browse</MenuItem>
          <MenuItem href={'/about'}>About</MenuItem>
          <MenuItem href={'/help'}>Help & Support</MenuItem>
          <MenuItem href={'/donate'}>Donate</MenuItem>
          <MenuItem href={'/donate'}>Contribute</MenuItem>
          <MenuItem href={'/github'}>Github</MenuItem>
          <MenuItem href={'/terms'}>Terms & Conditions</MenuItem>
          <Menu.Item>
            {({ active }) => (
              <a
                className={`p-2 w-full ${active && 'bg-dynamic-magenta'}`}
                href="/account-settings"
              >
                Login
              </a>
            )}
          </Menu.Item>
        </Menu.Items>
      </Transition>
    </Menu>
  )
}
