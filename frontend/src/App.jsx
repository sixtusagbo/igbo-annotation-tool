import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import axios from 'axios'

export default function App() {
  const [text, setText] = useState('')
  const [annotations, setAnnotations] = useState(null)
  const [loading, setLoading] = useState(false)
  const handleSubmit = async () => {
   setLoading(true)
   try {
    const response = await axios.post("http://127.0.0.1:8000/annotate", {text, strategy: "simple"}, {headers: {"Content-Type": "application/json"}})
    setAnnotations(response.data)
   } catch (error) {
    console.error(
      "There was an error processing your request: " + error)
      
   } 
   setLoading(false)
  }
  return (
    <div className='bg-red-700 min-h-screen flex flex-col justify-center items-center '>
      <h1 className='text-3xl font-bold text-white mb-4'>Igbo Annotation Tool</h1>
      <textarea value={text} cols='50' rows='4' onChange={(e) => setText(e.target.value)}  placeholder='Enter Igbo Text...' className='mb-4 bg-white p-4'/>
      <button type="submit" onClick={handleSubmit} disabled={loading} className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>{loading ? 'Processing...' : 'Annotate'}</button>

      {annotations && (
        <div>
          <h1>Result</h1>
          <pre className='bg-white p-4'>{JSON.stringify(annotations, null, 2)}</pre>
        </div>
      )}
    </div>

  )
}