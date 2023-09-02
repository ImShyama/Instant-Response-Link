import React, { useContext } from 'react';
import Links from './Links';


function Home() {

  return (
    <div >
      <div className="row">
        <div className="col-lg-7 mx-auto" style={{width:'600px'}}>
          <Links />
        </div>
        <div className="col-lg-5 ">
        <div className="vl" style={{borderLeft:'1px solid #E0E2D9', height:'100vh'}}></div>
        </div>
      </div>
    </div>
  )
}

export default Home
