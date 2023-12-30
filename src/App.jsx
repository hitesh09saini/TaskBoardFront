import React, { useEffect, useState } from 'react';
import './App.css';
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Signin from './components/Signin/Signin';
import Login from './components/Login/Login';
import Main from './components/Main/Main'
import instance from './instance';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import Loader from './components/Loader/Loader'

function App() {

  const [isLoggedIn, setLoggedIn] = useState(false)
  const [loader, setLoader] = useState(false)
  const setLoading = (val) => {
     setLoader(val);
  }

  const handleLogin = async () => {
    setLoading(true)
    try {
      const res = await instance.get('/api/v1/list');
      setLoggedIn(true);
    } catch (error) {
      setLoggedIn(false)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    handleLogin().catch(error => {
      console.error('Login failed:', error);
    });
  }, []);


  return (
    <React.StrictMode>
      <DndProvider backend={HTML5Backend}>
        <Router>
          <div className='relative'>

            <Header Login={isLoggedIn} setLoggedIn={handleLogin} />
            {!isLoggedIn ?
              (
                <Routes>
                  <Route path="/" element={<Signin loader={setLoading} login={handleLogin} />} />
                  <Route path="/login" element={<Login loader={setLoading} login={handleLogin} />} />
                </Routes>
              ) : (
                <Main loader={setLoading} />
              )
            }

            < Footer />

            {
              loader ? (
                <Loader />
              ) : (
                ""
              )
            }

          </div>
        </Router>
      </DndProvider>
    </React.StrictMode>
  );
}

export default App;
