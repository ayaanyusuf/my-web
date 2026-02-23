import './App.css';
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import Signup from './Signup';
import Login from './Login';
import Dashboard from './Dashboard';
import DeleteUser from './DeleteUser';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/signup' element={<Signup />} />
        <Route path='/login' element={<Login />} />
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/delete' element={<DeleteUser />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
