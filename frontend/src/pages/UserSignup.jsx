import React from 'react';
import { Link } from "react-router-dom";

function UserSignup() {
    return (
        <div className={"px-5"}>
            <h1 className={"text-xl text-center font-bold"}>Create your account</h1>

            <div className={"mt-6"}>
                <div className={"w-full flex flex-col space-y-2"}>
                    <label htmlFor="contact">Contact number</label>
                    <div id={"contact"}>
                        <input
                            type="tel"
                            placeholder={"e.g. 797181910"}
                            className={"h-12 px-4 w-full bg-input rounded-xl"}
                        />
                    </div>
                </div>

                {/*  Continue button -> Redirects to */}
                <Link to={'/user/signup'}>
                    <button type="submit" className={"mt-2.5 w-full py-3 rounded-xl bg-primary text-white"}>Continue
                    </button>
                </Link>
            </div>

            <div className={"mt-5 h-fit w-full flex items-center space-x-6"}>
                <hr className={"w-full rounded-full"} />
                <p className={"text-sm"}>Or</p>
                <hr className={"w-full rounded-full"} />
            </div>
        </div>
    );
}

export default UserSignup;