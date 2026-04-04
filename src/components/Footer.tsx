'use client'

import React from 'react'
import Image from 'next/image'
import TransitionLink from './TransitionLink'
import { usePathname } from 'next/navigation'

const Footer = () => {
  const pathname = usePathname()

  if (pathname === '/' || pathname === '/gallery') {
    return null
  }

  return (
    <footer className='relative w-full bg-[#0a0a0a] text-white pt-46 pb-10 px-6 md:px-12 flex flex-col justify-between items-center overflow-hidden z-20'>
      {/* Top Section */}
      <p className=' text-center  w-full text-[8rem] absolute top-0 left-0 tracking-[-0.05em] leading-[0.8] font-semibold text-white/30'>
        Don't be shy.
      </p>
      {/* Center Logo Section */}
      <div className='flex justify-center items-center  w-full'>
        <div className='relative w-40 h-40 md:w-64 md:h-64 flex justify-center items-center opacity-90'>
          <Image
            src='/logoTerminado.svg'
            alt='Julian Kellmer Logo Icon'
            fill
            className='object-contain'
          />
        </div>
      </div>

      {/* Links Section */}
      <div className='flex justify-between items-center gap-12 w-full mt-10 text-h5 opacity-80'>
        <TransitionLink
          href='/'
          className='text-small flex-1 hover:opacity-100 transition-opacity underline-offset-4 hover:underline'>
          Inicio
        </TransitionLink>
        <TransitionLink
          href='/gallery'
          className='text-small flex-1 hover:opacity-100 transition-opacity underline-offset-4 hover:underline'>
          Mis Trabajos
        </TransitionLink>
        <TransitionLink
          href='/AboutMe'
          className='text-small hover:opacity-100 transition-opacity underline-offset-4 hover:underline'>
          Acerca de mi
        </TransitionLink>
      </div>

      {/* Giant Text Section */}
      <div className='mt-16 flex flex-col items-center justify-center text-center w-full'>
        <h2 className='text-h2 w-full flex justify-center items-center text-white'>
          <span className='pr-2 md:pr-4 font-semibold text-white/30 text-[4rem]'>
            Let's chat
          </span>
        </h2>
      </div>
    </footer>
  )
}

export default Footer
