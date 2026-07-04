"use client"

import Image from "next/image"
import Link from "next/link"
import { ExternalLink, Rocket, X } from "lucide-react"
import { useCallback, useEffect, useState } from "react"

import { Button } from "@/components/ui/button"

const certificateSrc =
  "/1_LI JAR_KAIST_OverEdge_2026_Membership_Certificate.png"
const programHref = "https://kaist-overedge.com/program"

export default function KaistOveredgeCelebration() {
  const [isOpen, setIsOpen] = useState(false)
  const [hasOpened, setHasOpened] = useState(false)

  const closeCelebration = useCallback(() => {
    setIsOpen(false)
    setHasOpened(true)
  }, [])

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setIsOpen(true)
      setHasOpened(true)
    }, 220)

    return () => window.clearTimeout(timer)
  }, [])

  useEffect(() => {
    if (!isOpen) {
      return
    }

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeCelebration()
      }
    }

    window.addEventListener("keydown", closeOnEscape)
    return () => window.removeEventListener("keydown", closeOnEscape)
  }, [closeCelebration, isOpen])

  return (
    <>
      {hasOpened && !isOpen && (
        <button
          aria-label="Open KAIST OverEdge certificate celebration"
          className="kaist-launcher-enter fixed bottom-4 right-4 z-[70] inline-flex items-center gap-2 rounded-md border border-amber-200/30 bg-slate-950/90 px-3.5 py-2.5 text-sm font-bold text-amber-100 shadow-2xl shadow-amber-500/20 backdrop-blur-md transition hover:-translate-y-0.5 hover:border-amber-200/60 hover:bg-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-300 sm:bottom-5 sm:right-5"
          type="button"
          onClick={() => setIsOpen(true)}
        >
          <Rocket className="h-4 w-4 text-amber-300" />
          <span className="hidden sm:inline">KAIST OverEdge</span>
          <span className="sm:hidden">KAIST</span>
        </button>
      )}

      {isOpen && (
        <section
          aria-label="KAIST OverEdge membership certificate celebration"
          className="kaist-celebration-stage fixed inset-0 z-[80] flex items-end justify-center overflow-hidden px-2 py-2 sm:items-center sm:px-6 sm:py-5"
        >
          <button
            aria-label="Close certificate celebration"
            className="absolute inset-0 cursor-default bg-slate-950/82 backdrop-blur-md"
            type="button"
            onClick={closeCelebration}
          />

          <div className="kaist-pop-enter relative grid max-h-[calc(100svh-1rem)] w-full max-w-6xl overflow-y-auto rounded-lg border border-white/15 bg-[#071018] text-white shadow-[0_24px_80px_rgba(0,0,0,0.48)] scrollbar-hide sm:max-h-[calc(100svh-2.5rem)] md:min-h-[560px] md:grid-cols-[0.9fr_1.1fr] md:overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_12%,rgba(250,204,21,0.30),transparent_26%),radial-gradient(circle_at_84%_16%,rgba(34,211,238,0.26),transparent_30%),linear-gradient(135deg,rgba(255,255,255,0.08),transparent_34%)]" />
            <div className="kaist-confetti" aria-hidden="true" />

            <button
              aria-label="Close certificate celebration"
              className="absolute right-3 top-3 z-20 inline-flex h-10 w-10 items-center justify-center rounded-md border border-white/15 bg-black/35 text-white/75 transition hover:bg-white/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-300"
              type="button"
              onClick={closeCelebration}
            >
              <X className="h-4 w-4" />
            </button>

            <div className="relative order-2 flex flex-col justify-between gap-5 p-4 pt-5 sm:p-6 sm:pr-20 md:order-1 md:min-h-[560px] md:gap-8 md:p-10 lg:p-12">
              <div className="space-y-5 md:space-y-7">
                <div className="inline-flex max-w-full items-center gap-2 rounded-md border border-amber-200/30 bg-amber-200/10 px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.18em] text-amber-200 sm:text-xs sm:tracking-[0.22em]">
                  <Rocket className="h-4 w-4" />
                  KAIST OverEdge 2026
                </div>

                <div className="space-y-3 md:space-y-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.22em] text-cyan-200 sm:text-sm sm:tracking-[0.28em]">
                    Membership certificate
                  </p>
                  <h2 className="max-w-xl text-3xl font-black leading-[0.96] tracking-tight text-white min-[390px]:text-4xl sm:text-5xl lg:text-6xl">
                    KAIST OverEdge 2026
                  </h2>
                  <blockquote className="max-w-md border-l-2 border-amber-200/60 pl-3 text-sm leading-6 text-slate-300 sm:text-base">
                    <p>
                      &quot;Sometimes you have to step over the edge to know
                      where it is.&quot;
                    </p>
                    <cite className="mt-2 block not-italic text-xs font-semibold text-amber-200 sm:text-sm">
                      - 英 현대미술가 Damien Hirst
                    </cite>
                  </blockquote>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-2 min-[390px]:grid-cols-2 sm:flex sm:flex-wrap sm:items-center sm:gap-3">
                <Button
                  asChild
                  className="h-11 gap-2 bg-amber-300 px-4 font-bold text-slate-950 hover:bg-amber-200 sm:px-5"
                >
                  <Link href={programHref} target="_blank" rel="noopener noreferrer">
                    KAIST program
                    <ExternalLink className="h-4 w-4" />
                  </Link>
                </Button>
                <Link
                  href={certificateSrc}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-11 items-center justify-center rounded-md border border-white/15 bg-white/5 px-4 text-sm font-semibold text-white transition hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-300"
                >
                  View certificate
                </Link>
              </div>
            </div>

            <div className="relative order-1 border-b border-white/10 bg-white/5 p-3 sm:p-5 md:order-2 md:min-h-[560px] md:border-b-0 md:border-l md:p-6">
              <div className="kaist-certificate-enter relative mx-auto h-[38svh] min-h-[230px] max-h-[390px] max-w-[320px] overflow-hidden rounded-md bg-white shadow-[0_18px_60px_rgba(0,0,0,0.45)] ring-1 ring-white/40 sm:h-[48svh] sm:max-h-[520px] sm:max-w-[380px] md:h-full md:max-h-none md:max-w-[440px]">
                <Image
                  src={certificateSrc}
                  alt="LI JAR KAIST OverEdge 2026 membership certificate"
                  fill
                  priority
                  sizes="(min-width: 768px) 440px, 92vw"
                  className="object-contain"
                />
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  )
}
