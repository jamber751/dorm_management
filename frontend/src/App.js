import { Routes, Route, Navigate, Outlet } from 'react-router-dom'

import './App.css'

import NavBar from './components/NavBar'
import Spinner from './components/Spinner'

import Login from './pages/Login'
import Register from './pages/Register'
import Devices from './pages/Devices'
import AddDevice from './pages/AddDevice'
import MyAppointments from './pages/MyAppointments'
import Appointments from './pages/Appointments'
import Dashboard from './pages/Dashboard'

import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { isAuth } from './features/auth/authSlice'

function App() {

  const dispatch = useDispatch()
  useEffect(() => {
    try {
      dispatch(isAuth())
    } catch (error) {
      console.log(error)
    }
  }, [dispatch])

  const { message } = useSelector((state) => state.auth)
  const appointment_message = useSelector((state) => state.appt.message)

  useEffect(() => {
    if (message !== '') {
      toast(message)
    }
  }, [message])

  useEffect(() => {
    if (appointment_message !== '') {
      toast(appointment_message)
    }
  }, [appointment_message])

  const { isAuthenticated, isPending } = useSelector((state) => state.auth)

  if (isPending) {
    return (
      <Spinner />
    )
  }

  return (
    <>
      <NavBar isAuthenticated={isAuthenticated} />
      <div className=''>
        <Routes>
          <Route element={isPending ? <Spinner /> : <LoginRoute isAuthenticated={isAuthenticated} />}>
            <Route path='login' element={<Login />} />
            <Route path='register' element={<Register toast={toast} />} />
          </Route>
          <Route element={isPending ? <Spinner /> : <ProtectedRoute isAuthenticated={isAuthenticated} />}>
            <Route path='' element={<Dashboard />} />
            <Route path='appts' element={<Appointments toast={toast} />} />
            <Route path='myAppts' element={<MyAppointments />} />
            <Route path='devices' element={<Devices toast={toast} />} />
            <Route path='addDevice' element={<AddDevice toast={toast} />} />
          </Route>
          <Route path="*" element={<Navigate to='' />} />
        </Routes>
        <ToastContainer autoClose={500} />
      </div>
    </>
  );
}


function LoginRoute({ isAuthenticated }) {
  if (isAuthenticated) {
    return <Navigate to='/dashboard' replace />
  }
  else {
    return <Outlet />
  }
}

function ProtectedRoute({ isAuthenticated }) {
  if (isAuthenticated) {
    return <Outlet />
  }
  else {
    return <Navigate to='/login' replace />
  }
}

export default App;
