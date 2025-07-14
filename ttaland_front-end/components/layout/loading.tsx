// components/ProgressBar.tsx
'use client'

import { useEffect, Suspense } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

function ProgressBarContent() {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    NProgress.configure({
      showSpinner: false,
      trickleSpeed: 300,
    })

    const handleAnchorClick = (event: MouseEvent) => {
      const targetUrl = (event.currentTarget as HTMLAnchorElement).href
      const currentUrl = window.location.href
      if (targetUrl !== currentUrl) {
        NProgress.start()
      }
    }

    const handleMutation: MutationCallback = () => {
      const anchorElements = document.querySelectorAll('a')
      anchorElements.forEach(anchor => {
        anchor.addEventListener('click', handleAnchorClick)
      })
    }

    const mutationObserver = new MutationObserver(handleMutation)
    mutationObserver.observe(document, { childList: true, subtree: true })

    NProgress.done()

    return () => {
      mutationObserver.disconnect()
      document.querySelectorAll('a').forEach(anchor => {
        anchor.removeEventListener('click', handleAnchorClick)
      })
      NProgress.done()
    }
  }, [])

  useEffect(() => {
    NProgress.done()
  }, [pathname, searchParams])

  return null
}

export default function ProgressBar() {
  return (
    <Suspense fallback={null}>
      <ProgressBarContent />
    </Suspense>
  )
}