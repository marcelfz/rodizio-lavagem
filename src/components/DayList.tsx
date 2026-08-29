import { useState } from "react"
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

  return (
    <div className="flex flex-col gap-3">
      {days.map((date) => {
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
      })}
    </div>
  )
}
