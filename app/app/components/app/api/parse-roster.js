import { buildICS } from '@/lib/icsBuilder'

export async function POST(req) {
  const { text } = await req.json()
  const lines = text.split('\n')
  const events = []

  for (const line of lines) {
    const match = line.match(/(\d{2}) (\w+) (\d{4}).*?(\d{4}) ?– ?(\d{4})/)
    if (!match) continue

    const [, day, month, year, start, end] = match
    const startDate = new Date(`${day} ${month} ${year} ${start.slice(0,2)}:${start.slice(2)}`)
    const endDate = new Date(`${day} ${month} ${year} ${end.slice(0,2)}:${end.slice(2)}`)

    events.push({
      summary: 'Night Shift',
      start: startDate,
      end: endDate,
    })
  }

  const ics = buildICS(events)

  return new Response(ics, {
    headers: {
      'Content-Type': 'text/calendar',
      'Content-Disposition': 'attachment; filename="roster.ics"',
    }
  })
}
