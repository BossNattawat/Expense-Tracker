import { create } from "zustand"

interface Expense {
    id: number
    description: string
    amount: number
}

interface ExpenseStore {
    expenses: Expense[]
    addExpense: (expense: Expense) => void
    removeExpense: (id: number) => void
}

const localExpenses = (): Expense[] => {
    const storeExpenses = localStorage.getItem("expenses")
    return storeExpenses ? JSON.parse(storeExpenses) : []
}

export const useStore = create<ExpenseStore>((set) => ({
    expenses: localExpenses(),
    addExpense: (expense) => set((state) => {
        const updateExpenses = [...state.expenses, expense]
        localStorage.setItem("expenses", JSON.stringify(updateExpenses))
        return { expenses: updateExpenses }
    }),
    removeExpense: (id) => set((state) => {
        const updateExpenses = state.expenses.filter((expense) => expense.id !== id)
        localStorage.setItem("expenses", JSON.stringify(updateExpenses))
        return { expenses: updateExpenses }
    })
}))