// React imports
import React, { useContext, useState } from 'react';

// React router dom
import { Link, useNavigate}  from "react-router-dom";

// Context API
import { userDataContext } from "../context/userContext.jsx";

// Axios Instance
import { axiosInstance } from "../libs/axios.js";

// Icon Libraries
import {Loading02Icon, ViewIcon, ViewOffIcon} from "hugeicons-react";
import {LuLoaderCircle} from "react-icons/lu";

function UserSignup() {
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();  // for navigating

    // Context for fetching user
    const {user, setUser} = useContext(userDataContext);

    // Function to handle show / hide password
    const handleShowPassword = () => {
        setShowPassword(!showPassword);
    }

    // Function to handle submit form
    const handleSubmitForm = async (e) => {
        e.preventDefault();  // preventing default submit behaviour

        const newUser = {
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: password
        };

        try {
            setLoading(true);

            const response = await axiosInstance.post('/users/create', newUser);

            if (response.data && response.success) {
                setUser(response.data.user);

                // Cleanup
                setFirstName('');
                setLastName('')
                setEmail('')
                setPassword('');

                navigate('/home');
            }
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className={"px-5 h-screen flex flex-col justify-between"}>
            <div>
                <h1 className={"text-xl text-center font-bold"}>Create your account</h1>

                <form onSubmit={(e) => handleSubmitForm(e)} className={"mt-6"}>
                    {/* Input Fields */}
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
                        type="submit"
                        disabled={loading}
                        className={"mt-3 w-full py-3 rounded-xl bg-primary text-white"}
                    >
                        {loading ? <span className={"flex items-center justify-center gap-x-3 w-fit mx-auto"}>
                            <LuLoaderCircle className={"size-5 animate-spin"}/>
                            Signing up...
                        </span> : "Sign up"}
                    </button>
                </form>

                {/*  Quick Navigation button -> Redirects to Signup  */}
                <Link to={'/user/login'}>
                    <p className={"mt-5 text-center"}>Already have an account yet ? <span
                        className={"font-semibold text-secondary"}>Login here</span>
                    </p>
                </Link>
            </div>

            <Link to={'/captain/signup'}>
                <button className={"mt-2.5 w-full py-3 rounded-xl bg-secondary text-white border-2 border-input"}>
                    Sign up as Captain
                </button>
            </Link>
        </div>
    );
}

export default UserSignup;