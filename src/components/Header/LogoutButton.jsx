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
      className={`px-4 py-2 bg-[#335145] text-white rounded-lg font-medium
      transition-all duration-200 hover:bg-[#828C51] active:scale-[0.98]
      disabled:opacity-50 disabled:cursor-not-allowed
      focus:outline-none focus:ring-2 focus:ring-[#828C51] ${className}`}
    >
      Logout
    </button>
  )
}

export default LogoutButton