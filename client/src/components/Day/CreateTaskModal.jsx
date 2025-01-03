import { useState } from "react"
import axios from "axios"

export default function CreateTaskModal({ hideModal, cycleId, goals }) {
  const [newTask, setNewTask] = useState({
    title: "",
    goalId: "",
    dueDate: "",
    cycleId,
  })

  const [error, setError] = useState(null)

  const handleCreateTask = async (e) => {
    e.preventDefault()
    try {
      const token = localStorage.getItem("token")

      if (!token) {
        throw new Error("Unauthorized: No token found")
      }

      const response = await axios.post(
        "http://localhost:3000/api/tasks",
        newTask,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      )

      alert("Task created successfully!")
    } catch (err) {
      setError(err.response?.data?.message || "Failed to create task")
    }
  }

  return (
    <div className='absolute top-0 left-0 w-screen h-screen flex justify-center items-center bg-[rgba(0,0,0,0.5]'>
      <div className='bg-white z-10 p-10 rounded-lg w-1/2'>
        <form onSubmit={handleCreateTask} className='flex flex-col gap-5'>
          <div>
            <input
              placeholder='Title'
              className='bg-neutral-100 rounded-lg p-2 w-full'
              type='text'
              value={newTask.title}
              onChange={(e) =>
                setNewTask({ ...newTask, title: e.target.value })
              }
              required
            />
          </div>
          <div>
            <label>Due Date:</label>
            <input
              className='bg-neutral-100 rounded-lg p-2 w-full'
              type='date'
              value={newTask.dueDate}
              onChange={(e) =>
                setNewTask({ ...newTask, dueDate: e.target.value })
              }
              required
            />
          </div>
          <div>
            <select
              value={newTask.goalId}
              onChange={(e) =>
                setNewTask({ ...newTask, goalId: e.target.value })
              }
            >
              {goals.map((goal) => (
                <option key={goal._id} value={goal._id}>
                  {goal.title}
                </option>
              ))}
            </select>
          </div>
          <div className='flex justify-between'>
            <button
              type='submit'
              className='mt-5 px-4 py-2 bg-blue-500 hover:bg-blue-600 hover:drop-shadow-lg transition-all text-white font-bold rounded-lg'
            >
              Save
            </button>
            <button
              onClick={hideModal}
              className='mt-5 px-4 py-2 bg-neutral-300 hover:bg-neutral-400 hover:drop-shadow-lg transition-all text-white font-bold rounded-lg'
            >
              Cancel
            </button>
            {error && <p style={{ color: "red" }}>{error}</p>}
          </div>
        </form>
      </div>
    </div>
  )
}
