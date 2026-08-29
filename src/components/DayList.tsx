import { useRef, useState } from "react"
import { toDateKey } from "../utils/dates"
import { DayCard } from "./DayCard"
import type { Booking } from "../types/booking"

type DayListProps = {
  days: Date[]
  bookings: Booking[]
  currentUserId: string | null
  addBooking: (date: string, apartment: string, name: string) => Promise<void>
  removeBooking: (id: string) => Promise<void>
}

export function DayList({ days, bookings, currentUserId, addBooking, removeBooking }: DayListProps) {
  const [selectedDate, setSelectedDate] = useState<string | null>(null)
  const trackRef = useRef<HTMLDivElement | null>(null)
  const [canPrev, setCanPrev] = useState(false)
  const [canNext, setCanNext] = useState(true)

  const updateScrollState = () => {
    const track = trackRef.current
    if (!track) return
    setCanPrev(track.scrollLeft > 4)
    setCanNext(track.scrollLeft + track.clientWidth < track.scrollWidth - 4)
  }

  const scroll = (dir: -1 | 1) => {
    const track = trackRef.current
    if (!track) return
    const card = track.querySelector<HTMLElement>("[data-card]")
    const step = card ? card.offsetWidth + 20 : track.clientWidth
    track.scrollBy({ left: dir * step, behavior: "smooth" })
  }

  const cards = days.map((date) => {
    const dateKey = toDateKey(date)
    const booking = bookings.find((b) => b.date === dateKey) ?? null
    const canDelete = booking != null && booking.createdBy === currentUserId

    return (
      <DayCard
        key={dateKey}
        date={date}
        booking={booking}
        isFormOpen={selectedDate === dateKey}
        canDelete={canDelete}
        onOpenForm={() => setSelectedDate(dateKey)}
        onCancelForm={() => setSelectedDate(null)}
        onRemove={() => {
          if (booking) removeBooking(booking.id)
        }}
        onSubmit={(apartment, name) => {
          addBooking(dateKey, apartment, name)
          setSelectedDate(null)
        }}
      />
    )
  })

  return (
    <div className="w-full">
      <div className="relative flex justify-center">
        <button
          onClick={() => scroll(-1)}
          aria-label="Anterior"
          disabled={!canPrev}
          className={`absolute left-0 top-1/2 z-10 -translate-y-1/2 rounded-full border border-gray-200 bg-white p-2 shadow-md transition sm:-left-5 ${
            canPrev ? "text-gray-600 hover:bg-gray-100" : "pointer-events-none text-gray-300"
          }`}
        >
          ←
        </button>

        <div
          ref={trackRef}
          onScroll={updateScrollState}
          className="flex w-full snap-x snap-mandatory gap-5 overflow-x-auto scroll-smooth px-2 py-3 scrollbar-none"
        >
          {cards.map((card, i) => (
            <div
              key={i}
              data-card
              className="w-[85%] shrink-0 snap-center sm:w-[45%] md:w-[31%] lg:w-[23%]"
            >
              {card}
            </div>
          ))}
        </div>

        <button
          onClick={() => scroll(1)}
          aria-label="Próximo"
          disabled={!canNext}
          className={`absolute right-0 top-1/2 z-10 -translate-y-1/2 rounded-full border border-gray-200 bg-white p-2 shadow-md transition sm:-right-5 ${
            canNext ? "text-gray-600 hover:bg-gray-100" : "pointer-events-none text-gray-300"
          }`}
        >
          →
        </button>
      </div>

      <div className="mt-6 flex items-center justify-center gap-1">
        <button
          onClick={() => {
            const track = trackRef.current
            if (track) track.scrollTo({ left: 0, behavior: "smooth" })
          }}
          disabled={!canPrev}
          aria-label="Ver primeiros dias"
          className={`text-xs font-medium transition ${
            canPrev ? "text-blue-600 hover:underline" : "pointer-events-none text-gray-300"
          }`}
        >
          Início
        </button>
        <span className="mx-3 text-xs text-gray-400">{days.length} dias</span>
        <button
          onClick={() => {
            const track = trackRef.current
            if (track) track.scrollTo({ left: track.scrollWidth, behavior: "smooth" })
          }}
          disabled={!canNext}
          aria-label="Ver últimos dias"
          className={`text-xs font-medium transition ${
            canNext ? "text-blue-600 hover:underline" : "pointer-events-none text-gray-300"
          }`}
        >
          Fim
        </button>
      </div>
    </div>
  )
}
