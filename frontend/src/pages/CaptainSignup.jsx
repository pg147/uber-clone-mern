// React imports
import React, { useContext, useState } from 'react';

// React-Router-DOM
import { Link, useNavigate } from "react-router-dom";

// React toaster
import toast from "react-hot-toast";

// Context API
import { captainDataContext } from "../context/captainContext.jsx";

// Axios
import { axiosInstance } from "../libs/axios.js";

// Icon Libraries
import { ViewIcon, ViewOffIcon } from "hugeicons-react";
import { LuLoaderCircle } from "react-icons/lu";

// Options for Captain's vehicle
const vehicleTypeOptions = [
    {
        type: 'Car',
        value: 'car'
    },
    {
        type: 'Motorcycle',
        value: 'motorcycle'
    },
    {
        type: 'Auto',
        value: 'auto'
    },
]

function CaptainSignup() {
    const [tabIndex, setTabIndex] = useState(1);
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    // Captain personal details states
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    // Captain vehicle details states
    const [vehicleColor, setVehicleColor] = useState("");
    const [vehicleType, setVehicleType] = useState("");
    const [vehicleCapacity, setVehicleCapacity] = useState(0);
    const [vehicleNumberPlate, setVehicleNumberPlate] = useState("");

    const navigate = useNavigate();

    const { captain, setCaptain } = useContext(captainDataContext);

    // Function to handle show / hide password
    const handleShowPassword = () => {
        setShowPassword(!showPassword);
    }

    // Function to handle tab index
    const handleTabIndex = (index) => {
        if (index > 0 && index < 3) {
            setTabIndex(index);
        }
    }

    const handleSubmitForm = async (e) => {
        e.preventDefault();  // preventing default submit behaviour

        const newCaptain = {
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: password,
            color: vehicleColor,
            numberPlate: vehicleNumberPlate,
            vehicleType,
            capacity: vehicleCapacity
        }

        try {
            setLoading(true);

            const response = await axiosInstance.post('/captains/create', newCaptain);
            const responseData = response.data;

            if (responseData && responseData.success) {
                localStorage.setItem('cToken', responseData.data.token);

                setTimeout(() => {
                    setCaptain(responseData.data.captain);

                    navigate('/captain/home');

                    // Cleanup
                    setFirstName('');
                    setLastName('')
                    setEmail('')
                    setPassword('')
                    setVehicleCapacity(0);
                    setVehicleType('');
                    setVehicleColor('');
                    setVehicleNumberPlate('');

                    setLoading(false);
                }, 3000);
            }
        } catch (error) {
            setLoading(false);
            console.log("Error logging captain in : ", error);
            return toast.error(error.message);
        }
    }

    return (
        <div className={"px-5 h-screen flex flex-col justify-between"}>
            <div>
                <h1 className={"text-xl text-center font-bold"}>Create your captain account</h1>

                {/* Tab Controls */}
                <div className={"flex items-center space-x-2 my-4"}>
                    <div onClick={() => handleTabIndex(1)}
                         className={`h-1 w-full rounded-full ${tabIndex === 1 ? "bg-primary" : "bg-input"}`}>

                    </div>
                    <div onClick={() => handleTabIndex(2)}
                         className={`h-1 w-full rounded-full ${tabIndex === 2 ? "bg-primary" : "bg-input"}`}>

                    </div>
                </div>

                <form onSubmit={(e) => handleSubmitForm(e)} className={"mt-6"}>
                    {/* Tab 1 - Captain Personal Details */}
                    {tabIndex === 1 &&
                        <div>
                            <div className={"flex flex-col space-y-5"}>
                                {/* Full name */}
                                <div className={"w-full flex flex-col space-y-2"}>
                                    <label htmlFor="fullName">What's your name ?</label>
                                    <div id={"fullName"} className={"flex w-full items-center space-x-2.5"}>
                                        <input
                                            type="text"
                                            name={"firstName"}
                                            value={firstName}
                                            onChange={(e) => setFirstName(e.target.value)}
                                            placeholder={"First name"}
                                            className={"h-12 px-4 w-full bg-input rounded-xl"}
                                        />

                                        <input
                                            type="text"
                                            name={"lastName"}
                                            value={lastName}
                                            onChange={(e) => setLastName(e.target.value)}
                                            placeholder={"Last name"}
                                            className={"h-12 px-4 w-full bg-input rounded-xl"}
                                        />
                                    </div>
                                </div>

                                {/* Email address */}
                                <div className={"w-full flex flex-col space-y-2"}>
                                    <label htmlFor="email">What's your email address?</label>
                                    <div id={"email"}>
                                        <input
                                            type="email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            placeholder={"e.g. doejohn@gmail.com"}
                                            className={"h-12 px-4 w-full bg-input rounded-xl"}
                                        />
                                    </div>
                                </div>

                                {/* Password */}
                                <div className={"w-full flex flex-col space-y-2"}>
                                    <label htmlFor="contact">Set password</label>
                                    <div id={"contact"} className={"relative"}>
                                        <input
                                            type={showPassword ? "text" : "password"}
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            placeholder={"Your password"}
                                            className={"h-12 px-4 w-full bg-input rounded-xl"}
                                        />

                                        {showPassword ? <ViewOffIcon
                                            onClick={handleShowPassword}
                                            className={"absolute inset-y-0 right-0 mx-5 size-5 my-auto"}
                                        /> : <ViewIcon
                                            onClick={handleShowPassword}
                                            className={"absolute inset-y-0 right-0 mx-5 size-5 my-auto"}
                                        />}
                                    </div>
                                </div>
                            </div>

                            {/*  Continue Button  */}
                            <button
                                onClick={() => handleTabIndex(2)}
                                className={"mt-3 w-full py-3 rounded-xl bg-primary text-white"}
                            >
                                Proceed
                            </button>
                        </div>
                    }

                    {/* Tab 2 - Captain Vehicle Details */}
                    {tabIndex === 2 &&
                        <div>
                            <div className={"flex flex-col space-y-5"}>
                                {/* Vehicle Color & Type */}
                                <div className={"flex w-full items-center space-x-2.5"}>
                                    <div className={"w-full flex flex-col space-y-2"}>
                                        <label htmlFor="vehicleColor">Vehicle color ?</label>
                                        <input
                                            type="text"
                                            name={"vehicleColor"}
                                            value={vehicleColor}
                                            onChange={(e) => setVehicleColor(e.target.value)}
                                            placeholder={"e.g. white, red"}
                                            className={"h-12 px-4 w-full bg-input rounded-xl"}
                                        />
                                    </div>

                                    <div className={"w-full flex flex-col space-y-2"}>
                                        <label htmlFor="vehicleColor">Vehicle type ?</label>
                                        <select
                                            name={"vehicleType"}
                                            value={vehicleType}
                                            onChange={(e) => setVehicleType(e.target.value)}
                                            className={"h-12 px-4 w-full bg-input rounded-xl"}
                                        >
                                            {vehicleTypeOptions.map((option) => (
                                                <option key={option.type} value={option.value}>
                                                    {option.type}
                                                </option>
                                            ))}
                                        < /select>
                                    </div>
                                </div>

                                {/* Vehicle Number Plate & Capacity */}
                                <div className={"flex w-full items-center space-x-2.5"}>
                                    <div className={"w-full flex flex-col space-y-2"}>
                                        <label htmlFor="vehicleColor">Capacity</label>
                                        <input
                                            type="number"
                                            name={"vehicleCapacity"}
                                            value={vehicleCapacity}
                                            onChange={(e) => setVehicleCapacity(e.target.value)}
                                            placeholder={"e.g. 2, 3, 5"}
                                            className={"h-12 px-4 w-full bg-input rounded-xl"}
                                        />
                                    </div>

                                    <div className={"w-full flex flex-col space-y-2"}>
                                        <label htmlFor="vehicleColor">Number Plate</label>
                                        <input
                                            type="text"
                                            name={"vehicleNumberPlate"}
                                            value={vehicleNumberPlate}
                                            onChange={(e) => setVehicleNumberPlate(e.target.value)}
                                            placeholder={"e.g. MH 36 P 8678"}
                                            className={"h-12 px-4 w-full bg-input rounded-xl"}
                                        />
                                    </div>
                                </div>
                            </div>

                            {/*  Continue Button  */}
                            <button
                                type="submit"
                                disabled={loading}
                                className={"mt-3 w-full py-3 rounded-xl bg-primary text-white"}
                            >
                                {loading ? <span className={"flex items-center justify-center gap-x-3 w-fit mx-auto"}>
                                    <LuLoaderCircle className={"size-5 animate-spin"}/>
                                    Signing up...
                                </span> : "Sign up"}
                            </button>
                        </div>
                    }
                </form>

                {/*  Quick Navigation button -> Redirects to Signup  */}
                <Link to={'/captain/login'}>
                    <p className={"mt-5 text-center"}>Already have a captain account ? <span
                        className={"font-semibold text-secondary"}>Login here</span>
                    </p>
                </Link>
            </div>

            <Link to={'/user/signup'}>
                <button className={"mt-2.5 w-full py-3 rounded-xl bg-secondary text-white border-2 border-input"}>
                    Sign up as User
                </button>
            </Link>
        </div>
    );
}

export default CaptainSignup;