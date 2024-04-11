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
    <div className='flex justify-between items-center px-4 bg-[#581845] text-xl text-white w-full p-2'>
      <div className='Spotlight'>
        {
          isLoggedIn ? (
            <svg viewBox="0 0 74 14">
              <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                <g id="Artboard" transform="translate(-9.000000, -7.000000)">
                  <g id="Group-2" transform="translate(9.000000, 7.000000)">
                    <rect id="Rectangle" fill="#020202" x="0" y="0" width="74" height="14" rx="4"></rect>
                    <g id="Group" transform="translate(4.000000, 3.500000)" stroke-linecap="round" stroke-linejoin="round" stroke-width="2">
                      <path class="path" d="M62,6.5 L62,0.5 L64,0.5 C65.1045695,0.5 66,1.3954305 66,2.5 C66,3.6045695 65.1045695,4.5 64,4.5 L62,4.5 L62,4.5 L64,4.5 L66,6.5" id="r" stroke="#D8A7CD"></path>
                      <path class="path" d="M54,6.5 L54,2.5 C54,1.3954305 54.8954305,0.5 56,0.5 C57.1045695,0.5 58,1.3954305 58,2.5 L58,6.5 L58,6.5 L58,4.5 L54,4.5" id="a2" stroke="#FEB4BE"></path>
                      <polyline class="path" id="t" stroke="#FFA685" points="51 0.5 47 0.5 49 0.5 49 6.5"></polyline>
                      <polyline class="path" id="l" stroke="#FFD59E" points="42 0.5 42 6.5 45 6.5"></polyline>
                      <path class="path" d="M36,0.5 C37.1045695,0.5 38,1.3954305 38,2.5 L38,4.5 C38,5.6045695 37.1045695,6.5 36,6.5 C34.8954305,6.5 34,5.6045695 34,4.5 L34,2.5 C34,1.3954305 34.8954305,0.5 36,0.5 Z" id="o" stroke="#9BDACA"></path>
                      <polyline class="path" id="v" stroke="#D8A7CD" points="26 0.5 28 6.5 30 0.5"></polyline>
                      <path class="path" d="M18,6.5 L22,0.5" id="x2" stroke="#FEB4BE"></path>
                      <path class="path" d="M18,0.5 L22,6.5" id="x1" stroke="#FEB4BE"></path>
                      <path class="path" d="M10,6.5 L10,2.5 C10,1.3954305 10.8954305,0.5 12,0.5 C13.1045695,0.5 14,1.3954305 14,2.5 L14,6.5 L14,6.5 L14,4.5 L10,4.5" id="a" stroke="#FFA685"></path>
                      <polyline class="path" id="m" stroke="#FFD59E" transform="translate(3.000000, 3.500000) scale(-1, 1) translate(-3.000000, -3.500000) " points="6 6.5 6 0.5 3 3.5 3.66373598e-15 0.5 3.66373598e-15 6.5"></polyline>
                    </g>
                  </g>
                </g>
              </g>
            </svg>
          ) : (
            "Task Board"
          )
        }
      </div>

      <div >
        {
          isLoggedIn && (
            <button className='px-3 py-1 logout' onClick={logout}>Logout</button>
          )
        }
      </div>

    </div>
  )
}

export default Header
