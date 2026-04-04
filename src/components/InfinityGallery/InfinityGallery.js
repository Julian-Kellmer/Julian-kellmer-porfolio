'use client'

import { useEffect, useRef, useState } from 'react'
import { usePageTransition } from '../../context/TransitionContext'
import Experience from '../../webgl/core/Experience'
import styles from './InfinityGallery.module.css'
import { getProjects } from '../../lib/supabase'

const SKELETON_COUNT = 15

function GalleryContent() {
  const canvasRef = useRef(null)
  const experienceRef = useRef(null)
  const [errorDetails, setErrorDetails] = useState('')
  const [projects, setProjects] = useState([])
  const [skeletonVisible, setSkeletonVisible] = useState(true)
  const [skeletonMounted, setSkeletonMounted] = useState(true)

  const { navigate } = usePageTransition()

  useEffect(() => {
    getProjects().then(setProjects).catch(console.error)
  }, [])

  useEffect(() => {
    const handleProjectClick = (e) => {
      navigate(`/project/${e.detail}`)
    }
    window.addEventListener('projectClick', handleProjectClick)
    return () => window.removeEventListener('projectClick', handleProjectClick)
  }, [navigate])

  useEffect(() => {
    if (projects.length === 0) return
    try {
      if (canvasRef.current && !experienceRef.current) {
        experienceRef.current = new Experience(canvasRef.current, projects)
        setSkeletonVisible(false)
      }
    } catch (err) {
      console.error('WebGL Setup Error:', err)
      setErrorDetails(err.toString() + '\n' + err.stack)
      setSkeletonVisible(false)
    }

    return () => {
      if (experienceRef.current) {
        experienceRef.current.destroy()
        experienceRef.current = null
      }
    }
  }, [projects])

  return (
    <div className={styles.galleryContainer}>
      {errorDetails && (
        <div
          style={{
            color: 'red',
            position: 'absolute',
            zIndex: 9999,
            padding: 20,
          }}>
          <h1>Error Loading WebGL</h1>
          <pre>{errorDetails}</pre>
        </div>
      )}
      <div
        className=" bg-bg text-text text-h1 absolute top-0 left-0 w-full h-full flex items-center justify-center pointer-events-none"
        style={{ zIndex: 0 }}>
        <h1>Some of my work</h1>
      </div>
      <canvas
        ref={canvasRef}
        className={styles.canvas}
        style={{ position: 'absolute', top: 0, left: 0, zIndex: 1 }}
      />

      {/* ─── Skeleton overlay ─── */}
      {skeletonMounted && (
        <div
          className={`${styles.skeleton} ${!skeletonVisible ? styles.skeletonHidden : ''}`}
          onTransitionEnd={() => !skeletonVisible && setSkeletonMounted(false)}>
          {Array.from({ length: SKELETON_COUNT }).map((_, i) => (
            <div
              key={i}
              className={styles.skeletonCard}
              style={{ '--delay': `${(i * 0.12) % 1.2}s` }}
            />
          ))}
        </div>
      )}

      {/* ─── View Toggle ─── */}
      <div className={styles.viewToggle} role="group" aria-label="Cambiar vista">
        {/* Grid — active (this IS the grid view) */}
        <span
          className={`${styles.toggleOption} ${styles.toggleOptionActive}`}
          aria-label="Vista grilla"
          aria-current="true">
          <svg viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <rect x="1" y="1" width="6.5" height="6.5" rx="1.5" fill="currentColor" />
            <rect x="10.5" y="1" width="6.5" height="6.5" rx="1.5" fill="currentColor" />
            <rect x="1" y="10.5" width="6.5" height="6.5" rx="1.5" fill="currentColor" />
            <rect x="10.5" y="10.5" width="6.5" height="6.5" rx="1.5" fill="currentColor" />
          </svg>
        </span>
        {/* List — navigates to /gallery/list */}
        <button
          className={styles.toggleOption}
          onClick={() => navigate('/gallery/list')}
          aria-label="Vista lista">
          <svg viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <rect x="1" y="2" width="16" height="2.5" rx="1.25" fill="currentColor" />
            <rect x="1" y="7.75" width="16" height="2.5" rx="1.25" fill="currentColor" />
            <rect x="1" y="13.5" width="16" height="2.5" rx="1.25" fill="currentColor" />
          </svg>
        </button>
      </div>
    </div>
  )
}

export default function InfinityGallery() {
  return <GalleryContent />
}
