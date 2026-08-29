import { useBookings } from './hooks/useBookings'
import { DayList } from './components/DayList'
import { getRollingDays } from './utils/dates'

export default function App() {
  const { bookings, loading, error, currentUserId, addBooking, removeBooking } = useBookings()

  if (loading) {
    return (
      <div className="flex h-screen flex-col items-center justify-center gap-3 text-gray-500">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-gray-200 border-t-blue-500" />
        <p>Carregando reservas...</p>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-xl px-5 py-10">
      <header className="mb-8 text-center">
        <h1 className="mb-2 text-3xl font-bold text-gray-900">
          📅 Agendamentos
        </h1>
        <p className="text-gray-500">Gerencie as reservas do condomínio</p>
      </header>

      {error && (
        <div className="mb-5 rounded-lg border-l-4 border-red-500 bg-red-50 p-4 text-red-800">
          <strong>Erro:</strong> {error}
        </div>
      )}

      <DayList
        days={getRollingDays()}
        bookings={bookings}
        currentUserId={currentUserId}
        addBooking={addBooking}
        removeBooking={removeBooking}
      />
    </div>
  )
}