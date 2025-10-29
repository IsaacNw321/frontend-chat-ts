import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import LandingPage from './pages/Landing'
import Navigation from './components/Nav'
function App() {

  return (
    <BrowserRouter>
      <Navigation/>
      <Routes>
        <Route path='/' element={<LandingPage/>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
