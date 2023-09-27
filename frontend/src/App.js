import {React,useState} from 'react'
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar"
import Home from "./components/Home"
// import Footer from "./components/Footer"
// import Setting from "./components/Setting"
import LinkState from './context/links/LinkState';
import Settings from './components/Settings';
import Alert from './components/Alert';
import Login from './components/Login';
import Signup from './components/Signup';
import Admin from './components/Admin';
import Users from './components/Users';

function App() {
    const [alert, setAlert] = useState(null);
    const showAlert = (message, type) =>{
        setAlert({
            msg: message,
            type: type
        })
        setTimeout(()=>{
            setAlert(null);
        }, 1500);
    }
    return (
        <>
            <LinkState>
                <Navbar />
                <Alert alert={alert} />
                <Routes>
                    <Route path="/" element={<Home showAlert={showAlert}/>} />
                    <Route path="/settings" element={<Settings />} />
                    <Route path="/login" element={<Login showAlert={showAlert}/>} />
                    <Route path="/signup" element={<Signup showAlert={showAlert}/>} />
                    <Route path="/admin" element={<Admin showAlert={showAlert}/>} />
                    <Route path="/users" element={<Users showAlert={showAlert}/>} />
                </Routes>
            </LinkState>
        </>
    )
}

export default App
