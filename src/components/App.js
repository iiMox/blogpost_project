import React from "react";
import { Routes, Route } from "react-router-dom";
import "./Style.css";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Post from "./pages/Post";
import Profile from "./pages/Profile";
import Logout from "./pages/Logout";
import Search from "./pages/Search";

const App = () => {
    return (
        <>
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/login' element={<Login />} />
                <Route path='/post' element={<Post />} />
                <Route path='/profile' element={<Profile />} />
                <Route path='/logout' element={<Logout />} />
                <Route path='/search' element={<Search />} />
            </Routes>
        </>
    );
};

export default App;
