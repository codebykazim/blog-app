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
      className={`px-5 py-2 bg-purple-500 text-white rounded-full font-medium
      transition-all duration-200 hover:bg-purple-600 active:scale-[0.98]
      disabled:opacity-50 disabled:cursor-not-allowed
      focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-offset-2 ${className}`}
    >
      Logout
    </button>
  )
}

export default LogoutButton