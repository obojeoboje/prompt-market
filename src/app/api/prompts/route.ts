import { NextResponse } from "next/server"
import Airtable from "airtable"

const base = new Airtable({ apiKey: process.env.AIRTABLE_TOKEN! })
  .base(process.env.AIRTABLE_APP!)

export async function GET() {
  try {
    const records = await base("Prompts")
      .select({ view: "public" })
      .all()

    const data = records.map(r => ({ id: r.id, ...r.fields }))
    return NextResponse.json(data, { status: 200 })
  } catch (e) {
    console.error(e)
    return NextResponse.json({ error: "Failed to fetch" }, { status: 500 })
  }
}
