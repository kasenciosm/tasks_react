import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Tasks from './pages/Tasks'
import TasksList from './pages/TasksList'
import TasksForm from './pages/TasksForm'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* <Route path='/' element={<Tasks />} /> */}
        <Route path='/' element={<TasksList />} />
        <Route path='/tasks/form' element={<TasksForm />} />
        <Route path='/tasks/:id/edit' element={<TasksForm />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App