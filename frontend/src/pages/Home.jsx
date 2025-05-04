// React imports
import React, { useState } from 'react';

// Components
import { LocationSearchPanel, RidesPanel } from "../components";

// Icon libraries
import { LuMoveLeft } from "react-icons/lu";

function Home() {
    const [modalOpen, setModalOpen] = useState(false);
    const [pickup, setPickup] = useState("");
    const [drop, setDrop] = useState("");
    const [focusField, setFocusField] = useState("");

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
            <img src="/logo.png" alt="uber_logo" className={'h-5 absolute left-5 top-3'}/>

            {/* Temporary image container simulating MAP */}
            <div className={"h-screen w-screen"}>
                <img
                    className={"h-full w-full object-cover"}
                    src="https://100map.net/img/en/letter_portrait_tokyo.png"
                    alt="map"
                />
            </div>

            <div className={`absolute w-full flex flex-col space-y-4 bg-white shadow-intense ${modalOpen ? 'h-screen top-0' : 'h-fit bottom-0 rounded-t-4xl'}`}>
                {/* Pickup and Drop location container */}
                <div className={`h-fit flex flex-col p-5 ${modalOpen ? 'space-y-5' : 'space-y-4'}`}>
                    {/* Heading & conditional Navigation icon */}
                    <div className={"grid grid-cols-3 items-center"}>
                        {/* Icon appears only when the Modal is open */}
                        {modalOpen && <div onClick={handleNavigationClick}>
                            <LuMoveLeft className={"size-6 text-primary"} strokeWidth={2}/>
                        </div>}
                        <h3 className={"text-xl font-semibold"}>Find your trip</h3>
                    </div>

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

                {(pickup.length > 0 && drop.length > 0 && !modalOpen) && <div className={"h-[150px] overflow-y-scroll scroll-smooth"}>
                    <RidesPanel/>
                </div>}
            </div>
        </div>
    );
}

export default Home;