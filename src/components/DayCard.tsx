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

const WEEKDAYS = ["Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"]
const MONTHS = [
  "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
  "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro",
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
    <>
      <div
        className={`flex h-full flex-col rounded-xl border p-4 text-center shadow-sm transition ${
          today ? "border-blue-400 bg-blue-50" : "border-gray-200 bg-white hover:shadow-md"
        }`}
      >
        <span className={`text-xs font-semibold uppercase tracking-wide ${today ? "text-blue-700" : "text-gray-500"}`}>
          {weekday}
        </span>
        <span className={`text-3xl font-bold leading-none ${today ? "text-blue-700" : "text-gray-900"}`}>
          {dayNumber}
        </span>
        <span className="mt-1 text-xs text-gray-500">de {month}</span>

        {today && (
          <span className="mx-auto mt-2 rounded-full bg-blue-100 px-3 py-0.5 text-[10px] font-semibold text-blue-700">
            Hoje
          </span>
        )}

        <div className="mt-3 flex-1">
          {booking ? (
            <div className={`flex h-full flex-col rounded-lg p-2.5 text-left ${today ? "bg-blue-100/70" : "bg-blue-50"}`}>
              <p className="truncate text-xs font-semibold text-gray-900">👤 {booking.name}</p>
              <p className="truncate text-[11px] text-gray-500">🏢 Apto {booking.apartment}</p>
              {canDelete && (
                <button
                  onClick={onRemove}
                  className="mt-auto w-full rounded-md border border-red-600 px-2 py-1.5 text-xs font-medium text-red-600 transition hover:bg-red-600 hover:text-white"
                >
                  Excluir
                </button>
              )}
            </div>
          ) : (
            <button
              onClick={onOpenForm}
              className="w-full rounded-md border border-blue-600 px-2 py-2 text-xs font-medium text-blue-600 transition hover:bg-blue-600 hover:text-white"
            >
              + Marcar
            </button>
          )}
        </div>
      </div>

      {isFormOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="w-full max-w-sm rounded-xl bg-white p-5 shadow-xl">
            <h3 className="mb-1 text-lg font-bold text-gray-900">Marcar reserva</h3>
            <p className="mb-4 text-sm text-gray-500">
              {weekday}, {dayNumber} de {month} ({dateKey})
            </p>
            <BookingForm dateKey={dateKey} onSubmit={onSubmit} onCancel={onCancelForm} />
          </div>
        </div>
      )}
    </>
  )
}
