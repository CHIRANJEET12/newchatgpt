import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Dashboard from './components/Dashboard';
import { Login } from './components/Login';
import { SignIn } from './components/Sign';

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route exact path="/" element={<Home />} /> 
          <Route path="/dashboard" element={<Dashboard /> }></Route>
          <Route path="/login" element={<Login/>}></Route>
          <Route path="/signup" element={<SignIn/>}></Route>

        </Routes>
      </div>
    </Router>
  );
}

export default App;
