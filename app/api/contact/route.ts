import { validateContact } from "@/lib/validation"

/**
 * Receives contact-form messages and validates them server-side.
 *
 * NOTE: Demo endpoint — wire it to email or a helpdesk before going live.
 */
export async function POST(request: Request) {
  let body: Record<string, unknown>
  try {
    body = await request.json()
  } catch {
    return Response.json({ ok: false, error: "Invalid request body." }, { status: 400 })
  }

  const { errors, valid } = validateContact(body)
  if (!valid) {
    return Response.json(
      { ok: false, error: "Please correct the highlighted fields.", errors },
      { status: 422 }
    )
  }

  // TODO: forward the message (email, helpdesk, CRM).

  return Response.json({ ok: true })
}
