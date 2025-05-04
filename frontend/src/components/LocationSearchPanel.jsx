// React imports
import React, { useEffect, useState } from 'react';

// Icon libraries
import { Location01Icon } from "hugeicons-react";

// Temporary location data
const locationData = [
    {
        header: "Majestic Bus Station",
        address: "KSR Road, Gandhi Nagar, Bangalore, 560009"
    },
    {
        header: "Indiranagar Metro Station",
        address: "100 Feet Road, Indiranagar, Bangalore, 560038"
    },
    {
        header: "Electronic City Phase 1",
        address: "Wipro Gate, Hosur Road, Electronic City, Bangalore, 560100"
    },
    {
        header: "Whitefield Railway Station",
        address: "Whitefield Main Road, Kadugodi, Bangalore, 560066"
    },
    {
        header: "Koramangala 5th Block",
        address: "80 Feet Road, Koramangala 5th Block, Bangalore, 560095"
    },
    {
        header: "Hebbal Flyover",
        address: "Outer Ring Road, Hebbal, Bangalore, 560024"
    },
    {
        header: "Banashankari Bus Stop",
        address: "Kanakapura Road, Banashankari, Bangalore, 560070"
    }
]

function LocationSearchPanel({ value, setValue, setModalOpen }) {
    const [locations, setLocations] = useState([]);

    const filterLocations = () => {
        // Filtering locations if the location header includes any word from the pickup and drop string
        const filteredLocations = value.length > 0 ? locationData.filter((location) => location.header.toLowerCase().includes(value.toLowerCase())) : [];
        setLocations(filteredLocations); // setting up filtered locations
    }

    const handleLocationClick = (index) => {
        const selectedLocation = locations[index];

        setValue(selectedLocation.header);
        setModalOpen(false);
    }

    useEffect(() => {
        filterLocations();
    }, [value]);

    return (
        <div className={"flex flex-col space-y-6 overflow-x-clip"}>
            {locations.map((location, index) => (
                <div
                    onClick={() => handleLocationClick(index)}
                    key={location.header}
                    className={"flex space-x-3 items-center h-fit w-full"}
                >
                    {/* Location SVG icon */}
                    <div className={"p-2 size-fit rounded-full bg-input"}>
                        <Location01Icon className={"size-7 text-white"} fill={"#000000"}/>
                    </div>

                    {/* Location details */}
                    <div className={"flex flex-col w-full"}>
                        <h1 className={"text-lg font-semibold"}>{location.header}</h1>
                        <p className={"text-sm w-full truncate"}>{location.address}</p>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default LocationSearchPanel;