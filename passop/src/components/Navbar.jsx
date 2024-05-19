import React from 'react'

const Navbar = () => {
  return (
    <nav className='bg-[#B0C5A4] w-full'>
      <div className="md:container md:px-40 md:py-12 md:mx-auto flex justify-between items-center h-14">
        <div className="logo font-bold text-2xl">
          <img className='w-14 md:w-24' src="icons/logo.png" alt="logo" />
        </div>
        <button className='md:text-[#F0EDE5] bg-[#2E2E2E] md:border md:border-[#F0EDE5] my-5 mx-2 rounded-full flex justify-between items-center' onClick={() => {window.open("https://github.com/prachisamuel", "_blank")}}>
          <img className='w-10' src="icons/github.png" alt="github" />
          <span className='hidden md:font-bold md:px-2 md:block'>GitHub</span>
        </button>
      </div>
    </nav>
  )
}

export default Navbar
