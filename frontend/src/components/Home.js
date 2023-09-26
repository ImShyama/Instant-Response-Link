import React, { useContext } from 'react';
import Links from './Links';
import Settings from './Settings';


function Home(props) {
 const{showAlert} = props;
  return (
    <div >
      <div className="row">
        <div className="col-lg-7 mx-auto my-3" style={{ width: '600px' }}>
          <Links showAlert={props.showAlert}/>
        </div>
        <div className="col-lg-5 my-3">
          {/* <div className="vl" style={{ borderLeft: '1px solid #E0E2D9', height: '100vh' }}></div> */}
          <Settings showAlert={props.showAlert}/>
        </div>
      </div>
    </div>
  )
}

export default Home
