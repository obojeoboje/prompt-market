import { NextResponse } from "next/server"
import Airtable from "airtable"

const base = new Airtable({ apiKey: process.env.AIRTABLE_TOKEN! })
  .base(process.env.AIRTABLE_APP!)

export async function GET() {
  try {
    // ⚠️ Берём internal‑view, чтобы видеть FullPrompt и посчитать длину
    const records = await base("Prompts")
      .select({ view: "internal" })
      .all()

    const data = records.map(r => {
      const f: any = { ...r.fields }
      const len = (f.FullPrompt || "").length
      delete f.FullPrompt            // наружу не отдаём
      return { id: r.id, ...f, Length: len }
    })

    return NextResponse.json(data, { status: 200 })
  } catch (e) {
    console.error(e)
    return NextResponse.json({ error: "Failed to fetch" }, { status: 500 })
  }
}
