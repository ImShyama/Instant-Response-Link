import { React, useEffect } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'



function Navbar() {
  const navigate = useNavigate();
  const handleLogout = () =>{
    localStorage.removeItem('token');
    navigate('/login');
  }
  let location = useLocation();
  return (
    <div className='mb-5'>
      <nav className="navbar navbar-expand-lg navbar-light fixed-top bg-light ">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">Instant Link</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className={`nav-link ${location.pathname === "/" ? "active" : ""}`} aria-current="page" to="/">Links</Link>
              </li>
              {/* <li className="nav-item">
                <Link className={`nav-link ${location.pathname === "/settings" ? "active" : ""}`} to="/settings">Settings</Link>
              </li> */}
            </ul>
            {!localStorage.getItem('token') ? <form className="d-flex">
            <Link className="btn btn-primary mx-2" to="/login"  role="button">Login</Link>
            <Link className="btn btn-primary mx-2" to="/signup" role="button">Signup</Link>
            </form>: <button onClick={handleLogout} className='btn btn-primary'>Logout</button>}
          </div>
        </div>
      </nav>
    </div>
  )
}

export default Navbar
