import { toDateKey } from "../utils/dates"
import { BookingForm } from "./BookingForm"
import type { Booking } from "../types/booking"

type DayCardProps = {
  date: Date
  booking: Booking | null
  isFormOpen: boolean
  canDelete: boolean
  onOpenForm: () => void
  onCancelForm: () => void
  onRemove: () => void
  onSubmit: (apartment: string, name: string) => void
}

const WEEKDAYS = [
  "Domingo",
  "Segunda",
  "Terça",
  "Quarta",
  "Quinta",
  "Sexta",
  "Sábado",
]

const MONTHS = [
  "Janeiro",
  "Fevereiro",
  "Março",
  "Abril",
  "Maio",
  "Junho",
  "Julho",
  "Agosto",
  "Setembro",
  "Outubro",
  "Novembro",
  "Dezembro",
]

function isToday(date: Date): boolean {
  const today = new Date()
  return toDateKey(date) === toDateKey(today)
}

export function DayCard({ date, booking, isFormOpen, canDelete, onOpenForm, onCancelForm, onRemove, onSubmit }: DayCardProps) {
  const dateKey = toDateKey(date)
  const weekday = WEEKDAYS[date.getDay()]
  const dayNumber = date.getDate()
  const month = MONTHS[date.getMonth()]
  const today = isToday(date)

  return (
    <div className="rounded-lg bg-white p-4 shadow-sm">
      <div className="flex items-center justify-between">
        <div className="flex flex-col">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-gray-900">{weekday}</span>
            <span className="text-gray-500">
              {dayNumber} de {month}
            </span>
            {today && (
              <span className="rounded-full bg-blue-100 px-2 py-0.5 text-xs font-semibold text-blue-700">
                Hoje
              </span>
            )}
          </div>
          <span className="text-xs text-gray-400">ID: {dateKey}</span>
        </div>
      </div>

      {booking ? (
        <div className="mt-3 flex items-center justify-between rounded-md bg-blue-50 p-3">
          <div className="flex flex-col">
            <span className="font-medium text-gray-900">👤 {booking.name}</span>
            <span className="text-sm text-gray-500">🏢 Apto {booking.apartment}</span>
          </div>
          {canDelete && (
            <button
              onClick={onRemove}
              className="rounded-md border border-red-600 px-3 py-1.5 font-medium text-red-600 transition hover:bg-red-600 hover:text-white"
            >
              Excluir
            </button>
          )}
        </div>
      ) : isFormOpen ? (
        <BookingForm
          dateKey={dateKey}
          onSubmit={onSubmit}
          onCancel={onCancelForm}
        />
      ) : (
        <button
          onClick={onOpenForm}
          className="mt-3 w-full rounded-md border border-blue-600 px-3 py-2 font-medium text-blue-600 transition hover:bg-blue-600 hover:text-white"
        >
          + Marcar
        </button>
      )}
    </div>
  )
}
