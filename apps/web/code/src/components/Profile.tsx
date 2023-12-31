import cs from 'classnames'
export const Profile = ({ size, classNames }: { size: 'sm' | 'md' | 'lg', classNames?: string}) => {
  const containerSize = {
    'sm': { w: 'w-[30px]', h: 'h-[30px]' },
    'md': { w: 'w-[40px]', h: 'h-[40px]' },
    'lg': { w: 'w-[63px]', h: 'h-[63px]' },
  }[size]
  const profileSize = {
    'sm': { w: 'w-4', h: 'h-4'},
    'md': { w: 'w-6', h: 'h-6'},
    'lg': { w: 'w-10', h: 'h-10'}
  }[size]
  return (
    <div className={cs(classNames, `rounded-full ${containerSize.w} ${containerSize.h} bg-skipper-blue grid content-center`)}>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={`m-auto ${profileSize.w} ${profileSize.h}`}>
        <path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z" clipRule="evenodd" />
      </svg>
    </div>
  )
}
