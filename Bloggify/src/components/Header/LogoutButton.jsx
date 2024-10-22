import React from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import authService from '../../appwrite/auth.js';
import { logout } from "../../store/authSlice.js";

function LogoutButton() {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const logoutHandler = () => {
        authService.logout()
            .then(() => {
                dispatch(logout())
                navigate('/login')
            })
            .catch((error) => console.log(error))
    }
    return (
        <button 
        onClick={logoutHandler}
        className='inline-block sm:px-5 px-5 py-2 duration-200 hover:bg-blue-100 rounded-full'>
                Logout
        </button>
    )

}

export default LogoutButton