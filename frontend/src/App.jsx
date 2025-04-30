// React imports
import React, { useContext } from 'react';

// React-Router-DOM imports
import { Route, Routes } from "react-router-dom";

// React toaster
import { Toaster } from "react-hot-toast";

// Page Components
import {
    Landing,
    UserSignup,
    UserLogin,
    CaptainLogin,
    CaptainSignup,
    Home,
    UserProtectedWrapper,
    UserLogout, CaptainProtectedWrapper, CaptainHome, CaptainLogout
} from "./pages";

function App() {
    return (
        <>
            <Routes>
                <Route path={'/'} element={<Landing/>}/>

                {/* Protected Route - User */}
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

                {/* Protected Route - Captain */}
                <Route
                    path={'/captain/home'}
                    element={<CaptainProtectedWrapper><CaptainHome /></CaptainProtectedWrapper>}
                />
                <Route path={'/captain/signup'} element={<CaptainSignup/>}/>
                <Route path={'/captain/login'} element={<CaptainLogin/>}/>
                <Route
                    path={'/captain/logout'}
                    element={<CaptainProtectedWrapper><CaptainLogout /></CaptainProtectedWrapper>}
                />
            </Routes>
            <Toaster />
        </>
    );
}

export default App;