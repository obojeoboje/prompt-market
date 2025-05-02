"use client"
import { Star } from "lucide-react"
import { useState } from "react"

type Props = {
  value: number          // средняя оценка
  total?: number         // кол‑во оценок
  interactive?: boolean
  onSelect?: (v: number) => void
  size?: number
}

export function Stars({
  value,
  total,
  interactive = false,
  onSelect,
  size = 20,
}: Props) {
  const [hover, setHover] = useState<number | null>(null)
  const display = hover ?? value

  return (
    <div className="inline-flex items-center gap-1 select-none">
      {/* сами звёзды */}
      {[1, 2, 3, 4, 5].map((i) => (
        <Star
          key={i}
          size={size}
          strokeWidth={1.5}
          fill={display >= i ? "#FACC15" : "transparent"}
          className={interactive ? "cursor-pointer" : ""}
          onMouseEnter={() => interactive && setHover(i)}
          onMouseLeave={() => interactive && setHover(null)}
          onClick={() => interactive && onSelect?.(i)}
        />
      ))}

      {/* среднее значение */}
      <span className="text-sm font-medium ml-1">
        {value.toFixed(1)}
      </span>

      {/* кол‑во оценок */}
      {typeof total === "number" && (
        <span className="text-xs text-zinc-500 ml-1">({total})</span>
      )}
    </div>
  )
}
