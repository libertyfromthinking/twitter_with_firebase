import React from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import Home from '../routes/Home';
import Auth from '../routes/Auth';

const AppRouter = ({isLoggedIn}) => {
    return (
            <Routes> 
                {isLoggedIn ? (
                        <Route exact path="/" element={<Home />} />    
                ) : (
                        <Route exact path="/" element={<Auth />} />
                )}
            </Routes>
    );
}

export default AppRouter;