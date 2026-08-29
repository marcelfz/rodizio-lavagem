import { useState } from "react"

type BookingFormProps = {
  dateKey: string
  onSubmit: (apartment: string, name: string) => void
  onCancel: () => void
}

export function BookingForm({ dateKey, onSubmit, onCancel }: BookingFormProps) {
  const [apartment, setApartment] = useState("")
  const [name, setName] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!apartment.trim() || !name.trim()) return
    onSubmit(apartment.trim(), name.trim())
  }

  return (
    <form onSubmit={handleSubmit} className="mt-3 rounded-md border border-blue-200 bg-blue-50 p-3">
      <p className="mb-2 text-xs font-medium text-blue-700">Marcar reserva para {dateKey}</p>
      <div className="flex flex-col gap-2">
        <input
          type="text"
          placeholder="Apartamento (ex: 101)"
          value={apartment}
          onChange={(e) => setApartment(e.target.value)}
          className="rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
        />
        <input
          type="text"
          placeholder="Nome do morador"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
        />
        <div className="flex gap-2">
          <button
            type="submit"
            className="flex-1 rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white transition hover:bg-blue-700"
          >
            Confirmar
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="rounded-md border border-gray-400 px-3 py-2 text-sm font-medium text-gray-600 transition hover:bg-gray-100"
          >
            Cancelar
          </button>
        </div>
      </div>
    </form>
  )
}
