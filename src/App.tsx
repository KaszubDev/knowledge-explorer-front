import './App.css'
import { Route, Routes } from 'react-router-dom'
import SearchDetail from './pages/SearchDetail'
import Homepage from './pages/Homepage'

function App() {

  return (
    <>
      <Routes>
        <Route path='/' element={<Homepage/>}/>
        <Route path='/searchDetail' element={<SearchDetail/>}/>
      </Routes>
    </>
  )
}

export default App
