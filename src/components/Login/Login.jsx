import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import instance from '../../instance.js';

const Login = ({ loader, login }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState(null); // New state for login error

  const handleTogglePassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    loader(true)
    try {
      const response = await instance.post(`/api/v1/user/login`, {
        email,
        password,
      });
      loader(false)
      login();
    } catch (error) {
      loader(false)
      if (error.response) {
        console.log("Server Error:", error.response.data);
        console.log("Status Code:", error.response.status);
        setLoginError("Invalid email or password"); // Set the login error message
      } else if (error.request) {
        console.log("No response received");
      } else {
        console.log("Error:", error.message);
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[87vh]">
      <div className="bg-gray-200 p-8 shadow-md rounded-md w-96">
        <h2 className="text-2xl font-semibold mb-6 flex justify-between">
          <div>Login</div>
        </h2>
        <form>
          <div className={`mb-4 ${loginError ? 'border-red-500' : ''}`}>
            <label htmlFor="email" className="block text-sm font-medium text-gray-600">
              Email
            </label>
            <input
              autoComplete="email"
              type="email"
              id="email"
              name="email"
              className={`mt-1 p-2 w-full border rounded-md ${loginError ? 'border-red-500' : ''}`}
              placeholder="Your email"
              required
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setLoginError(null); // Clear login error when email changes
              }}
            />
          </div>
          <div className={`mb-4 ${loginError ? 'border-red-500' : ''}`}>
            <label htmlFor="password" className="block text-sm font-medium text-gray-600">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                name="password"
                className={`mt-1 p-2 w-full border rounded-md pr-10 ${loginError ? 'border-red-500' : ''}`}
                placeholder="Your password"
                required
                autoComplete="current-password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setLoginError(null); // Clear login error when password changes
                }}
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                onClick={handleTogglePassword}
              >
                {showPassword ? 'Hide' : 'Show'}
              </button>
            </div>
          </div>
          <button
            onClick={handleSubmit}
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
          >
            Login
          </button>
          {loginError && (
            <p className="p-2 text-red-500">{loginError}</p>
          )}
          <p className="p-2 text-blue-600 active:text-red-400 hover:text-blue-300"><Link to="/" >Create your account</Link> </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
