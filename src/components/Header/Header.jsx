import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import instance from '../../instance'

const Header = ({ Login, setLoggedIn }) => {
  const [isLogin, setLogin] = useState(false)

  useEffect(() => {
    setLogin(Login);
  }, [setLoggedIn])

  const logout = async (e) => {
    e.preventDefault();
    try {
      const response = await instance.post(`/api/v1/user/logout`);
      setLoggedIn();
    } catch (error) {
      if (error.response) {
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
          isLogin ? (
            "Welcome to User"
          ) : (
            "Task Board"
          )
        }
      </div>

      <div >
        {
          isLogin ? (
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
