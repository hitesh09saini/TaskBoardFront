import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import './App.css';

import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import Signin from './components/Signin/Signin';
import Login from './components/Login/Login';
import Main from './components/Main/Main';
import Loader from './components/Loader/Loader';

const PrivateRoute = () => {
  const token = localStorage.getItem('token');
  return token ? <Outlet /> : <Navigate to="/login" replace />;
};

const PublicRoute = () => {
  const token = localStorage.getItem('token');
  return !token ? <Outlet /> : <Navigate to="/" replace />;
};

function App() {
  const [isLoggedIn, setLoggedIn] = useState(() => !!localStorage.getItem('token'));
  const [loading, setLoading] = useState(false);

  return (
    <React.StrictMode>
      <DndProvider backend={HTML5Backend}>
        <Router>
          <div className="flex flex-col min-h-screen bg-gray-50">
            <Header isLoggedIn={isLoggedIn} setLoggedIn={setLoggedIn} />
            <main className="flex-grow container mx-auto p-4">
              <Routes>
                {/* Public routes */}
                <Route element={<PublicRoute />}>
                  <Route path="/signin" element={<Signin loader={setLoading} />} />
                  <Route path="/login" element={<Login loader={setLoading} />} />
                </Route>

                {/* Private routes */}
                <Route element={<PrivateRoute />}>
                  <Route path="/" element={<Main loader={setLoading} />} />
                </Route>

                {/* Catch-all: redirect unknown paths */}
                <Route path="*" element={<Navigate to={isLoggedIn ? "/" : "/login"} replace />} />
              </Routes>
            </main>
            <Footer />
            {loading && <Loader />}
          </div>
        </Router>
      </DndProvider>
    </React.StrictMode>
  );
}

export default App;
