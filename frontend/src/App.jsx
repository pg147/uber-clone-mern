import React from 'react';
import { Route, Routes } from "react-router-dom";
import { Home, UserSignup, UserLogin, CaptainLogin, CaptainSignup } from "./pages";

function App() {
    return (
        <>
            <Routes>
                <Route path={'/'} element={<Home />} />

                <Route path={'/user/signup'} element={<UserSignup />} />
                <Route path={'/user/login'} element={<UserLogin />} />

                <Route path={'/captain/login'} element={<CaptainLogin />} />
                <Route path={'/captain/signup'} element={<CaptainSignup />} />
            </Routes>
        </>
    );
}

export default App;