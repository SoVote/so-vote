import Image from "next/image";
import { Breadcrumb } from "@/components/Breadcrumb";
import { VotableList } from "@/components/VotableList";
import { DiscussionItem } from "@/components/DiscussionItem";
import { UserInput } from "@/components/UserInput";
import { ReactNode } from "react";

export const SplitScreen = ({ heading, target, discussion }: { heading: ReactNode | undefined, target: ReactNode | undefined, discussion: ReactNode | undefined }) => {

  return (
    <main className="">
      <div className='fixed left-0 top-0 right-0 z-30'>
        {heading}
        <div className='flex border-b border-solid border-plum-jam bg-black-howl'>
          <div className='flex-auto w-1/2 border-r border-plum-jam'>
            <span className='ml-2 mr-2'>Votes:</span>
            <button className='bg-dynamic-magenta p-2'>Your Choices</button>
            <button className='p-2 text-dynamic-magenta'>Consensus</button>
          </div>
          <div className='flex-auto w-1/2'>
            <span className='ml-2 mr-2'>Feed:</span>
            <button className='bg-dynamic-magenta p-2'>Following</button>
            <button className='p-2 text-dynamic-magenta'>Popular</button>
            <button className='p-2 text-dynamic-magenta'>New</button>
            <button className='p-2 text-dynamic-magenta'>Citations</button>
            <button className='p-2 text-dynamic-magenta'>Conflict</button>
          </div>
        </div>

        {/*<div className='flex p-2 mb-2 h-10 text-center border-b border-plum-jam bg-black-howl text-dynamic-magenta'>*/}
        {/*  <div className='flex-1'>23% <Up /></div>*/}
        {/*  <div className='flex-1'>05% <Down /></div>*/}
        {/*  <div className='flex-1'>43% <Engagement percentage={43} /></div>*/}
        {/*</div>*/}
      </div>
      <div className='fixed left-0 top-0 bottom-0 right-1/2 p-2 mt-40 pt-20 border-r border-plum-jam overflow-auto'>
        {target}
      </div>
      <div className='relative w-1/2 left-1/2 top-0 bottom-0 right-0 pt-48 pb-20 overflow-auto bg-black-howl divide divide-y divide-plum-jam'>
        {discussion}

        <UserInput />
      </div>
    </main>
  )
}
