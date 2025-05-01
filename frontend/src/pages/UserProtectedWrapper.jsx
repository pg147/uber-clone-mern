// React imports
import React, { useContext, useEffect, useState } from 'react';

// React-Router-DOM
import { useNavigate } from "react-router-dom";

// Axios
import { axiosInstance } from "../libs/axios.js";

// Context API
import { userDataContext } from "../context/userContext.jsx";

// Icons Libraries
import { LuLoaderCircle } from "react-icons/lu";

function UserProtectedWrapper({ children }) {
    const token = localStorage.getItem('token');  // fetching user token from localStorage
    const navigate = useNavigate();

    // Loading states
    const [loading, setLoading] = useState(false);

    const { setUser } = useContext(userDataContext);

    const fetchUserProfile = async () => {
        try {
            setLoading(true);

            const response = await axiosInstance.get('/users/profile', {
                headers: {
                    authorization: `Bearer ${token}`
                }
            });

            const responseData = response.data;

            if (responseData && responseData.success) {
                setUser(responseData.data.user);
                setLoading(false);
            }
        } catch (error) {
            console.log("Error loading user : ", error.message);
            localStorage.removeItem('token');
            setLoading(false);
            navigate('/user/login');
        }
    }

    useEffect(() => {
        if (!token) {
            navigate('/user/login');
        } else fetchUserProfile();
    }, [token]);

    if (loading) {
        return (
            <div className={'h-screen flex w-full items-center justify-center'}>
                <div className={'flex items-center space-x-2.5'}>
                    <LuLoaderCircle className={"size-8 animate-spin text-primary"}/>
                </div>
            </div>
        );
    } else return (
        <>
            {children}
        </>
    );
}

export default UserProtectedWrapper;