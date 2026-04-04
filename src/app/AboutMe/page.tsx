'use client'

import React, { useRef } from 'react'
import Image from 'next/image'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import RevealContainer from '@/src/components/RevealContainer'

gsap.registerPlugin(ScrollTrigger)

const AboutMePage = () => {
  const containerRef   = useRef<HTMLElement>(null)
  const heroRef        = useRef<HTMLDivElement>(null)
  const nextSectionRef = useRef<HTMLElement>(null)
  const textRefs       = useRef<(HTMLDivElement | null)[]>([])
  const imageRefs      = useRef<(HTMLDivElement | null)[]>([])

  const aboutMeItems = [
    {
      text: (
        <span className='text-h4'>
          <Image src='/SemilleroDelMundo.svg' alt='' width={20} height={20}
            className='inline-block w-[1em] h-[1em] mx-1 -mt-2' />
          Hincha del Semillero del Mundo
        </span>
      ),
      image: '/images/bicho.png',
    },
    {
      text: (
        <span className='text-h4'>
          Already an{' '}
          <Image src='/IronMan.svg' alt='' width={20} height={20}
            className='inline-block w-[1em] h-[1em] mx-1 -mt-2' />{' '}
          Iron Man
        </span>
      ),
      image: '/images/ironFinished.JPG',
    },
    {
      text: (
        <span className='text-h4'>
              Padre de Adonis
        </span>
      ),
      image: '/images/Ado.JPEG',
    },
    {
      text: (
        <span className='text-h4'>
          Fanatico de{' '}
          <Image src='/apple.svg' alt='' width={20} height={20}
            className='inline-block w-[1em] h-[1em] mx-1 -mt-2' />{' '}
          Steve Jobs
        </span>
      ),
      image: '/images/steave.jpg',
    },
    {
      text: (
        <span className='text-h4'>
          Lector de biografias
        </span>
      ),
      image: '/images/bio.JPEG',
    },
  ]

  const annualGoals = [
    {
      id: '(a)',
      title: 'Derpa.io',
      description:
        'Creacion de aplicacion web, con el objetivo claro de simplificar la buscaqueda de viviendas online, y mejorar la experiencia de alquiler de viviendas.Integrando inteligencia artificial para facililtar la busqueda y al mismo tiempo crear una buena experiencia de busqueda.',
    },
    {
      id: '(b)',
      title: 'Agency Digital Experience',
      description:
        'Me encataria trabajar para una agencia de diseño digital para poder crecer profesionalmente y trabajar con los mejores profesionales de la industria.',
    },
    {
      id: '(c)',
      title: 'Desarrollar mi primer aplicacion',
      description:
        'Tengo muchas ideas en mente, y me gustaria poder desarrollarlas y lanzarlas al mercado. Quiero crear algo que pueda ayudar a las personas y que sea útil sin hacer un flujo complejo sino poder innovar con el nuevo alcance de las tecnologias y poder integrar e ir a fondo con herramientas de inteligencia artificil.',
    },
  ]

  // ── Hero pin ──────────────────────────────────────────────────────────────
  useGSAP(
    () => {
      ScrollTrigger.create({
        trigger: heroRef.current,
        start: 'bottom bottom',
        end: () => `+=${window.innerHeight}`,
        pin: true,
        pinSpacing: false,
      })
    },
    { scope: containerRef },
  )

  // ── Scroll word/image animation ───────────────────────────────────────────
  useGSAP(
    () => {
      if (!nextSectionRef.current) return

      const vh = window.innerHeight
      const n  = aboutMeItems.length
      // Timeline units: 0.5 for initial text rise + 1 per image = n + 0.5 total
      const scrollDistance = (n + 0.5) * vh

      // ── Initial states ──
      textRefs.current.forEach((el, i) => {
        if (!el) return
        gsap.set(el, i === 0
          ? { y: vh * 0.6, opacity: 0 }
          : { y: 40, opacity: 0 })
      })
      imageRefs.current.forEach(el => {
        if (!el) return
        gsap.set(el, { y: vh })
      })

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: nextSectionRef.current,
          start: 'top top',
          end: () => `+=${scrollDistance}`,
          scrub: 1,
        },
      })

      // t 0 → 0.5 : first phrase rises to centre
      tl.to(textRefs.current[0], {
        y: 0, opacity: 1,
        ease: 'power2.out',
        duration: 0.5,
      }, 0)

      // one image per item
      for (let i = 0; i < n; i++) {
        const start = 0.5 + i          // image enters
        const mid   = start + 0.5      // image at screen centre → phrase changes

        // image travels from bottom (+vh) to top (-vh) over 1 unit of scroll
        tl.fromTo(
          imageRefs.current[i],
          { y: vh },
          { y: -vh, ease: 'none', duration: 1 },
          start,
        )

        // phrase transition at midpoint
        if (i < n - 1) {
          tl.to(textRefs.current[i],
            { opacity: 0, y: -40, duration: 0.12 },
            mid - 0.06,
          )
          tl.fromTo(textRefs.current[i + 1],
            { opacity: 0, y: 40 },
            { opacity: 1, y: 0, duration: 0.12 },
            mid - 0.06,
          )
        }
      }
    },
    { scope: containerRef },
  )

  return (
    <RevealContainer className=''>
      {/* ── Hero ── */}
      <section
        ref={containerRef}
        className='layout-wrap relative w-full flex flex-col font-sans overflow-x-hidden'>
        <div
          ref={heroRef}
          className='relative w-full h-[150svh] md:h-[200svh] z-10'>
          <section className='z-10 layout-grid mix-blend-difference h-[75svh] md:h-[100svh]'>
            <h1 className='text-[clamp(5rem,17vw,18rem)] font-semibold tracking-[-0.04em] select-none w-full col-span-full col-start-1 pt-36 overflow-hidden whitespace-nowrap'>
              About me
            </h1>
          </section>
          <section className='layout-grid text-white h-[60svh] md:h-[100svh] flex flex-col justify-end'>
            <h1 className='mix-blend-difference text-h3 w-full col-span-3 col-start-2 self-end pb-32 text-end md:col-span-5 md:col-start-7'>
              Entusiasma en crear experiencias memorables
              <br />, apalancandome de la web o de tu celular,
              <br /> usando diseños creativos,
              <br /> e tecnologias novedosas.
            </h1>
          </section>
          <section className='absolute top-0 w-full h-full flex items-center justify-center -z-10'>
            <div className='relative overflow-hidden w-full h-[150svh] md:w-2/3 md:h-2/3 md:bg-white -translate-y-10 md:-translate-y-32'>
              <Image
                src='/images/hero.JPEG'
                alt='hero'
                fill
                className='object-contain object-center md:object-cover'
              />
            </div>
          </section>
        </div>
      </section>

      {/* ── Scroll word / image section ── */}
      <section
        ref={nextSectionRef}
        className='relative z-20 w-full bg-white'
        style={{ height: `${(aboutMeItems.length + 1.5) * 100}vh` }}>

        {/* sticky viewport — stays in view while outer section scrolls */}
        <div className='sticky top-0 h-screen overflow-hidden flex items-center justify-center'>

          {/* Images — small square, centred */}
          {aboutMeItems.map((item, i) => (
            <div
              key={`img-${i}`}
              ref={el => { imageRefs.current[i] = el }}
              className='absolute z-0'
              style={{ width: '50vmin', height: '50vmin' }}>
              <Image src={item.image} fill alt='' className='object-cover' />
            </div>
          ))}

          {/* Phrases — centred, on top */}
          {aboutMeItems.map((item, i) => (
            <div
              key={`text-${i}`}
              ref={el => { textRefs.current[i] = el }}
              className='absolute z-10 text-center px-8 text-black mix-blend-difference'>
              {item.text}
            </div>
          ))}
        </div>
      </section>

      {/* ── Objetivos Anuales ── */}
      <section className='relative w-full z-10 layout-grid text-bg-secondary items-start border-t border-bg/10' style={{ background: 'linear-gradient(to bottom, var(--color-bg), #0a0a0a)' }}>

        {/* Left col — sticky on desktop, normal flow on mobile */}
        <div className='col-span-full md:col-span-6 flex flex-col items-center md:items-start md:justify-between md:sticky md:top-0 md:h-[100vh] text-center md:text-left gap-10 md:gap-0 px-6 py-16 md:pl-16 md:py-0 md:pt-32'>
          <h2 className='text-h4 font-light md:max-w-xl'>
            
            Antecedentes en Website design, application design, interactive
            design, prototyping, ecommerce. Pero el foco este año es el
            desarrollo de software
          </h2>
          <div className='w-full max-w-[260px] md:max-w-[300px] h-[260px] md:h-[350px] overflow-hidden  opacity-90 md:pb-8 relative'>
            <Image
              src='/images/AboutMe.gif'
              alt='illustration placeholder'
              fill
              className='object-cover grayscale'
            />
          </div>
        </div>

        {/* Right col — scrollable goals */}
        <div className='col-span-full md:col-span-6 md:col-start-9 flex flex-col pb-16 md:pb-[20vh]'>
          {annualGoals.map((goal, index) => (
            <div
              key={index}
              className='flex flex-col gap-6 py-12 md:py-24 px-6 md:px-0 border-b border-bg/10 last:border-none text-center md:text-left'>
              <div className='text-2xl font-light opacity-50'>{goal.id}</div>
              <h3 className='text-4xl md:text-5xl tracking-[-0.04em] font-normal'>
                {goal.title}
              </h3>
              <p className='text-lg leading-[1.65] opacity-75 font-light max-w-sm mx-auto md:mx-0'>
                {goal.description}
              </p>
            </div>
          ))}
        </div>
      </section>
    </RevealContainer>
  )
}

export default AboutMePage
