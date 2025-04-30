// React imports
import React, { useEffect, useState } from 'react';

// React-Router-DOM
import { useNavigate } from "react-router-dom";

// Axios
import { axiosInstance } from "../libs/axios.js";

// Icon library
import { LuCircleCheck, LuLoaderCircle } from "react-icons/lu";

function CaptainLogout() {
    const cToken = localStorage.getItem('cToken');  // fetching captain token
    const navigate = useNavigate();

    // Loading states
    const [loading, setLoading] = useState(false);

    // Function for logging out captain
    const logoutCaptain = async () => {
        try {
            setLoading(true);

            const response = await axiosInstance.post('/captains/logout', {
                headers: {
                    authorization: `Bearer ${cToken}`
                }
            });

            const responseData = response.data;

            if (responseData && responseData.success) {
                // Simulating process via timeout
                setTimeout(() => {
                    localStorage.removeItem('cToken');

                    navigate('/');

                    setLoading(false);
                }, 3000)
            }
        } catch (error) {
            console.log("Error logging out captain : ", error.message);
        }
    }

    useEffect(() => {
        logoutCaptain();
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

export default CaptainLogout;