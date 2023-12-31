'use client'
import {useState} from "react";
import cs from 'classnames'
import {Up} from "@/components/Icons/Up";
import {Down} from "@/components/Icons/Down";
import {Conflict} from "@/components/Icons/Conflict";
import {Comment} from "@/components/Icons/Comment";
import {Cite} from "@/components/Icons/Cite";

export const UserInput = () => {
  const [ active, setActive ] = useState(false)
  const [ selection, setSelection ] = useState({
    up: false,
    down: false,
    conflict: false,
    cite: false
  })
  console.log(selection['up'])
  return (
    <div className={cs('fixed bottom-0 right-0 left-1/2 p-2', active ? 'bg-dynamic-magenta' : 'bg-black-howl')}>
      <div className={cs('flex pb-3 gap-2 text-center', active ? 'h-auto' : 'hidden h-0')}>
        <button className='flex-1' onClick={() => {
          setSelection({
            ...selection,
            up: !selection['up'],
            down: false,
          })
        }}>
          <div className={cs('justify-items-center border-2 rounded bg-black-howl', selection['up'] ? 'border-dough-yellow' : 'border-black-howl')}>
            <Up/>
            <span className='block text-violet-femmes'>For</span>
          </div>
        </button>
        <button className='flex-1' onClick={() => {
          setSelection({
            ...selection,
            down: !selection['down'],
            up: false,
          })
        }}>
          <div className={cs('justify-items-center border-2 rounded bg-black-howl',selection['down'] ? 'border-dough-yellow' : 'border-black-howl')}>
            <Down/>
            <span className='block text-violet-femmes'>Against</span>
          </div>
        </button>
        <button className='flex-1' onClick={() => {
          setSelection({
            ...selection,
            conflict: !selection['conflict'],
          })
        }}>
          <div className={cs('justify-items-center border-2 rounded bg-black-howl',selection['conflict'] ? 'border-dough-yellow' : 'border-black-howl')}>
            <Conflict/>
            <span className='block text-violet-femmes'>Conflict</span>
          </div>
        </button>
        <button className='flex-1' onClick={() => {
          setSelection({
            ...selection,
            cite: !selection['cite'],
          })
        }}>
          <div className={cs('justify-items-center border-2 rounded bg-black-howl',selection['cite'] ? 'border-dough-yellow' : 'border-black-howl')}>
            <Cite/>
            <span className='block text-violet-femmes'>Cite</span>
          </div>
        </button>
      </div>
      {selection['cite'] && (
        <input type='text' placeholder='Add citation' className='w-full bg-skipper-blue border-skipper-blue border-solid border-2 rounded p-2 mb-2' />
      )}
      {selection['conflict'] && (
        <input type='text' placeholder='Add conflict' className='w-full bg-skipper-blue border-skipper-blue border-solid border-2 rounded p-2 mb-2' />
      )}
      <textarea
        className='w-full h-14 bg-skipper-blue border-skipper-blue border-solid border-2 rounded p-2'
        placeholder='What do you think?'
        onSelect={() => setActive(true)}
      ></textarea>
    </div>
  )
}
