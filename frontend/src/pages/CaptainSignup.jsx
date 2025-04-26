import React, { useState } from 'react';
import { ViewIcon,  ViewOffIcon} from "hugeicons-react";
import { Link } from "react-router-dom";

function CaptainSignup(props) {
    const [showPassword, setShowPassword] = useState(false);
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [captainData, setCaptainData] = useState({});

    // Function to handle show / hide password
    const handleShowPassword = () => {
        setShowPassword(!showPassword);
    }

    const handleSubmitForm = (e) => {
        e.preventDefault();  // preventing default submit behaviour

        setCaptainData({
            fullName: firstName + " " + lastName,
            email: email,
            password: password
        })

        // Cleanup
        setFirstName('');
        setLastName('')
        setEmail('')
        setPassword('')

        console.log(captainData);
    }

    return (
        <div className={"px-5 h-screen flex flex-col justify-between"}>
            <div>
                <h1 className={"text-xl text-center font-bold"}>Create your captain account</h1>

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
                        className={"mt-3 w-full py-3 rounded-xl bg-primary text-white"}
                    >
                        Sign up
                    </button>
                </form>

                {/*  Quick Navigation button -> Redirects to Signup  */}
                <Link to={'/captain/login'}>
                    <p className={"mt-5 text-center"}>Already have a captain account ? <span
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

export default CaptainSignup;