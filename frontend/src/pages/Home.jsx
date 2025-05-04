// React imports
import React, { useContext, useState } from 'react';

// Components
import { LocationSearchPanel, RidesPanel } from "../components";

// Context API
import { rideDataContext } from "../context/rideContext.jsx";

// Icon libraries
import { LuMoveLeft } from "react-icons/lu";

function Home() {
    const [modalOpen, setModalOpen] = useState(false);
    const [pickup, setPickup] = useState("");
    const [drop, setDrop] = useState("");
    const [focusField, setFocusField] = useState("");

    // Ride context
    const { rideType } = useContext(rideDataContext);

    // Function to handle navigation icon click
    const handleNavigationClick = () => setModalOpen(false);

    // Function to handle modal state via input click
    const handleInputClick = (focusField) => {
        setModalOpen(true);
        setFocusField(focusField);
    }

    // Function to handle form submit
    const handleSubmitForm = (e) => {
        e.preventDefault();
    }

    return (
        <div className={"relative h-screen"}>
            <img src="/logo.png" alt="uber_logo" className={'h-5 absolute left-5 top-5'}/>

            {/* Temporary image container simulating MAP */}
            <div className={"h-screen w-screen"}>
                <img
                    className={"h-full w-full object-cover"}
                    src="https://100map.net/img/en/letter_portrait_tokyo.png"
                    alt="map"
                />
            </div>

            <div
                className={`absolute w-full flex flex-col space-y-2 bg-white shadow-intense ${modalOpen ? 'h-screen top-0' : 'h-fit bottom-0 rounded-t-4xl'}`}>
                {/* Pickup and Drop location container */}
                <div className={`h-fit flex flex-col p-5 ${modalOpen ? 'space-y-5' : 'space-y-4'}`}>
                    {/* Conditional Heading & conditional Navigation icon container */}
                    {(!pickup.length > 0 || !drop.length > 0 || modalOpen) &&
                        <div className={"flex items-center justify-between"}>
                            {/* Icon appears only when the Modal is open */}
                            {modalOpen && <div onClick={handleNavigationClick}>
                                <LuMoveLeft className={"size-6 text-primary"} strokeWidth={2}/>
                            </div>}

                            {/* Title */}
                            <h3 className={"text-xl font-semibold"}>{modalOpen ? `Choose your ${focusField}` : "Find your trip"}</h3>

                            {/* This hidden div acts as a placeholder to adjust the title position at the middle */}
                            <div className={"opacity-0 pointer-events-none"}>
                                <LuMoveLeft className={"size-6 text-primary"} strokeWidth={2}/>
                            </div>
                        </div>}

                    {/* Location input form */}
                    <form onSubmit={(e) => handleSubmitForm(e)}>
                        <div className={"flex flex-col justify-end"}>
                            {/* Input fields */}
                            <div className={"flex items-center space-x-4 w-full"}>
                                {/* SVG Container */}
                                <div className={"flex flex-col space-y-2 items-center"}>
                                    {/* Pickup Location SVG (Self-created) */}
                                    <div className={"size-fit rounded-full p-0.5 border-2 border-primary"}>
                                        <div className={"size-2.5 rounded-full bg-primary"}>

                                        </div>
                                    </div>

                                    {/* Separator */}
                                    <div className={"h-7 w-0.5 rounded-full bg-input"}>

                                    </div>

                                    {/* Drop Location SVG (Self-created) */}
                                    <div className={"size-fit rounded-sm p-0.5 border-2 border-primary"}>
                                        <div className={"size-2.5 rounded-xs bg-primary"}>

                                        </div>
                                    </div>
                                </div>

                                {/* Fields */}
                                <div className={"flex flex-col space-y-3.5 items-center w-full"}>
                                    {/* Pickup Location */}
                                    <input
                                        name="pickup"
                                        value={pickup}
                                        type="text"
                                        onFocus={() => handleInputClick("pickup")}
                                        onChange={(e) => setPickup(e.target.value)}
                                        placeholder={"Choose your pick up point"}
                                        className={"px-4 h-12 w-full rounded-2xl bg-input"}
                                    />

                                    {/* Drop location */}
                                    <input
                                        name="drop"
                                        value={drop}
                                        type="text"
                                        onFocus={() => handleInputClick("drop")}
                                        onChange={(e) => setDrop(e.target.value)}
                                        placeholder={"Where to ?"}
                                        className={"px-4 h-12 w-full rounded-2xl bg-input"}
                                    />
                                </div>
                            </div>
                        </div>
                    </form>
                </div>

                {/*
                    Location listings container, visible only when
                    the input fields are clicked and modalOpen is true
                */}
                {modalOpen && <div className={"h-full bg-input/40 p-5 overflow-y-scroll scroll-smooth"}>
                    <LocationSearchPanel
                        value={focusField === 'pickup' ? pickup : drop}
                        setValue={focusField === 'pickup' ? setPickup : setDrop}
                        setModalOpen={setModalOpen}
                    />
                </div>}

                {/*
                    Ride options appear conditionally when both addresses are set
                    and the location list modal isn't open
                */}
                {(pickup.length > 0 && drop.length > 0 && !modalOpen) &&
                    <div className={"h-[200px] flex flex-col space-y-4"}>
                        {/* Heading */}
                        <h1 className={"text-xl font-semibold px-5"}>Choose your ride</h1>

                        {/* Ride options component */}
                        <div className={"h-[150px] overflow-y-scroll scroll-smooth"}>
                            <RidesPanel/>
                        </div>
                    </div>
                }

                {/*
                    Choose 'rideType' button appears when a ride is selected and
                    the location list modal isn't open
                */}
                {(rideType && !modalOpen) && <div className={"px-5"}>
                    <button
                        className={"my-3 w-full py-3 text-lg rounded-xl bg-primary text-white"}>Choose {rideType}</button>
                </div>}
            </div>
        </div>
    );
}

export default Home;