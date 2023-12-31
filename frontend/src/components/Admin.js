import {React, useState} from 'react'
import { useNavigate } from 'react-router-dom'

const Admin = (props) => {
    const [credentials, setCredentials] = useState({email:"", password:""})
    const navigate = useNavigate();

    const handleSubmit = async(e) => {
        e.preventDefault();
        const response = await fetch(`http://localhost:5000/api/admin/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email: credentials.email, password: credentials.password })
        });
        const json = await response.json()
        console.log(json);
        if(json.success){
            localStorage.setItem('adminToken', json.authtoken);
            navigate('/users');
            props.showAlert("Logged in Successfully", "success");
        }else{
            props.showAlert("Invalid Details", "danger");
        }
    }

    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }

    return (
        <div className='form-container' style={{display:'flex',justifyContent:'center',alignItems:'center',minHeight:'80vh'}}>
            <form onSubmit={handleSubmit} style={{ padding:'50px', background:'#fff', borderRadius:'10px'}}>
                <div className='d-flex justify-content-center mb-3'><h5>Admin Login</h5></div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" value={credentials.email} onChange={onChange} id="exampleInputEmail1" name='email' aria-describedby="emailHelp" />
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" value={credentials.password} onChange={onChange} name='password' id="exampleInputPassword1" />
                </div>
                <button type="submit" className="btn btn-primary" >Submit</button>
            </form>
        </div>
    )
}

export default Admin
