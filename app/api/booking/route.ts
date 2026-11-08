import { getVehicle } from "@/lib/vehicles"
import { validateBooking } from "@/lib/validation"

/**
 * Receives booking requests and validates them server-side.
 *
 * NOTE: This demo does not persist or forward requests yet. Connect it to
 * email (e.g. Resend), a database or a CRM before going live — until then the
 * UI also offers to send the booking over WhatsApp so no request is lost.
 */
export async function POST(request: Request) {
  let body: Record<string, unknown>
  try {
    body = await request.json()
  } catch {
    return Response.json({ ok: false, error: "Invalid request body." }, { status: 400 })
  }

  // Validate against the server's date, allowing one day of slack for
  // visitors in time zones ahead of the server.
  const yesterday = new Date(Date.now() - 86_400_000).toISOString().slice(0, 10)
  const { data, errors, valid } = validateBooking(body, yesterday)

  if (data.vehicle && !getVehicle(data.vehicle)) {
    errors.vehicle = "Selected vehicle was not found."
  }

  if (!valid || errors.vehicle) {
    return Response.json(
      { ok: false, error: "Please correct the highlighted fields.", errors },
      { status: 422 }
    )
  }

  const reference = `RAC-${Date.now().toString(36).toUpperCase().slice(-6)}`

  // TODO: persist / notify (email, CRM, database).

  return Response.json({ ok: true, reference })
}
