import { MdOutlineCompost } from 'react-icons/md'

const Header = () => {
  return (
    <header className='bg-custom-gradient text-white flex justify-start items-center p-8 mb-10'>
      <MdOutlineCompost className='text-6xl mr-4' />
      <h1 className='font-goblin-one text-4xl'>Den smarta komposten</h1>
    </header>
  )
}

export default Header
