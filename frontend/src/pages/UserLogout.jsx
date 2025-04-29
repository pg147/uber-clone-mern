// React imports
import React, { useEffect, useState } from 'react';

// React-Router-DOM
import { useNavigate } from "react-router-dom";

// Axios
import { axiosInstance } from "../libs/axios.js";

// Icon library
import { LuCircleCheck, LuLoaderCircle } from "react-icons/lu";

function UserLogout() {
    const token = localStorage.getItem('token');  // fetching token
    const navigate = useNavigate();

    // Loading states
    const [loading, setLoading] = useState(false);

    // Function for logging out
    const logout = async () => {
        try {
            setLoading(true);

            const response = await axiosInstance.get('/users/logout', {
                headers: {
                    Authorization: `Bearer ${token}`  // passing token via headers (authorization)
                }
            });

            const responseData = response.data;

            if (responseData && responseData.success) {
                // Simulating process via timeout
                setTimeout(() => {
                    localStorage.removeItem('token');  // removing token from localStorage

                    navigate('/');

                    setLoading(false);
                }, 3000);
            }
        } catch (error) {
            console.log("Error logging out: ", error);
        }
    }

    useEffect(() => {
        logout();
    }, []);

    return (
        <div className={'h-screen w-full flex items-center justify-center'}>
            {loading ? (
                <div className={'flex items-center space-x-3'}>
                    <LuLoaderCircle className={"size-5 animate-spin text-primary"}/>
                    <span className={'font-semibold'}>Logging out</span>
                </div>
            ) : (
                <div className={'flex items-center space-x-3'}>
                    <LuCircleCheck className={"size-5 animate-spin text-white"} fill={'#000000'} />
                    <span className={'font-semibold'}>You have successfully logged out!</span>
                </div>
            )}
        </div>
    );
}

export default UserLogout;