import {React, useState, useContext} from 'react'
import { useNavigate } from 'react-router-dom'
import linkContext from '../context/links/linkContext';

const Signup = (props) => {

    const context = useContext(linkContext);
    const { handleSubmit } = context;

    const [credentials, setCredentials] = useState({name:"", email:"", password:"", cpassword:""})
    const navigate = useNavigate();

    const handleSubmitform = (e,credentials) =>{
        handleSubmit(e,credentials)
    }

    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }
  return (
    <div className='form-container' style={{display:'flex',justifyContent:'center',alignItems:'center',minHeight:'80vh'}}>
            <form onSubmit={(e) => { handleSubmit(e, credentials,props)}} style={{  padding:'50px', background:'#fff', borderRadius:'10px'}}>
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
