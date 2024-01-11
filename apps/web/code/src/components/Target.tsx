import { VotableList } from "@/components/VotableList";

export const Target = () => {
  return (
    <>
      <VotableList />
      <button className='block p-2 w-full border border-dashed border-wooed rounded mb-2 hover:border-mauvewood'>
        <div>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="inline w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m6-6H6" />
          </svg>
        </div>
        Add book
      </button>
    </>
  )
}