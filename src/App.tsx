import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import LandingPage from './pages/Landing'
import Navigation from './components/Nav'
import { Login } from './sessions/Login'
import { Dashboard } from './pages/Dashboard'
import PersistLogin from './components/PersistLogin'
import { Register } from './sessions/Register'
import Chat from './components/Chats'
import AuthProvider from './context/AuthProvider'
function App() {

  return (
    <BrowserRouter>
    <AuthProvider>
      <Navigation/>
      <Routes>
        <Route path='/' element={<LandingPage/>} />
        <Route path='/login' element={<Login/>} />
        <Route path='/register' element={<Register/>}/>
        <Route element={<PersistLogin/>}>
          <Route path='/chat' element={<Chat/>}/>
          <Route path='/dashboard' element={<Dashboard/>} />
        </Route>
      </Routes>
    </AuthProvider>
    </BrowserRouter>
  )
}

export default App
