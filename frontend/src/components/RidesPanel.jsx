// React imports
import React, { useContext, useState } from 'react';

// Constants
import { rides } from "../constants/vehicles.js";

// Context API
import { rideDataContext } from "../context/rideContext.jsx";

// Icon libraries
import { UserMultipleIcon } from "hugeicons-react";

function RidesPanel() {
    const [selectedRide, setSelectedRide] = useState({});

    // Ride context
    const { rideType, setRideType } = useContext(rideDataContext);

    // Function to handle selected ride with index
    const handleSelectedRide = (index) => {
        const selectedOption = document.getElementById(rides[index].name);
        selectedOption.scrollIntoView({ behavior: "smooth", block: "center" });

        setSelectedRide(rides[index]);
        setRideType(rides[index].name);
    }

    return (
        <div className={"flex flex-col space-y-1 px-5 scroll-smooth"}>
            {rides.map((ride, index) => (
                <div
                    id={ride.name}
                    key={ride.name}
                    onClick={() => handleSelectedRide(index)}
                    className={`h-fit w-full flex space-x-4 justify-end transition-[padding] duration-300 ease-in-out ${(selectedRide.name || rideType) === ride.name ? 'border-2 border-primary rounded-2xl px-4 py-4' : 'px-2 py-4'}`}
                >
                    {/* Ride Image & Details */}
                    <div className={"flex items-center space-x-8 w-full"}>
                        {/* Ride image */}
                        <div className={"size-fit"}>
                            <img src={ride.image} alt={ride.name} className={"aspect-square size-12 object-cover"}/>
                        </div>

                        {/* Ride details */}
                        <div className={"flex flex-col space-y-1"}>
                            {/* Ride information */}
                            <div className={"flex items-center space-x-4"}>
                                <h1 className={"text-xl font-semibold"}>{ride.name}</h1>
                                <div className={"flex items-center space-x-2"}>
                                    <UserMultipleIcon className={"size-5"} fill={"#000000"} />
                                    <p>{ride.capacity}</p>
                                </div>
                            </div>

                            {/* Ride timings */}
                            <div className={"flex items-center space-x-2 text-sm font-semibold text-[#6A6A6A]"}>
                                <h4>2 mins</h4>
                                <div className={"size-2 rounded-full bg-input"}>

                                </div>
                                <h4>17:34</h4>
                            </div>

                        </div>
                    </div>

                    {/* Ride pricing */}
                    <div className={""}>
                        <h2 className={"text-lg font-bold"}>₹194.20</h2>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default RidesPanel;