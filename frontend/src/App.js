import React from 'react'
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Navbar from "./components/Navbar"
import Home from "./components/Home"
// import Footer from "./components/Footer"
// import Setting from "./components/Setting"
import LinkState from './context/links/LinkState';
import Settings from './components/Settings';
import Alert from './components/Alert';

function App() {
    return (
        <>
            <LinkState>
                <Navbar />
                {/* <Alert message="This is amazing project" /> */}
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/settings" element={<Settings />} />
                </Routes>
            </LinkState>
        </>
    )
}

export default App
