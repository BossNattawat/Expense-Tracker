import { useStore } from "../store"
import { useState } from "react"

function ExpenseTracker() {

    const { expenses, addExpense, removeExpense } = useStore()
    const [description, setDescription] = useState<string>("")
    const [amount, setAmount] = useState<number | "">("")

    function handleAddExpense(){
        if(description.trim() === "" || amount === ""){
            return
        }

        const expense = {
            id: Math.floor(Math.random()),
            description: description,
            amount: Number(amount)
        }

        addExpense(expense)

        setDescription("")
        setAmount("")
    }

  return (
    <div className="min-h-screen w-full bg-base-100 flex justify-center items-center">
        <div className="bg-base-300 p-6 rounded shadow">
          <h1 className="text-2xl font-semibold mb-6 text-center text-base-content">Expense Tracker</h1>
          <div className="space-y-4 mb-6">
            <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} className="input w-full" placeholder="Description..." />
            <input type="text" value={amount} onChange={(e) => setAmount(e.target.value === "" ? "" : Number(e.target.value))} className="input w-full" placeholder="Amount..." />
            <button className="btn btn-soft btn-accent w-full" onClick={handleAddExpense}>Add Expense</button>
          </div>
          <ul className="space-y-4 mb-6">
            {expenses.map((expense, index) => (
              <li key={index} className="bg-base-100 p-3 flex items-center justify-between rounded shadow">
                <span className="text-base-content"><strong>{expense.description}:</strong> ${expense.amount.toFixed(2)}</span>
                <button className="btn btn-soft btn-error" onClick={() => removeExpense(expense.id)}>Delete</button>
              </li>
            ))}
          </ul>
          <div className="text-center">
            <h2 className="text-2xl font-semibold text-base-content">Total Expense: $ {expenses.reduce((total, expense) => total += expense.amount, 0).toFixed(2)}</h2>
          </div>
        </div>
    </div>
  )
}

export default ExpenseTracker