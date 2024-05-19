import React from 'react'

const Footer = () => {
  return (
    <div className='bg-[#B0C5A4] flex flex-col justify-center items-center fixed bottom-0 w-full'>
      <div className="logo">
          <img className='w-10' src="icons/logo.png" alt="logo" />
        </div>
        <div className='flex justify-center items-center text-[#2E2E2E]'>
            Created with 
            <img className='w-7 mx-2' src="icons/heart.png" alt="heart" />
             by prachisamuel
        </div>
    </div>
  )
}

export default Footer
