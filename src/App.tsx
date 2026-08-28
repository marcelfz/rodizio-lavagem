import { useBookings } from './hooks/useBookings'
import './App.css' // Importando os estilos

function App() {
  const { bookings, loading, error, addBooking, removeBooking } = useBookings()

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Carregando reservas...</p>
      </div>
    )
  }

  return (
    <div className="app-container">
      <header className="header">
        <h1>📅 Agendamentos</h1>
        <p>Gerencie as reservas do condomínio</p>
      </header>

      {error && (
        <div className="error-box">
          <p>⚠️ <strong>Erro:</strong> {error}</p>
        </div>
      )}

      <div className="action-section">
        <button 
          className="btn-add" 
          onClick={() => addBooking('2026-08-29', '101', 'Marcelo')}
        >
          + Adicionar Reserva de Teste
        </button>
      </div>

      <div className="bookings-list">
        {bookings.length === 0 && !error && (
          <p className="empty-state">Nenhuma reserva agendada no momento.</p>
        )}

        {bookings.map((b) => (
          <div className="booking-card" key={b.id}>
            <div className="booking-info">
              <span className="booking-name">👤 {b.name}</span>
              <span className="booking-details">
                🏢 Apto {b.apartment} <span className="divider">•</span> 🗓️ {b.date}
              </span>
            </div>
            <button 
              className="btn-remove" 
              onClick={() => removeBooking(b.id)}
            >
              Excluir
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default App