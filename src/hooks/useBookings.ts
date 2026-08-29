import { useEffect, useState } from "react"
import type { Booking } from "../types/booking"
import { collection, onSnapshot, addDoc, deleteDoc, doc } from "firebase/firestore"
import { getAuth, signInAnonymously } from "firebase/auth"
import { db, app } from "../firebase"

type UseBookingsReturn = {
  bookings: Booking[]
  loading: boolean
  error: string | null
  currentUserId: string | null
  addBooking: (date: string, apartment: string, name: string) => Promise<void>
  removeBooking: (id: string) => Promise<void>
}

const auth = getAuth(app)

export function useBookings(): UseBookingsReturn {
    const [bookings, setBookings] = useState<Booking[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const [currentUserId, setCurrentUserId] = useState<string | null>(null)

    useEffect(() => {
      signInAnonymously(auth)
        .then(() => {
          setCurrentUserId(auth.currentUser?.uid ?? null)
        })
        .catch((e) => {
          setError(e instanceof Error ? e.message : "Erro ao fazer login anônimo")
        })
    }, [])

    useEffect(() => {
      const unsubscribe = onSnapshot(
        collection(db, "bookings"), (snapshot) => {
          const data = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          })) as Booking[]
          setBookings(data)
          setLoading(false)
        },
        (error) => {
          setError(error.message)
          setLoading(false)
        }
      )
      return () => unsubscribe()
    }, [])

    const addBooking = async (date: string, apartment: string, name: string) => {
      try {
        setError(null)

        const duplicate = bookings.some((b) => b.date === date)
        if (duplicate) {
          setError("Já existe um agendamento para esta data")
          return
        }
        await addDoc(collection(db, "bookings"), {
          date,
          apartment,
          name,
          createdBy: auth.currentUser?.uid ?? null,
        })
      } catch (e) {
        setError(e instanceof Error ? e.message : "Erro ao adicionar agendamento")
      }
    }

    const removeBooking = async (id: string) => {
      try {
        setError(null)
        await deleteDoc(doc(db, "bookings", id))
      } catch (e) {
        setError(e instanceof Error ? e.message : "Erro ao remover agendamento")
      }
    }

    return { bookings, loading, error, currentUserId, addBooking, removeBooking }
}
