import './App.css';
import { BrowserRouter, Routes, Route, Router } from 'react-router-dom';
import Signup from './Signup';
import Login from './Login';
import Dashboard from './Dashboard';
import { useState } from 'react';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/SignUp' element={<Signup/>}/>
        <Route path='/Login' element={<Login />}/>
        <Route path='/Dashboard' element={<Dashboard/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
