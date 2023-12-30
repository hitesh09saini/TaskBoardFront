import React, { useEffect, useState } from 'react';
import './App.css';
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Signin from './components/Signin/Signin';
import Login from './components/Login/Login';
import Main from './components/Main/Main'
import instance from './instance';

function App() {

  const [isLoggedIn, setLoggedIn] = useState(false)

  const handleLogin = async () => {
    try {
      const res = await instance.get('/api/v1/list');
      setLoggedIn(true);
    } catch (error) {
      setLoggedIn(false)
    }
  }

  useEffect(() => {
    handleLogin();
  })


  return (
    <Router>
      <Header Login={isLoggedIn} setLoggedIn={handleLogin} />
      {!isLoggedIn ?
        (
          <Routes>
            <Route path="/" element={<Signin login={handleLogin} />} />
            <Route path="/login" element={<Login login={handleLogin} />} />
          </Routes>
        ) : (
          <Main />
        )
      }

      < Footer />
    </Router>
  );
}

export default App;
