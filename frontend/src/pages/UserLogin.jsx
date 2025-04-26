import React, { useState } from 'react';
import { Link } from "react-router-dom";
import { ViewIcon, ViewOffIcon } from "hugeicons-react";

function UserLogin() {
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [userData, setUserData] = useState({});

    // Function to handle show / hide password
    const handleShowPassword = () => {
        setShowPassword(!showPassword);
    }

    const handleSubmitForm = (e) => {
        e.preventDefault();  // preventing default submit behaviour

        setUserData({
            email: email,
            password: password
        })

        // Cleanup
        setEmail('')
        setPassword('')

        console.log(userData);
    }

    return (
        <div className={"px-5 h-screen flex flex-col justify-between"}>
            <div>
                <h1 className={"text-xl text-center font-bold"}>Log into your account</h1>

                <form onSubmit={(e) => handleSubmitForm(e)} className={"mt-6"}>
                    {/* Input Fields */}
                    <div className={"flex flex-col space-y-5"}>
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
                            <label htmlFor="contact">Password</label>
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
                        className={"mt-3 w-full py-3 rounded-xl bg-primary text-white"}
                    >
                        Continue
                    </button>
                </form>

                {/*  Quick Navigation button -> Redirects to Signup  */}
                <Link to={'/user/signup'}>
                    <p className={"mt-5 text-center"}>Don't have an account yet ? <span
                        className={"font-semibold text-secondary"}>Signup here</span>
                    </p>
                </Link>
            </div>

            <Link to={'/captain/login'}>
                <button className={"mt-2.5 w-full py-3 rounded-xl bg-secondary text-white border-2 border-input"}>
                    Sign in as Captain
                </button>
            </Link>
        </div>
    );
}

export default UserLogin;