import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import LandingPage from './pages/Landing'
import Navigation from './components/Nav'
import { Login } from './sessions/Login'
import { Dashboard } from './pages/Dashboard'
function App() {

  return (
    <BrowserRouter>
      <Navigation/>
      <Routes>
        <Route path='/' element={<LandingPage/>} />
        <Route path='/login' element={<Login/>} />
        <Route path='/dashboard' element={<Dashboard/>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
