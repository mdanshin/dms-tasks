import { Routes, Route } from 'react-router-dom'
import MainForm from '../pages/MainForm/MainForm'
import AboutForm from '../pages/AboutForm/AboutForm'
import EditTaskForm from '../pages/EditTaskForm/EditTaskForm'

export const useRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<MainForm />} />
      <Route path="/:id" element={<EditTaskForm />} />
      <Route path="/About" element={<AboutForm />} />
    </Routes>
  )
}

export default useRoutes
