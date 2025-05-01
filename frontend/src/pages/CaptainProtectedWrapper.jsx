// React imports
import React, { useContext, useEffect, useState } from 'react';

// React-Router-DOM
import { useNavigate } from "react-router-dom";

// Axios
import { axiosInstance } from "../libs/axios.js";

// Context API
import { captainDataContext } from "../context/captainContext.jsx";

// Icons Libraries
import { LuLoaderCircle } from "react-icons/lu";

function CaptainProtectedWrapper({ children }) {
    const cToken = localStorage.getItem('cToken');  // fetching captain token from localStorage
    const navigate = useNavigate();

    // Loading states
    const [loading, setLoading] = useState(false);

    const { setCaptain } = useContext(captainDataContext);

    const fetchCaptainProfile = async () => {
        try {
            setLoading(true);

            const response = await axiosInstance.get('/captains/profile', {
                headers: {
                    authorization: `Bearer ${cToken}`
                }
            });

            const responseData = response.data;

            if (responseData && responseData.success) {
                setCaptain(responseData.data.captain);
                setLoading(false);
            }
        } catch (error) {
            console.log("Error loading captain : ", error.message);
            localStorage.removeItem('cToken');
            setLoading(false);
            navigate('/captain/login');
        }
    }

    useEffect(() => {
        if (!cToken) {
            navigate('/captain/login');
        } else fetchCaptainProfile();
    }, [cToken]);

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

export default CaptainProtectedWrapper;