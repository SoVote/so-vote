import Image from "next/image";

export const VotableList = () => {
  return (
    <div className=''>
      <div className='max-w-md ml-auto mr-auto text-wooed mb-10'>
        Drag the books into your order of preference or click here to add a new book to the list
      </div>
      <VotableListItem number={1} image='/images/book_covers/one-indian-girl.jpg' title='One Indian Girl' author='Chetan Bhagat' />
      <VotableListItem number={2} image='/images/book_covers/i-am-malala.jpg' title='I am Malala: The Story of the Girl Who Stood Up for Education' author='Malala Yousafzai' />
      <VotableListItem number={3} image='/images/book_covers/1984.jpg' title='1984' author='George Orwell' />
      <VotableListItem number={4} image='/images/book_covers/to-kill-a-mocking-bird.jpg' title='To Kill a Mocking Bird' author='Harper Lee' />

      <VotableListItem number={1} image='/images/book_covers/one-indian-girl.jpg' title='One Indian Girl' author='Chetan Bhagat' />
      <VotableListItem number={2} image='/images/book_covers/i-am-malala.jpg' title='I am Malala: The Story of the Girl Who Stood Up for Education' author='Malala Yousafzai' />
      <VotableListItem number={3} image='/images/book_covers/1984.jpg' title='1984' author='George Orwell' />
      <VotableListItem number={4} image='/images/book_covers/to-kill-a-mocking-bird.jpg' title='To Kill a Mocking Bird' author='Harper Lee' />
      <VotableListItem number={1} image='/images/book_covers/one-indian-girl.jpg' title='One Indian Girl' author='Chetan Bhagat' />
      <VotableListItem number={2} image='/images/book_covers/i-am-malala.jpg' title='I am Malala: The Story of the Girl Who Stood Up for Education' author='Malala Yousafzai' />
      <VotableListItem number={3} image='/images/book_covers/1984.jpg' title='1984' author='George Orwell' />
      <VotableListItem number={4} image='/images/book_covers/to-kill-a-mocking-bird.jpg' title='To Kill a Mocking Bird' author='Harper Lee' />
      <VotableListItem number={1} image='/images/book_covers/one-indian-girl.jpg' title='One Indian Girl' author='Chetan Bhagat' />
      <VotableListItem number={2} image='/images/book_covers/i-am-malala.jpg' title='I am Malala: The Story of the Girl Who Stood Up for Education' author='Malala Yousafzai' />
      <VotableListItem number={3} image='/images/book_covers/1984.jpg' title='1984' author='George Orwell' />
      <VotableListItem number={4} image='/images/book_covers/to-kill-a-mocking-bird.jpg' title='To Kill a Mocking Bird' author='Harper Lee' />
      <VotableListItem number={1} image='/images/book_covers/one-indian-girl.jpg' title='One Indian Girl' author='Chetan Bhagat' />
      <VotableListItem number={2} image='/images/book_covers/i-am-malala.jpg' title='I am Malala: The Story of the Girl Who Stood Up for Education' author='Malala Yousafzai' />
      <VotableListItem number={3} image='/images/book_covers/1984.jpg' title='1984' author='George Orwell' />
      <VotableListItem number={4} image='/images/book_covers/to-kill-a-mocking-bird.jpg' title='To Kill a Mocking Bird' author='Harper Lee' />
      <VotableListItem number={1} image='/images/book_covers/one-indian-girl.jpg' title='One Indian Girl' author='Chetan Bhagat' />
      <VotableListItem number={2} image='/images/book_covers/i-am-malala.jpg' title='I am Malala: The Story of the Girl Who Stood Up for Education' author='Malala Yousafzai' />
      <VotableListItem number={3} image='/images/book_covers/1984.jpg' title='1984' author='George Orwell' />
      <VotableListItem number={4} image='/images/book_covers/to-kill-a-mocking-bird.jpg' title='To Kill a Mocking Bird' author='Harper Lee' />
    </div>
  )
}

const VotableListItem = ({ number, image, title, author }: { number: number, image: string, title: string, author: string }) => {
  return (
    <div className='flex p-2 ml-auto mr-auto max-w-md border border-dashed border-wooed rounded mb-2 mt-2 hover:border-mauvewood'>
      <div className='flex-none m-auto text-3xl text-wooed mr-4'>
        #{number}
      </div>
      <div className='flex-auto pl-2 m-auto'>
        <div className='text-xl'>{title}</div>
        <div>By {author}</div>
      </div>
      <Image
        src={image}
        alt={`${title} cover`}
        className='flex-none'
        width={80}
        height={80}
      />
    </div>
  )
}
