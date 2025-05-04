import { createContext, useState } from "react";

export const rideDataContext = createContext();

function RideContext({ children }) {
    const [rideType, setRideType] = useState("");

    return <rideDataContext.Provider value={{ rideType, setRideType }}>
        {children}
    </rideDataContext.Provider>
}

export default RideContext;