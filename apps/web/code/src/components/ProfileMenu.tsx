'use client';
import { Profile } from "@/components/Profile";
import { Menu, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { MenuItem } from "@/components/MenuItem";

export const ProfileMenu = () => {
  return (
    <Menu>
      <Menu.Button className='inline-block'>
        <Profile size='lg' />
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
        <Menu.Items className='flex flex-col items-end absolute justify-end top-0 right-0 border-b border-l border-violet-femmes bg-black-howl p-2 rounded-bl-xl min-w-[200px]'>
          <Menu.Button className='mb-6'>
            <Profile size='lg' />
          </Menu.Button>
          <MenuItem href={'/profile'}>Profile</MenuItem>
          <MenuItem href={'/settings'}>Settings</MenuItem>
          <MenuItem href={'/logout'}>Logout</MenuItem>
          <MenuItem href={'/login'}>Login</MenuItem>
        </Menu.Items>
      </Transition>
    </Menu>
  )
}
