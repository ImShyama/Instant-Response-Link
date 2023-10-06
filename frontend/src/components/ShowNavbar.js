import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'

const ShowNavbar = ({children}) => {

    const location = useLocation();
    const [showNavbar, setShowNavbar] = useState(false)

    useEffect(()=>{
        setShowNavbar(false)
        if(location.pathname.indexOf('view') > -1){
            setShowNavbar(false)
        }else{
            setShowNavbar(true)
        }
    },[location])

  return (
    <div>
      {showNavbar && children}
    </div>
  )
}

export default ShowNavbar


