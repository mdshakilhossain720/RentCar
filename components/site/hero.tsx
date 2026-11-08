"use client"

import * as React from "react"
import Image from "next/image"
import Link from "next/link"
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react"
import { ArrowRight, CalendarCheck, Headset, ShieldCheck, UserRound } from "lucide-react"

import { buttonVariants } from "@/components/ui/button"
import { BookingSearch } from "@/components/site/booking-search"

const trust = [
  { icon: ShieldCheck, label: "Verified, insured cars" },
  { icon: UserRound, label: "Professional drivers" },
  { icon: Headset, label: "24/7 support" },
]

const ease = [0.22, 1, 0.36, 1] as const

export function Hero() {
  const ref = React.useRef<HTMLElement>(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] })
  const y = useTransform(scrollYProgress, [0, 1], ["0%", reduce ? "0%" : "18%"])
  const scale = useTransform(scrollYProgress, [0, 1], [1.05, reduce ? 1.05 : 1.15])

  return (
    <section id="home" ref={ref} className="relative isolate overflow-hidden pt-20 md:pt-29">
      <motion.div style={{ y, scale }} className="absolute inset-0 -z-10">
        <Image
          src="/images/site/hero.jpg"
          alt=""
          fill
          preload
          sizes="100vw"
          className="object-cover object-[70%_center] opacity-80"
        />
      </motion.div>
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-gradient-to-r from-background via-background/80 to-background/10"
      />
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-gradient-to-t from-background via-transparent to-background/60"
      />
      <div
        aria-hidden
        className="absolute top-1/3 -left-40 -z-10 size-[36rem] rounded-full bg-gold/10 blur-[120px]"
      />

      <div className="container-x flex min-h-[calc(100svh-5rem)] md:min-h-[calc(100svh-7.25rem)] flex-col justify-center gap-12 py-16 lg:py-20">
        <div className="max-w-3xl">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease }}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold/5 px-4 py-1.5 text-xs font-medium tracking-[0.2em] text-gold uppercase backdrop-blur"
          >
            <span className="size-1.5 rounded-full bg-gold" aria-hidden />
            Premium car rental · Dhaka
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease }}
            className="font-display text-[2.6rem] leading-[1.05] font-semibold tracking-tight text-balance sm:text-6xl lg:text-7xl"
          >
            Your Journey,
            <br />
            <span className="text-gold-gradient">Our Premium Ride.</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease }}
            className="mt-6 max-w-2xl text-base leading-relaxed text-pretty text-foreground/75 sm:text-lg"
          >
            Discover reliable, comfortable, and affordable car rental services for
            every journey. Whether you need a car for a day, a month, or a
            professional driver, we have the perfect solution for you.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease }}
            className="mt-9 flex flex-col gap-3 sm:flex-row"
          >
            <Link href="/fleet" className={buttonVariants({ variant: "gold", size: "xl" })}>
              Explore Our Fleet
              <ArrowRight className="transition-transform group-hover/button:translate-x-1" />
            </Link>
            <a href="#booking-search" className={buttonVariants({ variant: "gold-outline", size: "xl" })}>
              <CalendarCheck />
              Book Your Ride
            </a>
          </motion.div>
          <motion.ul
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="mt-10 flex flex-wrap gap-x-6 gap-y-3 text-sm text-foreground/70"
          >
            {trust.map(({ icon: Icon, label }) => (
              <li key={label} className="flex items-center gap-2">
                <Icon className="size-4 text-gold" />
                {label}
              </li>
            ))}
          </motion.ul>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.45, ease }}
        >
          <BookingSearch />
        </motion.div>
      </div>
    </section>
  )
}
