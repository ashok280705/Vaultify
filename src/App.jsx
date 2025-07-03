import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/login'
import Mainpage from './pages/mainpage'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
     
      <Router>
        <Routes>
        <Route path="/" element={<Login />} />
        <Route path="app" element={<Mainpage />} />
        </Routes>
      </Router>
  
    </>
  )
}

export default App
