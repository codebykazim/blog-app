"use client"

import { useDispatch } from "react-redux"
import authService from "../../appwrite/auth"
import { logout } from "../../store/authSlice"

function LogoutButton({ className = "" }) {
  const dispatch = useDispatch()

  const logoutHandler = () => {
    authService
      .logout()
      .then(() => {
        dispatch(logout())
      })
      .catch((error) => console.log(error))
  }

  return (
    <button
      onClick={logoutHandler}
      className={`className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-green-600 border border-transparent rounded-lg shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors duration-200" ${className}`}
    >
      Logout
    </button>
  )
}

export default LogoutButton
