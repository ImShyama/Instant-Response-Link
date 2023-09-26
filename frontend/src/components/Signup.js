import {React, useState} from 'react'
import { useNavigate } from 'react-router-dom'

const Signup = (props) => {
    const [credentials, setCredentials] = useState({name:"", email:"", password:"", cpassword:""})
    const navigate = useNavigate();

    const handleSubmit = async(e) => {
        e.preventDefault();
        const {name, email, password, cpassword} = credentials;
        const response = await fetch(`http://localhost:5000/api/auth/createuser`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, email, password})
        });
        const json = await response.json()
        console.log(json);
        if(json.success){
            localStorage.setItem('token', json.authtoken);
            navigate('/');
            props.showAlert("Account Created Successfully", "success");
        }else{
            props.showAlert("Invalid Credentials", "danger");
        }
    }

    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }
  return (
    <div className='form-container' style={{display:'flex',justifyContent:'center',alignItems:'center',minHeight:'80vh'}}>
            <form onSubmit={handleSubmit} style={{  padding:'50px', background:'#fff', borderRadius:'10px'}}>
            <div className='d-flex justify-content-center mb-3'><h5>Signup</h5></div>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Full Name</label>
                    <input type="text" className="form-control" value={credentials.name} onChange={onChange} id="name" name='name' aria-describedby="emailHelp" />
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input type="email" className="form-control" value={credentials.email} onChange={onChange} id="email" name='email' aria-describedby="emailHelp" />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" value={credentials.password} onChange={onChange} name='password' id="password" minLength={5} required/>
                </div>
                <div className="mb-3">
                    <label htmlFor="cpassword" className="form-label">Confirm Password</label>
                    <input type="password" className="form-control" value={credentials.cpassword} onChange={onChange} name='cpassword' id="cpassword" minLength={5} required/>
                </div>
                <button type="submit" className="btn btn-primary" >Submit</button>
            </form>
        </div>
    )
}

export default Signup
