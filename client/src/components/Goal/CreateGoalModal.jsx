import { useState } from "react"
import axios from "axios"

export default function CreateGoalModal({ hideModal, cycleId }) {
  const [title, setTitle] = useState("")
  const [tactics, setTactics] = useState([])
  const [description, setDescription] = useState("")
  const [goalError, setGoalError] = useState("")

  const createGoal = async (e) => {
    e.preventDefault()
    try {
      const token = localStorage.getItem("token")
      if (!token) {
        throw new Error("Unauthorized: No token found")
      }

      const response = await axios.post(
        "http://localhost:3000/api/goals",
        { title, description, cycleId, tactics },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      )
      setTitle("")
      setDescription("")
      alert("Goal created successfully!")
      hideModal()
    } catch (err) {
      setGoalError(err.response?.data?.message || "Failed to create goal")
    }
  }

  const addTactic = () => {
    setTactics((prevTactics) => [...prevTactics, { title: "", description: "" }])
  }

  return (
    <div className='absolute top-0 left-0 w-screen h-screen flex justify-center items-center bg-[rgba(0,0,0,0.5]'>
      <div className='bg-white z-10 p-10 rounded-lg w-1/2'>
        <form onSubmit={createGoal} className='flex flex-col gap-5'>
          <div>
            <input
              placeholder='Title'
              type='text'
              className='bg-neutral-100 rounded-lg p-2 w-full'
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div>
            <textarea
              cols={20}
              placeholder='Description'
              className='bg-neutral-100 rounded-lg p-2 w-full'
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          {tactics.map((tactic, index) => (
            <div key={index}>
              <input
                placeholder='Tactic Title'
                type='text'
                className='bg-neutral-100 rounded-lg p-2 w-full'
                value={tactic.title}
                onChange={(e) => {
                  const newTactics = [...tactics]
                  newTactics[index].title = e.target.value
                  setTactics(newTactics)
                }}
                required
              />
              <textarea
                cols={20}
                placeholder='Tactic Description'
                className='bg-neutral-100 rounded-lg p-2 w-full'
                value={tactic.description}
                onChange={(e) => {
                  const newTactics = [...tactics]
                  newTactics[index].description = e.target.value
                  setTactics(newTactics)
                }}
              />
            </div>
          ))}
          <button className='w-fit font-bold' onClick={addTactic}>+ Add Tactic</button>
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
            {goalError && <p style={{ color: "red" }}>{goalError}</p>}
          </div>
        </form>
      </div>
    </div>
  )
}