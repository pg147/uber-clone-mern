import React from 'react';
import { Route, Routes } from "react-router-dom";
import { Landing, UserSignup, UserLogin, CaptainLogin, CaptainSignup, Home } from "./pages";

function App() {
    return (
        <>
            <Routes>
                <Route path={'/'} element={<Landing />} />

                <Route path={'/home'} element={<Home />} />
                <Route path={'/user/signup'} element={<UserSignup />} />
                <Route path={'/user/login'} element={<UserLogin />} />

                <Route path={'/captain/login'} element={<CaptainLogin />} />
                <Route path={'/captain/signup'} element={<CaptainSignup />} />
            </Routes>
        </>
    );
}

export default App;