import { createContext, useState } from "react";

export const captainDataContext = createContext();

function CaptainContext({ children }) {
    const [captain, setCaptain] = useState({
        fullName: {
            firstName: "",
            lastName: ""
        },
        email: "",
        color: "",
        numberPlate: "",
        vehicleType: "",
        capacity: ""
    });

    return <captainDataContext.Provider value={{ captain, setCaptain }}>
        { children }
    </captainDataContext.Provider>
};

export default CaptainContext;