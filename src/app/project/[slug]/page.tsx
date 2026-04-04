import { getProjects, getProjectBySlug } from '../../../lib/supabase'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import BackToGallery from './BackToGallery'
import RevealContainer from '@/src/components/RevealContainer'
import styles from './page.module.css'

export async function generateStaticParams() {
  const projects = await getProjects()
  return projects.map((project) => ({
    slug: project.slug,
  }))
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const resolvedSlug = decodeURIComponent(slug)
  const project = await getProjectBySlug(resolvedSlug)

  if (!project) notFound()

  const images = Array.isArray(project.image) ? project.image : [project.image]

  return (
    <RevealContainer
      className={`layout-wrap bg-gradient-to-b from-bg to-[#0a0a0a] ${styles.page}`}>
      {/* ── Back button ── */}
      <div className={styles.back}>
        <BackToGallery />
      </div>

      {/* ── Title ── */}
      <div className={styles.header}>
        <h1 className={`${styles.title} text-h1`}>{project.title}</h1>
      </div>

      {/* ── Meta: client · year ── */}
      <div className={styles.meta}>
        <span className={styles.metaValue}>{project.client}</span>
        <span className={styles.metaDot}>·</span>
        <span className={styles.metaValue}>{project.year}</span>
      </div>

      {/* ── Description ── */}
      {project.description && (
        <p className={styles.description}>{project.description}</p>
      )}

      {/* ── Tags ── */}
      {project.tags.length > 0 && (
        <div className={styles.tagList}>
          {project.tags.map((tag) => (
            <span
              key={tag}
              className={styles.tag}>
              {tag}
            </span>
          ))}
        </div>
      )}

      {/* ── See live ── */}
      {project.url && (
        <div className={styles.seeLiveRow}>
          <a
            href={project.url}
            target='_blank'
            rel='noopener noreferrer'
            className={styles.seeLive}>
            See live
          </a>
        </div>
      )}

      {/* ── Images ── */}
      {images.length > 0 && (
        <div className={styles.photos}>
          {images.map((src, i) => (
            <div
              key={i}
              className={styles.photo}>
              <Image
                src={src}
                alt={`${project.title} — imagen ${i + 1}`}
                fill
                sizes='(max-width: 767px) 100vw, 33vw'
                className='object-cover'
              />
            </div>
          ))}
        </div>
      )}
    </RevealContainer>
  )
}
