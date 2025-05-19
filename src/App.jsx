import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className='p-6 max-w-sm mx-auto bg-white rounded-xl flex items-center space-x-4' >
        <h1 className='text-2xl font-bold text-blue-500'>hello mohit</h1>
      </div>
    </>
  )
}

export default App
