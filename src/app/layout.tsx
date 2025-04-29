import "./globals.css"
import { ReactNode } from "react"
import { ThemeProvider } from "next-themes"
import Link from "next/link"

export const metadata = {
  title: "SYNAP.STORE — Каталог AI-промптов",
  description: "Покупайте проверенные промпты от блогеров-креаторов",
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ru" suppressHydrationWarning>
      <body className="bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100">
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          {/* --- Header --- */}
          <header className="w-full border-b border-zinc-200 dark:border-zinc-800">
            <div className="max-w-7xl mx-auto px-6 h-14 flex items-center">
              <Link href="/" className="text-xl font-bold tracking-tight">
                SYNAP.<span className="text-primary">STORE</span>
              </Link>
            </div>
          </header>

          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
