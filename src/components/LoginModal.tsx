"use client"

import { useState } from "react"
import { Dialog } from "@headlessui/react"
import { motion } from "framer-motion"

export default function LoginModal(
  { open, onClose }: { open: boolean; onClose: () => void }
) {
  const [error, setError] = useState(false)

  return (
    <Dialog
      open={open}
      onClose={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
    >
      <Dialog.Panel
        as={motion.div}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="bg-white dark:bg-zinc-900 rounded-2xl w-full max-w-md p-6 space-y-4"
      >
        <Dialog.Title className="text-xl font-bold">Войти</Dialog.Title>

        <input
          placeholder="E‑mail"
          className="w-full px-3 py-2 rounded bg-zinc-200 dark:bg-zinc-800"
        />
        <input
          type="password"
          placeholder="Пароль"
          className="w-full px-3 py-2 rounded bg-zinc-200 dark:bg-zinc-800"
        />

        {error && (
          <p className="text-sm text-red-500">
            Сервер недоступен, попробуйте позже.
          </p>
        )}

        <button
          onClick={() => setError(true)}
          className="w-full bg-black text-white rounded-lg py-2
                     hover:bg-zinc-800 active:scale-95 transition"
        >
          Войти
        </button>
      </Dialog.Panel>
    </Dialog>
  )
}
