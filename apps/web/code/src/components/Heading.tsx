import Image from "next/image";
import { Breadcrumb } from "@/components/Breadcrumb";
import { Profile } from "@/components/Profile";
import { Comment } from "@/components/Icons/Comment";
import { Menu } from "@headlessui/react";
import { ProfileMenu } from "@/components/ProfileMenu";
import { LogoMenu } from "@/components/LogoMenu";
import { cookies } from "next/headers";
import { getIronSession } from "iron-session";

export const Heading = async () => {
  const session = await getIronSession(cookies(), { password: "4LwXnLLhjP866Mj9ihWsKFvoDC81ZZd2yYkz", cookieName: "some-cookie-name" });
  return (
    <>
      <div className='flex left-0 top-0 right-0 h-20 p-2 bg-black-howl z-10 border-b border-plum-jam'>
        <LogoMenu />
        <div className='flex-1 pl-4'>
          <div className='text-3xl pt-1 text-mallow-root'>
            <span className='font-bold'>so vote</span> on the next book to read
          </div>
          <div className='text-skipper-blue'>Castle Cary Book Club</div>
        </div>
        <div className='flex-none text-right'>
          <ProfileMenu />
        </div>
      </div>
      <div className='text-skipper-blue border-b border-plum-jam bg-black-howl p-2'>
        <input placeholder='browse...'
               type='text'
               className='rounded bg-skipper-blue text-sm p-1 focus:outline-none text-mallow-root w-20 focus:w-80 focus:p-4 transition-all'
        /> / <Breadcrumb>Castle Cary Book Club</Breadcrumb> / <Breadcrumb>Reading List</Breadcrumb> / <Breadcrumb>One Indian Girl</Breadcrumb> <Comment /> <Breadcrumb>OP: Some persons name</Breadcrumb>
      </div>
    </>
  )
}
