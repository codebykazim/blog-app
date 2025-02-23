import React from 'react'
import {useDispatch} from 'react-redux'
import authService from '../../appwrite/config'
import {logout} from '../../store/authSlice'

function LogoutButton() {
  const dispatch=useDispatch();
  const logoutHandler=()=>{
    authService.logout()
    .then(()=>{
      dispatch(logout())
    })
    .catch((error)=> console.log(error))
  }

  return (
    <div>
      <button>
        Logout
      </button>
    </div>
  )
}

export default LogoutButton