import { Up } from "@/components/Icons/Up";
import { Down } from "@/components/Icons/Down";
import { Conflict } from "@/components/Icons/Conflict";
import { Cite } from "@/components/Icons/Cite";
import { Comment } from "@/components/Icons/Comment";
import { Engagement } from "@/components/Icons/Engagement";
import { Profile } from "@/components/Profile";

const iconType = {
  'up': <div className='justify-items-center border-2 border-orange-clay rounded text-orange-clay bg-black-howl'><Up/>
  </div>,
  'down': <div className='justify-items-center border-2 border-skipper-blue rounded text-skipper-blue bg-black-howl'>
    <Down/></div>,
  'conflict': <div
    className='justify-items-center text-center border-2 border-mauvewood rounded text-mauvewood bg-black-howl'>
    <Conflict/></div>,
  'comment': <div className='justify-items-center border-2 border-black-howl rounded bg-black-howl text-plum-jam'>
    <Comment/></div>,
  'cite': <div className='justify-items-center text-plum-jam rounded bg-black-howl'><Cite/></div>,

}
export const DiscussionItem = ({ actionType }: { actionType: 'up' | 'down' | 'conflict' | 'comment' | 'cite' }) => {
  return (
    <div className='p-2'>
      <div className='flex pt-4 pb-4 gap-2'>
        <Profile size='sm' />
        <div className='flex-1'>
          <div className=''>
            <span className='font-bold'>Some persons name</span>
            <span className='text-skipper-blue ml-2'>@someHandle123</span>
          </div>
          <div>The text content of the comment. The quick brown fox jumps over the lazy dog!</div>
        </div>
        <div className='flex-none text-plum-jam w-30'>
          {iconType[actionType]}
        </div>
      </div>

      <div className='flex gap-4 text-sm text-skipper-blue'>
        <button className=''>
          <Up/> 203
        </button>
        <button className=''>
          <Down/> 12
        </button>
        <button className=''>
          <Comment/> 1356
        </button>
        <button className=''>
          <Engagement/> 20%
        </button>
        <button className=''>
          <Conflict/> 2
        </button>
        <button className=''>
          <Cite/> 12
        </button>
      </div>
    </div>
  )
}
