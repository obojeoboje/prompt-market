"use client"

import { useState } from "react"
import { Prompt } from "@/types/Prompt"
import { Dialog } from "@headlessui/react"
import { motion, AnimatePresence } from "framer-motion"

type Props = { prompt: Prompt }

export function PromptCard({ prompt }: Props) {
  const [open, setOpen] = useState(false)
  const price = (prompt.PriceRUB || 0).toLocaleString("ru-RU") + " ₽"

  return (
    <>
      {/* ---------- Карточка ------------ */}
      <article
        className="rounded-2xl shadow-md p-4 bg-white dark:bg-zinc-900 flex flex-col cursor-pointer
                   hover:shadow-lg transition-shadow"
        onClick={() => setOpen(true)}
      >
        {prompt.Cover?.[0]?.url && (
          <img
            src={prompt.Cover[0].url}
            alt={prompt.Title}
            className="rounded-xl aspect-square object-cover mb-3"
          />
        )}

        <h2 className="text-lg font-semibold mb-1 line-clamp-2">{prompt.Title}</h2>
        <p className="text-xs text-zinc-500">{prompt.Category}</p>

        {/* Автор (мини) */}
        {prompt.AuthorName && (
          <div className="flex items-center mt-2 gap-2">
            {prompt.AuthorAvatar?.[0]?.url && (
              <img
                src={prompt.AuthorAvatar[0].url}
                className="w-6 h-6 rounded-full object-cover"
              />
            )}
            <span className="text-sm">{prompt.AuthorName}</span>
          </div>
        )}

        {/* CTA */}
        <button
          className="mt-4 w-full bg-black text-white rounded-lg py-2
                     hover:bg-zinc-800 active:scale-[0.98] transition-all cursor-pointer"
          onClick={(e) => {
            e.stopPropagation()
            setOpen(true)
          }}
        >
          Подробнее · {price}
        </button>
      </article>

      {/* ---------- Модалка ------------ */}
      <AnimatePresence>
        {open && (
          <Dialog
            open={open}
            onClose={() => setOpen(false)}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
          >
            <Dialog.Panel
              as={motion.div}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-white dark:bg-zinc-900 rounded-2xl max-w-4xl w-full overflow-hidden"
            >
              <div className="grid md:grid-cols-[240px_1fr]">
                {/* --- Левый блок: автор --- */}
                <aside className="border-b md:border-b-0 md:border-r
                                   border-zinc-200 dark:border-zinc-800 p-6 flex flex-col items-center">
                  {prompt.AuthorAvatar?.[0]?.url && (
                    <img
                      src={prompt.AuthorAvatar[0].url}
                      className="w-40 h-40 rounded-full object-cover mb-4 shadow-sm"
                    />
                  )}
                  <h3 className="text-xl font-semibold text-center mb-1">
                    {prompt.AuthorName}
                  </h3>
                  <p className="text-sm text-center text-zinc-500 whitespace-pre-line">
                    {prompt.AuthorBio}
                  </p>
                </aside>

                {/* --- Правый блок: сам промпт --- */}
                <section className="p-6 space-y-4">
                  <h2 className="text-2xl font-bold">{prompt.Title}</h2>

                  {prompt.Cover?.[0]?.url && (
                    <img
                      src={prompt.Cover[0].url}
                      alt={prompt.Title}
                      className="rounded-xl w-full object-cover"
                    />
                  )}

                  <p className="whitespace-pre-line">{prompt.Description}</p>

                  <a
                    href={prompt.PayLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block bg-black text-white rounded-lg px-6 py-3 font-medium
                               hover:bg-zinc-800 active:scale-95 transition-all cursor-pointer"
                  >
                    Купить за {price}
                  </a>
                </section>
              </div>
            </Dialog.Panel>
          </Dialog>
        )}
      </AnimatePresence>
    </>
  )
}
