'use client'

import { useRef, useState } from 'react'
import Image from 'next/image'
import styles from '@/src/components/InfinityGallery/ProjectList.module.css'
import pageStyles from './page.module.css'
import type { Project } from '@/src/lib/supabase'

type Props = {
  grouped: [string, Project[]][]
}

// Matches the CSS transition duration in page.module.css (.expandable)
const CLOSE_DURATION_MS = 580

export default function GalleryListClient({ grouped }: Props) {
  const [openSlug, setOpenSlug] = useState<string | null>(null)
  const rowRefs = useRef<Map<string, HTMLDivElement>>(new Map())
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const toggle = (slug: string) => {
    if (timerRef.current) return // ignore clicks while animating

    if (slug === openSlug) {
      // Close current
      setOpenSlug(null)
      return
    }

    const openNew = () => {
      setOpenSlug(slug)
      timerRef.current = null
      // Scroll to the row header so the user always sees the top of the content
      requestAnimationFrame(() => {
        rowRefs.current.get(slug)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
      })
    }

    if (openSlug !== null) {
      // Close first, then open after animation completes
      setOpenSlug(null)
      timerRef.current = setTimeout(openNew, CLOSE_DURATION_MS)
    } else {
      openNew()
    }
  }

  return (
    <>
      {grouped.map(([year, items]) => (
        <div key={year} className={`${styles.yearGroup} layout-grid`}>
          <span className={`${styles.yearLabel} col-span-1 col-start-1 col-end-2`}>
            {year}
          </span>

          <div className={`${styles.yearRows} col-start-2 col-end-13`}>
            {items.map((project, i) => {
              const isOpen = openSlug === project.slug

              return (
                <div
                  key={project.id}
                  ref={(el) => { if (el) rowRefs.current.set(project.slug, el) }}>
                  {/* ── Row header ── */}
                  <div
                    role="button"
                    aria-expanded={isOpen}
                    className={`${styles.projectRow} ${styles.rowVisible} hover:bg-white/5 transition-colors cursor-pointer`}
                    style={{ transitionDelay: `${i * 45}ms` }}
                    onClick={() => toggle(project.slug)}>
                    {/* Left — title + tags (desktop) */}
                    <div className={styles.rowLeft}>
                      <span className={styles.rowTitle}>{project.title}</span>
                      <div className={styles.rowTags}>
                        {(project.tags ?? []).map((tag) => (
                          <span
                            key={tag}
                            className={`${styles.tag} text-small capitalize text-text/50`}>
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                    {/* Right — client + year (mobile) + expand icon */}
                    <div className={styles.rowRight}>
                      <span className={styles.rowClient}>{project.client}</span>
                      <span className={styles.rowYear}>{year}</span>
                      <span className={`${pageStyles.expandIcon} ${isOpen ? pageStyles.expandIconOpen : ''}`}>
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                          <path d="M7 1v12M1 7h12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                        </svg>
                      </span>
                    </div>
                  </div>

                  {/* ── Expandable content ── */}
                  <div className={`${pageStyles.expandable} ${isOpen ? pageStyles.expandableOpen : ''}`}>
                    <div className={pageStyles.expandableInner}>
                      <div className={pageStyles.expandContent}>

                        {/* Description */}
                        {project.description && (
                          <p className={pageStyles.expandDescription}>
                            {project.description}
                          </p>
                        )}

                        {/* Tags */}
                        {(project.tags ?? []).length > 0 && (
                          <div className={pageStyles.expandTagList}>
                            {project.tags.map((tag) => (
                              <span key={tag} className={pageStyles.expandTag}>{tag}</span>
                            ))}
                          </div>
                        )}

                        {/* See live */}
                        {project.url && (
                          <div className={pageStyles.expandSeeLiveRow}>
                            <a
                              href={project.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className={pageStyles.expandSeeLive}
                              onClick={(e) => e.stopPropagation()}>
                              See live
                            </a>
                          </div>
                        )}

                        {/* Photos */}
                        {project.image.length > 0 && (
                          <div className={pageStyles.expandPhotos}>
                            {project.image.map((src, idx) => (
                              <div key={idx} className={pageStyles.expandPhoto}>
                                <Image
                                  src={src}
                                  alt={`${project.title} — imagen ${idx + 1}`}
                                  fill
                                  sizes="(max-width: 767px) 100vw, 40vw"
                                  className="object-cover"
                                />
                              </div>
                            ))}
                          </div>
                        )}

                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      ))}
    </>
  )
}
