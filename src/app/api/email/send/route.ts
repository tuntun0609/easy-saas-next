import { resend } from '@/lib/email'

export async function POST(req: Request) {
  try {
    const { text, subject, to } = await req.json()

    if (!resend) {
      return Response.json({ error: 'Resend is not initialized' }, { status: 500 })
    }

    const { data, error } = await resend.emails.send({
      text,
      from: `${process.env.EMAIL_FROM_NAME}<${process.env.EMAIL_FROM_DOMAIN}>`,
      subject,
      to,
    })

    if (error) {
      return Response.json({ error }, { status: 500 })
    }

    return Response.json(data)
  } catch (error) {
    return Response.json({ error }, { status: 500 })
  }
}
