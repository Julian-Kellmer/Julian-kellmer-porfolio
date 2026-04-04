'use client'

import HeroFace from '../components/HeroFace'
import TransitionLink from '../components/TransitionLink'
import RevealContainer from '../components/RevealContainer'

export default function Home() {
  return (
    <RevealContainer className='bg-[#111111] text-white relative overflow-hidden'>

      {/* ── Outer wrapper ──
          Mobile : flex-col (stacked sections)
          Desktop: 12-col grid, single-screen centred row
      ── */}
      <div className='flex flex-col md:grid md:grid-cols-12 md:min-h-screen md:items-center'>

        {/* gutter */}
        <div className='hidden md:block md:col-span-1' />

        {/* ── Title ──
            Mobile : 100svh, centred
            Desktop: cols 2-7, flex-col justify-center, includes h2+links
        ── */}
        <section className='h-[100svh] flex flex-col items-center justify-center px-6 md:h-auto md:col-span-6 md:items-start md:justify-center md:gap-8 md:px-0 md:z-10'>
          <h1 className='text-h1 text-center md:text-left'>
            Creo experiencias <br />
            Simplifico procesos
          </h1>

          {/* h2 + links — visible only on desktop here */}
          <div className='hidden md:flex md:flex-col md:gap-8'>
            <h2 className='text-h4'>
              Hola yo soy{' '}
              <span className='text-blue-500 font-normal'>Julian</span>
              <br />
              Frontend &amp; AI Engineer
            </h2>
            <div className='flex gap-8'>
              <TransitionLink
                href='/AboutMe'
                className='text-small hover:text-gray-300 transition-colors underline-offset-4'>
                Conoce un poco más de mí
              </TransitionLink>
              <TransitionLink
                href='/gallery'
                className='text-small hover:text-gray-300 transition-colors underline-offset-4'>
                Ver mis obras de arte
              </TransitionLink>
            </div>
          </div>
        </section>

        {/* ── HeroFace ──
            Mobile : 50svh, centred
            Desktop: cols 8-11
        ── */}
        <section className='h-[50svh] flex items-center justify-center md:h-auto md:col-span-4 md:relative'>
          <HeroFace />
        </section>

        {/* ── Subtitle + links — mobile only, 50svh ── */}
        <section className='h-[50svh] flex flex-col items-center justify-center gap-6 px-6 md:hidden'>
          <h2 className='text-h4 text-center'>
            Hola yo soy{' '}
            <span className='text-blue-500 font-normal'>Julian</span>
            <br />
            Frontend &amp; AI Engineer
          </h2>
          <div className='flex gap-8'>
            <TransitionLink
              href='/AboutMe'
              className='text-small hover:text-gray-300 transition-colors underline-offset-4'>
              Conoce un poco más de mí
            </TransitionLink>
            <TransitionLink
              href='/gallery'
              className='text-small hover:text-gray-300 transition-colors underline-offset-4'>
              Ver mis obras de arte
            </TransitionLink>
          </div>
        </section>

        {/* gutter */}
        <div className='hidden md:block md:col-span-1' />

      </div>
    </RevealContainer>
  )
}
