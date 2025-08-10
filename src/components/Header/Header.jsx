import React from 'react';
import { Link } from 'react-router-dom';
import instance from '../../instance';

const Header = ({ isLoggedIn, setLoggedIn }) => {
  const logout = async (e) => {
    e.preventDefault();
    try {
      const res = await instance.post('/api/v1/user/logout');
      localStorage.clear();
      setLoggedIn(false);
    } catch (error) {
      console.error('Logout Error:', error.message);
      setLoggedIn(true);
    }
  };

  return (
    <header className="bg-[#581845] text-white px-6 py-3 flex justify-between items-center shadow-md sticky top-0 z-50">
      <div className="text-2xl font-bold tracking-wide">

        <Link to="/" aria-label="Task Board Home">
          Task Board
        </Link>
      </div>

      <nav>
        {isLoggedIn ? (
          <button
            onClick={logout}
            className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-md transition"
            aria-label="Logout"
          >
            Logout
          </button>
        ) : (

          <Link
            to="/login"
            className="mr-4 hover:text-gray-300 transition"
            aria-label="Login"
          >
            Login
          </Link>

        )}
      </nav>
    </header>
  );
};

export default Header;
