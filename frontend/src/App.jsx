import React from 'react';
import { Route, Routes } from "react-router-dom";
import { Home, UserSignup } from "./pages";
import UserLogin from "./pages/UserLogin.jsx";

function App() {
    return (
        <>
            <Routes>
                <Route path={'/'} element={<Home />} />
                <Route path={'/user/signup'} element={<UserSignup />} />
                <Route path={'/user/login'} element={<UserLogin />} />
            </Routes>
        </>
    );
}

export default App;