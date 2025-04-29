// React imports
import React, { useContext } from 'react';

// React-Router-DOM imports
import { Route, Routes } from "react-router-dom";

// Page Components
import {
    Landing,
    UserSignup,
    UserLogin,
    CaptainLogin,
    CaptainSignup,
    Home,
    UserProtectedWrapper,
    UserLogout
} from "./pages";

function App() {
    return (
        <>
            <Routes>
                <Route path={'/'} element={<Landing/>}/>

                {/* Protected Route */}
                <Route
                    path={'/home'}
                    element={<UserProtectedWrapper><Home/></UserProtectedWrapper>}
                />
                <Route path={'/user/signup'} element={<UserSignup/>}/>
                <Route path={'/user/login'} element={<UserLogin/>}/>
                <Route
                    path={'/user/logout'}
                    element={<UserProtectedWrapper><UserLogout/></UserProtectedWrapper>}
                />
                <Route path={'/captain/login'} element={<CaptainLogin/>}/>
                <Route path={'/captain/signup'} element={<CaptainSignup/>}/>
            </Routes>
        </>
    );
}

export default App;