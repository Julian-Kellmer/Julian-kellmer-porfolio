import { getProjects } from '@/src/lib/supabase'
import TransitionLink from '@/src/components/TransitionLink'
import styles from '@/src/components/InfinityGallery/ProjectList.module.css'
import pageStyles from './page.module.css'
import GalleryListClient from './GalleryListClient'
import type { Project } from '@/src/lib/supabase'

export default async function GalleryListPage() {
  const projects = await getProjects()

  const grouped: [string, Project[]][] = Object.entries(
    projects.reduce(
      (map, p) => {
        if (!map[p.year]) map[p.year] = []
        map[p.year].push(p)
        return map
      },
      {} as Record<string, Project[]>,
    ),
  ).sort(([a], [b]) => Number(b) - Number(a))

  return (
    <main className={pageStyles.page} style={{ backgroundImage: 'linear-gradient(to bottom, var(--color-bg), #0a0a0a)' }}>
      <div className="layout-wrap">
        {/* ── Header ── */}
        <div className={styles.listHeader}>
          <div className="layout-grid w-full">
            <h2 className={`${styles.listTitle} text-h2 col-span-3 col-start-1`}>All projects</h2>
            <div className='absolute bottom-0 left-0 overflow-hidden w-full'>
              <span className={`${styles.listCount} text-[10rem] text-text/50 opacity-20 col-span-1`}>
                {projects.length} Projects
              </span>
            </div>
          </div>
        </div>

        {/* ── Accordion list ── */}
        <GalleryListClient grouped={grouped} />
      </div>

      {/* ── View toggle ── */}
      <div className={pageStyles.viewToggle} role="group" aria-label="Cambiar vista">
        <TransitionLink
          href="/gallery"
          className={pageStyles.toggleOption}
          aria-label="Vista grilla">
          <svg viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <rect x="1" y="1" width="6.5" height="6.5" rx="1.5" fill="currentColor" />
            <rect x="10.5" y="1" width="6.5" height="6.5" rx="1.5" fill="currentColor" />
            <rect x="1" y="10.5" width="6.5" height="6.5" rx="1.5" fill="currentColor" />
            <rect x="10.5" y="10.5" width="6.5" height="6.5" rx="1.5" fill="currentColor" />
          </svg>
        </TransitionLink>
        <span
          className={`${pageStyles.toggleOption} ${pageStyles.toggleOptionActive}`}
          aria-label="Vista lista"
          aria-current="true">
          <svg viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <rect x="1" y="2" width="16" height="2.5" rx="1.25" fill="currentColor" />
            <rect x="1" y="7.75" width="16" height="2.5" rx="1.25" fill="currentColor" />
            <rect x="1" y="13.5" width="16" height="2.5" rx="1.25" fill="currentColor" />
          </svg>
        </span>
      </div>
    </main>
  )
}
