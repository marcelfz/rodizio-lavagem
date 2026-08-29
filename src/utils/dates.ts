export function getRollingDays(referenceDate: Date = new Date()): Date[]{
    const base = new Date(referenceDate)
    base.setHours(0, 0, 0, 0)

    const days: Date[] = []

    for (let i = 0; i < 14; i++){
        const day = new Date(base)
        day.setDate(base.getDate() + i)
        days.push(day)
    }

    return days
}

export function toDateKey(date: Date): string {
    const year = date.getFullYear()
    const month = String(date.getMonth() +1).padStart(2, '0')
    const day = String(date.getDate()).padStart(2, '0')
    return `${year}-${month}-${day}`
}