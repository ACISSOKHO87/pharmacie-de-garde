import React, { useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logoutUser } from '../../slices/userSlice'



const Logout = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    useEffect(() => {
        window.localStorage.removeItem("pharmaGard-token");
        dispatch(logoutUser());
        navigate("/");
    },[]);

    return (<main>
        <h1>Logout</h1>
    </main>)
}

export default Logout