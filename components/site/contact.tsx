"use client"

import * as React from "react"
import { AnimatePresence, motion } from "motion/react"
import { CircleCheck, Clock, ExternalLink, LoaderCircle, MapPin, Phone, Send, Store } from "lucide-react"

import { cn } from "@/lib/utils"
import { mapEmbedSrc, mapLink, site, telLink, whatsappLink } from "@/lib/site"
import { validateContact, type ContactInput, type FieldErrors } from "@/lib/validation"
import { Button, buttonVariants } from "@/components/ui/button"
import { Field, Input, Textarea, fieldAria } from "@/components/ui/field"
import { useToast } from "@/components/ui/toaster"
import { Reveal } from "@/components/site/reveal"
import { SectionHeading } from "@/components/site/section-heading"
import { WhatsAppIcon } from "@/components/site/brand-icons"

const empty: ContactInput = { name: "", phone: "", email: "", subject: "", message: "" }

const infoItems = [
  {
    icon: MapPin,
    label: "Address",
    value: site.contact.address,
    bangla: true,
    href: mapLink,
    external: true,
  },
  { icon: Phone, label: "Phone", value: site.contact.phoneDisplay, href: telLink },
  {
    icon: WhatsAppIcon,
    label: "WhatsApp",
    value: site.contact.phoneDisplay,
    href: whatsappLink(),
    external: true,
  },
  { icon: Clock, label: "Business Hours", value: site.contact.hours, bangla: true },
  { icon: Store, label: "Location", value: site.society },
]

export function Contact() {
  const toast = useToast()
  const [values, setValues] = React.useState<ContactInput>(empty)
  const [errors, setErrors] = React.useState<FieldErrors<ContactInput>>({})
  const [status, setStatus] = React.useState<"idle" | "sending" | "sent">("idle")

  const set =
    (key: keyof ContactInput) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setValues((v) => ({ ...v, [key]: e.target.value }))
      if (errors[key]) setErrors((err) => ({ ...err, [key]: undefined }))
    }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const result = validateContact(values)
    setErrors(result.errors)
    if (!result.valid) {
      toast({ kind: "error", title: "Please check the form", description: "Some fields need your attention." })
      const first = Object.keys(result.errors)[0]
      document.getElementById(`contact-${first}`)?.focus()
      return
    }
    // UI demo only — nothing is sent. Simulate a short request for the loading state.
    setStatus("sending")
    await new Promise((r) => setTimeout(r, 1200))
    setStatus("sent")
    setValues(empty)
    toast({ kind: "success", title: "Message ready!", description: "Demo form — for a quick reply, please call or WhatsApp us." })
  }

  return (
    <section id="contact" className="relative py-24 sm:py-32">
      <div className="container-x">
        <SectionHeading
          eyebrow="Contact Us"
          title={
            <>
              Let&apos;s plan your <span className="text-gold-gradient">next journey</span>
            </>
          }
          description="Open 24 hours, 7 days a week. Call, WhatsApp, visit us in Uttara, or send a message below."
        />

        <div className="mt-16 grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          {/* Contact info */}
          <Reveal className="flex flex-col gap-4">
            <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
              {infoItems.map(({ icon: Icon, label, value, href, external, bangla }) => {
                const content = (
                  <>
                    <span className="grid size-11 shrink-0 place-items-center rounded-lg bg-gold/10 text-gold transition group-hover:bg-gold group-hover:text-primary-foreground">
                      <Icon className="size-5" />
                    </span>
                    <span className="min-w-0">
                      <span className="block text-xs tracking-wider text-muted-foreground uppercase">{label}</span>
                      <span className={cn("mt-0.5 block leading-relaxed", bangla && "font-bangla")}>{value}</span>
                    </span>
                  </>
                )
                const cls =
                  "group flex h-full items-start gap-4 rounded-xl border border-white/8 bg-card p-4 transition hover:border-gold/40"
                return (
                  <li key={label} className={label === "Address" ? "sm:col-span-2 lg:col-span-1" : undefined}>
                    {href ? (
                      <a
                        href={href}
                        className={cls}
                        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                      >
                        {content}
                      </a>
                    ) : (
                      <div className={cls}>{content}</div>
                    )}
                  </li>
                )
              })}
            </ul>
            <div className="grid gap-3 sm:grid-cols-2">
              <a href={telLink} className={buttonVariants({ variant: "gold", size: "xl", className: "w-full" })}>
                <Phone /> Call Now
              </a>
              <a
                href={whatsappLink("আসসালামু আলাইকুম, আমি একটি গাড়ি ভাড়া নিতে চাই।")}
                target="_blank"
                rel="noopener noreferrer"
                className={buttonVariants({ variant: "glass", size: "xl", className: "w-full" })}
              >
                <WhatsAppIcon className="size-5 text-[#25D366]" /> WhatsApp
              </a>
            </div>
          </Reveal>

          {/* Contact form */}
          <Reveal delay={0.1} className="relative rounded-2xl border border-white/8 bg-card p-6 sm:p-8">
            <AnimatePresence mode="wait" initial={false}>
              {status === "sent" ? (
                <motion.div
                  key="sent"
                  initial={{ opacity: 0, scale: 0.97 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex min-h-[28rem] flex-col items-center justify-center gap-4 text-center"
                >
                  <span className="grid size-16 place-items-center rounded-full bg-success/15 text-success">
                    <CircleCheck className="size-8" />
                  </span>
                  <h3 className="font-display text-2xl font-semibold">Thank you!</h3>
                  <p className="max-w-sm text-sm text-muted-foreground">
                    This is a design preview, so your message wasn&apos;t sent anywhere. For an
                    immediate response, call or WhatsApp us on {site.contact.phoneDisplay}.
                  </p>
                  <Button variant="gold-outline" size="lg" onClick={() => setStatus("idle")}>
                    Send another message
                  </Button>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={onSubmit}
                  noValidate
                  className="grid gap-5 sm:grid-cols-2"
                  aria-label="Contact form"
                >
                  <div className="sm:col-span-2">
                    <h3 className="font-display text-2xl font-semibold">Send us a message</h3>
                    <p className="mt-1 text-sm text-muted-foreground">We usually reply within minutes.</p>
                  </div>
                  <Field id="contact-name" label="Full Name" error={errors.name} required>
                    <Input {...fieldAria("contact-name", errors.name)} autoComplete="name" value={values.name} onChange={set("name")} placeholder="Your full name" />
                  </Field>
                  <Field id="contact-phone" label="Phone Number" error={errors.phone} required>
                    <Input {...fieldAria("contact-phone", errors.phone)} type="tel" inputMode="tel" autoComplete="tel" value={values.phone} onChange={set("phone")} placeholder="01XXXXXXXXX" />
                  </Field>
                  <Field id="contact-email" label="Email" error={errors.email} required>
                    <Input {...fieldAria("contact-email", errors.email)} type="email" autoComplete="email" value={values.email} onChange={set("email")} placeholder="you@example.com" />
                  </Field>
                  <Field id="contact-subject" label="Subject" error={errors.subject} required>
                    <Input {...fieldAria("contact-subject", errors.subject)} value={values.subject} onChange={set("subject")} placeholder="e.g. Monthly rental enquiry" />
                  </Field>
                  <Field id="contact-message" label="Message" error={errors.message} required className="sm:col-span-2">
                    <Textarea {...fieldAria("contact-message", errors.message)} rows={5} value={values.message} onChange={set("message")} placeholder="Tell us about your trip — dates, route, number of passengers…" />
                  </Field>
                  <Button type="submit" variant="gold" size="xl" disabled={status === "sending"} className="w-full sm:col-span-2">
                    {status === "sending" ? (
                      <>
                        <LoaderCircle className="animate-spin" /> Sending…
                      </>
                    ) : (
                      <>
                        <Send /> Send Message
                      </>
                    )}
                  </Button>
                </motion.form>
              )}
            </AnimatePresence>
          </Reveal>
        </div>

        {/* Map */}
        <Reveal className="relative mt-6 overflow-hidden rounded-2xl border border-white/8 bg-surface-2">
          <div className="relative aspect-[4/3] sm:aspect-[21/9]">
            <div aria-hidden className="absolute inset-0 grid place-items-center text-muted-foreground">
              <span className="flex items-center gap-2 text-sm">
                <MapPin className="size-4 text-gold" /> Loading map…
              </span>
            </div>
            <iframe
              title={`Map — ${site.contact.addressEn}`}
              src={mapEmbedSrc}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="absolute inset-0 size-full border-0 [filter:grayscale(1)_invert(0.92)_contrast(0.9)_hue-rotate(180deg)]"
            />
          </div>
          <div className="flex flex-col items-start justify-between gap-3 border-t border-white/8 p-4 sm:flex-row sm:items-center sm:px-6">
            <p className="flex items-start gap-2 text-sm">
              <MapPin className="mt-0.5 size-4 shrink-0 text-gold" />
              <span className="font-bangla">{site.contact.address}</span>
            </p>
            <a
              href={mapLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex shrink-0 items-center gap-1.5 text-sm text-gold hover:underline"
            >
              Open in Google Maps <ExternalLink className="size-3.5" />
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
