import React from 'react';
import { Link } from "react-router-dom";

function Landing() {
    return (
        // Background image is set with the outermost div
        <div className={"h-screen flex flex-col justify-between bg-[url('/cover.jpg')] bg-no-repeat bg-cover"}>
            {/*  Floating Logo  */}
            <img src="/logo.png" alt="uber_logo" className={"ml-6 mt-8 h-7 w-fit"}/>

            {/* Get Started container */}
            <div className={"h-[150px] flex flex-col justify-between w-full px-4 py-6 rounded-t-3xl bg-white shadow-intense"}>
                {/*  Title  */}
                <div className={"flex space-x-1.5 lg:space-x-2 items-center justify-center"}>
                    <h3 className={"text-xl font-medium"}>Get started with</h3>
                    <span>
                        <img src="/logo.png" alt="uber_logo" className={"h-3.5 w-fit"}/>
                    </span>
                    <h3 className={"text-xl font-medium"}>Clone</h3>
                </div>

                {/*  Continue button -> Redirects to the user signup page */}
                <Link to={'/user/signup'}>
                    <button type="submit" className={"w-full py-3 rounded-2xl text-lg bg-primary text-white"}>Continue
                    </button>
                </Link>
            </div>
        </div>
    );
}

export default Landing;