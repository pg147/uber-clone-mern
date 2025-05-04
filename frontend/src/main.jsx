import { createRoot } from 'react-dom/client'
import { BrowserRouter } from "react-router-dom";
import UserProvider from "./context/userContext.jsx";
import CaptainProvider from "./context/captainContext.jsx";
import RideProvider from "./context/rideContext.jsx";
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
    <BrowserRouter>
        <RideProvider>
            <CaptainProvider>
                <UserProvider>
                    <App/>
                </UserProvider>
            </CaptainProvider>
        </RideProvider>
    </BrowserRouter>
)
