"use client"

import useSWR from "swr"
import { useState } from "react"
import { PromptCard } from "@/components/PromptCard"
import { Prompt } from "@/types/Prompt"


const fetcher = (url: string) => fetch(url).then(r => r.json())

export default function Home() {
  const { data, error } = useSWR<Prompt[]>("/api/prompts", fetcher)
  const [cat, setCat] = useState<string | null>(null)

  if (error) return <p className="p-8">Ошибка загрузки…</p>
  if (!data) return <p className="p-8">Загружаю…</p>

  const cats = Array.from(new Set(data.map(p => p.Category)))

  return (
    <main className="p-6 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Каталог промптов</h1>

      {/* фильтры */}
      <div className="flex gap-2 mb-6 overflow-x-auto">
        <button
          className={`px-3 py-1 rounded-full ${cat === null
              ? "bg-black text-white"
              : "bg-zinc-200 dark:bg-zinc-700"}`}
          onClick={() => setCat(null)}
        >
          Все
        </button>
        {cats.map(c => (
          <button
            key={c}
            onClick={() => setCat(c)}
            className={`px-3 py-1 rounded-full ${cat === c
                ? "bg-black text-white"
                : "bg-zinc-200 dark:bg-zinc-700"}`}
          >
            {c}
          </button>
        ))}
      </div>

      <div className="grid gap-6 grid-cols-[repeat(auto-fill,minmax(260px,1fr))]">
        {data
          .filter(p => (cat ? p.Category === cat : true))
          .map(p => <PromptCard key={p.id} prompt={p} />)}
      </div>
    </main>
  )
}
