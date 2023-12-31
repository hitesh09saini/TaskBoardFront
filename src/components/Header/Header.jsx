import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import instance from '../../instance'

const Header = ({ isLoggedIn, setLoggedIn }) => {


  const logout = async (e) => {
    e.preventDefault();
    try {
      const response = await instance.post(`/api/v1/user/logout`);
      setLoggedIn(false);
    } catch (error) {
      if (error.response) {
        setLoggedIn(true);
        console.log("Server Error:", error.response.data);
        console.log("Status Code:", error.response.status);
      } else if (error.request) {
        console.log("No response received");
      } else {
        console.log("Error:", error.message);
      }
    }
  }

  return (
    <div className='flex justify-between items-center px-4 bg-gray-400 w-full h-[40px]'>
      <div>
        {
          isLoggedIn ? (
            "Welcome to User"
          ) : (
            "Task Board"
          )
        }
      </div>

      <div >
        {
          isLoggedIn ? (
            <button className='active:bg-gray-500' onClick={logout}>Logout</button>
          ) : (
            <Link to='/login'>Login</Link>
          )
        }
      </div>

    </div>
  )
}

export default Header
