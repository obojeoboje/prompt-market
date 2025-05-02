"use client"

import useSWR from "swr"
import { useState, useMemo } from "react"
import { PromptCard } from "@/components/PromptCard"
import { Prompt } from "@/types/Prompt"
import { X } from "lucide-react"

const fetcher = (url: string) => fetch(url).then((r) => r.json())

export default function Home() {
  /* --- 1. хуки на самом верху --- */
  const { data, error } = useSWR<Prompt[]>("/api/prompts", fetcher)
  const [cat, setCat] = useState<string | null>(null)
  const [q, setQ] = useState("")

  /* --- 2. вычисляем filtered всегда, даже если data undefined --- */
  const filtered = useMemo(() => {
    if (!data) return []
    const s = q.toLowerCase()
    return data
      .filter((p) => (cat ? p.Category === cat : true))
      .filter(
        (p) =>
          p.Title.toLowerCase().includes(s) ||
          (p.Description ?? "").toLowerCase().includes(s) ||
          (p.AuthorName ?? "").toLowerCase().includes(s)
      )
  }, [data, cat, q])

  /* --- 3. состояние загрузки / ошибки --- */
  if (error) {
    return <p className="p-8">Ошибка загрузки…</p>
  }
  if (!data) {
    return <p className="p-8">Загружаю…</p>
  }

  const cats = Array.from(new Set(data.map((p) => p.Category)))

  /* --- 4. нормальный JSX --- */
  return (
    <main className="p-6 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Каталог промптов</h1>

      <div className="relative md:max-w-md w-full mb-4">
        <input
          type="text"
          placeholder="Поиск промптов…"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          className="w-full px-4 py-2 pr-9 rounded-lg bg-zinc-200 dark:bg-zinc-800"
        />

        {/* крестик показываем, только если строка не пустая */}
        {q && (
          <button
            onClick={() => setQ("")}
            className="absolute right-2 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-300"
          >
            <X size={18} />
          </button>
        )}
      </div>

      {/* фильтры */}
      <div className="flex gap-2 mb-6 overflow-x-auto">
        <button
          className={`px-3 py-1 rounded-full ${
            cat === null
              ? "bg-black text-white"
              : "bg-zinc-200 dark:bg-zinc-700"
          }`}
          onClick={() => setCat(null)}
        >
          Все
        </button>

        {cats.map((c) => (
          <button
            key={c}
            onClick={() => setCat(c)}
            className={`px-3 py-1 rounded-full ${
              cat === c
                ? "bg-black text-white"
                : "bg-zinc-200 dark:bg-zinc-700"
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      <div className="grid gap-6 grid-cols-[repeat(auto-fill,minmax(260px,1fr))]">
        {filtered.map((p) => (
          <PromptCard key={p.id} prompt={p} />
        ))}
      </div>
    </main>
  )
}
