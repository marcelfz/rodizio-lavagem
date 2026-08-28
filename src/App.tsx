import { useBookings } from './hooks/useBookings'

export default function App() {
  const { bookings, loading, error, addBooking, removeBooking } = useBookings()

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

      <div className="mb-5 flex justify-end">
        <button
          onClick={() => addBooking('2026-08-29', '101', 'Marcelo')}
          className="rounded-lg bg-blue-600 px-5 py-2.5 font-semibold text-white shadow-md shadow-blue-500/20 transition hover:bg-blue-700"
        >
          + Adicionar Reserva de Teste
        </button>
      </div>

      <div className="flex flex-col gap-3">
        {bookings.length === 0 && !error && (
          <p className="rounded-lg border border-dashed border-gray-300 bg-white p-10 text-center text-gray-500">
            Nenhuma reserva agendada no momento.
          </p>
        )}

        {bookings.map((b) => (
          <div
            key={b.id}
            className="flex items-center justify-between rounded-lg bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
          >
            <div className="flex flex-col gap-1.5">
              <span className="font-semibold text-gray-900">👤 {b.name}</span>
              <span className="text-sm text-gray-500">
                🏢 Apto {b.apartment} <span className="text-gray-300">•</span> 🗓️ {b.date}
              </span>
            </div>
            <button
              onClick={() => removeBooking(b.id)}
              className="rounded-md border border-red-600 px-3 py-1.5 font-medium text-red-600 transition hover:bg-red-600 hover:text-white"
            >
              Excluir
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}